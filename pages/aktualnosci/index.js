import Head from 'next/head';
import PostCard from '../../components/PostCard';
import { client } from '../../lib/apollo'
import { gql } from '@apollo/client'
import Layout from '../../components/Layout/Layout';
 
export default function Home({ posts }) {
  return (
    <Layout>
      <Head>
        <title>Przykładowa stronka</title>
      </Head>

      <main>
        <h1 className="title">
          Aktualności
        </h1>

        <p className="description">
          Posty:
        </p>

        <div className="grid">
          {
            posts.map((post) => {
              return (
                <PostCard key={post.slug} post={post}></PostCard>
              )
            })
          }
        </div>
      </main>
    </Layout>
  )
}

export async function getStaticProps(){

  const GET_POSTS = gql`
    query NewQuery {
      posts {
        nodes {
          title
          content
          uri
          slug
          date
        }
      }
    }
  `
  const response = await client.query({
    query: GET_POSTS
  })
  const posts = response?.data?.posts?.nodes
  return {
    props: {
      posts
    }
  }
}
