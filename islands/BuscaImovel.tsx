import { StateUpdater, useState } from "preact/hooks";

import SearchSelect from "site/islands/SearchSelect.tsx";
import Icon from "site/components/ui/Icon.tsx";
import { AppContext } from "site/apps/site.ts";
import { SectionProps } from "deco/types.ts";
import { clx } from "site/sdk/clx.ts";
import TextInput from "site/components/ui/TextInput.tsx";

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
    <div class="flex flex-col pb-[3px]">
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

      <div class="rounded-[30px] shadow-[0px_3px_7px_#00000059]">
        <button class="w-full bg-secondary text-white rounded-br-[30px] rounded-bl-[30px] h-[60px] flex justify-center items-center text-[24px]">
          Buscar
        </button>
      </div>
    </div>
  );
}

function CodeSearch() {
  return (
    <div class="flex items-center">
      <div class="w-full px-[15px]">
        <input
          class="w-full bg-secondary text-black placeholder:text-black text-2xl px-[15px] h-12"
          type="text"
          placeholder="Código"
        />
      </div>
      <div class="w-full">
        <button class="w-full bg-secondary text-white text-2xl flex justify-center items-center h-12">
          <span class="flex items-baseline whitespace-pre">
            <Icon id="MagnifyingGlass" width={24} height={25} />
            {" Buscar "}
          </span>
        </button>
      </div>
    </div>
  );
}

function MoreFilters({
  handleMoreFilters,
  setSearchType,
}: {
  handleMoreFilters: () => void;
  setSearchType: StateUpdater<"normal" | "code" | "filtering">;
}) {
  const [selectOpened, setSelectOpened] = useState("none");

  return (
    <div class="pt-[30px] pb-5 px-5 shadow-[0px_3px_7px_#00000059] flex flex-wrap bg-white">
      <div class="w-full px-[15px]">
        <span class="font-bold text-accent text-[13px] leading-[1.8] mb-[10px] block">
          Dormitório(s)
        </span>
        <SearchSelect
          variant="small"
          label="Dormitório"
          options={["1", "2", "3", "4+"]}
          barClass="mb-5"
          setOpened={() =>
            selectOpened === "dormitorio"
              ? setSelectOpened("none")
              : setSelectOpened("dormitorio")
          }
          opened={selectOpened === "dormitorio"}
          showFooter={false}
        />

        <span class="font-bold text-accent text-[13px] leading-[1.8] mb-[10px] block">
          Suíte(s)
        </span>
        <SearchSelect
          variant="small"
          label="Suíte"
          options={["1", "2", "3", "4+"]}
          barClass="mb-5"
          setOpened={() =>
            selectOpened === "suite"
              ? setSelectOpened("none")
              : setSelectOpened("suite")
          }
          opened={selectOpened === "suite"}
          showFooter={false}
        />

        <span class="font-bold text-accent text-[13px] leading-[1.8] mb-[10px] block">
          Faixa de preço para Venda
        </span>
        <div class="flex flex-col gap-5 mb-5">
          <TextInput placeholder="Valor mín." isCurrency />
          <TextInput placeholder="Valor máx." isCurrency />
        </div>

        <span class="font-bold text-accent text-[13px] leading-[1.8] mb-[10px] block">
          Empreendimento(s)
        </span>
        <SearchSelect
          variant="small"
          label="Empreendimento"
          options={["1", "2", "3", "4+"]}
          barClass="mb-5"
          setOpened={() =>
            selectOpened === "empreendimento"
              ? setSelectOpened("none")
              : setSelectOpened("empreendimento")
          }
          opened={selectOpened === "empreendimento"}
          showFooter
          searchable
          searchPlaceholder="Escolha o(s) empreendimento(s)"
        />

        <button class="whitespace-pre bg-secondary text-white text-2xl flex justify-center items-center h-[60px] px-5 mx-auto">
          <Icon id="MagnifyingGlass" width={24} height={25} /> {" Buscar "}
        </button>

        <div class="flex flex-wrap gap-5 justify-center mt-5">
          <button
            onClick={handleMoreFilters}
            class="flex bg-transparent outline-none border-none text-accent text-[15.6px] items-center gap-1 hover:underline"
          >
            <Icon id="Filter" width={15.61} height={16} />
            Reduzir Filtros
          </button>
          <button
            onClick={() => setSearchType("code")}
            class="flex bg-transparent outline-none border-none text-accent text-[15.6px] items-center gap-1 hover:underline"
          >
            <Icon id="MagnifyingGlass" width={15.61} height={16} />
            Busca por código
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BuscaImovel({
  title = "Encontre seu imóvel ideal",
  bairros,
  categorias,
}: SectionProps<typeof loader>) {
  const [searchType, setSearchType] = useState<"normal" | "code" | "filtering">(
    "normal"
  );

  const handleMoreFilters = () => {
    if (searchType === "code" || searchType === "filtering") {
      setSearchType("normal");
      return;
    }

    setSearchType("filtering");
  };

  const getFilterButtonLabel = () => {
    if (searchType === "normal") {
      return "Mais filtros";
    } else if (searchType === "filtering") {
      return "Reduzir Filtros";
    } else {
      return "Voltar para a busca";
    }
  };

  return (
    <div class="m-[2vh]">
      <h1 class="text-secondary-content text-[26px] md:text-[52px] my-5 font-black">
        {title}
      </h1>

      <div
        class={clx(
          "transition-opacity duration-500",
          searchType === "code"
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none absolute top-0 left-0"
        )}
      >
        <CodeSearch />
      </div>

      <div
        class={clx(
          "transition-opacity duration-500",
          searchType !== "code"
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none absolute top-0 left-0"
        )}
      >
        <RegularSearch bairros={bairros} categorias={categorias} />
      </div>

      <div
        class={clx(
          "transition-opacity duration-500",
          searchType === "filtering"
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none absolute top-0 left-0"
        )}
      >
        <MoreFilters
          handleMoreFilters={handleMoreFilters}
          setSearchType={setSearchType}
        />
      </div>

      {searchType !== "filtering" && (
        <div class="flex mt-[10px] justify-center items-center gap-5 text-black">
          <button
            onClick={handleMoreFilters}
            class="bg-transparent border-none outline-none flex items-baseline gap-[5px]"
          >
            <Icon id="Filter" size={16} />
            {getFilterButtonLabel()}
          </button>
          <button
            onClick={() => setSearchType("code")}
            class="bg-transparent border-none outline-none flex items-baseline gap-[5px]"
          >
            <Icon id="MagnifyingGlass" size={16} />
            Busca por código
          </button>
        </div>
      )}
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
    bairros: content.Bairro.sort(),
    cidades: content.Cidade.sort(),
    categorias: content.Categoria.sort(),
  };
}
