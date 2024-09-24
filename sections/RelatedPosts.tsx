import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { ComponentChildren } from "preact";
import { BlogPost, BlogPostPage } from "apps/blog/types.ts";

export interface CTA {
  text?: string;
}

/** @title {{{title}}} */
export interface Post {
  url?: string;
  title?: string;
  author?: string;
  excerpt?: string;
  image?: ImageWidget;
  date?: string;
  readingTime?: string;
  tags?: string[];
}

export interface Props {
  title?: string;
  page?: BlogPostPage | null;
  posts?: BlogPost[] | null;
  count?: number;
}

function Container({ children }: { children: ComponentChildren }) {
  return (
    <div class="container lg:mx-auto py-12 lg:py-14 px-[30px]">{children}</div>
  );
}

const DEFAULT_AVATAR =
  "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/7286de42-e9c5-4fcb-ae8b-b992eea4b78e";

const DEFAULT_PROPS: BlogPost = {
  title: "Blog title heading will go here",
  excerpt: "Excerpt goes here",
  authors: [
    {
      name: "Full name",
      email: "author@deco.cx",
      avatar: DEFAULT_AVATAR,
    },
  ],
  categories: [],
  date: "2022-01-01",
  image:
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4763/682eb374-def2-4e85-a45d-b3a7ff8a31a9",
  slug: "blog-post",
  content:
    '<h1>Heading 1</h1><p>This is a paragraph under <strong>Heading 1</strong>. It can contain <em>italic</em> text, <strong>bold</strong> text, and even <code>code snippets</code>.</p><h2>Introduction</h2><p>Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien varius id.</p><p>Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat mollis at volutpat lectus velit, sed auctor. Porttitor fames arcu quis fusce augue enim. Quis at habitant diam at. Suscipit tristique risus, at donec. In turpis vel et quam imperdiet. Ipsum molestie aliquet sodales id est ac volutpat.</p><h2>Heading 2</h2><p>More text can be placed here. This section is under <strong>Heading 2</strong>.</p><h3>Heading 3 with Code Block</h3><p>This is an example of a code block:</p><pre><code>// This is a code block console.log("Hello, World!");</code></pre><h4>Heading 4 with Image</h4><p>Below is an image:</p><img src="https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4763/682eb374-def2-4e85-a45d-b3a7ff8a31a9" alt="Description of Image"><p><strong>Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis mi bibendum diam. Tempor integer aliquam in vitae malesuada fringilla.</strong></p><p>Collaboratively deploy intuitive partnerships whereas customized e-markets. Energistically maintain performance based strategic theme areas whereas just in time methodologies. Phosfluorescently drive functionalized intellectual capital and.</p><blockquote>"Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque congue eget consectetur turpis. Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus."</blockquote><p>Tristique odio senectus nam posuere ornare leo metus, ultricies. Blandit duis ultricies vulputate morbi feugiat cras placerat elit. Aliquam tellus lorem sed ac. Montes, sed mattis pellentesque suscipit accumsan. Cursus viverra aenean magna risus elementum faucibus molestie pellentesque. Arcu ultricies sed mauris vestibulum.<h2>Conclusion</h2><p>Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ultricies. Duis est sit sed leo nisl, blandit elit sagittis. Quisque tristique consequat quam sed. Nisl at scelerisque amet nulla purus habitasse.</p><p>Nunc sed faucibus bibendum feugiat sed interdum. Ipsum egestas condimentum mi massa. In tincidunt pharetra consectetur sed duis facilisis metus. Etiam egestas in nec sed et. Quis lobortis at sit dictum eget nibh tortor commodo cursus.</p><p>Odio felis sagittis, morbi feugiat tortor vitae feugiat fusce aliquet. Nam elementum urna nisi aliquet erat dolor enim. Ornare id morbi eget ipsum. Aliquam senectus neque ut id eget consectetur dictum. Donec posuere pharetra odio consequat scelerisque et, nunc tortor. Nulla adipiscing erat a erat. Condimentum lorem posuere gravida enim posuere cursus diam.</p>',
};

export default function RelatedPosts({
  posts,
  count = 3,
  page,
  title = "",
}: Props) {
  const { categories } = page?.post || DEFAULT_PROPS;

  // Get All Posts That Belong To The Same Categories As The Current Post
  const filteredPosts = posts?.filter((post) => {
    return (
      post.slug !== page?.post?.slug &&
      post.categories.some(
        (category) =>
          categories.findIndex((c) => c.slug === category.slug) !== -1
      )
    );
  });

  const from = 0;
  const to = count;

  return (
    <Container>
      <>
        <h2 class="text-secondary font-medium text-[26px] lg:text-[39px] mb-[30px] lg:mb-[60px] text-center">
          {title}
        </h2>
        <div class="gap-8 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
          {filteredPosts?.slice(from, to).map((post) => (
            <div class="overflow-hidden bg-info shadow-[0px_4px_7px_#00000024]">
              <a href={`/blog/${post.slug}`}>
                <Image
                  width={386}
                  height={280}
                  class="object-fit w-full max-h-[280px]"
                  sizes="(max-width: 640px) 100vw, 30vw"
                  src={post.image || ""}
                  alt={post.image}
                  decoding="async"
                  loading="lazy"
                />
              </a>
              <div class="p-6 space-y-4">
                <div class="space-y-2">
                  <h3 class="text-[18.2px] text-secondary font-bold">
                    <a href={`/blog/${post.slug}`}>{post.title}</a>
                  </h3>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-[15.6px] font-icomoon"></span>
                  <span class="text-[15.6px]">
                    {post.date
                      ? new Date(post.date).toLocaleDateString("pt-BR", {
                          month: "long",
                          day: "numeric",
                        })
                      : ""}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    </Container>
  );
}
