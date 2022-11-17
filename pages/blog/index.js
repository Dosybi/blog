import Post from "../../components/Post";
import Layout from "../../components/Layout";

import Head from "next/head";
import { request } from "../../lib/datocms";

export default function Blog({ data }) {
  return (
    <div>
      <Head>
        <title>Блог</title>
        <meta name="description" content="Блог" />
      </Head>
      <Layout data={data.header}>
        {data.allPosts.map((post) => {
          return <Post post={post} key={post.id} />;
        })}
      </Layout>
    </div>
  );
}

const HOMEPAGE_QUERY = `query Data {
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
  allCategories {
    category
    id
    slug
  }
}`;

export async function getStaticProps() {
  const data = await request({
    query: HOMEPAGE_QUERY,
  });
  return {
    props: { data },
  };
}
