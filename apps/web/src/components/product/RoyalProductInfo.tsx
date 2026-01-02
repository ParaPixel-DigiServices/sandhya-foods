import { useCart } from "@/store/cart";

export default function RoyalProductInfo({ product }: { product: any }) {
  const add = useCart((s) => s.add);
  return (
    <div className="space-y-12">
      <div className="flex items-center gap-6">
        <div className="h-px w-24 bg-gold" />
        <span className="uppercase tracking-[0.45em] text-xs text-gold">
          Heritage of Rajasthan
        </span>
      </div>

      <h1 className="font-royal text-[2.6rem] sm:text-[3.8rem] leading-[1.05] text-royal">
        {product.name}
      </h1>

      <p className="max-w-xl text-lg leading-relaxed">{product.description}</p>

      {/* Royal Price Seal */}
      <div
        className="
        inline-block
        px-8 py-3
        rounded-full
        bg-[#7A1A14]
        text-white
        border-2 border-white
        text-[1.6rem] sm:text-[2rem]
        shadow-xl
      "
      >
        ₹ {product.price}
      </div>

      <button
        onClick={() =>
          add({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.product_images?.find((i) => i.is_primary)?.url,
            qty: 1,
          })
        }
        className="
        block
        px-16 py-4
        rounded-full
        bg-[radial-gradient(circle_at_top,#FFE39B,#D4AF37)]
        uppercase tracking-[0.4em] text-xs font-semibold
        text-[#5C3A00]
        shadow-xl
      "
      >
        Add To Cart
      </button>
    </div>
  );
}
