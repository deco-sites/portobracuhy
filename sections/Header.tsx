import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "site/components/ui/Icon.tsx";

export interface NavLink {
  label: string;
  href: string;
}

export interface Props {
  logo?: ImageWidget;
  navLinks?: NavLink[];
}

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
    <header class="flex justify-between items-center container px-[15px]">
      <a href="/">
        <Image alt="Logo" src={logo} width={120} />
      </a>
      <div class="block">
        <input
          type="checkbox"
          id="mobile_menu_modal"
          className="modal-toggle peer"
        />
        <div
          className="mob-menu-modal fixed -top-full peer-checked:flex flex-col peer-checked:top-0 transition-all duration-500 w-full h-[calc(100vh_-_80px)] left-0 bg-accent"
          role="dialog"
        >
          <label
            htmlFor="mobile_menu_modal"
            class="text-white m-5 flex flex-row-reverse"
          >
            <Icon id="Close" width={26} height={39} />
          </label>
          <nav class="px-5">
            <ul class="flex flex-col">
              {navLinks.map((link, index) => (
                <li
                  class={`py-4 px-6 text-center ${
                    index > 0 ? "border-t border-white" : ""
                  } `}
                >
                  <a
                    href={link.href}
                    class="text-white text-[15.6px] font-medium"
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
          className="btn-modal flex flex-col bg-accent w-[50px] h-[50px] gap-2 justify-center items-center"
        >
          <div class="bg-white h-[3px] w-[30px] rounded-[1px] mx-auto shrink-0"></div>
          <div class="bg-white h-[3px] w-[30px] rounded-[1px] mx-auto shrink-0"></div>
          <div class="bg-white h-[3px] w-[30px] rounded-[1px] mx-auto shrink-0"></div>
        </label>
      </div>
    </header>
  );
}
