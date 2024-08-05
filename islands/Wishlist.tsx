import { useEffect, useState } from "preact/hooks";
import { Imovel } from "site/sdk/types.ts";
import { invoke } from "site/runtime.ts";
import ShelfItem from "site/components/ui/ShelfItem.tsx";

export interface Props {
  /** @description Marque para exibir o formulário de envio de favoritos por e-mail */
  /** @default true */
  showForm?: boolean;
}

export default function Wishlist({ showForm = true }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [imoveis, setImoveis] = useState<Imovel[]>([]);

  const getWishlist = async () => {
    try {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

      if (wishlist.length === 0) return;

      const data = await invoke["site"].actions.getImoveis({
        imoveisId: wishlist,
      });

      setImoveis(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <>
      <div class="flex flex-col-reverse lg:flex-row mx-auto w-full max-w-[1280px] px-[15px]">
        <div class="flex flex-wrap lg:w-9/12">
          {isLoading && (
            <div class="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-secondary mx-auto" />
          )}

          {!isLoading &&
            imoveis?.map((imovel: Imovel) => (
              <div class="w-full lg:w-1/2 px-[15px] mb-[15px]">
                <ShelfItem
                  imovel={imovel}
                  isWishlist
                  removeCallback={() => {
                    setImoveis(
                      imoveis.filter((i) => i.Codigo !== imovel.Codigo)
                    );
                  }}
                />
              </div>
            ))}
        </div>

        <div class="flex flex-col lg:w-1/4">
          {showForm && (
            <div class="flex flex-col w-full p-[15px] text-base-200 pt-[50px] pb-[30px]">
              <div class="flex flex-col">
                <h3 class="text-[16.705px] font-normal mb-[25px]">
                  Enviar por e-mail
                </h3>
                <input
                  class="py-[6px] px-3 h-10 text-[14px] mb-5 border border-[#ccc] outline-none focus:border-[#000]"
                  type="text"
                  placeholder="E-mail"
                />
                <button class="w-full bg-secondary text-white text-[13px] uppercase flex justify-center items-center h-10 font-bold">
                  Enviar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
