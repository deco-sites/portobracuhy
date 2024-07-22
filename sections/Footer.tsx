import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { AvailableIcons } from "site/components/ui/Icon.tsx";
import Icon from "site/components/ui/Icon.tsx";

export interface Social {
  label: string;
  href: string;
  icon: AvailableIcons;
}

export interface LegalInformation {
  label: string;
  text: string;
}

export interface NavLink {
  label: string;
  href: string;
}

interface Props {
  image?: ImageWidget;
  socials?: Social[];
  menu?: NavLink[];
  legalInformations?: LegalInformation[];
  title?: string;
  subTitle?: string;
  locationText?: string;
  email?: string;
  telephone?: string;
  whatsapp?: string;
  copyrightText?: string;
}

function Footer({
  image = "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/11067/be8febbd-6a6a-4c13-83d1-25c96f67fa16",
  legalInformations = [
    {
      label: "Razão Social",
      text: "PORTO BRACUHY IMÓVEIS LTDA",
    },
    {
      label: "CRECI",
      text: "005485/0",
    },
    {
      label: "CNPJ",
      text: "07.850.368/0001-98",
    },
  ],
  socials = [
    {
      label: "Youtube",
      href: "https://www.youtube.com/channel/UCeMygH8ppTNiKSt6KPol7RQ",
      icon: "Youtube",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/portobracuhy/",
      icon: "Instagram",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/portobracuhyimoveis",
      icon: "Facebook",
    },
  ],
  menu = [
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
  title = "PORTO BRACUHY IMÓVEIS",
  subTitle = '<strong>CRECI:</strong> <span class="font-light">005485/0</span>',
  locationText = "Cais de Honra Lars Grael - Rodovia Rio Santos, Km 500,5, Antigo Km 115,<br/>Condomínio Porto Bracuhy, Angra dos Reis, RJ",
  email = "contato@portobracuhy.com.br",
  telephone = "(21) 99148-2404",
  whatsapp = " (21) 99878-6389",
  copyrightText = "Copyright © - Todos os direitos reservados.",
}: Props) {
  return (
    <>
      <div class="flex bg-base-200 py-[13px] mt-[60px]">
        <div class="flex w-full lg:w-[90%] lg:mx-auto lg:px-[30px]">
          <div class="hidden lg:flex justify-start w-5/6">
            <ul class="flex gap-[30px]">
              {menu.map((item) => (
                <li>
                  <a
                    href={item.href}
                    class="text-base-100 font-bold text-[18.2px] hover:text-secondary transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div class="flex justify-around w-full lg:w-1/6">
            {socials.map((social) => (
              <a href={social.href} class="text-base-100">
                <Icon id={social.icon} size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <footer class="bg-base-200 flex flex-col text-base-100 pt-[60px]">
        <div class="flex flex-col lg:flex-row lg:w-[90%] lg:mx-auto lg:px-[15px] lg:pb-3">
          <div class="flex flex-wrap gap-x-1 items-center px-[15px] lg:items-start lg:w-1/6 flex-shrink-0 lg:px-0 lg:inline-block">
            <a href="/" class="mb-[15px] lg:mb-0 lg:inline-block">
              <img src={image} alt="Logo" />
            </a>
            {legalInformations.map(({ label, text }) => (
              <label class="font-bold text-[10px] uppercase mb-[5px] lg:inline-block lg:leading-[1.8]">
                {label}: <span class="font-light lg:leading-[1.8]">{text}</span>
              </label>
            ))}
          </div>

          <div class="hidden lg:block w-1/12"></div>

          <div class="mt-[15px] flex flex-col px-[15px] w-full lg:mt-0 lg:px-20">
            <span class="font-black text-[15px] mb-5 lg:leading-[1.8]">
              {title}
            </span>
            <span
              class="text-[13px] mb-5 lg:leading-[1.5]"
              dangerouslySetInnerHTML={{ __html: subTitle }}
            />
            <address class="inline-block mb-5 lg:leading-[1.5]">
              <Icon
                id="LocationDot"
                width={9}
                height={13}
                class="inline-block mr-2"
              />
              <span
                dangerouslySetInnerHTML={{ __html: locationText }}
                class="inline text-[13px] not-italic font-light"
              />
            </address>
            <a
              href={`mailto:${email}`}
              class="text-[13px] font-light hover:text-secondary mb-5 flex gap-2 items-center lg:leading-[1.8]"
            >
              <Icon id="Envelope" size={13} />
              {email}
            </a>
            <div class="flex gap-5 items-center mb-5">
              <a
                href={`tel:${telephone}`}
                class="text-[13px] font-light hover:text-secondary flex gap-2 items-center lg:leading-[1.8]"
              >
                <Icon id="Phone" size={13} />
                {telephone}
              </a>
              <a
                href={`https://api.whatsapp.com/send?phone=${whatsapp}`}
                class="text-[13px] font-light hover:text-secondary flex gap-2 items-center lg:leading-[1.8]"
              >
                <Icon id="WhatsApp" size={13} />
                {whatsapp}
              </a>
            </div>
          </div>
        </div>
        {copyrightText && (
          <div class="w-full py-5 border-t border-base-100">
            <p class="text-[10px] font-light text-center w-full">
              {copyrightText}
            </p>
          </div>
        )}
      </footer>
    </>
  );
}

export default Footer;
