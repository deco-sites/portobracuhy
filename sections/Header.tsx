import { useScript } from "deco/hooks/useScript.ts";
import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "site/components/ui/Icon.tsx";
import { clx } from "site/sdk/clx.ts";
export interface NavLink {
  label: string;
  href: string;
}
export interface Props {
  logo?: ImageWidget;
  navLinks?: NavLink[];
}

const script = () => {
  // Make the header sticky on scroll
  const header = document.getElementById("header");
  if (header) {
    globalThis.onscroll = function () {
      if (globalThis.scrollY > 0) {
        const headerHeight = header.offsetHeight;

        header.classList.add("fixed");
        header.style.boxShadow = "0 0 36px rgba(0, 0, 0, 0.5)";
        document.body.style.paddingTop = `${headerHeight}px`;
      } else {
        header.classList.remove("fixed");
        document.body.style.paddingTop = "0";
        header.style.boxShadow = "none";
      }
    };
  }
};

export default function Header({
  logo = "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/11067/be8febbd-6a6a-4c13-83d1-25c96f67fa16",
  navLinks = [
    {
      label: "Início",
      href: "/",
    },
    {
      label: "Sobre",
      href: "/sobre",
    },
    {
      label: "Busca de imóveis",
      href: "/busca",
    },
    {
      label: "Contato",
      href: "/contato",
    },
    {
      label: "Favoritos",
      href: "/favoritos",
    },
    {
      label: "Blog",
      href: "/blog",
    },
  ],
}: Props) {
  return (
    <>
      <header
        id="header"
        class="flex w-full z-50 bg-white top-0 left-0 justify-between items-center mx-auto px-[15px] lg:px-[calc(5%_+_15px)] lg:justify-start"
      >
        <a class="lg:my-[10px]" href="/">
          <Image alt="Logo" src={logo} width={120} />
        </a>
        <div class="block lg:w-full">
          {/* Desktop menu */}
          <nav class="hidden lg:flex lg:justify-center lg:w-full">
            <ul class="flex gap-4">
              {navLinks.map((link) => (
                <li
                  class={clx(
                    `text-accent text-[16.705px] font-medium`,
                    "hover:text-secondary group transition-colors"
                  )}
                >
                  <a
                    href={link.href}
                    class="group-hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile menu */}
          <input
            type="checkbox"
            id="mobile_menu_modal"
            className="modal-toggle peer"
          />
          <div
            className="mob-menu-modal fixed -top-full peer-checked:flex flex-col peer-checked:top-0 transition-all duration-500 w-full h-[calc(100vh_-_80px)] left-0 bg-accent z-50"
            role="dialog"
          >
            <label
              htmlFor="mobile_menu_modal"
              class="text-white m-5 flex flex-row-reverse cursor-pointer"
            >
              <Icon id="Close" width={26} height={39} />
            </label>
            <nav class="px-5">
              <ul class="flex flex-col">
                {navLinks.map((link, index) => (
                  <li
                    class={clx(
                      `py-4 px-6 text-center`,
                      index > 0 && "border-t border-white",
                      "hover:bg-white group transition-colors"
                    )}
                  >
                    <a
                      href={link.href}
                      class="text-white text-[15.6px] font-medium group-hover:text-neutral transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          {/* The button to open modal */}
          <label
            htmlFor="mobile_menu_modal"
            className="btn-modal flex lg:hidden flex-col bg-accent w-[50px] h-[50px] gap-2 justify-center items-center"
          >
            <div class="bg-white h-[3px] w-[30px] rounded-[1px] mx-auto shrink-0"></div>
            <div class="bg-white h-[3px] w-[30px] rounded-[1px] mx-auto shrink-0"></div>
            <div class="bg-white h-[3px] w-[30px] rounded-[1px] mx-auto shrink-0"></div>
          </label>
        </div>
      </header>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(script) }}
      />
    </>
  );
}
