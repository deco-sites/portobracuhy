import Icon, { AvailableIcons } from "site/components/ui/Icon.tsx";

export interface Props {
  /** @description Título da seção */
  title?: string;
  services?: IService[];
}

export interface IService {
  /** @description Título do card */
  label?: string;
  /** @description Ícone do card */
  icon?: AvailableIcons;
  /** @description Texto do card */
  /** @format textarea */
  text?: string;
  /** @description Cor de fundo do card */
  /** @format color */
  backgroundColor?: string;
}

function ServiceCard({
  label = "Serviço",
  icon = "Deco",
  text = "Serviço de avaliação de imóveis",
  backgroundColor = "#f7fbf4",
}: IService) {
  return (
    <div
      style={{ backgroundColor: backgroundColor }}
      class="flex flex-col pt-20 pb-[45px] px-[25px] relative group overflow-hidden z-10 min-h-[440px]"
    >
      <div class="absolute -z-10 w-full h-full top-0 left-0 bg-secondary transition-transform -translate-x-full group-hover:translate-x-0 duration-[0.35s] delay-[0.05s]"></div>

      <div class="flex items-center justify-center mb-[25px] text-black group-hover:text-white transition-colors duration-[0.35s] delay-[0.05s]">
        <Icon id={icon} size={18} />
      </div>
      <div class="flex flex-col">
        <h3 class="text-2xl font-bold mb-[15px] text-center text-black group-hover:text-white transition-colors duration-[0.35s] delay-[0.05s]">
          {label}
        </h3>
        <p
          class="text-center text-black text-[18.2px] leading-[27px] font-light group-hover:text-white transition-colors duration-[0.35s] delay-[0.05s]"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
    </div>
  );
}

export default function Services({
  title = "Avaliação de Imóveis",
  services = [],
}: Props) {
  return (
    <div class="mx-auto max-w-[1280px] px-[15px] mt-[53px] pb-[45px]">
      <h2 class="text-secondary text-[39px] font-bold mb-10 text-center">
        {title}
      </h2>

      <div class="grid grid-cols-1 gap-[10px] sm:grid-cols-2 lg:grid-cols-3 lg:gap-[30px]">
        {services.map((service) => (
          <ServiceCard {...service} />
        ))}
      </div>
    </div>
  );
}
