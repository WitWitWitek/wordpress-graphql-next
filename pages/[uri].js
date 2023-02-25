import Head from 'next/head'
import Footer from '../components/Footer'
import { getPostByUri } from '../lib/test-data';
import { client } from '../lib/apollo';
import { gql } from '@apollo/client';
import Link from 'next/link';

export default function SlugPage({ post }) {
  console.log(post);
  return (
    <div>
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="favicon.ico"></link>
      </Head>

      <main>
          <div className="siteHeader">
            <h1 className="title">
                {post.title}
            </h1>
            <p>✍️  &nbsp;&nbsp;{`${post.author.node.firstName} ${post.author.node.lastName}`} | 🗓️ &nbsp;&nbsp;{ new Date(post.date).toLocaleDateString() }</p>
          </div>
            <article className='content' dangerouslySetInnerHTML={{__html: post.content}}>   
            </article>
      </main>
      <Link href='/'> &#8594; Go back home</Link>
      <Footer></Footer>

    </div>
  )
}


export async function getStaticProps({ params }){
  const GET_POST_BY_URI = gql`
    query GetPostByURI($id: ID!) {
      post(id: $id, idType: URI) {
        title
        content
        date
        uri
        author {
          node {
            firstName
            lastName
          }
        }
        slug
      }
    }
  `
    const response = await client.query({
      query: GET_POST_BY_URI,
      variables: {
        id: params.uri
      }
  })
  const post = response?.data?.post
  return {
    props: {
      post
    }
  }
}

export async function getStaticPaths(){
    
    const paths = []
    return {
        paths,
        fallback: 'blocking'
    }
}