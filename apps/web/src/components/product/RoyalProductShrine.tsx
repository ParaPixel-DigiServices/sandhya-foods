export default function RoyalProductShrine({ product }:{ product:any }) {
  return (
    <div className="relative flex justify-center">

      {/* soft gold halo */}
      <div className="absolute -inset-16 bg-[radial-gradient(circle,rgba(212,175,55,0.16),transparent_70%)]
                      blur-3xl" />

      {/* floating museum plinth */}
      <div className="
        relative bg-white
        rounded-[2rem]
        shadow-[0_25px_70px_rgba(0,0,0,0.22)]
        px-3 py-3 sm:px-4 sm:py-4
        w-[78%] sm:w-[70%] lg:w-[64%]
      ">

        <div className="relative aspect-[3/4] flex items-center justify-center">
          <img
            src={product.product_images?.find(i=>i.is_primary)?.url}
            className="h-[72%] sm:h-[78%] w-auto object-contain"
          />
        </div>

      </div>
    </div>
  )
}
