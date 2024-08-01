import Image from "apps/website/components/Image.tsx";
import { clx } from "site/sdk/clx.ts";
import Icon, { AvailableIcons } from "site/components/ui/Icon.tsx";
import { Imovel } from "site/sdk/types.ts";
import { getPrice } from "site/sdk/getPrice.ts";
import { getCaracteristicas } from "site/sdk/getCaracteristicas.ts";

interface Props {
  imovel: Imovel;
  variant?: "default" | "listItem";
}

function slugify(str: string) {
  return String(str)
    .normalize("NFKD") // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
}

export default function ShelfItem({ imovel, variant = "default" }: Props) {
  const getImovelSlug = () => {
    const { Dormitorios, Codigo, Categoria, Bairro, Cidade, Status } = imovel;
    const quartos = Number(Dormitorios);

    const baseSlug = `/imovel/${Codigo}/${slugify(Categoria)}`;
    const locationSlug = `${slugify(Bairro)}-${slugify(Cidade)}`;
    const statusSlug = `/${slugify(Status)}`;

    if (quartos > 0) {
      const quartosSlug = `${quartos}-${quartos > 1 ? "quartos" : "quarto"}`;
      return `${baseSlug}-${quartosSlug}-${locationSlug}${statusSlug}`;
    }

    return `${baseSlug}-${locationSlug}${statusSlug}`;
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .icomoon-AreaTotal::before {
            content: "\\e902";
          }

          .icomoon-AreaPrivativa::before {
            content: "\\e901";
          }

          .icomoon-Dormitorios::before {
            content: "\\e908";
          }

          .icomoon-BanheiroSocialQtd::before {
            content: "\\e903";
          }

          .icomoon-Vagas::before {
            content: "\\e911";
          }
        `,
        }}
      />
      <a
        href={getImovelSlug()}
        class={`w-full flex ${
          variant === "listItem" ? "flex-col lg:flex-row" : "flex-col"
        } bg-info shadow-[2px_4px_7px_#00000024]`}
      >
        <div
          class={`relative ${
            variant === "listItem"
              ? "h-[350px] lg:w-[41.66666667%] lg:h-[360px] lg:shrink-0"
              : "h-[350px]"
          }`}
        >
          <Image
            class="w-full h-full object-cover"
            src={imovel.FotoDestaque}
            width={551}
            height={360}
          />
          {variant === "default" && (
            <div
              class={clx(
                "absolute top-[10px] left-[10px]",
                "py-1 px-[10px]",
                "text-[14.3px] text-white font-light",
                "bg-[rgba(51,51,51,0.8)]"
              )}
            >
              Cód: {imovel.Codigo}
            </div>
          )}
        </div>
        <div
          class={`flex flex-col w-full p-[15px] text-base-200 ${
            variant === "listItem" ? "justify-center" : ""
          }`}
        >
          <div
            class={`flex flex-col ${
              variant === "listItem"
                ? "h-auto pt-[15px] px-[25px] min-h-[273px]"
                : "min-h-[300px]"
            }`}
          >
            <h3
              class={`text-[16.705px] font-normal mb-2 flex gap-[10px] ${
                variant === "listItem" ? "leading-[1.4]" : ""
              }`}
            >
              {imovel.Categoria}{" "}
              {variant === "listItem" && (
                <div
                  class={clx(
                    "border border-black",
                    "py-[2px] px-[5px]",
                    "text-[11.44px] font-light leading-[1.4]"
                  )}
                >
                  Cód: {imovel.Codigo}
                </div>
              )}
            </h3>
            <span class="text-[13px] font-normal flex items-center gap-2">
              <Icon class="text-[#ff4646]" id="LocationDot" size={22} />{" "}
              {imovel.Bairro} - {imovel.Cidade}/{imovel.UF}
            </span>
            <span class="text-[19.5px] font-medium flex items-center gap-2 h-[39px] flex-wrap">
              <Icon class="text-[#87CE74]" id="DollarSign" size={22} />
              {getPrice(imovel)}
              {variant === "default" && (
                <span class="font-normal text-info-content text-[16.9px]">
                  {" - "} {imovel.Status}
                </span>
              )}
            </span>
            <div class="flex justify-around w-full h-12 mt-auto border border-black">
              {getCaracteristicas(imovel).map(({ label, value, icon }) => (
                <div class="flex flex-col items-center justify-center">
                  {icon.charAt(0) !== "e" ? (
                    <Icon id={label as AvailableIcons} size={16} />
                  ) : (
                    <i
                      class={`font-icomoon icomoon-${label} not-italic font-black`}
                    ></i>
                  )}
                  <span class="text-[11.375px] font-medium">
                    {label === "AreaTotal" || label === "AreaPrivativa"
                      ? `${Number(value).toFixed(2).replaceAll(".", ",")} m²`
                      : value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </a>
    </>
  );
}
