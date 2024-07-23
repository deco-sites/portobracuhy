import Image from "apps/website/components/Image.tsx";
import { clx } from "site/sdk/clx.ts";
import Icon, { AvailableIcons } from "site/components/ui/Icon.tsx";
import { Imovel } from "site/sdk/types.ts";

interface Props {
  imovel: Imovel;
}

export default function ShelfItem({ imovel }: Props) {
  const stringToCurrency = (value: string) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(parseFloat(value));
  };

  const getPrice = (imovel: Imovel) => {
    if (imovel.ValorVenda.length > 0 && imovel.ValorVenda !== "0") {
      return stringToCurrency(imovel.ValorVenda);
    } else if (imovel.ValorLocacao.length > 0 && imovel.ValorLocacao !== "0") {
      return stringToCurrency(imovel.ValorLocacao);
    } else if (imovel.ValorDiaria.length > 0 && imovel.ValorDiaria !== "0") {
      return stringToCurrency(imovel.ValorDiaria);
    }

    return "Consulte-nos";
  };

  const getCaracteristicas = (imovel: Imovel) => {
    const caracteristicasFields = [
      "AreaTotal",
      "AreaPrivativa",
      "Dormitorios",
      "BanheiroSocialQtd",
      "Vagas",
      "Suites",
    ];

    // icomoon / fontawesome
    const caracteristicasIcons = {
      AreaTotal: "e902",
      AreaPrivativa: "e901",
      Dormitorios: "e908",
      BanheiroSocialQtd: "e903",
      Vagas: "e911",
      Suites: "Suites",
    };

    const caracteristicas = [];

    for (const field of caracteristicasFields) {
      if (Object.hasOwn(imovel, field)) {
        const value = imovel[field as keyof Imovel];
        const icon =
          caracteristicasIcons[field as keyof typeof caracteristicasIcons];

        if (value.length > 0 && value !== "0") {
          caracteristicas.push({ label: field, value: value, icon });
        }
      }
    }

    return caracteristicas;
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
      <div class="w-full flex flex-col bg-info shadow-[2px_4px_7px_#00000024]">
        <div class="relative h-[350px]">
          <Image
            class="w-full h-full object-cover"
            src={imovel.FotoDestaque}
            width={551}
            height={350}
          />
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
        </div>
        <div class="flex flex-col p-[15px] min-h-[300px] text-base-200">
          <h3 class="text-[16.705px] font-normal mb-2">{imovel.Categoria}</h3>
          <span class="text-[13px] font-normal flex items-center gap-2">
            <Icon class="text-[#ff4646]" id="LocationDot" size={22} />{" "}
            {imovel.Bairro} - {imovel.Cidade}/{imovel.UF}
          </span>
          <span class="text-[19.5px] font-medium flex items-center gap-2 h-[39px] flex-wrap">
            <Icon class="text-[#87CE74]" id="DollarSign" size={22} />
            {getPrice(imovel)}
            <span class="font-normal text-info-content text-[16.9px]">
              {" - "} {imovel.Status}
            </span>
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
                <span class="text-[11.375px] font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
