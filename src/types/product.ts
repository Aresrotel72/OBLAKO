export interface CaProduct {
  id: string
  name: string
  article: string | null
  description: string | null
  sellingPrice: number
  quantity: number
  unit: string
  category: { id: string; name: string } | null
  stockStatus: 'ok' | 'low' | 'out'
}

export interface CaProductsResponse {
  data: CaProduct[]
  total: number
  page: number
  totalPages: number
  limit: number
}

export interface ProductsQuery {
  search?: string
  categoryId?: string
  categoryName?: string   // фильтр по одной категории (напр. "Чехлы")
  inStock?: boolean
  page?: number
  limit?: number
}
