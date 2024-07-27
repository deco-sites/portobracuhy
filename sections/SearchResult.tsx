import { AppContext } from "site/apps/site.ts";
import { SectionProps } from "deco/types.ts";
import { Imovel } from "site/sdk/types.ts";
import ShelfItem from "site/components/ui/ShelfItem.tsx";
import { usePagination } from "site/sdk/usePagination.ts";
import { clx } from "site/sdk/clx.ts";
import Icon from "site/components/ui/Icon.tsx";
import Filters from "site/islands/Filters.tsx";

export interface Props {
  // order?: {
  //   Bairro?: "ASC" | "DESC";
  //   Cidade?: "ASC" | "DESC";
  //   Codigo?: "ASC" | "DESC";
  //   Status?: "ASC" | "DESC";
  // };
  itemsPerPage?: number;
}

export default function SearchResult({
  imoveis,
  total,
  page,
  totalPages,
  itemsPerPage = 9,
  paginationInfo,
  filterFields,
  initialFilters,
}: SectionProps<typeof loader>) {
  const notFound = imoveis.length === 0;

  const paginationRange = usePagination({
    currentPage: page,
    totalCount: total,
    pageSize: itemsPerPage,
  });

  return (
    <>
      <Filters
        initialFilters={initialFilters}
        bairros={filterFields.bairros}
        cidades={filterFields.cidades}
        categorias={filterFields.categorias}
        caracteristicas={filterFields.caracteristicas}
        infraestruturas={filterFields.infraestruturas}
        empreendimentos={filterFields.empreendimentos}
      />

      <div id="searchResult" class="px-[15px] lg:w-[90%] mx-auto">
        <div class="flex flex-col mt-[30px] w-full">
          <div class="flex flex-wrap justify-between w-full mb-10 pb-[10px border-b border-accent">
            <h1 class="text-secondary text-[17px] font-normal lg:text-[26px] flex gap-[15px] items-center">
              <Icon id="MagnifyingGlass" size={17} class="block lg:hidden" />
              <Icon id="MagnifyingGlass" size={26} class="hidden lg:block" />
              {notFound ? "Nenhum imóvel encontrado" : `${total} imóveis`}
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
                  href={paginationInfo.pageUrl(pageNumber)}
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

export const getCaracteristicasFields = async (ctx: AppContext) => {
  type FieldsResponse = {
    carac: string[];
    infra: string[];
  };

  const apiRoute = "/imoveis/listarcampos";
  const apiUrl = ctx.loft.baseUrl + apiRoute + "?key=" + ctx.loft.apiKey.get();

  const getContent = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    signal: new AbortController().signal,
  });

  const content = (await getContent.json()) as FieldsResponse;

  return { caracteristicas: content.carac, infraestrutura: content.infra };
};

export const getFilterFields = async (ctx: AppContext) => {
  type FieldsResponse = {
    Bairro: string[];
    Cidade: string[];
    Categoria: string[];
    Empreendimento: string[];
  };

  const apiRoute =
    '/imoveis/listarConteudo?pesquisa={"fields":["Bairro","Cidade","Categoria", "Empreendimento"]}';

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

  const { caracteristicas, infraestrutura } = await getCaracteristicasFields(
    ctx
  );

  return {
    bairros: content.Bairro.sort(),
    cidades: content.Cidade.sort(),
    categorias: content.Categoria.sort(),
    empreendimentos: content.Empreendimento.sort(),
    caracteristicas: caracteristicas.sort(),
    infraestruturas: infraestrutura.sort(),
  };
};

