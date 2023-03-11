import Head from 'next/head';
import Link from 'next/link';
import { client } from '../lib/apollo';
import { gql } from '@apollo/client';
import Layout from '../components/Layout/Layout';

export default function Home({ homepage }) {
  return (
    <Layout>
      <Head>
        <title>Przykładowa stronka</title>
        <link rel="icon" href="favicon.ico"></link>
      </Head>

      <main>
        <h1 className="title">
          Przykładowy tytuł
        </h1>

        <p className="description">
          O nas:
          <article className='content' dangerouslySetInnerHTML={{__html: homepage.content}}>   
          </article>
        </p>

      </main>

      <section>

      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const GET_HOMEPAGE = gql`
      query GetHomepage {
        page(id: "home-page", idType: URI) {
          content
        }
    }
  `
  const response = await client.query({
    query: GET_HOMEPAGE
  })

  return {
    props: {
      homepage: response?.data?.page
    }
  }

}