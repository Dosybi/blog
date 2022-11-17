import { request } from "../../../lib/datocms";
import { useRouter } from "next/router";
import Head from "next/head";

import Post from "../../../components/Post";
import Layout from "../../../components/Layout";

const PostPage = ({ data }) => {
  const { asPath } = useRouter();
  const post = data.allPosts.filter((post) => asPath.includes(post.slug))[0];

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.title} />
      </Head>
      <Layout data={data.header}>
        <Post post={post} isInner />
      </Layout>
    </>
  );
};

const POST_QUERY = `query Post {
  allPosts {
    _createdAt
    favourite
    id
    slug
    title
    body {
      blocks {
        image {
          responsiveImage {
            alt
            height
            sizes
            src
            srcSet
            title
            width
          }
        }
        id
      }
      links
      value
    }
    categories {
      category
      id
      slug
    }
    cover {
      responsiveImage {
        alt
        aspectRatio
        height
        sizes
        src
        srcSet
        title
        width
        webpSrcSet
      }
      size
      url
      width
    }
  }
  header {
    title
    description
    avatar {
      responsiveImage {
        alt
        height
        width
        title
        srcSet
        src
        aspectRatio
        base64
        bgColor
        sizes
        webpSrcSet
      }
    }
    menu {
      category
      id
      slug
    }
  }
}`;

export async function getStaticProps({ params }) {
  const data = await request({ query: POST_QUERY });
  return {
    props: { data },
  };
}

export async function getStaticPaths() {
  const data = await request({ query: POST_QUERY });

  return {
    paths: data.allPosts.map((post) => `/blog/posts/${post.slug}`),
    fallback: false,
  };
}

export default PostPage;
