import { AppContext } from "site/apps/site.ts";

export interface Props {
  name?: string;
  fone?: string;
  email?: string;
  msg?: string;
  aceito?: string;
}

export const action = async (props: Props, _req: Request, ctx: AppContext) => {
  console.log("Chegou na action!");

  const apiRoute = `/clientes/detalhes?cadastro={"fields":{"Nome":"${props.name}","FonePrincipal":"${props.fone}"}}`;
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