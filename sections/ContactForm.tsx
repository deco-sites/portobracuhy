import { useSection } from "@deco/deco/hooks";
import { SectionProps } from "@deco/deco";
import type { AppContext } from "site/apps/deco/records.ts";
import { contacts } from "site/db/schema.ts";

export interface RadioOptionsField {
  label: string;
  options: string[];
  key: string;
}

export interface Field {
  label: string;
  placeholder?: string;
  type: "text" | "email" | "textarea";
  width?: "full" | "1/2" | "1/3" | "1/4";
  required?: boolean;
  key: string;
}

/** @description Campo de formulário: Field para campos de entrada de dados ou RadioOptionsField para campos de seleção  */
export type FormField = Field | RadioOptionsField;

export interface Props {
  /** @description Título */
  title?: string;
  /** @description Campos do formulário */
  fields?: FormField[];
  /** @description Texto do botão de envio */
  submitText?: string;
  /** @description Mensagem de sucesso ao enviar */
  successText?: string;
}

export default function ContactForm({
  title,
  fields,
  submitText = "Enviar Mensagem",
  successText = "Mensagem enviada com sucesso!",
  success,
}: SectionProps<typeof loader>) {
  const giveSpaceBetweenFields = (fieldIndex: number) => {
    const previousField = fields?.[fieldIndex - 1];

    if (!previousField) return;

    if ("options" in previousField) {
      return;
    }

    if (previousField.width !== "full") {
      return "pl-[30px]";
    }
  };

  // Url da section, será utilizada para submit do form e criação de novo contato.
  const createUrl = useSection<Props>({
    props: {
      title,
      fields,
      submitText,
    },
  });

  if (success) {
    return (
      <div class="w-full mx-auto px-[15px] lg:w-[90%] mt-[50px]">
        <h2 className="text-[23.66px] text-base-200 font-bold mb-10">
          {successText}
        </h2>
      </div>
    );
  }

  return (
    <div class="w-full mx-auto px-[15px] lg:w-[90%] mt-[50px]">
      <form
        hx-post={createUrl}
        hx-trigger="submit"
        hx-target="closest section"
        hx-swap="outerHTML"
        hx-boost="true"
        className="space-y-6 px-[15px]"
      >
        {title && (
          <h2 className="text-[23.66px] text-base-200 font-bold mb-10">
            {title}
          </h2>
        )}

        {fields?.map((field, index) => {
          if ("options" in field) {
            return (
              <div key={index} className="space-y-2">
                <label className="block text-[14.196px] font-normal text-base-200">
                  {field.label}
                </label>
                <div className="flex gap-5 flex-wrap">
                  {field.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center">
                      <input
                        type="radio"
                        name={field.key}
                        value={option}
                        id={`${field.key}-${option}`}
                        className="hidden peer"
                      />
                      <label
                        htmlFor={`${field.key}-${option}`}
                        className="text-[14.196px] text-base-200 hover:text-base-100 peer-checked:text-base-100 py-[5px] px-[25px] bg-base-100 border border-base-200 hover:bg-base-200 peer-checked:bg-base-200 transition-colors duration-[0.4s] cursor-pointer"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className={`${
                  field.width === "full"
                    ? "w-full"
                    : field.width === "1/2"
                    ? `w-1/2 inline-block ${giveSpaceBetweenFields(index)}`
                    : field.width === "1/3"
                    ? `w-1/3 inline-block ${giveSpaceBetweenFields(index)}`
                    : field.width === "1/4"
                    ? `w-1/4 inline-block ${giveSpaceBetweenFields(index)}`
                    : "w-full"
                }`}
              >
                <label className="block font-slab text-[14.196px] font-normal text-base-200">
                  {field.label}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    name={field.key}
                    rows={3}
                    placeholder={field.placeholder}
                    className="mt-[5px] text-[14px] block w-full py-[6px] px-3 border border-[#ccc] focus:border-base-200 outline-none"
                  />
                ) : (
                  <input
                    required={field.required}
                    name={field.key}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="mt-[5px] text-[14px] block w-full py-[6px] px-3 border border-[#ccc] focus:border-base-200 outline-none"
                  />
                )}
              </div>
            );
          }
        })}
        <button
          type="submit"
          className="block mx-auto py-[10px] px-[60px] text-[19px] font-medium text-white bg-secondary focus:outline-none"
        >
          {submitText}
        </button>
      </form>
    </div>
  );
}

export async function loader(
  props: Props,
  req: Request,
  { invoke }: AppContext
) {
  const drizzle = await invoke.records.loaders.drizzle();

  let success = false;

  if (req.body) {
    const newContact: Partial<typeof contacts.$inferInsert> = {};

    const formData = await req.formData();

    if (!formData) {
      throw new Error("Nenhum dado de formulário encontrado");
    }

    formData.forEach((value, key) => {
      newContact[key as keyof typeof contacts.$inferInsert] = value as any;
    });

    // Insere newContact no banco de dados
    await drizzle
      .insert(contacts)
      .values(newContact as typeof contacts.$inferInsert);

    success = true;
  }

  return { ...props, success };
}
