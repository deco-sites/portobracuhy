import { AppContext } from "site/apps/site.ts";
import { SectionProps } from "deco/types.ts";
import { Imovel } from "site/sdk/types.ts";
import { useId } from "site/sdk/useId.ts";
import Slider from "site/components/ui/Slider.tsx";
import Icon from "site/components/ui/Icon.tsx";

export interface Props {
  /** Use para forçar um id de imóvel, deixe em branco para consultar da URL */
  imovelId?: string;
}

export default function PropertyDetails({
  imovel,
}: SectionProps<typeof loader>) {
  const id = useId();
  const photos = imovel.Foto ? Object.values(imovel.Foto) : [];

  return (
    <>
      <div id={id} class="relative">
        <Slider class="carousel carousel-center w-full h-[435px]">
          {photos.map(({ Foto }, index) => (
            <Slider.Item index={index} class="carousel-item w-full lg:w-1/3">
              <img
                src={Foto}
                class="object-cover w-full h-full"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </Slider.Item>
          ))}
        </Slider>

        <div class="absolute top-1/2 -translate-y-1/2 left-0 w-full flex justify-between px-[10px]">
          <Slider.PrevButton
            class="bg-secondary w-[32px] h-[38px] flex justify-center items-center text-white group"
            disabled={false}
          >
            <Icon
              id="ChevronLeft"
              size={24}
              class="group-disabled:opacity-25"
            />
          </Slider.PrevButton>

          <Slider.NextButton
            class="bg-secondary w-[32px] h-[38px] flex justify-center items-center text-white group"
            disabled={false}
          >
            <Icon
              id="ChevronLeft"
              size={24}
              class="rotate-180 group-disabled:opacity-25"
            />
          </Slider.NextButton>
        </div>
      </div>
      <Slider.JS rootId={id} />

      <div class="mx-auto w-full lg:w-[90%] px-[15px] mt-[30px]">
        <div class="flex flex-col pb-[15px] border-b border-black">
          <small class="w-max py-[1px] px-[5px] text-[16.77px] font-light leading-[20px] text-base-200 border border-base-200">
            Cód: {imovel.Codigo}
          </small>

          <div class="flex flex-col lg:flex-row">
            <h1 class="text-secondary text-[26px] font-black lg:text-[41.6px]">
              {imovel.Categoria}
            </h1>

            <div class="flex justify-end w-full items-center gap-5 h-[58px]">
              <button class="bg-transparent outline-none border-none">
                <span
                  style={{
                    textShadow: "0 0 4px #2B4C5A",
                  }}
                  class="font-icomoon text-white text-[32px] lg:text-[39px]"
                >
                  
                </span>
              </button>
              <button class="bg-transparent outline-none border-none">
                <Icon id="Share" size={32} class="text-black block lg:hidden" />
                <Icon id="Share" size={39} class="text-black hidden lg:block" />
              </button>
            </div>
          </div>
        </div>

        <div class="flex flex-col pt-[30px] w-full">
          <div class="flex mb-5 w-full">
            <ol class="flex whitespace-pre font-medium text-base-200 text-[13px]">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <span class="px-[5px]">{"> "}</span>
                <a href={`/busca?tipo=${imovel.Categoria}`}>Busca imóveis</a>
                <span class="px-[5px]">{"> "}</span>
              </li>
            </ol>
          </div>
          {imovel.DescricaoWeb && (
            <div
              class="text-[18.2px] font-light leading-[23.66px] mb-[30px]"
              dangerouslySetInnerHTML={{
                __html: imovel.DescricaoWeb.replaceAll("\r\n", "<br />"),
              }}
            />
          )}
          <span class="text-[13px] font-medium flex items-center gap-2 lg:text-[22.1px]">
            <Icon
              class="text-[#ff4646] block lg:hidden"
              id="LocationDot"
              size={22}
            />
            <Icon
              class="text-[#ff4646] hidden lg:block"
              id="LocationDot"
              size={31}
            />{" "}
            {imovel.Bairro} - {imovel.Cidade}/{imovel.UF}
          </span>
        </div>
      </div>
    </>
  );
}

export async function loader(props: Props, req: Request, ctx: AppContext) {
  let { imovelId } = props;

  if (!imovelId) {
    // get imovel id from url on format /imovel/{id}/*
    const [, , id] = new URL(req.url).pathname.split("/");
    imovelId = id.trim();
  }

  const fields = JSON.stringify([
    "Codigo",
    "Categoria",
    "Status",
    "DestaqueWeb",
    "Cidade",
    "Bairro",
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
    { Foto: ["Foto", "FotoPequena", "Destaque"] },
    "DescricaoWeb",
  ]);

  const apiRoute = `/imoveis/detalhes?imovel=${imovelId}&pesquisa={"fields":${fields}}`;

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
    throw new Error(content.message ?? "[Shelf] Error requesting shelf data");
  }

  const imovel = content as Imovel;

  return {
    ...props,
    imovelId,
    imovel,
  };
}
