import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "site/sdk/clx.ts";
import CuradoriaItem from "site/islands/CuradoriaItem.tsx";

export interface Finalidade {
  label?: string;
  href?: string;
}

export interface ICuradoria {
  label?: string;
  image?: ImageWidget;
  finalidades?: Finalidade[];
}

export interface Props {
  title?: string;
  curadorias?: ICuradoria[];
}

export default function Curadoria({
  title = "Curadoria",
  curadorias = [
    {
      label: "Casa de Praia",
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/11067/b04de5dc-6e7f-44c1-8ed6-df31575d81ad",
      finalidades: [
        {
          label: "Venda",
          href: "/busca/?tipo=Casa%20Praia&finalidade=Venda",
        },
        {
          label: "Aluguel",
          href: "/busca/?tipo=Casa%20Praia&finalidade=Aluguel",
        },
        {
          label: "Temporada",
          href: "/busca/?tipo=Casa%20Praia&finalidade=Temporada",
        },
      ],
    },
    {
      label: "Casa de Canal",
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/11067/524a7260-7bc9-42de-b23a-5dbbae5e8e52",
      finalidades: [
        {
          label: "Venda",
          href: "/busca/?tipo=Casa%20Canal&finalidade=Venda",
        },
        {
          label: "Aluguel",
          href: "/busca/?tipo=Casa%20Canal&finalidade=Aluguel",
        },
        {
          label: "Temporada",
          href: "/busca/?tipo=Casa%20Canal&finalidade=Temporada",
        },
      ],
    },
    {
      label: "Casa de Ilha",
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/11067/b2f3a459-b1f3-4a17-9a5a-77269052450f",
      finalidades: [
        {
          label: "Venda",
          href: "/busca/?tipo=Casa%20Ilha&finalidade=Venda",
        },
        {
          label: "Aluguel",
          href: "/busca/?tipo=Casa%20Ilha&finalidade=Aluguel",
        },
        {
          label: "Temporada",
          href: "/busca/?tipo=Casa%20Ilha&finalidade=Temporada",
        },
      ],
    },
    {
      label: "Terreno de Canal",
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/11067/ab62a79d-4f41-4dd4-963e-be8963f06d21",
      finalidades: [
        {
          label: "Venda",
          href: "/busca/?tipo=Terreno%20Canal&finalidade=Venda",
        },
        {
          label: "Aluguel",
          href: "/busca/?tipo=Terreno%20Canal&finalidade=Aluguel",
        },
        {
          label: "Temporada",
          href: "/busca/?tipo=Terreno%20Canal&finalidade=Temporada",
        },
      ],
    },
  ],
}: Props) {
  return (
    <div class="flex flex-col mb-[25px] lg:mb-[10px]">
      <h2 class="font-medium text-secondary text-[26px] lg:text-[39px] mb-[30px] lg:mb-[60px] text-center leading-[1.5]">
        {title}
      </h2>

      <div class="bg-secondary relative flex flex-col lg:flex-row items-center">
        {curadorias.map((curadoria, index) => (
          <div
            class={clx(
              "w-[350px] h-[150px] lg:mx-[15px] lg:w-1/4 lg:h-[550px] lg:flex lg:justify-center",
              index !== 0 && "mb-5 lg:mb-0"
            )}
          >
            <CuradoriaItem curadoria={curadoria} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}
