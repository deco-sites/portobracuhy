import { useState } from "preact/hooks";
import SimpleSelect from "site/islands/SimpleSelect.tsx";
import Icon from "site/components/ui/Icon.tsx";

function slugify(str: string) {
  return String(str)
    .normalize("NFKD") // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
}

const options = [
  "Mais recente",
  "Maior preço",
  "Menor preço",
  "Mais dormitório",
  "Menos dormitório",
  "Menor área",
  "Maior área",
];

export default function OrderBy({
  initialOrderBy,
}: {
  initialOrderBy: string | null;
}) {
  const [selectedOption, setSelectedOption] = useState(
    options.find((opt) => slugify(opt) === initialOrderBy) || options[0]
  );

  const handleSelect = (value: string) => {
    if (value === selectedOption) return;

    setSelectedOption(value);

    const orderedUrl = new URL(window.location.href);
    orderedUrl.searchParams.set("ordenar", slugify(value));
    window.location.href = orderedUrl.href;
  };

  return (
    <div class="flex items-end">
      <Icon id="Sort" width={12.19} height={19} class={"p-[7px] pl-0 mr-[5px] box-content"} />

      <div class="flex flex-col">
        <span class="text-[13px] font-bold text-black">Ordenar por</span>

        <SimpleSelect
          options={options}
          value={selectedOption}
          onChange={handleSelect}
        />
      </div>
    </div>
  );
}
