import { Suspense } from 'react'
import Link from 'next/link'
import { getProducts } from '@/lib/ca-api'
import { ProductGrid } from '@/components/catalog/ProductGrid'
import type { Product } from '@/components/catalog/ProductCard'
import type { CaProduct } from '@/types/product'
import { DEMO_IPHONE_CASES } from '@/lib/demo-products'
import BlobBg from '@/components/ui/BlobBg'
import { Smartphone, Shield, Zap, Headphones, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Каталог — OBLAKO',
  description: 'Мобильные аксессуары: чехлы, стекла, зарядки и кабели для iPhone',
}

function mapProduct(p: CaProduct): Product {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = p as any
  const price = Number(p.sellingPrice ?? raw.price ?? raw.sellingPrice ?? 0)
  return {
    id: p.id,
    name: p.name,
    brand: raw.brand ?? '',
    model: raw.model ?? '',
    price,
    images: raw.images ?? [],
    colors: raw.colors ?? [],
    badge: undefined,
    inStock: p.stockStatus !== 'out',
    category: p.category?.name ?? raw.category ?? '',
  }
}

async function CatalogContent() {
  let products: Product[]
  try {
    const data = await getProducts({ limit: 60 })
    products = data.data.length > 0
      ? data.data.map(mapProduct)
      : DEMO_IPHONE_CASES.map(mapProduct)
  } catch {
    products = DEMO_IPHONE_CASES.map(mapProduct)
  }
  return <ProductGrid products={products} />
}

const CATEGORIES = [
  {
    href: '/cases',
    icon: Smartphone,
    label: 'Чехлы iPhone',
    desc: '200+ моделей',
    color: '#0071e3',
    bg: 'from-[#0071e3]/10 to-[#5ac8fa]/5',
    border: 'border-[#0071e3]/20 hover:border-[#0071e3]/40',
  },
  {
    href: '/catalog?q=стекло',
    icon: Shield,
    label: 'Защитные стекла',
    desc: 'Все модели iPhone',
    color: '#30d158',
    bg: 'from-[#30d158]/10 to-[#30d158]/5',
    border: 'border-[#30d158]/20 hover:border-[#30d158]/40',
  },
  {
    href: '/catalog?q=зарядка',
    icon: Zap,
    label: 'Зарядки и кабели',
    desc: 'MagSafe, USB-C',
    color: '#ffd60a',
    bg: 'from-[#ffd60a]/10 to-[#ffd60a]/5',
    border: 'border-[#ffd60a]/30 hover:border-[#ffd60a]/50',
  },
  {
    href: '/catalog?q=наушники',
    icon: Headphones,
    label: 'Аудио',
    desc: 'AirPods и аксессуары',
    color: '#bf5af2',
    bg: 'from-[#bf5af2]/10 to-[#bf5af2]/5',
    border: 'border-[#bf5af2]/20 hover:border-[#bf5af2]/40',
  },
]

export default function CatalogPage() {
  return (
    <main className="min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 pt-12 pb-10">
        <BlobBg
          colors={['#0071e3', '#30d158', '#bf5af2', '#5ac8fa']}
          count={4}
          blur={110}
          opacity={0.15}
        />
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-foreground-muted mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Главная</Link>
            <span>/</span>
            <span className="text-foreground">Каталог</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-2">
            Каталог
          </h1>
          <p className="text-foreground-muted text-base mb-8">
            Мобильные аксессуары: чехлы, стекла, зарядки и многое другое
          </p>

          {/* Категории-карточки */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CATEGORIES.map(({ href, icon: Icon, label, desc, color, bg, border }) => (
              <Link
                key={href}
                href={href}
                className={`group flex flex-col gap-3 p-4 rounded-2xl bg-gradient-to-br ${bg} border ${border} transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md bg-white/60 backdrop-blur-sm`}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: `${color}18` }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{label}</p>
                  <p className="text-xs text-foreground-muted mt-0.5">{desc}</p>
                </div>
                <ArrowRight
                  size={14}
                  className="mt-auto self-end text-foreground-muted group-hover:text-foreground group-hover:translate-x-0.5 transition-all"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Все товары ───────────────────────────────────────────────── */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Все товары</h2>
          </div>

          <Suspense fallback={
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-2xl skeleton" />
              ))}
            </div>
          }>
            <CatalogContent />
          </Suspense>
        </div>
      </section>
    </main>
  )
}
