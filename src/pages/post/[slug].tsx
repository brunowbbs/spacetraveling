import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GetStaticPaths, GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';
import { useRouter } from 'next/router';
import Prismic from '@prismicio/client';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import Head from 'next/head';
import Link from 'next/link';

import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import Comments from '../../components/Comments';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
  preview: boolean
}

export default function Post({ post, preview }: PostProps) {

  const router = useRouter();

  if (router.isFallback) {
    return <h1>Carregando...</h1>
  }


  const totalWords = post.data.content.reduce((total, contentItem) => {
    total += Number(contentItem.heading.split('').length);
    const words = contentItem.body.map(item => item.text.split(' ').length);
    words.map(word => total += word)
    return total;
  }, 0)

  const readTime = Math.ceil(totalWords / 200);

  return (
    <>
      <Head>
        <title>{post.data.title}</title>
      </Head>
      <Header />
      <img src={post?.data?.banner?.url} alt="imagem" className={styles.banner} />
      <main className={commonStyles.container}>
        <div className={styles.post}>
          <div className={styles.postTop}>
            <h1>{post?.data?.title}</h1>
            <ul>
              <li><FiCalendar />
                {
                  format(new Date(post?.first_publication_date), 'dd MMM yyy', { locale: ptBR })
                }
              </li>

              <li>
                <FiUser />
                {post?.data?.author}
              </li>

              <li>
                <FiClock />
                {`${readTime} min`}
              </li>
            </ul>
          </div>

          {post?.data?.content.map((content, item) => (
            <article key={String(item)}>
              <h2>{content.heading}</h2>
              <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: RichText.asHtml(content.body) }} />
            </article>
          ))}

        </div>

        <Comments />

        {
          preview && (
            <aside>
              <Link href="/api/exit-preview">
                <a className={commonStyles.preview}>Sair do modo Preview</a>
              </Link>
            </aside>
          )
        }
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(Prismic.predicates.at('document.type', 'posts'));

  const paths = posts.results.map(post => ({
    params: {
      slug: post.uid
    }
  }))

  return {
    paths,
    fallback: true
  }
};

export const getStaticProps: GetStaticProps = async ({ params, preview = false, previewData }) => {
  const { slug } = params;
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {
    ref: previewData?.ref || null
  });

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    last_publication_date: response.last_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      author: response.data.author,
      banner: {
        url: response.data.banner.url,
      },
      content: response.data.content.map(content => {
        return {
          heading: content.heading,
          body: [...content.body],
        };
      }),
    },
  };

  return {
    props: {
      post,
      preview
    }
  }
};
