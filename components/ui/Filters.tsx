import { useState } from "preact/hooks";
import SearchSelect from "site/components/ui/SearchSelect.tsx";

interface Props {
  bairros: string[];
  cidades: string[];
  categorias: string[];
}

export default function Filters({ bairros, cidades, categorias }: Props) {
  const [showFilters, setShowFilters] = useState(false);
  const [selectOpened, setSelectOpened] = useState("none");

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
          <select class="h-[35px] border border-[#ccc] active:border-black focus:border-black py-[6px] px-3 text-[13px] font-normal outline-none">
            <option>Venda</option>
            <option>Aluguel</option>
            <option>Temporada</option>
          </select>

          <label class="text-[16.9px] my-[10px]">Código</label>
          <input
            class="h-[35px] border border-[#ccc] active:border-black focus:border-black py-[6px] px-3 text-[13px] font-normal outline-none"
            type="text"
            placeholder="Código"
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
          />

          <label class="text-[16.9px] my-[10px]">Preço de Venda</label>
          <SearchSelect
            variant="small"
            barClass="bg-white !border-[#ccc]"
            label={"Preço de Venda"}
            options={[
              "Preço de Venda",
              "Até 40.001",
              "De 40.000,00 a 60.000,00",
              "De 60.000,00 a 80.000,00",
              "De 100.000,00 a 200.000,00",
              "De 200.000,00 a 400.000,00",
              "De 400.000,00 a 600.000,00",
              "De 600.000,00 a 800.000,00",
              "De 800.000,00 a 1.000.000,00",
              "De 1.000.000,00 a 2.000.000,00",
              "De 2.000.000,00 a 4.000.000,00",
              "De 4.000.000,00 a 6.000.000,00",
              "Acima de 6.000.000,00",
            ]}
            searchable
            showFooter
            setOpened={() =>
              selectOpened === "preco-venda"
                ? setSelectOpened("none")
                : setSelectOpened("preco-venda")
            }
            opened={selectOpened === "preco-venda"}
            allowMultipleSelection={false}
          />
        </div>
      )}
    </div>
  );
}
