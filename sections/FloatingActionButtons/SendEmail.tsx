import Icon from "site/components/ui/Icon.tsx";

export interface Props {
  label?: string;
  href?: string;
}

export default function SendEmail({
  label = "Envie um e-mail",
  href = "mailto:contato@portobracuhy.com.br",
}: Props) {
  return (
    <div class="fixed right-0 top-[180px] z-50 cursor-pointer">
      <div class="w-[58px] h-[56px] flex justify-center items-center relative group">
        <div class="absolute -z-10 -right-[300px] bg-secondary w-auto whitespace-nowrap group-hover:right-0 transition-all duration-[0.8s] block float-right h-[55px] pr-[58px]">
          <a
            class="uppercase pl-[25px] pr-[5px] text-[12px] leading-[50px] block tracking-[3px]"
            href={href}
          >
            {label}
          </a>
        </div>
        <div class="text-black w-[58px] h-[55px] bg-secondary rounded-l-[5px] flex items-center justify-center">
          <Icon id="Envelope" size={26} />
        </div>
      </div>
    </div>
  );
}
