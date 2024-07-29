import { useState } from "preact/hooks";
import Icon from "site/components/ui/Icon.tsx";

interface Props {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function SimpleSelect({ options, value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    onChange(value);
    setOpen(false);
  };

  return (
    <div className="relative w-[200px]">
      <div
        className="w-full flex items-center border border-black h-[33px] px-[5px] cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="flex w-full justify-between text-[12.064px] items-center whitespace-pre">
          {value}
          <Icon id="ChevronDown" size={16} />
        </span>
      </div>

      {open && (
        <ul className="w-full absolute z-30 top-full bg-white border border-black border-t-0">
          {options.map((option) => (
            <li
              className="w-full py-2 px-[15px] hover:bg-black text-black hover:text-white cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              <span className="flex text-[12.064px] items-baseline whitespace-pre">
                {option}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
