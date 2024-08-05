import { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface CTA {
  label: string;
  href: string;
}

export interface Props {
  /** @format color-input */
  backgroundColor?: string;
  /** @title Imagem */
  image?: ImageWidget;
  /** @title Conteúdo */
  content?: HTMLWidget;
  /** @title Botão CTA */
  cta?: CTA;
}

export default function BannerCTA({
  backgroundColor = "#1F2832",
  image = "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/11067/4ea1990e-e592-4636-8edf-ae6128d06c7d",
  content = "Assista vídeos produzidos semanalmente com qualidade cinematográfica, feitos para que você conheça de forma imersiva todos os detalhes dos imóveis mais incríveis de Angra dos Reis",
  cta = {
    label: "Quero assistir mais vídeos",
    href: "https://www.youtube.com/channel/UCeMygH8ppTNiKSt6KPol7RQ",
  },
}: Props) {
  return (
    <div
      style={{ backgroundColor: backgroundColor }}
      class="w-full flex flex-col lg:flex-row p-10"
    >
      <div class="flex flex-col lg:flex-row max-w-[1160px] mx-auto items-center justify-center lg:gap-5 lg:p-5">
        <Image class="mb-[30px] lg:w-1/2" src={image} width={768} height={665} />
        <div class="flex flex-col text-base-100 lg:w-1/2">
          <div
            class="mb-[30px] text-[14px]"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          {cta && (
            <a
              class="w-max mx-auto rounded-[30px] border-2 border-[#ff0000] py-[10px] px-[30px]"
              href={cta.href}
            >
              {cta.label}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
