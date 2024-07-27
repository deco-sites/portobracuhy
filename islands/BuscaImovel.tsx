import { StateUpdater, useState } from "preact/hooks";

import SearchSelect from "site/islands/SearchSelect.tsx";
import Icon from "site/components/ui/Icon.tsx";
import { AppContext } from "site/apps/site.ts";
import { SectionProps } from "deco/types.ts";
import { clx } from "site/sdk/clx.ts";
import TextInput from "site/components/ui/TextInput.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";

export interface Props {
  title?: string;
}

function currencyToNumber(str: string) {
  let numStr = str.replace(/[R$\s.]/g, "");
  numStr = numStr.replace(",", ".");
  const num = parseFloat(numStr);
  return num;
}

function RegularSearch({
  bairros,
  categorias,
  finalidade,
  setFinalidade,
  selectedDormitorios,
  selectedSuites,
  selectedEmpreendimentos,
  precoMin,
  precoMax,
}: {
  bairros: string[];
  categorias: string[];
  finalidade: string;
  setFinalidade: StateUpdater<"" | "Venda" | "Aluguel" | "Temporada">;
  selectedDormitorios: string[];
  selectedSuites: string[];
  selectedEmpreendimentos: string[];
  precoMin: string;
  precoMax: string;
}) {
  const [selectOpened, setSelectOpened] = useState("none");
  const [selectedCategorias, setSelectedCategorias] = useState<string[]>([]);
  const [selectedBairros, setSelectedBairros] = useState<string[]>([]);

  // mount filter url
  const mountFiltersUrl = () => {
    if (IS_BROWSER) {
      const filterObject = {
        tipo: selectedCategorias,
        bairro: selectedBairros,
        finalidade,
        dormitorios: selectedDormitorios,
        suites: selectedSuites,
        empreendimentos: selectedEmpreendimentos,
        minimo: precoMin ? currencyToNumber(precoMin).toString() : "",
        maximo: precoMax ? currencyToNumber(precoMax).toString() : "",
      };

      const url = new URL(window.location.origin + "/busca");

      Object.keys(filterObject).forEach((key) => {
        const value = filterObject[key as keyof typeof filterObject];

        if (value.length > 0) {
          url.searchParams.set(
            key,
            Array.isArray(value) ? value.join(",") : value
          );
        }
      });

      url.searchParams.set("page", "1");
      return url.toString();
    }

    return "";
  };

  return (
    <div class="flex flex-col pb-[3px]">
      <div class="flex flex-wrap w-full text-white text-[16.9px] lg:justify-center lg:gap-[10px] lg:items-end">
        <div
          class={clx(
            "w-1/2 rounded-tl-[30px] bg-secondary",
            "flex justify-center items-center",
            "uppercase lg:min-w-[186px] lg:w-auto lg:rounded-none",
            finalidade === "Venda" ? "h-12 lg:h-10" : "h-12 lg:h-max"
          )}
        >
          <input
            class="hidden"
            type="radio"
            name="finalidade"
            value="Venda"
            id="comprar"
            onChange={() => setFinalidade("Venda")}
            checked={finalidade === "Venda"}
          />
          <label
            for="comprar"
            class="font-slab w-full flex justify-center items-center h-full cursor-pointer"
          >
            Venda
          </label>
        </div>
        <div
          class={clx(
            "w-1/2 rounded-tr-[30px] bg-secondary",
            "flex justify-center items-center",
            "uppercase lg:min-w-[186px] lg:w-auto lg:rounded-none",
            finalidade === "Aluguel" ? "h-12 lg:h-10" : "h-12 lg:h-max"
          )}
        >
          <input
            class="hidden"
            type="radio"
            name="finalidade"
            value="Aluguel"
            id="alugar"
            onChange={() => setFinalidade("Aluguel")}
            checked={finalidade === "Aluguel"}
          />
          <label
            for="alugar"
            class="font-slab w-full flex justify-center items-center h-full cursor-pointer"
          >
            Aluguel
          </label>
        </div>
        <div
          class={clx(
            "w-full bg-secondary",
            "flex justify-center items-center",
            "uppercase lg:min-w-[186px] lg:w-auto lg:rounded-none",
            finalidade === "Temporada" ? "h-12 lg:h-10" : "h-12 lg:h-max"
          )}
        >
          <input
            class="hidden"
            type="radio"
            name="finalidade"
            value="Temporada"
            id="temporada"
            onChange={() => setFinalidade("Temporada")}
            checked={finalidade === "Temporada"}
          />
          <label
            for="temporada"
            class="font-slab w-full flex justify-center items-center h-full cursor-pointer"
          >
            Temporada
          </label>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row lg:gap-[3px]">
        <SearchSelect
          label="Tipos de imóvel"
          options={categorias}
          barClass="cursor-pointer rounded-tr-[30px] rounded-tl-[30px] mb-[3px] lg:rounded-tr-none lg:rounded-bl-[30px]"
          searchable
          searchPlaceholder="Que tipo de imóvel procura?"
          setOpened={() =>
            selectOpened === "imovel"
              ? setSelectOpened("none")
              : setSelectOpened("imovel")
          }
          opened={selectOpened === "imovel"}
          selectedOptions={selectedCategorias}
          setSelectedOptions={setSelectedCategorias}
        />
        <SearchSelect
          label="Condomínios"
          options={bairros}
          barClass="cursor-pointer mb-[3px]"
          searchable
          searchPlaceholder="Escolha o(s) Bairro(s)"
          setOpened={() =>
            selectOpened === "condominio"
              ? setSelectOpened("none")
              : setSelectOpened("condominio")
          }
          opened={selectOpened === "condominio"}
          selectedOptions={selectedBairros}
          setSelectedOptions={setSelectedBairros}
        />

        <div class="rounded-[30px] lg:rounded-bl-none lg:rounded-tl-none shadow-[0px_3px_7px_#00000059] lg:h-16 lg:w-full">
          <a
            href={mountFiltersUrl()}
            class="w-full bg-secondary text-white rounded-br-[30px] rounded-bl-[30px] h-[60px] flex justify-center items-center text-[24px] lg:rounded-bl-none lg:rounded-tr-[30px] lg:h-16"
          >
            Buscar
          </a>
        </div>
      </div>
    </div>
  );
}

