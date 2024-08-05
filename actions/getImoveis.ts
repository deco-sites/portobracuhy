import { AppContext } from "site/apps/site.ts";
import { Imovel } from "site/sdk/types.ts";

export interface Props {
  imoveisId?: string[];
}

export const action = async (props: Props, _req: Request, ctx: AppContext) => {
  interface ImoveisResponse {
    [key: string]: Imovel | number;
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

  const filters = JSON.stringify({
    ExibirNoSite: "Sim",
    Codigo: props.imoveisId?.map((i: any) => i.imovelId),
  });

  const count = props.imoveisId?.length.toString() ?? "99";

  const apiRoute = `/imoveis/listar?showtotal=0&pesquisa={"fields":${fields},"filter":${filters},"paginacao":{"pagina": "1","quantidade":${count}}}`;
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
    throw new Error(content.message ?? "Error requesting imoveis data");
  }

  const response = content as ImoveisResponse;

  const imoveis: Imovel[] = Object.values(response).filter(
    (item): item is Imovel => typeof item === "object" && "Codigo" in item
  );

  return imoveis;
};

export default action;
