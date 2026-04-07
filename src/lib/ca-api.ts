import type { CaProduct, CaProductsResponse, ProductsQuery } from '@/types/product'

const BASE_URL = process.env.CHERNIY_API_URL || 'http://localhost:3000'
const API_KEY = process.env.CHERNIY_API_KEY || ''

// Только категории мобильных аксессуаров — настраивается через env
// OBLAKO_CATEGORIES=Чехлы,Стекла,Зарядки,Кабели,Наушники
export const MOBILE_CATEGORIES =
  process.env.OBLAKO_CATEGORIES || 'Чехлы,Стекла,Зарядки,Кабели,Наушники,Аксессуары'

async function caFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      'x-api-key': API_KEY,
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    next: { revalidate: 60 }, // кеш 60 сек
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`CA API ${path} → ${res.status}: ${text}`)
  }

  return res.json() as Promise<T>
}

export async function getProducts(query: ProductsQuery = {}): Promise<CaProductsResponse> {
  const params = new URLSearchParams()
  if (query.search) params.set('search', query.search)
  if (query.categoryId) params.set('categoryId', query.categoryId)
  if (query.inStock) params.set('inStock', 'true')
  if (query.page) params.set('page', String(query.page))
  if (query.limit) params.set('limit', String(query.limit))
  // Если указана конкретная категория — фильтруем по ней, иначе по всем мобильным
  params.set('categoryNames', query.categoryName || MOBILE_CATEGORIES)

  const qs = params.toString()
  return caFetch<CaProductsResponse>(`/api/external/products${qs ? `?${qs}` : ''}`)
}

export async function getProduct(id: string): Promise<CaProduct> {
  const params = new URLSearchParams({ id, limit: '1' })
  const res = await caFetch<CaProductsResponse>(`/api/external/products?${params}`)
  const product = res.data[0]
  if (!product) throw new Error(`Product ${id} not found`)
  return product
}