const getUrlFilters = (url: string) => {
  const obrigatoryFilters = {
    ExibirNoSite: "Sim",
  };

  // deno-lint-ignore no-explicit-any
  const filters: { [key: string]: any } = { ...obrigatoryFilters };

  try {
    const urlFilters = new URL(url).searchParams;

    const paramsMapping: { [key: string]: string } = {
      tipo: "Categoria",
      cidade: "Cidade",
      bairro: "Bairro",
      codigo: "Codigo",
      dormitorios: "Dormitorios",
      vagas: "Vagas",
      suites: "Suites",
      banheiros: "BanheiroSocialQtd",
      finalidade: "Status",
      lancamento: "Lancamento",
    };

    Object.keys(paramsMapping).forEach((key) => {
      if (urlFilters.has(key)) {
        const value = urlFilters.getAll(key)[0].split(",");

        if (value.length > 1) {
          filters[paramsMapping[key]] = value;
        } else {
          filters[paramsMapping[key]] = value[0];
        }

        // filters[paramsMapping[key]] = urlFilters.getAll(key)[0].split(",");
      }
    });

    if (urlFilters.has("minimo") && urlFilters.has("maximo")) {
      switch (urlFilters.get("finalidade")) {
        case "Venda":
          filters.ValorVenda = [
            urlFilters.get("minimo"),
            urlFilters.get("maximo"),
          ];
          break;
        case "Aluguel":
          filters.ValorLocacao = [
            urlFilters.get("minimo"),
            urlFilters.get("maximo"),
          ];
          break;
        case "Temporada":
          filters.ValorDiaria = [
            urlFilters.get("minimo"),
            urlFilters.get("maximo"),
          ];
          break;
        default:
          filters.ValorVenda = [
            urlFilters.get("minimo"),
            urlFilters.get("maximo"),
          ];
          break;
      }
    }

    if (
      urlFilters.has("areaTotalMinima") ||
      urlFilters.has("areaTotalMaxima")
    ) {
      const min = urlFilters.get("areaTotalMinima");
      const max = urlFilters.get("areaTotalMaxima");

      if (min && max && min?.length > 0 && max?.length > 0) {
        filters.AreaTotal = [min, max];
      } else if (min && min?.length > 0) {
        filters.AreaTotal = [">=", min];
      } else if (max && max?.length > 0) {
        filters.AreaTotal = ["<=", max];
      }
    }

    if (
      urlFilters.has("areaPrivativaMinima") ||
      urlFilters.has("areaPrivativaMaxima")
    ) {
      const min = urlFilters.get("areaPrivativaMinima");
      const max = urlFilters.get("areaPrivativaMaxima");

      if (min && max && min?.length > 0 && max?.length > 0) {
        filters.AreaPrivativa = [min, max];
      } else if (min && min?.length > 0) {
        filters.AreaPrivativa = [">=", min];
      } else if (max && max?.length > 0) {
        filters.AreaPrivativa = ["<=", max];
      }
    }

    return JSON.stringify(filters);
  } catch (err) {
    console.error("Error getting url filters", err);
    return JSON.stringify(obrigatoryFilters);
  }
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

  const filters = getUrlFilters(req.url);

  const order = JSON.stringify({ Codigo: "desc" });
  const count = props.itemsPerPage ?? 9;

  const page = new URL(req.url).searchParams.get("page") ?? "1";

  const apiRoute = `/imoveis/listar?showtotal=1&pesquisa={"fields":${fields},"filter":${filters},"order":${order},"paginacao":{"pagina":${page},"quantidade":${count}}}`;

  const apiUrl = ctx.loft.baseUrl + apiRoute + "&key=" + ctx.loft.apiKey.get();

  console.log(apiUrl, "api");

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

  const filterFields = await getFilterFields(ctx);

  // Handle Not Found case
  if (!content.paginas && content.message) {
    return {
      ...props,
      imoveis: [],
      total: 0,
      totalPages: 1,
      page: 1,
      paginationInfo: {
        nextPageUrl: "",
        previousPageUrl: "",
        lastPageUrl: "",
        pageUrl: (pageNumber: number) => "",
      },
      filterFields,
      initialFilters: filters,
    };
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

  const pageUrl = (pageNumber: number) => {
    const url = new URL(req.url);
    url.searchParams.set("page", pageNumber.toString());
    return url.toString();
  };

  const paginationInfo = {
    nextPageUrl: nextPageUrl.toString(),
    previousPageUrl: previousPageUrl.toString(),
    lastPageUrl: lastPageUrl.toString(),
    pageUrl,
  };

  return {
    ...props,
    imoveis,
    total: response.total,
    totalPages: response.paginas,
    page: response.pagina,
    paginationInfo,
    filterFields,
    initialFilters: filters,
  };
}
