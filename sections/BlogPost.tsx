import { type BlogPost, BlogPostPage } from "apps/blog/types.ts";
import { AppContext } from "site/apps/site.ts";
import { SectionProps } from "deco/types.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "site/components/ui/Icon.tsx";

interface Props {
  /**
   * @description The description of name.
   */
  page?: BlogPostPage | null;
  /** @description Email de contato usado no botão de compartilhamento do imóvel */
  shareEmail?: string;
}

const PARAGRAPH_STYLES = "[&_p]:leading-[150%] [&_*]:mb-4";
const HEADING_STYLES =
  "[&>h1]:text-4xl [&>h1]:my-6 [&>h1]:font-bold [&>h2]:text-3xl [&>h2]:my-6 [&>h2]:font-bold [&>h3]:text-2xl [&>h3]:my-6 [&>h3]:font-bold [&>h4]:text-xl [&>h4]:my-6 [&>h4]:font-bold [&>h5]:text-lg [&>h5]:my-6 [&>h5]:font-bold [&>h6]:text-base [&>h6]:my-6 [&>h6]:font-bold";
const CODE_BLOCK_STYLES =
  "[&>pre]:bg-gray-100 [&>pre]:text-gray-800 [&>pre]:p-4 [&>pre]:font-mono [&>pre]:text-sm [&>pre]:border [&>pre]:rounded-md [&>pre]:overflow-x-auto [&>code]:block [&>code]:w-full";
const IMAGE_STYLES = "[&_img]:w-full [&_img]:my-12";
const BLOCKQUOTE_STYLES =
  "[&>blockquote]:my-6 [&>blockquote]:border-l-2 [&>blockquote]:border-black [&>blockquote]:text-xl [&>blockquote]:italic [&>blockquote]:pl-6";

const CONTENT_STYLES = `mx-auto ${PARAGRAPH_STYLES} ${HEADING_STYLES} ${CODE_BLOCK_STYLES} ${IMAGE_STYLES} ${BLOCKQUOTE_STYLES}`;

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

export default function BlogPost({
  page,
  url,
  shareEmail,
}: SectionProps<typeof loader>) {
  const { title, image, date, content, categories } =
    page?.post || DEFAULT_PROPS;

  const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `#content a { color: #a92d13; }`,
        }}
      />
      <Image
        className="w-full object-cover aspect-video max-h-[500px]"
        width={600}
        src={image || ""}
      />
      <div className="w-full flex flex-col gap-20 container mx-auto px-4 md:px-0 py-12 lg:py-28">
        <div className="w-full flex flex-col gap-5 lg:mx-auto text-center">
          <time>Publicado em {formattedDate}</time>
          <h1 className="text-[26px] lg:text-[41.6px] font-bold text-secondary mb-[35px]">
            {title}
          </h1>
          <div class="border-t-2 border-[#afc0c7] py-[50px] flex flex-wrap justify-center items-center w-full max-w-[400px] mx-auto">
            {categories?.map((category) => (
              <div class="badge px-[25px] py-[3px] bg-[#DDD] text-sm border-none h-auto leading-[1.8] ">
                {category.name}
              </div>
            ))}
          </div>
        </div>

        <div
          id="content"
          class={CONTENT_STYLES}
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        ></div>
      </div>

      <div class="flex flex-col w-full h-[50vh] justify-center items-center flex-wrap bg-info my-[85px]">
        <h3 class="text-[39px] font-normal text-secondary mb-[30px]">
          Gostou do artigo?
        </h3>
        {/* The button to open modal */}
        <label
          htmlFor="share_modal"
          className="bg-transparent outline-none border-none cursor-pointer"
        >
          <span class="bg-secondary text-white leading-[1.8] py-[10px] px-5 text-[20.8px]">
            Compartilhe
          </span>
        </label>

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="share_modal" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box w-[70%] lg:w-1/2 max-w-none pb-[30px] lg:pb-[150px] rounded-[6px] shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
            <h3 className="text-[19.5px] lg:text-[39px] font-normal text-center mb-[30px]">
              Compartilhe
            </h3>
            <div class="flex justify-around w-full items-center">
              <a
                href={`http://www.facebook.com/sharer/sharer.php?u=${url}&t=`}
                class="bg-[#0a246a] text-white rounded-full h-[35px] lg:h-max py-[6px] px-[15px] lg:py-[22px] lg:px-[33px] flex items-center justify-center"
                target="_blank"
              >
                <Icon
                  id="FacebookLetter"
                  width={8}
                  height={13}
                  class="block lg:hidden"
                />
                <Icon
                  id="FacebookLetter"
                  width={32}
                  height={53}
                  class="hidden lg:block"
                />
              </a>

              <a
                href={`http://api.whatsapp.com/send?text= - ${url}`}
                class="bg-[#159d0d] text-white rounded-full py-[6px] px-[15px] lg:py-[22px] lg:px-[26px] h-[35px] lg:h-max flex items-center justify-center"
                target="_blank"
              >
                <Icon
                  id="WhatsApp"
                  width={13}
                  height={13}
                  class="block lg:hidden"
                />
                <Icon
                  id="WhatsApp"
                  width={45}
                  height={53}
                  class="hidden lg:block"
                />
              </a>

              <a
                href={`mailto:${shareEmail}?subject=PORTO BRACUHY IMÓVEIS&body=Você visualizou um imóvel em nossa página. segue o endereço. ${url}`}
                class="bg-secondary text-white rounded-full py-[6px] px-[15px] lg:py-[17px] lg:px-[17px] h-[35px] lg:h-max flex items-center justify-center"
                target="_blank"
              >
                <Icon
                  id="Envelope"
                  width={13}
                  height={13}
                  class="block lg:hidden"
                />
                <Icon
                  id="Envelope"
                  width={52}
                  height={53}
                  class="hidden lg:block"
                />
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
                class="bg-[#0c66c2] text-white rounded-full py-[6px] px-[15px] lg:py-[22px] lg:px-[26px] h-[35px] lg:h-max flex items-center justify-center"
                target="_blank"
              >
                <Icon
                  id="LinkedinLetter"
                  width={13}
                  height={13}
                  class="block lg:hidden"
                />
                <Icon
                  id="LinkedinLetter"
                  width={45}
                  height={53}
                  class="hidden lg:block"
                />
              </a>
            </div>
          </div>
          <label className="modal-backdrop" htmlFor="share_modal">
            Close
          </label>
        </div>
      </div>
    </>
  );
}

export async function loader(props: Props, req: Request, ctx: AppContext) {
  const imovel = props.page?.post || DEFAULT_PROPS;

  if (ctx.seo) {
    ctx.seo.title = imovel.title;
  }

  return {
    ...props,
    url: req.url,
  };
}
