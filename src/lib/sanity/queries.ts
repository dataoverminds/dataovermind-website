import { defineQuery } from "next-sanity";

export const allPostsQuery = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      asset-> { _ref, url },
      alt
    },
    author-> { _id, name, image { asset-> { _ref, url } } },
    categories[]-> { _id, title },
    publishedAt,
    _createdAt
  }
`);

export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    mainImage {
      asset-> { _ref, url },
      alt
    },
    author-> { _id, name, image { asset-> { _ref, url } }, bio },
    categories[]-> { _id, title },
    publishedAt,
    _createdAt
  }
`);

export const recentPostsQuery = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      asset-> { _ref, url },
      alt
    },
    categories[]-> { _id, title },
    publishedAt
  }
`);

export const postSlugsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current
  }
`);
