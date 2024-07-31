import Icon from "site/components/ui/Icon.tsx";

export default function ShareButton() {
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link de pesquisa copiado para área de transferência!");
      }}
      class="bg-transparent border-none outline-none p-[7px] self-end text-info-content"
    >
      <Icon id="Share" size={19} />
    </button>
  );
}
