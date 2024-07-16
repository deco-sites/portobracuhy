import { useState } from "preact/hooks";

import SearchSelect from "site/islands/SearchSelect.tsx";
import Icon from "site/components/ui/Icon.tsx";
import { AppContext } from "site/apps/site.ts";
import { SectionProps } from "deco/types.ts";

export interface Props {
  title?: string;
}

function RegularSearch({
  bairros,
  categorias,
}: {
  bairros: string[];
  categorias: string[];
}) {
  const [selectOpened, setSelectOpened] = useState("none");

  return (
    <div class="flex flex-col">
      <div class="flex flex-wrap w-full text-white text-[16.9px]">
        <div class="w-1/2 h-12 rounded-tl-[30px] bg-secondary flex justify-center items-center uppercase">
          <input
            class="hidden"
            type="radio"
            name="finalidade"
            value="Venda"
            id="comprar"
          />
          <label for="comprar" class="font-slab">
            Venda
          </label>
        </div>
        <div class="w-1/2 h-12 rounded-tr-[30px] bg-secondary flex justify-center items-center uppercase">
          <input
            class="hidden"
            type="radio"
            name="finalidade"
            value="Aluguel"
            id="alugar"
          />
          <label for="alugar" class="font-slab">
            Aluguel
          </label>
        </div>
        <div class="w-full h-12 bg-secondary flex justify-center items-center uppercase">
          <input
            class="hidden"
            type="radio"
            name="finalidade"
            value="Temporada"
            id="temporada"
          />
          <label for="alugar" class="font-slab">
            Temporada
          </label>
        </div>
      </div>

      <SearchSelect
        label="Tipos de imóvel"
        options={categorias}
        barClass="rounded-tr-[30px] rounded-tl-[30px] mb-[3px]"
        searchable
        searchPlaceholder="Que tipo de imóvel procura?"
        setOpened={() =>
          selectOpened === "imovel"
            ? setSelectOpened("none")
            : setSelectOpened("imovel")
        }
        opened={selectOpened === "imovel"}
      />
      <SearchSelect
        label="Condomínios"
        options={bairros}
        barClass="mb-[3px]"
        searchable
        searchPlaceholder="Escolha o(s) Bairro(s)"
        setOpened={() =>
          selectOpened === "condominio"
            ? setSelectOpened("none")
            : setSelectOpened("condominio")
        }
        opened={selectOpened === "condominio"}
      />

      <button class="bg-secondary text-white rounded-br-[30px] rounded-bl-[30px] h-[60px] flex justify-center items-center text-[24px]">
        Buscar
      </button>
    </div>
  );
}

function CodeSearch() {
  return (
    <div class="flex items-center">
      <input
        class="bg-secondary text-black text-2xl px-[15px]"
        type="text"
        placeholder="Código"
      />
      <button class="bg-secondary text-white text-2xl flex items-baseline">
        <Icon id="MagnifyingGlass" width={24} height={25} />
        Buscar
      </button>
    </div>
  );
}

export default function BuscaImovel({
  title = "Encontre seu imóvel ideal",
  bairros,
  categorias,
}: SectionProps<typeof loader>) {
  const [searchType, setSearchType] = useState("normal");

  return (
    <div class="m-[2vh]">
      <h1 class="text-secondary-content text-[26px] my-5 font-black">
        {title}
      </h1>

      {searchType === "code" ? (
        <CodeSearch />
      ) : (
        <RegularSearch bairros={bairros} categorias={categorias} />
      )}

      <div class="flex mt-[10px] justify-center items-center gap-5 text-black">
        <button class="bg-transparent border-none outline-none flex items-baseline gap-[5px]">
          <Icon id="Filter" size={16} />
          Mais filtros
        </button>
        <button
          onClick={() => setSearchType("code")}
          class="bg-transparent border-none outline-none flex items-baseline gap-[5px]"
        >
          <Icon id="MagnifyingGlass" size={16} />
          Busca por código
        </button>
      </div>
    </div>
  );
}

export function LoadingFallback() {
  return (
    <div>
      <div class="text-2xl text-secondary-content">Loading...</div>
    </div>
  );
}

export async function loader(props: Props, req: Request, ctx: AppContext) {
  type Response = {
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
    signal: req.signal,
  });

  const content = (await getContent.json()) as Response;

  return {
    ...props,
    bairros: content.Bairro,
    cidades: content.Cidade,
    categorias: content.Categoria,
  };
}
