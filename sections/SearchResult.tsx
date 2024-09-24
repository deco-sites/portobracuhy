import { AppContext } from "site/apps/site.ts";
import { Imovel } from "site/sdk/types.ts";
import ShelfItem from "site/components/ui/ShelfItem.tsx";
import { usePagination } from "site/sdk/usePagination.ts";
import { clx } from "site/sdk/clx.ts";
import Icon from "site/components/ui/Icon.tsx";
import Filters from "site/islands/Filters.tsx";
import OrderBy from "site/islands/OrderBy.tsx";
import ShareButton from "site/islands/ShareButton.tsx";
import { type SectionProps } from "@deco/deco";
export interface Props {
    /** @description Quantidade de itens por pagina */
    itemsPerPage?: number;
}
export default function SearchResult({ imoveis, total, page, totalPages, itemsPerPage = 9, paginationInfo, filterFields, initialFilters, initialOrderBy, viewMode, }: SectionProps<typeof loader>) {
    const notFound = imoveis.length === 0;
    const paginationRange = usePagination({
        currentPage: page,
        totalCount: total,
        pageSize: itemsPerPage,
    });
    return (<>
      <Filters initialFilters={initialFilters} bairros={filterFields.bairros} cidades={filterFields.cidades} categorias={filterFields.categorias} caracteristicas={filterFields.caracteristicas} infraestruturas={filterFields.infraestruturas} empreendimentos={filterFields.empreendimentos}/>

      <div id="searchResult" class="px-[15px] lg:w-[90%] mx-auto">
        <div class="flex flex-col mt-[30px] w-full">
          <div class="flex flex-wrap justify-between w-full mb-10 pb-[10px] border-b border-accent">
            <h1 class="text-secondary text-[17px] font-normal lg:text-[26px] flex gap-[15px] items-center">
              <Icon id="MagnifyingGlass" size={17} class="block lg:hidden"/>
              <Icon id="MagnifyingGlass" size={26} class="hidden lg:block"/>
              {notFound ? "Nenhum imóvel encontrado" : `${total} imóveis`}
            </h1>

            <div class="flex gap-[15px]">
              <OrderBy initialOrderBy={initialOrderBy}/>

              <div class={`hidden lg:flex self-end ${viewMode !== "lista" ? "bg-[#F6F3FB]" : "bg-transparent"} rounded-[10px]`}>
                <a class="p-[7px] text-secondary hover:text-black" href="?listagem=grid">
                  <Icon id="Grid" size={19}/>
                </a>
              </div>
              <div class={`hidden lg:flex self-end ${viewMode === "lista" ? "bg-[#F6F3FB]" : "bg-transparent"} rounded-[10px]`}>
                <a class="p-[7px] text-secondary hover:text-black" href="?listagem=lista">
                  <Icon id="List" size={19}/>
                </a>
              </div>
              <ShareButton />
            </div>
          </div>

          <div class="flex flex-col gap-[55px] lg:flex-row lg:flex-wrap lg:gap-0 lg:-mx-[15px]">
            {imoveis.map((imovel) => (<div class={`box-border w-full ${viewMode === "lista" ? "lg:w-full" : "lg:w-1/3"} lg:px-[15px] lg:mb-[60px]`}>
                <ShelfItem imovel={imovel} variant={viewMode === "lista" ? "listItem" : "default"}/>
              </div>))}
          </div>

          <div class="mt-[60px] lg:mt-0 flex flex-wrap gap-2 w-full justify-center items-center">
            {paginationInfo.previousPageUrl && page > 1 && (<a class="border-2 border-secondary px-[14px] text-[13px] font-bold leading-[35px] text-secondary hover:bg-secondary hover:text-base-100 transition-colors duration-200 rounded-tl-[4px] rounded-bl-[4px] uppercase" href={paginationInfo.previousPageUrl}>
                Anterior
              </a>)}

            {paginationRange?.map((pageNumber) => {
            if (typeof pageNumber === "string") {
                return (<span class="font-bold text-[13px] text-accent self-end">
                    &#8230;
                  </span>);
            }
            return (<a class={clx("border-2 border-secondary px-[14px] text-[13px] font-bold leading-[35px]", "hover:bg-secondary hover:text-base-100 transition-colors duration-200", pageNumber === page
                    ? "bg-secondary text-base-100"
                    : "bg-base-100 text-secondary")} href={paginationInfo.pageUrl(pageNumber)}>
                  {pageNumber}
                </a>);
        })}

            {paginationInfo.nextPageUrl && page < totalPages && (<a class="border-2 border-secondary px-[14px] text-[13px] font-bold leading-[35px] text-secondary hover:bg-secondary hover:text-base-100 transition-colors duration-200 rounded-tr-[4px] rounded-br-[4px] uppercase" href={paginationInfo.nextPageUrl}>
                Próximo
              </a>)}
          </div>
        </div>
      </div>
    </>);
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
    const apiRoute = '/imoveis/listarConteudo?pesquisa={"fields":["Bairro","Cidade","Categoria", "Empreendimento"]}';
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
    const { caracteristicas, infraestrutura } = await getCaracteristicasFields(ctx);
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
    const filters: {
        [key: string]: any;
    } = { ...obrigatoryFilters };
    try {
        const urlFilters = new URL(url).searchParams;
        const paramsMapping: {
            [key: string]: string;
        } = {
            tipo: "Categoria",
            cidade: "Cidade",
            bairro: "Bairro",
            codigo: "Codigo",
            dormitorios: "Dormitorios",
            empreendimentos: "Empreendimento",
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
                }
                else {
                    filters[paramsMapping[key]] = value[0];
                }
                // filters[paramsMapping[key]] = urlFilters.getAll(key)[0].split(",");
            }
        });
        // loop through the rest of url parameters (for infraeestrutura and caracteristicas filters)
        for (const [key, value] of urlFilters) {
            if (!Object.keys(paramsMapping).includes(key) &&
                ![
                    "page",
                    "ordenar",
                    "listagem",
                    "minimo",
                    "maximo",
                    "areaTotalMinima",
                    "areaTotalMaxima",
                    "areaPrivativaMinima",
                    "areaPrivativaMaxima",
                ].includes(key)) {
                filters[key] = value;
            }
        }
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
        if (urlFilters.has("areaTotalMinima") ||
            urlFilters.has("areaTotalMaxima")) {
            const min = urlFilters.get("areaTotalMinima");
            const max = urlFilters.get("areaTotalMaxima");
            if (min && max && min?.length > 0 && max?.length > 0) {
                filters.AreaTotal = [min, max];
            }
            else if (min && min?.length > 0) {
                filters.AreaTotal = [">=", min];
            }
            else if (max && max?.length > 0) {
                filters.AreaTotal = ["<=", max];
            }
        }
        if (urlFilters.has("areaPrivativaMinima") ||
            urlFilters.has("areaPrivativaMaxima")) {
            const min = urlFilters.get("areaPrivativaMinima");
            const max = urlFilters.get("areaPrivativaMaxima");
            if (min && max && min?.length > 0 && max?.length > 0) {
                filters.AreaPrivativa = [min, max];
            }
            else if (min && min?.length > 0) {
                filters.AreaPrivativa = [">=", min];
            }
            else if (max && max?.length > 0) {
                filters.AreaPrivativa = ["<=", max];
            }
        }
        return JSON.stringify(filters);
    }
    catch (err) {
        console.error("Error getting url filters", err);
        return JSON.stringify(obrigatoryFilters);
    }
};
const getOrderBy = (url: string) => {
    const orderBy = new URL(url).searchParams.get("ordenar");
    let order: {
        [key: string]: string;
    } = {
        Codigo: "desc",
    };
    if (orderBy) {
        switch (orderBy) {
            case "mais-recente":
                order = { Codigo: "desc" };
                break;
            case "maior-preco":
                order = {
                    ValorVenda: "desc",
                    ValorLocacao: "desc",
                    ValorDiaria: "desc",
                };
                break;
            case "menor-preco":
                order = {
                    ValorVenda: "asc",
                    ValorLocacao: "asc",
                    ValorDiaria: "asc",
                };
                break;
            case "mais-dormitorio":
                order = { Dormitorios: "desc" };
                break;
            case "menos-dormitorio":
                order = { Dormitorios: "asc" };
                break;
            case "menor-area":
                order = { AreaTotal: "asc" };
                break;
            case "maior-area":
                order = { AreaTotal: "desc" };
                break;
            default:
                break;
        }
    }
    return JSON.stringify(order);
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
        "Empreendimento",
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
    const viewMode = new URL(req.url).searchParams.get("listagem") ?? "grid";
    const filters = getUrlFilters(req.url);
    const orderBy = getOrderBy(req.url);
    const initialOrderBy = new URL(req.url).searchParams.get("ordenar") ?? "mais-recente";
    const count = props.itemsPerPage ?? 9;
    const page = new URL(req.url).searchParams.get("page") ?? "1";
    const apiRoute = `/imoveis/listar?showtotal=1&pesquisa={"fields":${fields},"filter":${filters},"order":${orderBy},"paginacao":{"pagina":${page},"quantidade":${count}}}`;
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
            initialOrderBy,
            viewMode,
        };
    }
    const response = content as ImoveisResponse;
    const imoveis: Imovel[] = Object.values(response).filter((item): item is Imovel => typeof item === "object" && "Codigo" in item);
    // ordenar imoveis
    // deno-lint-ignore no-explicit-any
    imoveis.sort((a: any, b: any) => {
        switch (initialOrderBy) {
            case "mais-recente":
                return b.Codigo - a.Codigo;
            case "maior-preco":
                return Number(b.ValorVenda) - Number(a.ValorVenda);
            case "menor-preco":
                return Number(a.ValorVenda) - Number(b.ValorVenda);
            case "mais-dormitorio":
                return Number(b.Dormitorios) - Number(a.Dormitorios);
            case "menos-dormitorio":
                return Number(a.Dormitorios) - Number(b.Dormitorios);
            case "menor-area":
                return Number(a.AreaTotal) - Number(b.AreaTotal);
            case "maior-area":
                return Number(b.AreaTotal) - Number(a.AreaTotal);
            default:
                return 0;
        }
    });
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
        initialOrderBy,
        viewMode,
    };
}
