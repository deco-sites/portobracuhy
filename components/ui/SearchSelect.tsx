import { useEffect, useState } from "preact/hooks";
import Icon from "site/components/ui/Icon.tsx";
import { clx } from "site/sdk/clx.ts";

interface Props {
  label: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  options: string[];
  onChange?: (value: string) => void;
  barClass?: string;
  opened?: boolean;
  setOpened?: () => void;
  variant?: "default" | "small";
  showFooter?: boolean;
  allowMultipleSelection?: boolean;
}

export default function SearchSelect({
  label,
  searchable,
  searchPlaceholder,
  options,
  onChange,
  barClass,
  opened,
  setOpened,
  variant = "default",
  showFooter = true,
  allowMultipleSelection = true,
}: Props) {
  const [search, setSearch] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectOption = (option: string) => {
    if (!allowMultipleSelection) {
      setSelectedOptions([option]);
      return;
    }

    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleSelectAll = () => {
    if (selectedOptions.length === options.length) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions(options);
    }
  };

  const isOptionSelected = (option: string) => {
    return selectedOptions.includes(option);
  };

  const getLabel = () => {
    if (selectedOptions.length === 1) {
      return selectedOptions[0];
    } else if (selectedOptions.length > 1) {
      return `${selectedOptions.length} selecionados`;
    } else {
      return label;
    }
  };

  useEffect(() => {
    if (onChange) {
      onChange(search);
    }
  }, [search]);

  return (
    <div class="relative w-full">
      <div
        onClick={setOpened}
        class={clx(
          "flex group items-center justify-between w-full",
          variant === "default"
            ? "h-[60px] lg:h-16 pb-[10px] lg:pb-0 px-[15px] shadow-[0px_3px_7px_#00000059]"
            : "h-[35px] py-[6px] px-3 border border-accent",
          barClass
        )}
      >
        <span
          class={clx(
            variant === "default"
              ? "text-[16.705px] text-[#4a4a4a]"
              : "text-[13px] text-base-200 font-light"
          )}
        >
          {getLabel()}
        </span>
        <span
          class={clx(
            "text-neutral",
            "group-hover:text-secondary",
            opened && "rotate-180 text-secondary",
            "transition-colors"
          )}
        >
          <Icon
            id="CaretDown"
            width={variant === "default" ? 17.5 : 16}
            height={variant === "default" ? 29 : 8}
          />
        </span>
      </div>

      {opened && (
        <div class="flex flex-col absolute z-30 top-full left-0 w-full min-h-6 border border-[#9b9b9b] p-[5px] bg-white font-slab">
          {searchable && (
            <div class="flex flex-col mb-[10px]">
              <div class="flex justify-between w-full">
                {searchPlaceholder && (
                  <label class="text-[13px] font-bold text-[#4a4a4a]">
                    {searchPlaceholder}
                  </label>
                )}
                <button
                  onClick={setOpened}
                  class="bg-transparent outline-none text-secondary text-[11px] ml-auto"
                >
                  Fechar
                </button>
              </div>
              <input
                class="w-full h-[35px] p-1 border border-[#aaa]"
                type="text"
                value={search}
                onInput={(e) => setSearch(e.currentTarget.value)}
              />
            </div>
          )}
          <ul class="flex flex-col max-h-[200px] overflow-y-auto">
            {filteredOptions.map((option) => (
              <li
                class={clx(
                  "flex items-center gap-[5px] w-full p-[6px] cursor-pointer text-[14px]",
                  isOptionSelected(option) && "bg-neutral text-white"
                )}
                onClick={() => handleSelectOption(option)}
              >
                {isOptionSelected(option) && allowMultipleSelection ? (
                  <Icon id="SquareCheck" width={12} height={25} />
                ) : (
                  allowMultipleSelection && (
                    <Icon id="Square" width={12} height={25} />
                  )
                )}
                {option}
              </li>
            ))}
          </ul>
          {showFooter && (
            <div class="bg-[#eee] flex flex-col items-start gap-[2.6px] border-t border-[#9b9b9b] pt-[4.375px] pr-[4.375px] pl-[6.125px] font-sans">
              {allowMultipleSelection && (
                <>
                  <button
                    onClick={handleSelectAll}
                    class="pl-[12.23px] text-[12px] font-semibold hover:text-secondary border-none outline-none bg-transparent"
                  >
                    Marcar todos
                  </button>
                  <button
                    onClick={handleSelectAll}
                    class="pl-[12.23px] text-[12px] font-semibold hover:text-secondary border-none outline-none bg-transparent"
                  >
                    Desmarcar todos
                  </button>
                </>
              )}
              <button
                onClick={setOpened}
                class="pl-[12.23px] text-[12px] font-semibold hover:text-secondary border-none outline-none bg-transparent"
              >
                Confirmar
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
