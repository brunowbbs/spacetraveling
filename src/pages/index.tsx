import { useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link'
import Prismic from '@prismicio/client'
import { format } from 'date-fns';

import Header from '../components/Header';

import { FiCalendar, FiUser } from 'react-icons/fi'

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import { ptBR } from 'date-fns/locale';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {


  const [postsPage, setPostsPage] = useState(postsPagination);
  const [posts, setPosts] = useState(postsPagination.results);

  async function handleNextPage(): Promise<void> {

    const resultFetchPosts = await fetch(postsPage.next_page);
    const postsJson = await resultFetchPosts.json();

    setPostsPage(postsJson);
    setPosts([...posts, ...postsJson.results]);
  }

  return (
    <>
      <Head>
        <title>Home | Spacing Traveling</title>
      </Head>
      <main className={commonStyles.container}>
        <Header />

        <div className={styles.posts}>

          {console.log(posts[0])}

          {posts.map(post => (
            <Link href={`/post/${post.uid}`} key={post.uid}>
              <a className={styles.post}>
                <strong>{post.data.title}</strong>
                <p>{post.data.subtitle}</p>
                <ul>
                  <li><FiCalendar /> {
                    format(new Date(post.first_publication_date), 'dd MMM yyy', { locale: ptBR })
                  }</li>
                  <li><FiUser /> {post.data.author}</li>
                </ul>
              </a>
            </Link>
          ))}

          {postsPage.next_page && <button type='button' onClick={handleNextPage}>
            Carregar mais posts
          </button>
          }

        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      pageSize: 1
    }
  );

  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author
      }
    }
  })

  const postsPagination = {
    next_page: postsResponse.next_page,
    results: posts
  }


  return {
    props: {
      postsPagination
    }
  }

};
