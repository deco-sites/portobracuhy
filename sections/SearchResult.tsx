import { AppContext } from "site/apps/site.ts";
import { SectionProps } from "deco/types.ts";
import { Imovel } from "site/sdk/types.ts";
import ShelfItem from "site/components/ui/ShelfItem.tsx";
import { usePagination } from "site/sdk/usePagination.ts";
import { clx } from "site/sdk/clx.ts";
import Icon from "site/components/ui/Icon.tsx";
import Filters from "site/islands/Filters.tsx";

export interface Props {
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
  itemsPerPage?: number;
}

export default function SearchResult({
  imoveis,
  total,
  page,
  totalPages,
  itemsPerPage,
  paginationInfo,
  filterFields,
}: SectionProps<typeof loader>) {
  const paginationRange = usePagination({
    currentPage: page,
    totalCount: total,
    pageSize: itemsPerPage,
  });

  return (
    <>
      <Filters
        bairros={filterFields.bairros}
        cidades={filterFields.cidades}
        categorias={filterFields.categorias}
      />

      <div id="searchResult" class="px-[15px] lg:w-[90%] mx-auto">
        <div class="flex flex-col mt-[30px] w-full">
          <div class="flex flex-wrap justify-between w-full mb-10 pb-[10px border-b border-accent">
            <h1 class="text-secondary text-[17px] font-normal lg:text-[26px] flex gap-[15px] items-center">
              <Icon id="MagnifyingGlass" size={17} class="block lg:hidden" />
              <Icon id="MagnifyingGlass" size={26} class="hidden lg:block" />
              {total} imóveis
            </h1>
          </div>

          <div class="flex flex-col gap-[55px] lg:flex-row lg:flex-wrap lg:gap-0 lg:-mx-[15px]">
            {imoveis.map((imovel) => (
              <div class="box-border w-full lg:w-1/3 lg:px-[15px] lg:mb-[60px]">
                <ShelfItem imovel={imovel} />
              </div>
            ))}
          </div>

          <div class="mt-[60px] lg:mt-0 flex flex-wrap gap-2 w-full justify-center items-center">
            {paginationInfo.previousPageUrl && page > 1 && (
              <a
                class="border-2 border-secondary px-[14px] text-[13px] font-bold leading-[35px] text-secondary hover:bg-secondary hover:text-base-100 transition-colors duration-200 rounded-tl-[4px] rounded-bl-[4px] uppercase"
                href={paginationInfo.previousPageUrl}
              >
                Anterior
              </a>
            )}

            {paginationRange?.map((pageNumber) => {
              if (typeof pageNumber === "string") {
                return (
                  <span class="font-bold text-[13px] text-accent self-end">
                    &#8230;
                  </span>
                );
              }

              return (
                <a
                  class={clx(
                    "border-2 border-secondary px-[14px] text-[13px] font-bold leading-[35px]",
                    "hover:bg-secondary hover:text-base-100 transition-colors duration-200",
                    pageNumber === page
                      ? "bg-secondary text-base-100"
                      : "bg-base-100 text-secondary"
                  )}
                  href={paginationInfo.url(pageNumber)}
                >
                  {pageNumber}
                </a>
              );
            })}

            {paginationInfo.nextPageUrl && page < totalPages && (
              <a
                class="border-2 border-secondary px-[14px] text-[13px] font-bold leading-[35px] text-secondary hover:bg-secondary hover:text-base-100 transition-colors duration-200 rounded-tr-[4px] rounded-br-[4px] uppercase"
                href={paginationInfo.nextPageUrl}
              >
                Próximo
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export const getFilterFields = async (ctx: AppContext) => {
  type FieldsResponse = {
    Bairro: string[];
    Cidade: string[];
    Categoria: string[];
  };

  const apiRoute =
    '/imoveis/listarConteudo?pesquisa={"fields":["Bairro","Cidade","Categoria"]}';

  const apiUrl = ctx.loft.baseUrl + apiRoute + "&key=" + ctx.loft.apiKey.get();

  const getContent = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    signal: new AbortController().signal,
  });

  const content = (await getContent.json()) as FieldsResponse;

  return {
    bairros: content.Bairro.sort(),
    cidades: content.Cidade.sort(),
    categorias: content.Categoria.sort(),
  };
};

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
  ]);

  const filters = JSON.stringify(
    props.filters ?? {
      ExibirNoSite: "Sim",
    }
  );
  const order = JSON.stringify(props.order ?? { Codigo: "desc" });
  const count = props.itemsPerPage ?? 9;

  const page = new URL(req.url).searchParams.get("page") ?? "1";

  const apiRoute = `/imoveis/listar?showtotal=1&pesquisa={"fields":${fields},"filter":${filters},"order":${order},"paginacao":{"pagina":${page},"quantidade":${count}}}`;

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

  const imoveis: Imovel[] = Object.values(response)
    .filter(
      (item): item is Imovel => typeof item === "object" && "Codigo" in item
    )
    .reverse(); // Reverso para mostrar os mais recentes (CHECK WHY IS THIS NEEDED)

  const nextPageUrl = new URL(req.url);
  nextPageUrl.searchParams.set("page", (parseInt(page) + 1).toString());

  const previousPageUrl = new URL(req.url);
  previousPageUrl.searchParams.set("page", (parseInt(page) - 1).toString());

  const lastPageUrl = new URL(req.url);
  lastPageUrl.searchParams.set("page", response.paginas.toString());

  const url = (pageNumber: number) => {
    const url = new URL(req.url);
    url.searchParams.set("page", pageNumber.toString());
    return url.toString();
  };

  const paginationInfo = {
    nextPageUrl: nextPageUrl.toString(),
    previousPageUrl: previousPageUrl.toString(),
    lastPageUrl: lastPageUrl.toString(),
    url,
  };

  const filterFields = await getFilterFields(ctx);

  return {
    ...props,
    imoveis,
    total: response.total,
    totalPages: response.paginas,
    page: response.pagina,
    itemsPerPage: response.quantidade,
    paginationInfo,
    filterFields,
  };
}
