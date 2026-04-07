import { getProducts } from '@/lib/ca-api'
import CasesShowcaseClient from './CasesShowcaseClient'
import type { CaProduct } from '@/types/product'
import { DEMO_IPHONE_CASES } from '@/lib/demo-products'

export default async function CasesShowcase() {
  let products: CaProduct[] = []

  try {
    const res = await getProducts({ categoryName: 'Чехлы', inStock: true, limit: 12 })
    products = res.data
  } catch {
    // fallback — демо
  }

  // Демо-товары как fallback
  if (products.length === 0) {
    products = DEMO_IPHONE_CASES
  }

  return <CasesShowcaseClient products={products} />
}
