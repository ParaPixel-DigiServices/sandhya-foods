export default function BestsellerCard({ product }:{ product:any }) {
  return (
    <a href={`/product/${product.slug}`}
       className="group relative bg-white rounded-[2rem] border border-sandstone shadow-xl overflow-hidden hover:shadow-2xl transition">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.25),transparent_60%)]
                      opacity-0 group-hover:opacity-100 transition" />

      <img src={product.product_images?.find(i=>i.is_primary)?.url} className="w-full aspect-[4/5] object-cover"/>

      <div className="p-6 text-center">
        <h3 className="font-royal text-lg text-royal mb-2">{product.name}</h3>
        <div className="text-sm mb-2">₹{product.price}</div>
        <span className="text-gold text-xs uppercase tracking-[0.3em]">Bestseller</span>
      </div>
    </a>
  )
}
