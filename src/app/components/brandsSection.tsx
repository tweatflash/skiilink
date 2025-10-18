"use client"

export default function BrandsSection() {
  // Company logos data - duplicated for seamless infinite scroll
  const companies = [
    { name: "HIKVISION", logo: "/brands/hikvision.PNG" },
    { name: "Star Plus", logo: "/brands/star-plus-logo-01.png.webp" },
    { name: "Felicity Solar", logo: "/brands/logo.webp" },
    { name: "BambooHR", logo: "/brands/Tasha-Energy-Logo.png" },
    { name: "BuildOps", logo: "/brands/logo1.png" },
    { name: "Hoss", logo: "/hoss-logo-green.jpg" },
  ]

  // Duplicate the array for seamless loop
  const duplicatedCompanies = [...companies, ...companies]

  return (
    <section className="px-4 ">
      <div className="max-w-8xl py-16  rounded-lg mx-auto bg-[#1a0f0f]">
        {/* Header Content */}
        <div className="text-center mb-16">
          <p className="text-[#a89090] text-sm font-medium tracking-[0.2em] uppercase mb-4">Brands</p>
          <h2 className="text-white text-5xl md:text-6xl font-bold mb-6 text-balance">
            Trusted Brands We Partner With
          </h2>
          <p className="text-[#a89090] text-lg md:text-xl max-w-3xl mx-auto mb-10 text-balance">
            Connect your workflows with integrations that actually work. Use our off-the-shelf integrations, or build a
            custom integration with our REST API.
          </p>
          <button className="bg-[#3a2828] hover:bg-[#4a3333] text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Explore all integrations
          </button>
        </div>

        {/* Scrolling Logos */}
        <div className="relative overflow-hidden">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#1a0f0f] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#1a0f0f] to-transparent z-10" />

          {/* Scrolling container */}
          <div className="flex animate-scroll">
            {duplicatedCompanies.map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="flex-shrink-0 w-64 h-20 bg-white mx-3 border border-[#3a2828] rounded-lg flex items-center justify-center bg-[#1a0f0f]"
              >
                <img
                  src={company.logo || "/placeholder.svg"}
                  alt={company.name}
                  className="max-w-[160px] max-h-[50px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