function CodeSearch() {
  const [codigo, setCodigo] = useState("");

  return (
    <div class="flex items-center lg:mb-[30px]">
      <div class="w-full px-[15px]">
        <input
          class="w-full bg-secondary outline-none text-black placeholder:text-black text-2xl px-[15px] h-12 lg:h-16"
          type="text"
          placeholder="Código"
          value={codigo}
          onChange={(e) => setCodigo(e.currentTarget.value)}
        />
      </div>
      <div class="w-full lg:w-[16.66666667%]">
        <a
          href={`/busca?codigo=${codigo}`}
          class="w-full bg-secondary text-white text-2xl flex justify-center items-center h-12 lg:h-16"
        >
          <span class="flex items-baseline whitespace-pre">
            <Icon id="MagnifyingGlass" width={24} height={25} />
            {" Buscar "}
          </span>
        </a>
      </div>
    </div>
  );
}

function MoreFilters({
  handleMoreFilters,
  setSearchType,
  finalidade,
  empreendimentos,
  selectedDormitorios,
  setSelectedDormitorios,
  selectedSuites,
  setSelectedSuites,
  selectedEmpreendimentos,
  setSelectedEmpreendimentos,
  precoMin,
  setPrecoMin,
  precoMax,
  setPrecoMax,
}: {
  handleMoreFilters: () => void;
  setSearchType: StateUpdater<"normal" | "code" | "filtering">;
  finalidade: string;
  empreendimentos: string[];
  selectedDormitorios: string[];
  setSelectedDormitorios: StateUpdater<string[]>;
  selectedSuites: string[];
  setSelectedSuites: StateUpdater<string[]>;
  selectedEmpreendimentos: string[];
  setSelectedEmpreendimentos: StateUpdater<string[]>;
  precoMin: string;
  setPrecoMin: StateUpdater<string>;
  precoMax: string;
  setPrecoMax: StateUpdater<string>;
}) {
  const [selectOpened, setSelectOpened] = useState("none");

  return (
    <div class="pt-[30px] pb-5 px-5 shadow-[0px_3px_7px_#00000059] flex flex-wrap bg-white">
      <div class="w-full px-[15px]">
        <div class="flex flex-col lg:flex-row lg:gap-[30px]">
          <div class="flex flex-col lg:w-[16.66666667%]">
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
              selectedOptions={selectedDormitorios}
              setSelectedOptions={setSelectedDormitorios}
            />
          </div>

          <div class="flex flex-col lg:w-[16.66666667%]">
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
              selectedOptions={selectedSuites}
              setSelectedOptions={setSelectedSuites}
            />
          </div>

          <div class="flex flex-col lg:w-1/2">
            <span class="font-bold text-accent text-[13px] leading-[1.8] mb-[10px] block">
              Faixa de preço para {finalidade}
            </span>
            <div class="flex flex-col lg:flex-row gap-5 mb-5">
              <TextInput
                value={precoMin}
                onChange={(val) => setPrecoMin(val)}
                placeholder="Valor mín."
                isCurrency
              />
              <TextInput
                value={precoMax}
                onChange={(val) => setPrecoMax(val)}
                placeholder="Valor máx."
                isCurrency
              />
            </div>
          </div>
        </div>

        <div class="flex flex-col lg:w-1/4">
          <span class="font-bold text-accent text-[13px] leading-[1.8] mb-[10px] block">
            Empreendimento(s)
          </span>
          <SearchSelect
            variant="small"
            label="Empreendimento"
            options={empreendimentos}
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
            selectedOptions={selectedEmpreendimentos}
            setSelectedOptions={setSelectedEmpreendimentos}
          />
        </div>

        <button class="whitespace-pre bg-secondary text-white text-2xl flex lg:hidden justify-center items-center h-[60px] px-5 mx-auto">
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
  empreendimentos,
}: SectionProps<typeof loader>) {
  const [searchType, setSearchType] = useState<"normal" | "code" | "filtering">(
    "normal"
  );
  const [finalidade, setFinalidade] = useState<
    "" | "Venda" | "Aluguel" | "Temporada"
  >("");
  const [selectedDormitorios, setSelectedDormitorios] = useState<string[]>([]);
  const [selectedSuites, setSelectedSuites] = useState<string[]>([]);
  const [selectedEmpreendimentos, setSelectedEmpreendimentos] = useState<
    string[]
  >([]);
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");

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
    <div class="m-[2vh] lg:m-[5vh]">
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
        <RegularSearch
          finalidade={finalidade}
          setFinalidade={setFinalidade}
          bairros={bairros}
          categorias={categorias}
          selectedDormitorios={selectedDormitorios}
          selectedEmpreendimentos={selectedEmpreendimentos}
          selectedSuites={selectedSuites}
          precoMin={precoMin}
          precoMax={precoMax}
        />
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
          finalidade={finalidade}
          empreendimentos={empreendimentos}
          selectedDormitorios={selectedDormitorios}
          setSelectedDormitorios={setSelectedDormitorios}
          selectedSuites={selectedSuites}
          setSelectedSuites={setSelectedSuites}
          selectedEmpreendimentos={selectedEmpreendimentos}
          setSelectedEmpreendimentos={setSelectedEmpreendimentos}
          precoMin={precoMin}
          setPrecoMin={setPrecoMin}
          precoMax={precoMax}
          setPrecoMax={setPrecoMax}
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
    signal: req.signal,
  });

  const content = (await getContent.json()) as Response;

  return {
    ...props,
    bairros: content.Bairro.sort(),
    cidades: content.Cidade.sort(),
    categorias: content.Categoria.sort(),
    empreendimentos: content.Empreendimento.sort(),
  };
}
