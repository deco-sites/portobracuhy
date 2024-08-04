import { useEffect, useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";

interface Props {
  imovelId?: string;
}

export default function WishlistButton({ imovelId }: Props) {
  const [isOnWishlist, setIsOnWishlist] = useState(false);

  const handleClick = (e: JSX.TargetedEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const isOnWishlist = wishlist.some((i: any) => i.imovelId === imovelId);

    if (isOnWishlist) {
      const newWishlist = wishlist.filter((i: any) => i.imovelId !== imovelId);
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      setIsOnWishlist(false);
    } else {
      const newWishlist = [...wishlist, { imovelId }];
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      setIsOnWishlist(true);
    }
  };

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const isOnWishlist = wishlist.some((i: any) => i.imovelId === imovelId);
    setIsOnWishlist(isOnWishlist);
  }, [imovelId]);

  return (
    <button
      onClick={handleClick}
      class="bg-transparent outline-none border-none"
    >
      <span
        style={{
          textShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        }}
        class={`font-icomoon ${
          isOnWishlist ? "text-[#ff4646]" : "text-white"
        } hover:text-[#ff4646] text-[30px]`}
      >
        
      </span>
    </button>
  );
}
