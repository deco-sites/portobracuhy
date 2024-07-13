import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Icon from "../components/ui/Icon.tsx";
import Slider from "../components/ui/Slider.tsx";
import { clx } from "../sdk/clx.ts";
import { useId } from "../sdk/useId.ts";

/**
 * @titleBy alt
 */
export interface Banner {
  /** @description desktop otimized image */
  desktop: ImageWidget;

  /** @description mobile otimized image */
  mobile: ImageWidget;

  /** @description Image's alt text */
  alt: string;

  action?: {
    /** @description when user clicks on the image, go to this link */
    href: string;
    /** @description Button label */
    label: string;
  };
}

export interface Props {
  images?: Banner[];

  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;

  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function BannerItem({ image, lcp }: { image: Banner; lcp?: boolean }) {
  const { alt, mobile, desktop, action } = image;

  return (
    <div class="relative block overflow-y-hidden w-full">
      {action && (
        <div
          class={clx(
            "absolute h-full pb-16 w-full top-0 left-0",
            "flex flex-col justify-end items-center"
          )}
        >
          <a
            href={action?.href ?? "#"}
            aria-label={action?.label}
            class="py-3 px-5 cursor-pointer leading-[1] transition-colors bg-base-200 text-white text-[13px] font-bold hover:text-secondary"
          >
            {action.label}
          </a>
        </div>
      )}
      <Picture preload={lcp}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile}
          width={412}
          height={660}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop}
          width={1440}
          height={600}
        />
        <img
          class="object-cover w-full h-full"
          loading={lcp ? "eager" : "lazy"}
          src={desktop}
          alt={alt}
        />
      </Picture>
    </div>
  );
}

function Hero({
  images = [
    {
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/11067/5cee69f4-9b5e-4ac1-88af-c2a64c1dc876",
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/11067/5cee69f4-9b5e-4ac1-88af-c2a64c1dc876",
      alt: "",
      action: {
        href: "/imovel/1869/casa-praia-10-quartos-estrada-do-contorno-angra-dos-reis/venda-e-aluguel-temporada/VENDA%20E%20ALUGUEL%20TEMPORADA",
        label: "Ver Detalhes",
      },
    },
    {
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/11067/8daf94b1-bead-4848-b438-d45fef393a20",
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/11067/8daf94b1-bead-4848-b438-d45fef393a20",
      alt: "",
      action: {
        href: "/imovel/1869/casa-praia-10-quartos-estrada-do-contorno-angra-dos-reis/venda-e-aluguel-temporada/VENDA%20E%20ALUGUEL%20TEMPORADA",
        label: "Ver Detalhes",
      },
    },
  ],
  preload,
  interval = 4,
}: Props) {
  const id = useId();

  return (
    <div id={id} class={clx("flex relative", "group w-full")}>
      <Slider class="carousel carousel-center w-full gap-6 h-[380px] md:h-[430px] lg:h-[550px]">
        {images.map((image, index) => (
          <Slider.Item index={index} class="carousel-item w-full">
            <BannerItem image={image} lcp={index === 0 && preload} />
          </Slider.Item>
        ))}
      </Slider>

      <div class="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out flex justify-between top-1/2 -translate-y-1/2 left-0 w-full px-5 text-white">
        <Slider.PrevButton
          class="bg-[rgba(143,125,87,0.52)] rounded-[50%] w-[38px] h-[50px] flex justify-center items-center"
          disabled={false}
        >
          <Icon id="ChevronLeft" width={18} height={30} />
        </Slider.PrevButton>

        <Slider.NextButton
          class="bg-[rgba(143,125,87,0.52)] rounded-[50%] w-[38px] h-[50px] flex justify-center items-center"
          disabled={false}
        >
          <Icon id="ChevronLeft" width={18} height={30} class="rotate-180" />
        </Slider.NextButton>
      </div>

      <ul
        class={clx(
          "absolute bottom-[23px] left-1/2 -translate-x-1/2 z-10 h-6",
          "flex justify-center items-center gap-[30px]"
        )}
      >
        {images.map((_, index) => (
          <Slider.Dot
            index={index}
            class={clx(
              "bg-secondary h-3 w-3 no-animation rounded-full",
              "disabled:h-[14px] disabled:w-[14px]"
            )}
          ></Slider.Dot>
        ))}
      </ul>

      <Slider.JS rootId={id} interval={interval && interval * 1e3} infinite />
    </div>
  );
}

export default Hero;
