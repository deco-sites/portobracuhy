interface Props {
  placeholder?: string;
  isCurrency?: boolean;
}

export default function TextInput({ placeholder, isCurrency }: Props) {
  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;

    if (isCurrency) {
      const value = target.value
        .replace(/\D/g, "")
        .replace(/(\d)(\d{2})$/, "$1,$2")
        .replace(/(?=(\d{3})+(\D))\B/g, ".");

      target.value = "R$ " + value;
      target.setSelectionRange(target.value.length, target.value.length);
    }
  };

  return (
    <input
      type="text"
      className="w-full border border-accent text-[13px] text-base-200 font-light placeholder:font-light placeholder:text-base-200 py-[6px] px-3 outline-none"
      placeholder={placeholder}
      onInput={handleInput}
    />
  );
}
