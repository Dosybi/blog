import { Image, StructuredText } from "react-datocms";
import Link from "next/link";

const Post = ({ post, isInner }) => {
  const date = new Date(post._createdAt);

  return (
    <div className="mb-8">
      <Link
        href={`/blog/posts/${post.slug}`}
        style={{ pointerEvents: isInner ? `none` : "auto" }}
      >
        <div className="mb-4 cursor-pointer text-4xl font-bold transition-colors hover:text-link">
          {post.title}
        </div>
      </Link>

      <div className="text-xl">
        <StructuredText
          data={post.body}
          renderBlock={({ record }) => {
            return (
              <Image className="mb-4" data={record.image.responsiveImage} />
            );
          }}
        />
      </div>
      <div className="mb-2 text-sm">{date.toLocaleString()}</div>
      <div className="flex text-sm">
        <div className="mr-2">#</div>
        {post.categories.map((category) => {
          return (
            <Link href={`/blog/category/${category.slug}`}>
              <div className="mr-2 rounded bg-orange-200 px-2 hover:bg-orange-400">
                {category.category}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Post;
