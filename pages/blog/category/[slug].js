import { request } from "../../../lib/datocms";
import { useRouter } from "next/router";
import Head from "next/head";

import Post from "../../../components/Post";
import Layout from "../../../components/Layout";

const CategoryPage = ({ data }) => {
  const { asPath } = useRouter();

  const posts = data.allPosts.filter((post) =>
    post.categories.map((category) => category.slug).includes(asPath.slice(15))
  );

  const categoryName = posts[0].categories.filter(
    (category) => category.slug === asPath.slice(15)
  )[0].category;

  return (
    <>
      <Head>
        <title>{categoryName}</title>
        <meta name="description" content={categoryName} />
      </Head>
      <Layout data={data.header}>
        <div className="mb-8 text-xl">
          Посты про{" "}
          <span className="mr-2 rounded bg-orange-200 px-2">
            {categoryName.toLowerCase()}
          </span>
        </div>
        {posts.map((post) => {
          return <Post post={post} key={post.id} />;
        })}
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
  allCategories {
    category
    id
    slug
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
    paths: data.allCategories.map(
      (category) => `/blog/category/${category.slug}`
    ),
    fallback: false,
  };
}

export default CategoryPage;
