import { useState } from "preact/hooks";

import SearchSelect from "site/islands/SearchSelect.tsx";
import Icon from "site/components/ui/Icon.tsx";

export interface Props {
  title?: string;
}

export default function BuscaImovel({
  title = "Encontre seu imóvel ideal",
}: Props) {
  const [selectOpened, setSelectOpened] = useState("none");

  return (
    <div class="m-[2vh]">
      <h1 class="text-secondary-content text-[26px] my-5 font-black">
        {title}
      </h1>
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
          options={[
            "Apartamento",
            "Casa",
            "Casa Canal",
            "Casa Costeira",
            "Casa em Condomínio",
            "Casa Praia",
            "Ilha",
            "Loja",
            "Terreno",
            "Terreno Canal",
            "Terreno Comercial",
            "Terreno Costeira",
            "Terreno Praia",
          ]}
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
          options={[
            "Angra Azul",
            "Angra Inn",
            "Aquarius Houses",
            "Barlavento",
            "Bracui",
          ]}
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

        <div class="flex mt-[10px] justify-center items-center gap-5 text-black">
          <button class="bg-transparent border-none outline-none flex items-center">
            <Icon id="FilterList" size={16} />
            Mais filtros
          </button>
          <button class="bg-transparent border-none outline-none flex items-center">
            <Icon id="MagnifyingGlass" size={16} />
            Busca por código
          </button>
        </div>
      </div>
    </div>
  );
}
