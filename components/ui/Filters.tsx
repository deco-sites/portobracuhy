import { IS_BROWSER } from "$fresh/runtime.ts";
import { useState } from "preact/hooks";
import SearchSelect from "site/components/ui/SearchSelect.tsx";
import { priceOptions } from "site/constants.ts";

interface Props {
  bairros: string[];
  cidades: string[];
  categorias: string[];
  caracteristicas: string[];
  infraestruturas: string[];
  empreendimentos: string[];
  initialFilters: string;
}

export default function Filters({
  bairros,
  cidades,
  categorias,
  caracteristicas,
  infraestruturas,
  empreendimentos,
  initialFilters,
}: Props) {
  console.log(initialFilters);

  const initialFiltersObj = JSON.parse(initialFilters);
  const initialStatus = initialFiltersObj.Status || "Venda";

  const [showFilters, setShowFilters] = useState(false);
  const [selectOpened, setSelectOpened] = useState("none");
  const [selectedCategorias, setSelectedCategorias] = useState<string[]>(
    initialFiltersObj.Categoria || []
  );
  const [selectedCidades, setSelectedCidades] = useState<string[]>(
    initialFiltersObj.Cidade || []
  );
  const [selectedBairros, setSelectedBairros] = useState<string[]>(
    initialFiltersObj.Bairro || []
  );

  const [selectedPrice, setSelectedPrice] = useState([
    priceOptions[initialStatus as keyof typeof priceOptions].find(
      (p: { min: string; max: string }) => {
        if (initialFiltersObj.ValorVenda) {
          return (
            p.min === initialFiltersObj.ValorVenda[0] &&
            p.max === initialFiltersObj.ValorVenda[1]
          );
        }

        if (initialFiltersObj.ValorLocacao) {
          return (
            p.min === initialFiltersObj.ValorLocacao[0] &&
            p.max === initialFiltersObj.ValorLocacao[1]
          );
        }

        if (initialFiltersObj.ValorDiaria) {
          return (
            p.min === initialFiltersObj.ValorDiaria[0] &&
            p.max === initialFiltersObj.ValorDiaria[1]
          );
        }

        return false;
      }
    )?.label ?? "",
  ]);

  const [selectedCaracteristicas, setSelectedCaracteristicas] = useState<
    string[]
  >([]);
  const [selectedInfraestruturas, setSelectedInfraestruturas] = useState<
    string[]
  >([]);
  const [selectedEmpreendimentos, setSelectedEmpreendimentos] = useState<
    string[]
  >([]);
  const [codigo, setCodigo] = useState<string>(initialFiltersObj.Codigo || "");
  const [dormitorios, setDormitorios] = useState<string[]>(
    initialFiltersObj.Dormitorios || []
  );
  const [vagas, setVagas] = useState<string[]>(initialFiltersObj.Vagas || []);
  const [suites, setSuites] = useState<string[]>(
    initialFiltersObj.Suites || []
  );
  const [banheiros, setBanheiros] = useState<string[]>(
    initialFiltersObj.BanheiroSocialQtd || []
  );
  const [areaTotal, setAreaTotal] = useState({
    min: (initialFiltersObj.AreaTotal && initialFiltersObj.AreaTotal[0]) || "",
    max: (initialFiltersObj.AreaTotal && initialFiltersObj.AreaTotal[1]) || "",
  });
  const [areaPrivativa, setAreaPrivativa] = useState({
    min:
      (initialFiltersObj.AreaPrivativa && initialFiltersObj.AreaPrivativa[0]) ||
      "",
    max:
      (initialFiltersObj.AreaPrivativa && initialFiltersObj.AreaPrivativa[1]) ||
      "",
  });

  const [finalidade, setFinalidade] = useState<
    "Venda" | "Aluguel" | "Temporada"
  >(initialFiltersObj.Status || "Venda");

  const [lancamento, setLancamento] = useState<"Sim" | "Nao">(
    initialFiltersObj.Lancamento || "Nao"
  );

  const mountFiltersUrl = () => {
    if (IS_BROWSER) {
      console.log(selectedCidades, "cidades!");

      const filterObject = {
        tipo: selectedCategorias,
        cidade: selectedCidades,
        bairro: selectedBairros,
        codigo,
        dormitorios,
        vagas,
        suites,
        banheiros,
        finalidade,
        empreendimentos: selectedEmpreendimentos,
        // areaTotal,
        // areaPrivativa,
      };

      const url = new URL(window.location.origin + window.location.pathname);

      Object.keys(filterObject).forEach((key) => {
        const value = filterObject[key as keyof typeof filterObject];

        if (value.length > 0) {
          url.searchParams.set(
            key,
            Array.isArray(value) ? value.join(",") : value
          );
        }
      });

      selectedInfraestruturas.forEach((item) => {
        url.searchParams.set(item, "Sim");
      });

      selectedCaracteristicas.forEach((item) => {
        url.searchParams.set(item, "Sim");
      });

      const price = priceOptions[finalidade].find(
        (i) => i.label === selectedPrice[0]
      );

      if (price) {
        const { min, max } = price;
        url.searchParams.set("minimo", min);
        url.searchParams.set("maximo", max);
      }

      if (areaTotal.min || areaTotal.max) {
        const { min, max } = areaTotal;
        if (min) url.searchParams.set("areaTotalMinima", min);
        if (max) url.searchParams.set("areaTotalMaxima", max);
      }

      if (areaPrivativa.min || areaPrivativa.max) {
        const { min, max } = areaPrivativa;
        if (min) url.searchParams.set("areaPrivativaMinima", min);
        if (max) url.searchParams.set("areaPrivativaMaxima", max);
      }

      if (lancamento === "Sim") {
        url.searchParams.set("lancamento", "Sim");
      } else {
        url.searchParams.delete("lancamento");
      }

      url.searchParams.set("page", "1");
      return url.toString();
    }

    return "";
  };

  console.log(mountFiltersUrl(), "mountFiltersUrl()");

  return (
    <div class="flex flex-col">
      <div class="px-[15px]">
        <button
          onClick={() => setShowFilters(!showFilters)}
          class="bg-secondary text-base-100 text-[18px] font-normal w-full h-[42px] flex items-center justify-center rounded-[5px] my-5"
        >
          {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
        </button>
      </div>

      {showFilters && (
        <div class="flex flex-col bg-info w-full pt-[50px] pb-[30px] px-[15px]">
          <label class="text-[16.9px] mb-[10px]">O que deseja?</label>
          <select
            value={finalidade}
            onChange={(e) =>
              setFinalidade(e.currentTarget.value as typeof finalidade)
            }
            class="h-[35px] border border-[#ccc] active:border-black focus:border-black py-[6px] px-3 text-[13px] font-normal outline-none"
          >
            <option value="Venda">Venda</option>
            <option value="Aluguel">Aluguel</option>
            <option value="Temporada">Temporada</option>
          </select>

          <label class="text-[16.9px] my-[10px]">Código</label>
          <input
            class="h-[35px] border border-[#ccc] active:border-black focus:border-black py-[6px] px-3 text-[13px] font-normal outline-none"
            type="text"
            placeholder="Código"
            value={codigo}
            onChange={(e) => setCodigo(e.currentTarget.value)}
          />

          <label class="text-[16.9px] my-[10px]">Tipo</label>
          <SearchSelect
            variant="small"
            barClass="bg-white !border-[#ccc]"
            label={"Tipo"}
            options={categorias}
            searchable
            searchPlaceholder="Que tipo de imóvel procura?"
            showFooter
            setOpened={() =>
              selectOpened === "tipo"
                ? setSelectOpened("none")
                : setSelectOpened("tipo")
            }
            opened={selectOpened === "tipo"}
            selectedOptions={selectedCategorias}
            setSelectedOptions={setSelectedCategorias}
          />

          <label class="text-[16.9px] my-[10px]">Cidade</label>
          <SearchSelect
            variant="small"
            barClass="bg-white !border-[#ccc]"
            label={"Tipo"}
            options={cidades}
            searchable
            searchPlaceholder="Escolha a(s) cidade(s)"
            showFooter
            setOpened={() =>
              selectOpened === "cidade"
                ? setSelectOpened("none")
                : setSelectOpened("cidade")
            }
            opened={selectOpened === "cidade"}
            selectedOptions={selectedCidades}
            setSelectedOptions={setSelectedCidades}
          />

          <label class="text-[16.9px] my-[10px]">Bairro</label>
          <SearchSelect
            variant="small"
            barClass="bg-white !border-[#ccc]"
            label={"Tipo"}
            options={bairros}
            searchable
            searchPlaceholder="Escolha o Bairro"
            showFooter
            setOpened={() =>
              selectOpened === "bairro"
                ? setSelectOpened("none")
                : setSelectOpened("bairro")
            }
            opened={selectOpened === "bairro"}
            selectedOptions={selectedBairros}
            setSelectedOptions={setSelectedBairros}
          />

          <label class="text-[16.9px] my-[10px]">Preço para {finalidade}</label>
          <SearchSelect
            variant="small"
            barClass="bg-white !border-[#ccc]"
            label={`Preço para ${finalidade}`}
            options={priceOptions[finalidade].map((o) => o.label)}
            searchable
            showFooter
            setOpened={() =>
              selectOpened === "preco-venda"
                ? setSelectOpened("none")
                : setSelectOpened("preco-venda")
            }
            opened={selectOpened === "preco-venda"}
            allowMultipleSelection={false}
            selectedOptions={selectedPrice}
            setSelectedOptions={setSelectedPrice}
          />

          <label class="text-[16.9px] mt-[30px] mb-[10px]">Dormitório(s)</label>
          <div class="flex gap-4">
            <label>
              <input
                type="checkbox"
                class="mr-2"
                checked={dormitorios.includes("1")}
                onChange={(e) => {
                  if (dormitorios.includes("1")) {
                    setDormitorios(dormitorios.filter((d) => d !== "1"));
                  } else {
                    setDormitorios([...dormitorios, "1"]);
                  }
                }}
              />
              1
            </label>
            <label>
              <input
                type="checkbox"
                class="mr-2"
                checked={dormitorios.includes("2")}
                onChange={(e) => {
                  if (dormitorios.includes("2")) {
                    setDormitorios(dormitorios.filter((d) => d !== "2"));
                  } else {
                    setDormitorios([...dormitorios, "2"]);
                  }
                }}
              />
              2
            </label>
            <label>
              <input
                type="checkbox"
                class="mr-2"
                checked={dormitorios.includes("3")}
                onChange={(e) => {
                  if (dormitorios.includes("3")) {
                    setDormitorios(dormitorios.filter((d) => d !== "3"));
                  } else {
                    setDormitorios([...dormitorios, "3"]);
                  }
                }}
              />
              3
            </label>
            <label>
              <input
                type="checkbox"
                class="mr-2"
                checked={dormitorios.includes("4")}
                onChange={(e) => {
                  if (dormitorios.includes("4")) {
                    setDormitorios(dormitorios.filter((d) => d !== "4"));
                  } else {
                    setDormitorios([...dormitorios, "4"]);
                  }
                }}
              />
              4+
            </label>
          </div>

          <label class="text-[16.9px] mt-[30px] mb-[10px]">Vaga(s)</label>
          <div class="flex gap-4">
            <label>
              <input
                type="checkbox"
                class="mr-2"
                checked={vagas.includes("1")}
                onChange={(e) => {
                  if (vagas.includes("1")) {
                    setVagas(vagas.filter((d) => d !== "1"));
                  } else {
                    setVagas([...vagas, "1"]);
                  }
                }}
              />
              1
            </label>
            <label>
              <input
                type="checkbox"
                class="mr-2"
                checked={vagas.includes("2")}
                onChange={(e) => {
                  if (vagas.includes("2")) {
                    setVagas(vagas.filter((d) => d !== "2"));
                  } else {
                    setVagas([...vagas, "2"]);
                  }
                }}
              />
              2
            </label>
            <label>
              <input
                type="checkbox"
                class="mr-2"
                checked={vagas.includes("3")}
                onChange={(e) => {
                  if (vagas.includes("3")) {
                    setVagas(vagas.filter((d) => d !== "3"));
                  } else {
                    setVagas([...vagas, "3"]);
                  }
                }}
              />
              3
            </label>
            <label>
              <input
                type="checkbox"
                class="mr-2"
                checked={vagas.includes("4")}
                onChange={(e) => {
                  if (vagas.includes("4")) {
                    setVagas(vagas.filter((d) => d !== "4"));
                  } else {
                    setVagas([...vagas, "4"]);
                  }
                }}
              />
              4+
            </label>
          </div>

          <label class="text-[16.9px] mt-[30px] mb-[10px]">Suíte(s)</label>
          <div class="flex gap-4">
            <label>
              <input
                type="checkbox"
                class="mr-2"
                checked={suites.includes("1")}
                onChange={(e) => {
                  if (suites.includes("1")) {
                    setSuites(suites.filter((d) => d !== "1"));
                  } else {
                    setSuites([...suites, "1"]);
                  }
                }}
              />
              1
            </label>
            <label>
              <input
                type="checkbox"
                class="mr-2"
                checked={suites.includes("2")}
                onChange={(e) => {
                  if (suites.includes("2")) {
                    setSuites(suites.filter((d) => d !== "2"));
                  } else {
                    setSuites([...suites, "2"]);
                  }
                }}
              />
              2
            </label>
            <label>
              <input
                type="checkbox"
                class="mr-2"
                checked={suites.includes("3")}
                onChange={(e) => {
                  if (suites.includes("3")) {
                    setSuites(suites.filter((d) => d !== "3"));
                  } else {
                    setSuites([...suites, "3"]);
                  }
                }}
              />
              3
            </label>
            <label>
              <input
                type="checkbox"
                class="mr-2"
                checked={suites.includes("4")}
                onChange={(e) => {
                  if (suites.includes("4")) {
                    setSuites(suites.filter((d) => d !== "4"));
                  } else {
                    setSuites([...suites, "4"]);
                  }
                }}
              />
              4+
            </label>
          </div>

          <label class="text-[16.9px] mt-[30px] mb-[10px]">Banheiro(s)</label>
          <div class="flex gap-4">
            <label>
              <input
                type="checkbox"
                class="mr-2"
                checked={banheiros.includes("1")}
                onChange={(e) => {
                  if (banheiros.includes("1")) {
                    setBanheiros(banheiros.filter((d) => d !== "1"));
                  } else {
                    setBanheiros([...banheiros, "1"]);
                  }
                }}
              />
              1
            </label>
            <label>
              <input
                type="checkbox"
                class="mr-2"
                checked={banheiros.includes("2")}
                onChange={(e) => {
                  if (banheiros.includes("2")) {
                    setBanheiros(banheiros.filter((d) => d !== "2"));
                  } else {
                    setBanheiros([...banheiros, "2"]);
                  }
                }}
              />
              2
            </label>
            <label>
              <input
                type="checkbox"
                class="mr-2"
                checked={banheiros.includes("3")}
                onChange={(e) => {
                  if (banheiros.includes("3")) {
                    setBanheiros(banheiros.filter((d) => d !== "3"));
                  } else {
                    setBanheiros([...banheiros, "3"]);
                  }
                }}
              />
              3
            </label>
            <label>
              <input
                type="checkbox"
                class="mr-2"
                checked={banheiros.includes("4")}
                onChange={(e) => {
                  if (banheiros.includes("4")) {
                    setBanheiros(banheiros.filter((d) => d !== "4"));
                  } else {
                    setBanheiros([...banheiros, "4"]);
                  }
                }}
              />
              4+
            </label>
          </div>

          <label class="text-[16.9px] my-[10px]">Área Total (M²)</label>
          <div class="flex gap-[10px]">
            <input
              class="w-full h-[35px] border border-[#ccc] active:border-black focus:border-black py-[6px] px-3 text-[13px] font-normal outline-none"
              type="number"
              placeholder="Área mín."
              value={areaTotal.min}
              onChange={(e) =>
                setAreaTotal({ ...areaTotal, min: e.currentTarget.value })
              }
            />
            <input
              class="w-full h-[35px] border border-[#ccc] active:border-black focus:border-black py-[6px] px-3 text-[13px] font-normal outline-none"
              type="number"
              placeholder="Área max."
              value={areaTotal.max}
              onChange={(e) =>
                setAreaTotal({ ...areaTotal, max: e.currentTarget.value })
              }
            />
          </div>

          <label class="text-[16.9px] my-[10px]">Área Privativa</label>
          <div class="flex gap-[10px]">
            <input
              class="w-full h-[35px] border border-[#ccc] active:border-black focus:border-black py-[6px] px-3 text-[13px] font-normal outline-none"
              type="number"
              placeholder="Área mín."
              value={areaPrivativa.min}
              onChange={(e) =>
                setAreaPrivativa({
                  ...areaPrivativa,
                  min: e.currentTarget.value,
                })
              }
            />
            <input
              class="w-full h-[35px] border border-[#ccc] active:border-black focus:border-black py-[6px] px-3 text-[13px] font-normal outline-none"
              type="number"
              placeholder="Área max."
              value={areaPrivativa.max}
              onChange={(e) =>
                setAreaPrivativa({
                  ...areaPrivativa,
                  max: e.currentTarget.value,
                })
              }
            />
          </div>

          <label class="text-[16.9px] my-[10px]">Característica(s)</label>
          <SearchSelect
            variant="small"
            barClass="bg-white !border-[#ccc]"
            label={`Característica`}
            options={caracteristicas}
            searchable
            showFooter
            setOpened={() =>
              selectOpened === "caracteristicas"
                ? setSelectOpened("none")
                : setSelectOpened("caracteristicas")
            }
            opened={selectOpened === "caracteristicas"}
            selectedOptions={selectedCaracteristicas}
            setSelectedOptions={setSelectedCaracteristicas}
          />

          <label class="text-[16.9px] my-[10px]">Infraestrutura(s)</label>
          <SearchSelect
            variant="small"
            barClass="bg-white !border-[#ccc]"
            label={`Infraestrutura`}
            options={infraestruturas}
            searchable
            showFooter
            setOpened={() =>
              selectOpened === "infraestruturas"
                ? setSelectOpened("none")
                : setSelectOpened("infraestruturas")
            }
            opened={selectOpened === "infraestruturas"}
            selectedOptions={selectedInfraestruturas}
            setSelectedOptions={setSelectedInfraestruturas}
          />

          <label class="text-[16.9px] my-[10px]">Empreendimento(s)</label>
          <SearchSelect
            variant="small"
            barClass="bg-white !border-[#ccc]"
            label={`Empreendimento`}
            options={empreendimentos}
            searchable
            showFooter
            setOpened={() =>
              selectOpened === "empreendimentos"
                ? setSelectOpened("none")
                : setSelectOpened("empreendimentos")
            }
            opened={selectOpened === "empreendimentos"}
            selectedOptions={selectedEmpreendimentos}
            setSelectedOptions={setSelectedEmpreendimentos}
          />

          <label class="text-[16.9px] my-[10px]">Lançamento</label>
          <select
            value={lancamento}
            onChange={(e) =>
              setLancamento(e.currentTarget.value as typeof lancamento)
            }
            class="h-[35px] border border-[#ccc] active:border-black focus:border-black py-[6px] px-3 text-[13px] font-normal outline-none"
          >
            <option value="Nao">Exibir Todos</option>
            <option value="Sim">Exibir Apenas Lançamentos</option>
          </select>

          <div class="flex flex-wrap justify-center items-center mt-[30px]">
            <a
              href={mountFiltersUrl()}
              class="bg-secondary h-[42px] flex items-center justify-center px-[30px] text-[18px] font-medium text-base-100"
            >
              Pesquisar
            </a>
            <a
              href={"/busca"}
              class="h-[42px] flex items-center justify-center px-[30px] text-[15px] font-light text-secondary hover:underline"
            >
              Limpar Filtros
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
