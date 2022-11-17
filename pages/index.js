import Head from "next/head";
import { request } from "../lib/datocms";
import { Image } from "react-datocms";

import { NavItem } from "../components/Header";

const info = {
  name: "Антон Досыбиев",
  description:
    "Фронтенд-разработчик с 15-летним опытом в контент-маркетинге. Работаю в американском диджитал-агентстве, живу в Алматы. Люблю кино, читаю книги, смеюсь над собой.",
  menu: [
    {
      label: "Блог",
      link: "/blog",
    },
    {
      label: "Проекты",
      link: "/projects",
    },
    {
      label: "Резюме",
      link: "/cv",
    },
  ],
};

export default function Home({ data }) {
  return (
    <div className="m-auto h-screen w-full p-6 md:w-10/12 lg:w-7/12">
      <Head>
        <title>Антон Досыбиев</title>
        <meta name="description" content="Антон Досыбиев" />
      </Head>
      <h1 className="mb-4 text-5xl font-bold">{info.name}</h1>
      <div className="mb-8">{info.description}</div>
      <div className="flex justify-between">
        <div className="flex flex-col justify-center">
          {info.menu.map((item, index) => {
            return (
              <div className="link-container" key={index}>
                <NavItem
                  label={item.label}
                  link={item.link}
                  style="main-menu-item text-3xl font-bold mb-8 w-fit"
                />
              </div>
            );
          })}
        </div>
        <div className="ml-auto w-3/6">
          <Image
            data={
              data.allUploads.filter(
                (image) => image.responsiveImage.title === "Avatar"
              )[0].responsiveImage
            }
            alt=""
          />
        </div>
      </div>
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
  allUploads {
    responsiveImage {
      alt
      height
      sizes
      src
      srcSet
      title
      width
      webpSrcSet
    }
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
