export default function PavilionCard({ title, image, href }:{ title:string, image:string, href:string }) {
  return (
    <a
      href={href}
      className="
        group relative overflow-hidden rounded-[2rem]
        border border-sandstone bg-white
        transition shadow-lg hover:shadow-2xl
      "
    >

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.25),transparent_60%)]
                      opacity-0 group-hover:opacity-100 transition" />

      <div className="relative aspect-[4/5] w-full">
        <img
          src={image}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="p-6 sm:p-8 text-center">
        <h3 className="font-royal text-lg sm:text-xl text-royal tracking-wide">
          {title}
        </h3>
      </div>
    </a>
  )
}
