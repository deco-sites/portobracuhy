import { AppContext } from "site/apps/site.ts";

export interface Props {
  name?: string;
  fone?: string;
  email?: string;
  imovel?: string;
  VeiculoCaptacao?: string;
  history?: {
    Assunto: string;
    Imovel: string;
    Texto: string;
  };
  corretor?: string;
}

export const action = async (props: Props, _req: Request, ctx: AppContext) => {
  const fields = JSON.stringify({
    Nome: props.name,
    FonePrincipal: props.fone,
    EmailResidencial: props.email,
    VeiculoCaptacao: props.VeiculoCaptacao,
    Imovel: props.imovel,
    Historico: {
      Assunto: props.history?.Assunto,
      Imovel: props.history?.Imovel,
      Texto: props.history?.Texto,
    },
    Corretor: props.corretor,
  });

  const apiRoute = `/clientes/detalhes?cadastro={"fields":${fields}}`;
  const apiUrl = ctx.loft.baseUrl + apiRoute + "&key=" + ctx.loft.apiKey.get();

  const postContent = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    signal: new AbortController().signal,
  });

  const content = await postContent.json();

  if (postContent.status !== 200) {
    throw new Error(content.message ?? "Error on submit");
  }

  return content;
};

export default action;
