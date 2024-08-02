import { JSX } from "preact/jsx-runtime";
import { invoke } from "site/runtime.ts";

export default function PropertyProposal() {
  const handlePhoneInput = (e: JSX.TargetedInputEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value.replace(/\D/g, ""); // Remove all non-numeric characters

    if (value.length > 11) {
      value = value.substring(0, 11); // Limit to 11 digits
    }

    if (value.length > 6) {
      value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    } else if (value.length > 0) {
      value = value.replace(/^(\d{0,2})/, "($1");
    }

    e.currentTarget.value = value;
  };

  const handleSubmit = async (e: JSX.TargetedEvent<HTMLFormElement>) => {
    // const { name, fone, email, msg, productID } = e.currentTarget;
    e.preventDefault();
    console.log("Chegou no submit!");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("nome") as string;
    const fone = formData.get("fone") as string;
    const email = formData.get("email") as string;
    const msg = formData.get("msg") as string;
    const aceito = formData.get("aceito") as string;
    console.log(aceito, "aceito!");

    const data = await invoke["site"].actions.createClient({
      name,
      fone,
      email,
      msg,
      aceito,
    });

    console.log(data, "data client");
  };

  return (
    <aside class="mt-[30px] mb-5 bg-info w-full shadow-[0px_4px_7px_#00000024] p-[25px]">
      <h3 class="text-secondary text-[16.9px] font-normal mb-[25px]">
        Proposta
      </h3>

      <form onSubmit={handleSubmit} class="flex flex-col gap-5">
        <input
          required
          class="h-10 text-[14px] py-[6px] px-3 border border-[#ccc] outline-none focus:border-black"
          type="text"
          placeholder="Nome"
          name="nome"
        />
        <input
          required
          class="h-10 text-[14px] py-[6px] px-3 border border-[#ccc] outline-none focus:border-black"
          type="text"
          placeholder="Telefone"
          name="fone"
          onInput={handlePhoneInput}
        />
        <input
          required
          class="h-10 text-[14px] py-[6px] px-3 border border-[#ccc] outline-none focus:border-black"
          type="email"
          placeholder="E-mail"
          name="email"
        />
        <textarea
          required
          rows={6}
          class="py-[6px] px-3 text-[14px] border border-[#ccc] outline-none focus:border-black resize-none"
          placeholder="Mensagem"
          name="msg"
        />
        <div class="flex gap-1">
          <input type="checkbox" required name="aceito" />
          <label class="text-[13px]">
            {" "}
            Li e aceito a{" "}
            <a
              href="/politica-de-privacidade/"
              class="text-secondary hover:text-base-200"
            >
              política de privacidade
            </a>
          </label>
        </div>

        <button
          type="submit"
          class="w-full bg-secondary text-white h-10 flex justify-center items-center text-[13px] font-bold"
        >
          Enviar
        </button>
      </form>
    </aside>
  );
}
