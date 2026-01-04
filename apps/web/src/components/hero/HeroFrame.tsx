export default function HeroFrame() {
  return (
    <section className="
      relative z-10
      max-w-[1700px] mx-auto
      px-5 sm:px-6
      pt-24 sm:pt-32 lg:pt-40
      pb-24 sm:pb-28 lg:pb-36
      grid grid-cols-1 lg:grid-cols-12
      gap-16 lg:gap-20
      items-center
    ">

      {/* PACK */}
      <div className="order-1 lg:order-none lg:col-span-5 flex justify-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(212,175,55,0.35),transparent_70%)] rounded-full blur-3xl" />
        <img
          src="/sandhyalogo.png"
          className="
            relative
            w-[240px] sm:w-[300px] md:w-[360px] xl:w-[480px]
            drop-shadow-[0_40px_100px_rgba(0,0,0,0.35)]
            lg:drop-shadow-[0_60px_140px_rgba(0,0,0,0.35)]
          "
        />
      </div>

      {/* TEXT */}
      <div className="order-2 lg:order-none lg:col-span-7 text-center lg:text-left">

        <div className="flex justify-center lg:justify-start items-center gap-4 sm:gap-6 mb-10 lg:mb-14">
          <div className="h-px w-16 sm:w-24 bg-[#7A1A14]"></div>
          <span className="uppercase tracking-[0.45em] text-[#7A1A14] text-[0.6rem] sm:text-xs">
            Royal Heritage of Rajasthan
          </span>
        </div>

        <h1 className="
          font-royal text-[#7A1A14]
          leading-[1.05] sm:leading-[0.95] xl:leading-[0.92]
          text-[2.6rem] sm:text-[3.6rem] md:text-[4.8rem] xl:text-[7.5rem]
          drop-shadow-[0_4px_0_rgba(212,175,55,0.55)]
          lg:drop-shadow-[0_5px_0_rgba(212,175,55,0.65)]
          mb-8 sm:mb-10 lg:mb-14
        ">
          Sandhya<br/>Foods
        </h1>

        <h2 className="
          font-royal tracking-widest text-[#9E2A1F]
          text-[1.1rem] sm:text-[1.6rem] md:text-[2.2rem]
          mb-6 sm:mb-8 lg:mb-10
        ">
          Kitchens of Jodhpur
        </h2>

        <p className="
          max-w-xl lg:max-w-2xl mx-auto lg:mx-0
          text-[0.95rem] sm:text-base lg:text-lg
          leading-relaxed
          mb-10 sm:mb-12 lg:mb-16
        ">
          Crafted using ancestral Rajasthani culinary techniques, sun-dried in palace courtyards and packed fresh to preserve purity, tradition and taste.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
          <a
            href="/shop"
            className="px-10 sm:px-14 lg:px-16 py-4 sm:py-5 border-2 border-[#7A1A14] uppercase tracking-[0.35em] text-xs sm:text-sm hover:bg-[gold] hover:text-[#7A1A14] transition"
          >
            Enter Shop
          </a>
          <a
            href="/about"
            className="px-10 sm:px-14 lg:px-16 py-4 sm:py-5 border border-[#7A1A14] uppercase tracking-[0.35em] text-xs sm:text-sm hover:bg-[#7A1A14] hover:text-white transition"
          >
            Our Heritage
          </a>
        </div>

      </div>
    </section>
  )
}
