import { AppContext } from "site/apps/site.ts";
import { SectionProps } from "deco/types.ts";
import { useId } from "site/sdk/useId.ts";
import { clx } from "site/sdk/clx.ts";
import { Imovel } from "site/sdk/types.ts";
import Slider from "site/components/ui/Slider.tsx";
import Icon from "site/components/ui/Icon.tsx";
import ShelfItem from "site/components/ui/ShelfItem.tsx";
export interface Props {
  title?: string;
  /**
   * @description Exibe todas as imagens do imóvel em um slider. Falso exibe somente a imagem principal. (Não recomendado ativar - pode aumentar significantemente o tempo de carregamento)
   * @default false
   */
  showAllImagesSlider?: boolean;
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

export default function Shelf({
  title,
  imoveis,
  showAllImagesSlider = false,
}: SectionProps<typeof loader>) {
  const id = useId();

  if (!imoveis || imoveis.length === 0) {
    return (
      <div class="flex flex-col w-[90%] mx-auto bg-[#F2F2F2] lg:bg-base-100 pt-[15px] pb-[5px] my-[25px]">
        <h2 class="text-secondary font-medium text-[26px] lg:text-[39px] mb-[30px] lg:mb-[60px] text-center">
          {title}
        </h2>
        <div class="w-full flex justify-center items-center h-[300px] lg:h-[500px] bg-base-100">
          <span>Nenhum imóvel encontrado</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div class="flex flex-col w-[90%] mx-auto bg-[#F2F2F2] lg:bg-base-100 pt-[15px] pb-[5px] my-[25px]">
        <h2 class="text-secondary font-medium text-[26px] lg:text-[39px] mb-[30px] lg:mb-[60px] text-center">
          {title}
        </h2>
        <div id={id} class="relative">
          <Slider class="carousel carousel-center sm:carousel-end gap-5 sm:gap-10 w-full px-[10px] pb-[5px] lg:px-0 lg:gap-0 lg:-mx-[15px]">
            {imoveis?.map((imovel, index) => (
              <Slider.Item
                index={index}
                class={clx(
                  "carousel-item",
                  "w-full box-border lg:w-1/3 lg:px-[15px]"
                )}
              >
                <ShelfItem
                  showAllImagesSlider={showAllImagesSlider}
                  imovel={imovel}
                />
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
              <Icon
                id="ChevronLeft"
                class="rotate-180"
                width={7.5}
                height={13}
              />
            </Slider.NextButton>
          </div>
        </div>
        <Slider.JS rootId={id} />
      </div>
    </>
  );
}

async function getImoveisWithAllImages(
  imoveis: Imovel[],
  ctx: AppContext
): Promise<Imovel[]> {
  const fields = [{ Foto: ["Foto", "FotoPequena", "Destaque"] }];

  const urlBase = `${
    ctx.loft.baseUrl
  }/imoveis/detalhes?key=${ctx.loft.apiKey.get()}&pesquisa={"fields":${JSON.stringify(
    fields
  )}}`;

  try {
    const imoveisComImagens = await Promise.all(
      imoveis.map(async (imovel) => {
        const response = await fetch(`${urlBase}&imovel=${imovel.Codigo}`, {
          headers: {
            Accept: "application/json",
          },
          signal: new AbortController().signal,
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch details for imovel ${imovel.Codigo} - ${response.status} - ${response.statusText}`
          );
        }

        const data = await response.json();

        if (data.Foto) {
          imovel.Foto = data.Foto;
        }

        return imovel;
      })
    );

    return imoveisComImagens;
  } catch (error) {
    console.error(error);
    return imoveis;
  }
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
    "AreaTotal",
    "AreaPrivativa",
    "Dormitorios",
    "BanheiroSocialQtd",
    "Vagas",
    "Suites",
    // { Foto: ["Foto", "FotoPequena", "Destaque"] },
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
    signal: new AbortController().signal,
  });

  const content = await getContent.json();

  if (getContent.status !== 200) {
    throw new Error(content.message ?? "[Shelf] Error requesting shelf data");
  }

  const response = content as ImoveisResponse;

  const imoveis: Imovel[] = Object.values(response).filter(
    (item): item is Imovel => typeof item === "object" && "Codigo" in item
  );

  if (props.showAllImagesSlider) {
    const imoveisWithFoto = await getImoveisWithAllImages(imoveis, ctx);

    return {
      ...props,
      imoveis: imoveisWithFoto,
    };
  }

  return {
    ...props,
    imoveis,
  };
}
