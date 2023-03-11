import Head from 'next/head'
import { client } from '../../lib/apollo';
import { gql } from '@apollo/client';
import Link from 'next/link';
import { getImagesGallery } from '../../lib/photoGallery';
import Layout from '../../components/Layout/Layout';

export default function SlugPage({ post, images }) {
  return (
    <Layout>
        <Head>
          <title>{post.title}</title>
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
              <p>length of gallery:<b>{images.length}</b></p>
        </main>
        <p>
          {post.file.file?.mediaItemUrl ? <a href={post.file.file.mediaItemUrl} target="_blank">file</a> : null}
        </p>
        <Link href='/aktualnosci'> &#8594; Go back home</Link>
    </Layout>
  )
}


export async function getStaticProps({ params }){
  const GET_POST_BY_URI = gql`
    query GetPostByURI($id: ID!) {
      post(id: $id, idType: SLUG) {
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
        file {
          file {
            mediaItemUrl
          }
        }
      }
    }
  `

  const response = await client.query({
      query: GET_POST_BY_URI,
      variables: {
        id: params.uri
      }
  })

  const photoGallery = await getImagesGallery(params.uri)

  const post = response?.data?.post
  return {
    props: {
      post,
      images: photoGallery
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