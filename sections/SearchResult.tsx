import { AppContext } from "site/apps/site.ts";
import { SectionProps } from "deco/types.ts";
import { Imovel } from "site/sdk/types.ts";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import ShelfItem from "site/components/ui/ShelfItem.tsx";
import { useSection } from "deco/hooks/useSection.ts";

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

// const useUrlRebased = (overrides: string | undefined, base: string) => {
//   let url: string | undefined = undefined;

//   if (overrides) {
//     const temp = new URL(overrides, base);
//     const final = new URL(base);

//     final.pathname = temp.pathname;
//     for (const [key, value] of temp.searchParams.entries()) {
//       final.searchParams.set(key, value);
//     }

//     url = final.href;
//   }

//   return url;
// };

export default function SearchResult({
  imoveis,
  total,
  page,
  totalPages,
  itemsPerPage,
  nextPageUrl,
  previousPageUrl,
}: SectionProps<typeof loader>) {
  return (
    <div id="searchResult" class="px-[15px] lg:w-[90%] mx-auto">
      <div class="flex flex-col mt-[30px] w-full">
        <div class="w-full mb-10">
          <h1 class="text-secondary lg:text-[26px]">{total} imóveis</h1>
        </div>

        <div class="flex flex-col gap-[55px] lg:flex-row lg:flex-wrap lg:gap-0 lg:-mx-[15px]">
          {imoveis.map((imovel) => (
            <div class="box-border w-full lg:w-1/3 lg:px-[15px] lg:mb-[60px]">
              <ShelfItem imovel={imovel} />
            </div>
          ))}
        </div>

        <div class="flex">
          {previousPageUrl && <a href={previousPageUrl}>Anterior</a>}
          {nextPageUrl && <a href={nextPageUrl}>Próximo</a>}
        </div>
      </div>
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

  return {
    ...props,
    imoveis,
    total: response.total,
    totalPages: response.paginas,
    page: response.pagina,
    itemsPerPage: response.quantidade,
    nextPageUrl:
      parseInt(page) < response.paginas ? nextPageUrl.toString() : "",
    previousPageUrl: parseInt(page) > 1 ? previousPageUrl.toString() : "",
  };
}
