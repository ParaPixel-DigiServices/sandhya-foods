import BestsellerGallery from "@/components/bestseller/BestsellerGallery"
import HeritageStrip from "@/components/heritage/HeritageStrip"
import RoyalHero from "@/components/hero/RoyalHero"
import PavilionGrid from "@/components/pavilion/PavilionGrid"

export default function Home() {
  return (
    <>
      <RoyalHero />
      <PavilionGrid />
      <BestsellerGallery />
      <HeritageStrip />
    </>
  )
}
