import Image from "next/image"
import { Wheat, Shield, Sparkles, Package } from "lucide-react"

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#F6EEDC]">
      {/* Hero Section */}
      <section className="relative bg-[#7A1A14] text-white pt-32 sm:pt-36 pb-20 sm:pb-24 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(212,175,55,0.4),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(212,175,55,0.4),transparent_70%)]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <Image 
              src="/sandhyalogo.png" 
              alt="Sandhya Foods"
              width={400}
              height={150}
              className="h-24 sm:h-32 w-auto object-contain"
              priority
            />
          </div>

          <h1 className="font-royal text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#D4AF37] mb-6 tracking-wide">
            About Sandhya Foods
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            A trusted family-run papad brand from Jodhpur, dedicated to crafting authentic papad with time-honored recipes and unwavering quality for Indian homes.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
        
        {/* Our Journey */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-royal text-3xl sm:text-4xl text-[#7A1A14] mb-6 tracking-wide">
                Our Journey
              </h2>
              <div className="space-y-4 text-[#2A1E1A] leading-relaxed">
                <p className="text-lg">
                  It all began in <strong className="text-[#7A1A14]">1989</strong> when <strong>Shri Mukesh Bhootra</strong> founded Sandhya Foods, driven by a passion for the pure, homely taste of Rajasthani papad made with care.
                </p>
                <p className="text-lg">
                  In <strong className="text-[#7A1A14]">2014</strong>, his son <strong>Mr. Abhishek Bhootra</strong> stepped in to lead the business, blending traditional methods with modern practices to expand its reach while preserving the original flavor.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white p-8 rounded-3xl shadow-2xl border-2 border-[#D4AF37]">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#7A1A14] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[#D4AF37] font-royal text-2xl font-bold">1989</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#7A1A14] text-lg">Founded by Shri Mukesh Bhootra</h3>
                      <p className="text-sm text-[#2A1E1A]/70">The beginning of tradition</p>
                    </div>
                  </div>
                  <div className="h-12 w-[2px] bg-[#D4AF37] ml-8" />
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#7A1A14] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[#D4AF37] font-royal text-2xl font-bold">2014</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#7A1A14] text-lg">Led by Mr. Abhishek Bhootra</h3>
                      <p className="text-sm text-[#2A1E1A]/70">Tradition meets innovation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Heart of Our Papad */}
        <div className="mb-20 bg-gradient-to-br from-[#D4AF37]/10 to-[#7A1A14]/5 p-8 sm:p-12 rounded-3xl border border-[#D4AF37]/30">
          <h2 className="font-royal text-3xl sm:text-4xl text-[#7A1A14] mb-6 text-center tracking-wide">
            The Heart of Our Papad
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="w-12 h-12 bg-[#7A1A14] rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="font-semibold text-xl text-[#7A1A14] mb-3">Authentic Chawa Saji</h3>
              <p className="text-[#2A1E1A] leading-relaxed">
                Every batch incorporates chawa saji sourced from Pakistan, a key ingredient that has been part of our recipe from day one, giving our papad their distinctive character.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="w-12 h-12 bg-[#7A1A14] rounded-full flex items-center justify-center mb-4">
                <Wheat className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="font-semibold text-xl text-[#7A1A14] mb-3">Premium Quality Dals</h3>
              <p className="text-[#2A1E1A] leading-relaxed">
                We use only top-quality dals, carefully selected for purity and consistency, ensuring each papad delivers reliable taste and texture.
              </p>
            </div>
          </div>
        </div>

        {/* Our Product Range */}
        <div className="mb-20">
          <h2 className="font-royal text-3xl sm:text-4xl text-[#7A1A14] mb-8 text-center tracking-wide">
            Our Product Range
          </h2>
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-[#D4AF37]/30 overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 sm:p-10 bg-gradient-to-br from-[#7A1A14] to-[#5A0F0A] text-white">
                <h3 className="font-royal text-2xl text-[#D4AF37] mb-4">Hand-Rolled Papad</h3>
                <p className="text-white/90 leading-relaxed mb-4">
                  Traditional handmade papad crafted with care for that authentic touch, perfect for those who value artisanal quality.
                </p>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-center gap-2">
                    <span className="text-[#D4AF37]">•</span> Authentic texture
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#D4AF37]">•</span> Time-honored method
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#D4AF37]">•</span> Rich, homely taste
                  </li>
                </ul>
              </div>
              <div className="p-8 sm:p-10 bg-[#F6EEDC]">
                <h3 className="font-royal text-2xl text-[#7A1A14] mb-4">Machine-Rolled Papad</h3>
                <p className="text-[#2A1E1A] leading-relaxed mb-4">
                  Efficiently produced papad with consistent quality, ideal for caterers, retailers, and bulk orders.
                </p>
                <ul className="space-y-2 text-[#2A1E1A]/80">
                  <li className="flex items-center gap-2">
                    <span className="text-[#7A1A14]">•</span> Uniform size & shape
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#7A1A14]">•</span> High volume capacity
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#7A1A14]">•</span> Consistent quality
                  </li>
                </ul>
              </div>
            </div>
            <div className="p-6 bg-[#D4AF37]/10 text-center">
              <p className="text-[#2A1E1A] font-medium">
                Diverse variety from classic to spiced favorites in different sizes, suiting every palate and occasion
              </p>
            </div>
          </div>
        </div>

        {/* Quality and Hygiene */}
        <div className="mb-20">
          <h2 className="font-royal text-3xl sm:text-4xl text-[#7A1A14] mb-8 text-center tracking-wide">
            Quality and Hygiene
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Wheat, title: "Top-Grade Dals", desc: "Only premium quality ingredients" },
              { icon: Shield, title: "Strict Protocols", desc: "Gloves and safety measures" },
              { icon: Sparkles, title: "Clean Environment", desc: "Sanitized production area" },
              { icon: Package, title: "Food-Grade Packing", desc: "Safe, hygienic packaging" }
            ].map((item, i) => {
              const IconComponent = item.icon
              return (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-lg border border-[#D4AF37]/20 text-center hover:shadow-xl transition-shadow duration-300">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-[#7A1A14] rounded-full flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-[#D4AF37]" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg text-[#7A1A14] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#2A1E1A]/70">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Our Vision */}
        <div className="relative">
          <div className="bg-gradient-to-br from-[#7A1A14] to-[#5A0F0A] p-10 sm:p-16 rounded-3xl shadow-2xl text-white text-center">
            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#D4AF37] rounded-tl-2xl" />
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#D4AF37] rounded-tr-2xl" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#D4AF37] rounded-bl-2xl" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#D4AF37] rounded-br-2xl" />
            
            <h2 className="font-royal text-3xl sm:text-4xl text-[#D4AF37] mb-6 tracking-wide">
              Our Vision
            </h2>
            <div className="max-w-3xl mx-auto space-y-4 text-lg text-white/90 leading-relaxed">
              <p>
                Sandhya Foods aims to bring our papad to every corner of India, becoming a staple on thalis from villages to cities.
              </p>
              <p className="text-xl font-medium text-[#D4AF37]">
                We dream of a future where Sandhya papad completes every meal, trusted by families nationwide.
              </p>
            </div>
          </div>
        </div>

      </section>
    </div>
  )
}