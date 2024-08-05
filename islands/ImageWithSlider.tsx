import { useState } from "preact/hooks";
import Image from "apps/website/components/Image.tsx";
import { Imovel } from "site/sdk/types.ts";
import Icon from "site/components/ui/Icon.tsx";
import { JSX } from "preact/jsx-runtime";

interface Props {
  imovel: Imovel;
}

export default function ImageWithSlider({ imovel }: Props) {
  const [currentImage, setCurrentImage] = useState(0);

  const handlePrev = (e: JSX.TargetedEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (currentImage === 0) {
      setCurrentImage(Object.values(imovel.Foto!).length - 1);
    } else {
      setCurrentImage(currentImage - 1);
    }
  };

  const handleNext = (e: JSX.TargetedEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (currentImage === Object.values(imovel.Foto!).length - 1) {
      setCurrentImage(0);
    } else {
      setCurrentImage(currentImage + 1);
    }
  };

  return (
    <div class="relative w-full h-full">
      <Image
        class="w-full h-full object-cover"
        src={Object.values(imovel.Foto!)[currentImage].Foto}
        width={551}
        height={360}
      />

      <div class="absolute top-1/2 -translate-y-1/2 left-0 w-full flex justify-between px-[2px]">
        <button
          onClick={handlePrev}
          class="bg-white outline-none rounded-[30px] h-[25px] w-[18.5px] py-[1px] px-[6px] flex justify-center items-center text-black group"
        >
          <Icon id="ChevronLeft" width={6} height={13} />
        </button>

        <button
          onClick={handleNext}
          class="bg-white outline-none rounded-[30px] h-[25px] w-[18.5px] py-[1px] px-[6px] flex justify-center items-center text-black group"
        >
          <Icon id="ChevronLeft" width={6} height={13} class="rotate-180" />
        </button>
      </div>
    </div>
  );
}
