import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect, useState } from "preact/hooks";
import Icon from "site/components/ui/Icon.tsx";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    if (IS_BROWSER) {
      globalThis.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    globalThis.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        setShow(true);
      } else {
        setShow(false);
      }
    });

    return () => {
      globalThis.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <button
      onClick={handleClick}
      class={`${
        !show ? "opacity-0 pointer-events-none" : "opacity-100"
      } group z-50 transition-all duration-200 ease-in-out bg-black hover:bg-secondary border-none outline-none rounded-full fixed right-5 bottom-5 w-[50px] h-[50px] flex justify-center items-center text-white`}
    >
      <Icon
        id="ChevronUp"
        size={24}
        class={`opacity-30 group-hover:opacity-70 transition-opacity duration-200`}
      />
    </button>
  );
}
