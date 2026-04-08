'use client'

const BRANDS = [
  'Apple', 'mophie', 'Tech21', 'Beats', 'Baseus', 'Anker',
  'Spigen', 'UAG', 'Belkin', 'Samsung', 'JBL', 'Marshall',
  'Apple', 'mophie', 'Tech21', 'Beats', 'Baseus', 'Anker',
  'Spigen', 'UAG', 'Belkin', 'Samsung', 'JBL', 'Marshall',
]

export default function BrandMarquee() {
  return (
    <section className="relative py-10 overflow-hidden border-y border-black/8">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="marquee-track flex items-center gap-12 whitespace-nowrap w-max">
        {BRANDS.map((brand, i) => (
          <span
            key={`${brand}-${i}`}
            className="text-lg sm:text-xl font-display font-bold text-black/20 uppercase tracking-[0.2em] select-none hover:text-black/40 transition-colors duration-300"
          >
            {brand}
          </span>
        ))}
      </div>
    </section>
  )
}
