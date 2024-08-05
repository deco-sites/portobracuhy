import { AppContext } from "site/apps/site.ts";
import { SectionProps } from "deco/types.ts";
import { Imovel } from "site/sdk/types.ts";
import { useId } from "site/sdk/useId.ts";
import Slider from "site/components/ui/Slider.tsx";
import Icon, { AvailableIcons } from "site/components/ui/Icon.tsx";
import { getPrice } from "site/sdk/getPrice.ts";
import { stringToCurrency } from "site/sdk/stringToCurrency.ts";
import PropertyProposal from "site/islands/PropertyProposal.tsx";
import { getCaracteristicas } from "site/sdk/getCaracteristicas.ts";
import WishlistButton from "site/islands/WishlistButton.tsx";

export interface Props {
  /** @description Use para forçar um id de imóvel, deixe em branco para consultar da URL */
  imovelId?: string;
  /** @description Email de contato usado no botão de compartilhamento do imóvel */
  shareEmail?: string;
}

export default function PropertyDetails({
  imovel,
  url,
  shareEmail,
}: SectionProps<typeof loader>) {
  const id = useId();
  const photos = imovel.Foto ? Object.values(imovel.Foto) : [];

  const showValorDiariaAlta =
    imovel.ExibirValorDiariaBaixa &&
    imovel.VlrDiariaBaixa &&
    imovel.ValorDiaria &&
    Number(imovel.ValorDiaria) > Number(imovel.VlrDiariaBaixa);

  const getAdditionalCaracteristics = (imovel: Imovel) => {
    if (!imovel.Caracteristicas) return [];

    const caracteristicas = [];

    for (const [key, value] of Object.entries(imovel.Caracteristicas)) {
      if (value === "Sim") {
        caracteristicas.push(key);
      }
    }

    return caracteristicas;
  };

  const getAdditionalInfras = (imovel: Imovel) => {
    if (!imovel.InfraEstrutura) return [];

    const infras = [];

    for (const [key, value] of Object.entries(imovel.InfraEstrutura)) {
      if (value === "Sim") {
        infras.push(key);
      }
    }

    return infras;
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .icomoon-AreaTotal::before {
            content: "\\e902";
          }

          .icomoon-AreaPrivativa::before {
            content: "\\e901";
          }

          .icomoon-Dormitorios::before {
            content: "\\e908";
          }

          .icomoon-BanheiroSocialQtd::before {
            content: "\\e903";
          }

          .icomoon-Vagas::before {
            content: "\\e911";
          }
        `,
        }}
      />

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

        <div class="absolute top-1/2 -translate-y-1/2 left-0 w-full flex justify-between px-[10px] lg:px-[5%]">
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

      <div class="flex flex-col mx-auto w-full lg:w-[90%] px-[15px] mt-[30px]">
        <div class="flex flex-col pb-[15px] border-b border-black">
          <small class="w-max py-[1px] px-[5px] text-[16.77px] font-light leading-[20px] text-base-200 border border-base-200">
            Cód: {imovel.Codigo}
          </small>

          <div class="flex flex-col lg:flex-row">
            <h1 class="text-secondary text-[26px] font-black lg:text-[41.6px] w-full">
              {imovel.Categoria}
            </h1>

            <div class="flex justify-end w-full items-center gap-5 h-[58px]">
              <div class="hidden lg:block">
                <WishlistButton size={39} imovelId={imovel.Codigo} />
              </div>
              <div class="block lg:hidden">
                <WishlistButton size={32} imovelId={imovel.Codigo} />
              </div>
              {/* The button to open modal */}
              <label
                htmlFor="share_modal"
                className="bg-transparent outline-none border-none cursor-pointer"
              >
                <Icon id="Share" size={32} class="text-black hover:text-secondary block lg:hidden" />
                <Icon id="Share" size={39} class="text-black hover:text-secondary hidden lg:block" />
              </label>

              {/* Put this part before </body> tag */}
              <input
                type="checkbox"
                id="share_modal"
                className="modal-toggle"
              />
              <div className="modal" role="dialog">
                <div className="modal-box w-[70%] lg:w-1/2 max-w-none pb-[30px] lg:pb-[150px] rounded-[6px] shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                  <h3 className="text-[19.5px] lg:text-[39px] font-normal text-center mb-[30px]">
                    Compartilhe
                  </h3>
                  <div class="flex justify-around w-full items-center">
                    <a
                      href={`http://www.facebook.com/sharer/sharer.php?u=${url}&t=`}
                      class="bg-[#0a246a] text-white rounded-full h-[35px] lg:h-max py-[6px] px-[15px] lg:py-[22px] lg:px-[33px] flex items-center justify-center"
                      target="_blank"
                    >
                      <Icon
                        id="FacebookLetter"
                        width={8}
                        height={13}
                        class="block lg:hidden"
                      />
                      <Icon
                        id="FacebookLetter"
                        width={32}
                        height={53}
                        class="hidden lg:block"
                      />
                    </a>

                    <a
                      href={`http://api.whatsapp.com/send?text= - ${url}`}
                      class="bg-[#159d0d] text-white rounded-full py-[6px] px-[15px] lg:py-[22px] lg:px-[26px] h-[35px] lg:h-max flex items-center justify-center"
                      target="_blank"
                    >
                      <Icon
                        id="WhatsApp"
                        width={13}
                        height={13}
                        class="block lg:hidden"
                      />
                      <Icon
                        id="WhatsApp"
                        width={45}
                        height={53}
                        class="hidden lg:block"
                      />
                    </a>

                    <a
                      href={`mailto:${shareEmail}?subject=PORTO BRACUHY IMÓVEIS&body=Você visualizou um imóvel em nossa página. segue o endereço. ${url}`}
                      class="bg-secondary text-white rounded-full py-[6px] px-[15px] lg:py-[17px] lg:px-[17px] h-[35px] lg:h-max flex items-center justify-center"
                      target="_blank"
                    >
                      <Icon
                        id="Envelope"
                        width={13}
                        height={13}
                        class="block lg:hidden"
                      />
                      <Icon
                        id="Envelope"
                        width={52}
                        height={53}
                        class="hidden lg:block"
                      />
                    </a>

                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
                      class="bg-[#0c66c2] text-white rounded-full py-[6px] px-[15px] lg:py-[22px] lg:px-[26px] h-[35px] lg:h-max flex items-center justify-center"
                      target="_blank"
                    >
                      <Icon
                        id="LinkedinLetter"
                        width={13}
                        height={13}
                        class="block lg:hidden"
                      />
                      <Icon
                        id="LinkedinLetter"
                        width={45}
                        height={53}
                        class="hidden lg:block"
                      />
                    </a>
                  </div>
                </div>
                <label className="modal-backdrop" htmlFor="share_modal">
                  Close
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col lg:flex-row gap-[30px]">
          <div class="lg:w-3/4">
            <div class="flex flex-col pt-[30px] w-full">
              <div class="flex mb-5 w-full">
                <ol class="flex whitespace-pre font-medium text-base-200 text-[13px]">
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <span class="px-[5px]">{"> "}</span>
                    <a href={`/busca?tipo=${imovel.Categoria}`}>
                      Busca imóveis
                    </a>
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
              <span class="text-[13px] font-medium flex items-center gap-2 lg:text-[22.1px] mb-5">
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
              <span class="text-[19.5px] lg:text-[28.6px] font-medium flex items-center gap-2 flex-wrap">
                <Icon
                  class="text-[#87CE74] block lg:hidden"
                  id="DollarSign"
                  size={22}
                />
                <Icon
                  class="text-[#87CE74] hidden lg:block"
                  id="DollarSign"
                  size={39}
                />
                {getPrice(imovel)}
                <span class="font-normal text-info-content text-[19.5px] lg:text-[28.6px]">
                  {" - "} {imovel.Status}
                </span>
              </span>
              <div class="flex mt-[10px] mb-5">
                {imovel.ValorCondominio &&
                  Number(imovel.ValorCondominio) > 0 && (
                    <span class="text-[19.5px] lg:text-[22.1px] font-bold flex items-center gap-2 text-info-content">
                      Condomínio: {stringToCurrency(imovel.ValorCondominio)}
                    </span>
                  )}
                {imovel.ValorIptu && Number(imovel.ValorIptu) > 0 && (
                  <span
                    class={`text-[19.5px] lg:text-[22.1px] font-bold flex items-center gap- text-info-content ${
                      imovel.ValorCondominio
                        ? "border-l-2 border-accent pl-[10px] ml-[10px]"
                        : ""
                    }`}
                  >
                    IPTU: {stringToCurrency(imovel.ValorIptu)}
                  </span>
                )}
              </div>
              <div class="flex flex-col mb-[35px]">
                {imovel.ExibirValorDiariaBaixa && imovel.VlrDiariaBaixa && (
                  <>
                    {showValorDiariaAlta && (
                      <div class="text-[18px] p-2 border-t border-[#ddd] font-bold flex items-center gap-2 text-base-200">
                        <span class="w-2/3">Vlr Diaria Alta</span>
                        <span>{stringToCurrency(imovel.ValorDiaria)}</span>
                      </div>
                    )}
                    <div class="text-[18px] p-2 border-t border-[#ddd] font-bold flex items-center gap-2 text-base-200">
                      <span class="w-2/3">Vlr Diaria Baixa</span>
                      <span>{stringToCurrency(imovel.VlrDiariaBaixa)}</span>
                    </div>
                  </>
                )}
              </div>

              <div class="flex justify-around w-full h-12 mt-auto border border-black mb-[55px]">
                {getCaracteristicas(imovel).map(({ label, value, icon }) => (
                  <div class="flex flex-col items-center justify-center">
                    {icon.charAt(0) !== "e" ? (
                      <Icon id={label as AvailableIcons} size={16} />
                    ) : (
                      <i
                        class={`font-icomoon icomoon-${label} not-italic font-black`}
                      ></i>
                    )}
                    <span class="text-[11.375px] font-medium">
                      {label === "AreaTotal" || label === "AreaPrivativa"
                        ? `${Number(value).toFixed(2).replaceAll(".", ",")} m²`
                        : value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="collapse collapse-plus bg-transparent mb-[70px]">
                <input type="checkbox" checked />
                <div className="collapse-title min-h-0 flex items-center justify-between p-0 pb-[10px] mb-[30px] text-info-content text-[24.7px] font-light border-b border-[#ccc] after:!leading-none after:!text-[42px] after:!font-normal after:!static after:!h-auto after:!w-auto">
                  Outras características
                </div>
                <div className="collapse-content p-0">
                  <div class="flex gap-[15px] flex-wrap pb-5 shadow-[0px_12px_8px_-16px_#111]">
                    {getAdditionalCaracteristics(imovel).map((carac) => (
                      <div class="flex justify-center items-center bg-[#ddd] rounded-[25px] py-[5px] px-5 text-[#383939] font-normal text-[13px] lg:text-[15.6px] font-slab">
                        {carac}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="collapse collapse-plus bg-transparent mb-[70px]">
                <input type="checkbox" checked />
                <div className="collapse-title min-h-0 flex items-center justify-between p-0 pb-[10px] mb-[30px] text-info-content text-[24.7px] font-light border-b border-[#ccc] after:!leading-none after:!text-[42px] after:!font-normal after:!static after:!h-auto after:!w-auto">
                  Infraestrutura
                </div>
                <div className="collapse-content p-0">
                  <div class="flex gap-[15px] flex-wrap pb-5 shadow-[0px_12px_8px_-16px_#111]">
                    {getAdditionalInfras(imovel).map((infra) => (
                      <div class="flex justify-center items-center bg-[#ddd] rounded-[25px] py-[5px] px-5 text-[#383939] font-normal text-[13px] lg:text-[15.6px] font-slab">
                        {infra}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:w-1/4">
            <PropertyProposal />
          </div>
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
    "ExibirValorDiariaBaixa",
    "VlrDiariaBaixa",
    "ValorCondominio",
    "ValorIptu",
    "Caracteristicas",
    "InfraEstrutura",
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

  if (ctx.seo) {
    ctx.seo.title = `${imovel.Categoria}`;
  }

  return {
    ...props,
    imovelId,
    imovel,
    url: req.url,
  };
}
