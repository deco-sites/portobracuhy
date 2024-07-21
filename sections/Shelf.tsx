import { AppContext } from "site/apps/site.ts";
import { SectionProps } from "deco/types.ts";
import { useId } from "site/sdk/useId.ts";
import { clx } from "site/sdk/clx.ts";
import Slider from "site/components/ui/Slider.tsx";
import Image from "apps/website/components/Image.tsx";
import Icon from "site/components/ui/Icon.tsx";

interface Imovel {
  Codigo: string;
  Categoria: string;
  Status: string;
  DestaqueWeb: string;
  Cidade: string;
  Bairro: string;
  UF: string;
  ExibirNoSite: string;
  Exclusivo: string;
  FotoDestaque: string;
  CodigoImobiliaria: string;
  ValorVenda: string;
  ValorLocacao: string;
  ValorDiaria: string;
}

export interface Props {
  title?: string;
  filters?: {
    DestaqueWeb?: "Sim" | "Nao";
    ExibirNoSite?: "Sim" | "Nao";
    Status?:
      | "Alugado Imobiliária"
      | "Alugado Terceiros"
      | "Aluguel"
      | "Aluguel e Aluguel Temporada"
      | "Aluguel temporada"
      | "Pendente"
      | "Suspenso"
      | "Trabalho Interno"
      | "Venda"
      | "Venda Aluguel e Aluguel Temporada"
      | "Venda e Aluguel"
      | "Venda e Aluguel Temporada"
      | "Vendido Imobiliária"
      | "Vendido Terceiros";

    Exclusivo?: "Sim" | "Nao";
  };
  order?: {
    Bairro?: "ASC" | "DESC";
    Cidade?: "ASC" | "DESC";
    Codigo?: "ASC" | "DESC";
    Status?: "ASC" | "DESC";
  };
  count?: number;
}

export default function Shelf({ title, imoveis }: SectionProps<typeof loader>) {
  const id = useId();

  const stringToCurrency = (value: string) => {
    return parseFloat(value)
      .toFixed(2)
      .replace(/\D/g, "")
      .replace(/(\d)(\d{2})$/, "$1,$2")
      .replace(/(?=(\d{3})+(\D))\B/g, ".");
  };

  const getPrice = (imovel: Imovel) => {
    if (imovel.ValorVenda.length > 0 && imovel.ValorVenda !== "0") {
      return stringToCurrency(imovel.ValorVenda);
    } else if (imovel.ValorLocacao.length > 0 && imovel.ValorLocacao !== "0") {
      return stringToCurrency(imovel.ValorLocacao);
    }

    return stringToCurrency(imovel.ValorDiaria);
  };

  return (
    <div class="flex flex-col w-[90%] mx-auto bg-[#F2F2F2] lg:bg-base-100 pt-[15px] pb-[5px] my-[25px]">
      <h2 class="text-secondary font-medium text-[26px] lg:text-[39px] mb-[30px] lg:mb-[60px] text-center">
        {title}
      </h2>
      <div id={id} class="relative">
        <Slider class="carousel carousel-center sm:carousel-end gap-5 sm:gap-10 w-full px-[10px] pb-[5px] lg:px-0 lg:gap-0 lg:-mx-[15px]">
          {imoveis?.map((imovel, index) => (
            <Slider.Item
              index={index}
              class={clx("carousel-item", "w-full box-border lg:w-1/3 lg:px-[15px]")}
            >
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
                  <h3 class="text-[16.705px] font-normal mb-2">
                    {imovel.Categoria}
                  </h3>
                  <span class="text-[13px] font-normal flex items-center gap-2">
                    <Icon class="text-[#ff4646]" id="LocationDot" size={22} />{" "}
                    {imovel.Bairro} - {imovel.Cidade}/{imovel.UF}
                  </span>
                  <span class="text-[19.5px] font-medium flex items-center gap-2 h-[39px] flex-wrap">
                    <Icon class="text-[#87CE74]" id="DollarSign" size={22} />
                    R$ {getPrice(imovel)}
                    <span class="font-normal text-info-content text-[16.9px]">
                      {" - "} {imovel.Status}
                    </span>
                  </span>
                </div>
              </div>
            </Slider.Item>
          ))}
        </Slider>

        <div class="w-full flex justify-between absolute z-10 right-0 top-[40%]">
          <Slider.PrevButton
            class={clx(
              "hidden sm:flex justify-center items-center",
              "absolute -left-[45px]",
              "border-2 border-black",
              "w-[41.5px] h-[45.59px] rounded-[30px]",
              "hover:bg-black hover:text-white transition-colors cursor-pointer"
            )}
          >
            <Icon id="ChevronLeft" width={7.5} height={13} />
          </Slider.PrevButton>

          <Slider.NextButton
            class={clx(
              "hidden sm:flex justify-center items-center",
              "absolute -right-[15px]",
              "border-2 border-black",
              "w-[41.5px] h-[45.59px] rounded-[30px]",
              "hover:bg-black hover:text-white transition-colors cursor-pointer"
            )}
          >
            <Icon id="ChevronLeft" class="rotate-180" width={7.5} height={13} />
          </Slider.NextButton>
        </div>
      </div>
      <Slider.JS rootId={id} />
    </div>
  );
}

export async function loader(props: Props, req: Request, ctx: AppContext) {
  interface ImoveisResponse {
    [key: string]: Imovel | number;
    total: number;
    paginas: number;
    pagina: number;
    quantidade: number;
  }

  const fields = JSON.stringify([
    "Codigo",
    "Categoria",
    "Status",
    "DestaqueWeb",
    "Cidade",
    "Bairro",
    "UF",
    "ExibirNoSite",
    "Exclusivo",
    "FotoDestaque",
    "ValorVenda",
    "ValorLocacao",
    "ValorDiaria",
  ]);

  const filters = JSON.stringify(
    props.filters ?? {
      ExibirNoSite: "Sim",
    }
  );
  const order = JSON.stringify(props.order ?? {});
  const count = props.count ?? 9;

  const apiRoute = `/imoveis/listar?showtotal=1&pesquisa={"fields":${fields},"filter":${filters},"order":${order},"paginacao":{"pagina":1,"quantidade":${count}}}`;

  const apiUrl = ctx.loft.baseUrl + apiRoute + "&key=" + ctx.loft.apiKey.get();

  const getContent = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    signal: req.signal,
  });

  const content = await getContent.json();

  if (getContent.status !== 200) {
    throw new Error(content.message ?? "[Shelf] Error requesting shelf data");
  }

  const response = content as ImoveisResponse;

  const imoveis: Imovel[] = Object.values(response).filter(
    (item): item is Imovel => typeof item === "object" && "Codigo" in item
  );

  return {
    ...props,
    imoveis,
  };
}
