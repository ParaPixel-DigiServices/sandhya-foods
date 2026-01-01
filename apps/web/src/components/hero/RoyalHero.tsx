import BaseLayer from "./BaseLayer"
import PalaceSilhouette from "./PalaceSilhoutte"
import SunHalo from "./SunHalo"
import MandalaMesh from "./MandalaMesh"
import HeroFrame from "./HeroFrame"

export default function RoyalHero() {
  return (
    <section className="relative overflow-hidden">
      <BaseLayer />
      <PalaceSilhouette />
      <SunHalo />
      <MandalaMesh />
      <HeroFrame />
    </section>
  )
}
