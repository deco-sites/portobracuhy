import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useSection } from "deco/hooks/useSection.ts";
import { ComponentChildren, Fragment } from "preact";
import { BlogPost, Category } from "apps/blog/types.ts";
import { useId } from "../sdk/useId.ts";
import { AppContext } from "apps/blog/mod.ts";
import { getRecordsByPath } from "apps/blog/utils/records.ts";
import { SectionProps } from "deco/types.ts";
import { usePagination } from "site/sdk/usePagination.ts";
import { clx } from "site/sdk/clx.ts";

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
  cta?: CTA;
  posts?: BlogPost[] | null;
  pagination?: {
    /**
     * @title First page
     * @description Leave it as 0 to start from the first page
     */
    page?: number;
    /** @title items per page */
    perPage?: number;
  };
}

export default function BlogPosts({
  title = "Blog",
  cta = { text: "Show more" },
  posts,
  categories,
  pagination: { page = 1, perPage = 6 } = {},
}: SectionProps<typeof loader>) {
  const from = perPage * (page - 1);
  const to = perPage * page;

  const lastPosts = posts?.slice(0, 2);

  const totalPages = Math.ceil((posts?.length ?? 0) / perPage);

  const paginationRange = usePagination({
    currentPage: page,
    totalCount: posts?.length ?? 0,
    pageSize: perPage,
  });

  const changePage = (page: number) =>
    useSection({
      props: {
        pagination: { perPage, page },
      },
    });

  return (
    <div class="container mt-[50px] px-[15px]">
      <h1 class="text-secondary leading-normal text-[32px] font-black pb-[10px] border-b border-[#afc0c7]">
        {title}
      </h1>
      <div class="flex flex-col md:flex-row mt-10 gap-[25px]">
        <div class="gap-8 flex flex-col w-full lg:w-3/4">
          {posts?.slice(from, to).map((post) => (
            <div class="overflow-hidden bg-info shadow-[2px_4px_7px_#00000024]">
              <a href={`/blog/${post.slug}`}>
                <Image
                  width={380}
                  height={274}
                  class="object-cover w-full max-h-[400px]"
                  sizes="(max-width: 640px) 100vw, 30vw"
                  src={post.image || ""}
                  alt={post.image}
                  decoding="async"
                  loading="lazy"
                />
              </a>
              <div class="p-6 space-y-4">
                <div class="flex flex-wrap gap-2">
                  {post.categories?.map((category) => (
                    <div class="badge px-[25px] py-[3px] bg-[#DDD] text-sm border-none h-auto leading-[1.8]">
                      {category.name}
                    </div>
                  ))}
                </div>

                <div class="space-y-2">
                  <h3 class="text-[26px] lg:text-[31.2px] leading-[1.1] text-secondary font-black">
                    <a href={`/blog/${post.slug}`}>{post.title}</a>
                  </h3>
                  <p class="text-base border-b border-[#afc0c7] w-full text-[16.8px] pb-5">
                    {post.excerpt}...
                  </p>
                </div>

                <div class="flex items-center gap-[10px]">
                  <span class="font-icomoon"></span>
                  <span>
                    {post.date
                      ? new Date(post.date).toLocaleDateString("pt-BR", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : ""}
                  </span>
                </div>

                <a
                  class="block w-max bg-secondary mx-auto py-[3px] px-[50px] text-white text-[15px] font-bold leading-8"
                  href={`/blog/${post.slug}`}
                >
                  Continuar lendo
                </a>
              </div>
            </div>
          ))}

          <div class="mt-[60px] lg:mt-0 flex flex-wrap gap-2 w-full justify-center items-center">
            {page > 1 && (
              <button
                class="border-2 border-secondary px-[14px] text-[13px] font-bold leading-[35px] text-secondary hover:bg-secondary hover:text-base-100 transition-colors duration-200 rounded-tl-[4px] rounded-bl-[4px] uppercase"
                hx-get={changePage(page - 1)}
                hx-swap="outerHTML"
                hx-target={`closest section`}
              >
                Anterior
              </button>
            )}

            {paginationRange?.map((pageNumber) => {
              if (typeof pageNumber === "string") {
                return (
                  <span class="font-bold text-[13px] text-accent self-end">
                    &#8230;
                  </span>
                );
              }

              return (
                <button
                  class={clx(
                    "border-2 border-secondary px-[14px] text-[13px] font-bold leading-[35px]",
                    "hover:bg-secondary hover:text-base-100 transition-colors duration-200",
                    pageNumber === page
                      ? "bg-secondary text-base-100"
                      : "bg-base-100 text-secondary"
                  )}
                  hx-get={changePage(pageNumber)}
                  hx-swap="outerHTML"
                  hx-target={`closest section`}
                >
                  {pageNumber}
                </button>
              );
            })}

            {page < totalPages && (
              <button
                hx-get={changePage(page + 1)}
                hx-swap="outerHTML"
                hx-target={`closest section`}
                aria-label={cta.text}
                class="border-2 border-secondary px-[14px] text-[13px] font-bold leading-[35px] text-secondary hover:bg-secondary hover:text-base-100 transition-colors duration-200 rounded-tr-[4px] rounded-br-[4px] uppercase"
              >
                Próximo
              </button>
            )}
          </div>
        </div>

        <div class="w-full flex flex-col lg:w-1/2 gap-[70px]">
          <div class="flex flex-col bg-info p-5 pt-10">
            <h2 class="text-secondary mb-[5px] text-[20.8px]">Assuntos</h2>
            <div class="flex flex-wrap gap-2">
              {categories?.map((category) => (
                <div class="badge px-[25px] py-[3px] bg-[#AFC0C7] text-sm border-none h-auto leading-[1.8]">
                  {category.name}
                </div>
              ))}
            </div>
          </div>

          <div class="flex flex-col bg-info p-5">
            <h2 class="text-secondary mb-[5px] text-[20.8px]">Últimos posts</h2>

            <div class="flex flex-col">
              {lastPosts?.map((post) => (
                <div class="flex flex-col pb-[15px] mb-5 border-b border-[#AFC0C7] last:border-b-0">
                  <span class="flex items-center gap-[10px]">
                    <span class="font-icomoon"></span>{" "}
                    {new Date(post.date).toLocaleDateString("pt-BR", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <a
                    href={`/blog/${post.slug}`}
                    class="text-[18.2px] font-bold hover:text-secondary"
                  >
                    {post.title.slice(0, 56)}...
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const loader = async (props: Props, _req: Request, ctx: AppContext) => {
  const COLLECTION_PATH = "collections/blog/categories";
  const ACCESSOR = "category";

  const categories = await getRecordsByPath<Category>(
    ctx,
    COLLECTION_PATH,
    ACCESSOR
  );

  return {
    ...props,
    categories,
  };
};
