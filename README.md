<h1 align="center">
  <img alt="Logo" src="./public/logo.svg" alt="SpaceTraveling">
</h1>

<h1 align="center">
    SpaceTraveling - Next.js
</h1>
<p align="center">Aplicação em formato de blog utilizando Prismic CMS</p>

<p align="center">
 <a href="#sobre-o-projeto">Sobre o Projeto</a> •
 <a href="#tecnologias">Tecnologias</a> •
 <a href="#configurações-necessárias">Configurações necessárias</a> •
 <a href="#test_tube-executar-os-testes">Executar os testes</a> •
 <a href="#licença">Licença</a> •
 <a href="#autor">Autor</a>
</p>

<p align="center">
  <img src=".github/sample.gif" alt="sample"/>
</p>


## Sobre o projeto

O projeto tem como objetivo o estudo e desenvolvimento de uma aplicação em ReactJS com NextJS para listagem de posts de um blog.

A aplicação foi desenvolvida utilizando o framework NextJS aplicando os conceitos de Static Site Generation (SSG) e utilizando Prismic CMS para adição e gerenciamento do conteúdo dos posts.

Como desafio complementar foi adicionado sessão de comentários utilizando Utterances, acesso a Preview dos posts do Prismic CMS, controle de navegação dentro do post para ir para o próximo/anterior e adição de tag com data de quando o post sofreu a ultima edição.

O projeto foi desenvolvido como desafio das aulas do modulo 03 do [Ignite da Rocketseat](https://rocketseat.com.br/)

Link do [desafio](https://www.notion.so/Desafio-01-Criando-um-projeto-do-zero-b1a3645d286b4eec93f5f1f5476d0ff7)

Link do [desafio complementar](https://www.notion.so/Desafio-02-Adicionando-features-ao-blog-d466866c02544c79bbada9717c033d0a)

---

## Tecnologias

Abaixo as tecnologias utilizadas para construção da aplicação

- [ReactJS](https://reactjs.org/)
- [NextJS](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [SASS](https://sass-lang.com/)
- [Prismic CMS](https://prismic.io/)
- [Utterances](https://utteranc.es/)

---

## Configurações necessárias

### **Requisitos**

Necessário realizar as instalações:

- [Git](https://git-scm.com/)
- [Yarn](https://classic.yarnpkg.com)

Criar conta e configurar o serviço do Prismic CMS e Utterances:

- [Prismic CMS](https://prismic.io/)
- [Utterances](https://utteranc.es/)

*Configurações dos serviços estão localizadas no arquivo [prismic.md](./prismic.md) e [utteranc.md](./utteranc.md) na raiz do projeto.*

### **Clone do projeto**

```bash
# Execute o comando git clone para realizar o clone do repositório
$ git clone https://github.com/brunowbbs/spacetraveling.git
# Entre na pasta do repositório clonado
$ cd spacetraveling
```

### **Iniciando o projeto**

```bash
# Execute yarn para instalar as dependências
$ yarn

# Na raiz do projeto crie uma copia do arquivo .env.local.example
# Altere o nome da copia para .env.local
# Preencha as variáveis ambiente de acordo com as instruções
$ cp .env.local.example .env.local


# Para iniciar a aplicação
$ yarn dev

```

---

## :test_tube: Executar os testes
```bash
# Execute os testes
$ yarn test
ou
$ npm run test
```

## Licença

Distribuído sob a licença MIT. Veja [LICENSE](LICENSE) para mais informações.

---

## Autor

Feito por Wesley Bruno 👋🏽 Entre em contato!

[![Linkedin Badge](https://img.shields.io/badge/-Wesley-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/brunowbbs/)](https://www.linkedin.com/in/brunowbbs/)
[![Gmail Badge](https://img.shields.io/badge/-engwesleybruno@gmail.com-red?style=flat-square&link=mailto:engwesleybruno@gmail.com)](mailto:engwesleybruno@gmail.com)