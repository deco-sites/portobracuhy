import Icon from "site/components/ui/Icon.tsx";

export interface Props {
  /** @description Titulo da seção de contato */
  title?: string;
  /** @description Número do whatsapp */
  whatsapp?: string;
  /** @description Link para o whatsapp */
  whatsappUrl?: string;
  /** @description Número do telefone */
  telephone?: string;
  /** @description Número de telefone alternativo */
  alternateTelephone?: string;
  /** @description E-mail de contato */
  email?: string;
  /** @description Localização */
  location?: string;
}
export default function ContactInformation({
  title,
  whatsapp,
  whatsappUrl,
  telephone,
  alternateTelephone,
  email,
  location,
}: Props) {
  return (
    <div class="w-full mx-auto px-[15px] lg:w-[90%] mt-[100px]">
      <div class="flex flex-col px-[15px]">
        <h2 class="text-[26.026px] mb-10 font-black text-base-200">{title}</h2>

        {whatsapp && (
          <a
            href={whatsappUrl}
            target="_blank"
            class="flex gap-[15px] items-center mb-[10px] text-[14.196px] lg:text-[17.745px] text-base-200 hover:text-secondary font-light leading-[32px]"
          >
            <Icon id="WhatsApp" size={23} />
            <span>{whatsapp}</span>
          </a>
        )}

        {telephone && (
          <a
            class="flex gap-[15px] mb-[10px] text-[14.196px] lg:text-[17.745px] text-base-200 hover:text-secondary font-light leading-[32px]"
            href={`tel:${telephone?.replace(/\D/g, "")}`}
          >
            <Icon id="Phone" size={23} />
            <span>{telephone}</span>
          </a>
        )}

        {alternateTelephone && (
          <a
            class="flex gap-[15px] mb-[10px] text-[14.196px] lg:text-[17.745px] text-base-200 hover:text-secondary font-light leading-[32px]"
            href={`tel:${alternateTelephone?.replace(/\D/g, "")}`}
          >
            <Icon id="Phone" size={23} />
            <span>{alternateTelephone}</span>
          </a>
        )}

        {email && (
          <a
            href={`mailto:${email}`}
            class="flex gap-[15px] items-center mb-[10px] text-[14.196px] lg:text-[17.745px] text-base-200 hover:text-secondary font-light leading-[32px]"
          >
            <Icon id="Envelope" size={23} />
            <span>{email}</span>
          </a>
        )}

        {location && (
          <a
            href={`https://www.google.com/maps/search/${location}`}
            target="_blank"
            class="flex gap-[15px] items-center mb-[10px] text-[14.196px] lg:text-[17.745px] text-base-200 hover:text-secondary font-light leading-[32px]"
          >
            <Icon id="LocationDot" size={23} />
            <span>{location}</span>
          </a>
        )}
      </div>
    </div>
  );
}
