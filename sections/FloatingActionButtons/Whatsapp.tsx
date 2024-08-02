import Icon from "site/components/ui/Icon.tsx";

export interface Props {
  url: string;
}

export default function Whatsapp({ url }: Props) {
  return (
    <div class="fixed right-[15px] z-50 bottom-20 flex items-center">
      <div class="py-[5px] px-[15px] leading-[21px] text-[14.3px] whitespace-nowrap text-neutral font-normal rounded-[10px] bg-white shadow-[0_1.93465px_7.73859px_rgba(0,0,0,0.15)] mr-[15px]">
        <p>Fale com nossa especialista</p>
      </div>
      <span class="relative w-[60px] h-[60px] bg-[#48e66f] animate-pulse-back an rounded-[50px] flex items-center justify-center">
        <a href={url} target="_blank" class="text-white">
          <Icon id="WhatsApp" size={34} />
        </a>
        <div class="absolute bg-[#d00] rounded-[50px] w-5 h-5 -top-[5px] -right-[5px] flex items-center justify-center text-white text-[13px]">
          1
        </div>
      </span>
    </div>
  );
}
