import { ICuradoria } from "site/sections/Curadoria.tsx";
import { clx } from "site/sdk/clx.ts";
import Image from "apps/website/components/Image.tsx";
import { useState } from "preact/hooks";

export default function CuradoriaItem({
  curadoria,
  index,
}: {
  curadoria: ICuradoria;
  index: number;
}) {
  const [viewFinalidades, setViewFinalidades] = useState(false);

  const isMobile = globalThis.innerWidth < 768;

  return (
    <>
      <div
        onClick={() => isMobile && setViewFinalidades(!viewFinalidades)}
        onMouseEnter={() => !isMobile && setViewFinalidades(true)}
        onMouseLeave={() => !isMobile && setViewFinalidades(false)}
        htmlFor={`curadoria-${index}`}
        class={clx(
          "relative w-full h-full overflow-hidden lg:max-w-[350px]",
          index === 0 ? "-top-5 lg:-top-[40px]" : "lg:-top-[40px]"
        )}
      >
        {curadoria.image && (
          <>
            <img
              src={curadoria.image}
              class="w-full h-full absolute top-0 left-0 object-cover"
              width={350}
              height={150}
              alt={curadoria.label}
            />

            <div class="w-full h-full absolute top-0 left-0 bg-black opacity-[0.4] lg:curadoria-gradient lg:opacity-100"></div>

            <div
              class={clx(
                "absolute left-5 z-10 w-[90%] transition-all duration-500",
                viewFinalidades ? "bottom-[70px]" : "bottom-10"
              )}
            >
              <h3 class="font-normal text-[26px] text-base-100">
                {curadoria.label}
              </h3>
            </div>
            <div
              class={clx(
                "absolute bg-[#a92d13c7] w-full h-[60px] left-0 transition-all duration-500 flex",
                viewFinalidades ? "bottom-0" : "-bottom-[60px]"
              )}
            >
              {curadoria.finalidades?.map(({ label, href }) => (
                <a
                  href={href}
                  class="bg-transparent hover:bg-[#a92d13c7] w-1/3 h-[60px] flex items-center justify-center text-base-100 text-[13px] font-bold"
                >
                  {label}
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
