// Тестовые товары для демо-просмотра сайта
// Используются как fallback когда API возвращает 0 товаров

import type { CaProduct } from '@/types/product'

export const DEMO_IPHONE_CASES: CaProduct[] = [
  // ── Apple Store: iPhone 17 Pro Max ──
  { id: 'd-001', name: 'Silicone Case MagSafe iPhone 17 Pro Max — Vanilla',           article: 'MHW54',   description: 'Силиконовый чехол Apple, MagSafe, цвет Vanilla',              sellingPrice: 156.90, quantity: 12, unit: 'шт', category: { id: 'c1', name: 'Чехлы' }, stockStatus: 'ok',  image: '/cases/vanilla.jpg' },
  { id: 'd-002', name: 'Silicone Case MagSafe iPhone 17 Pro Max — Bright Guava',      article: 'MHW64',   description: 'Силиконовый чехол Apple, MagSafe, цвет Bright Guava',         sellingPrice: 156.90, quantity: 8,  unit: 'шт', category: { id: 'c1', name: 'Чехлы' }, stockStatus: 'ok',  image: '/cases/guava.jpg' },
  { id: 'd-003', name: 'Silicone Case MagSafe iPhone 17 Pro Max — Orange',            article: 'MGFL4',   description: 'Силиконовый чехол Apple, MagSafe, цвет Orange',               sellingPrice: 156.90, quantity: 6,  unit: 'шт', category: { id: 'c1', name: 'Чехлы' }, stockStatus: 'ok',  image: '/cases/orange.jpg' },
  { id: 'd-004', name: 'Silicone Case MagSafe iPhone 17 Pro Max — Black',             article: 'MGFR4',   description: 'Силиконовый чехол Apple, MagSafe, цвет Black',                sellingPrice: 156.90, quantity: 5,  unit: 'шт', category: { id: 'c1', name: 'Чехлы' }, stockStatus: 'ok',  image: '/cases/black.jpg' },

  // ── Apple Store: iPhone 17 Pro ──
  { id: 'd-005', name: 'Silicone Case MagSafe iPhone 17 Pro — Midnight',              article: 'MGFP4',   description: 'Силиконовый чехол Apple, MagSafe, цвет Midnight',             sellingPrice: 156.90, quantity: 15, unit: 'шт', category: { id: 'c1', name: 'Чехлы' }, stockStatus: 'ok',  image: '/cases/midnight.jpg' },
  { id: 'd-006', name: 'Silicone Case MagSafe iPhone 17 Pro — Purple Fog',            article: 'MGFN4',   description: 'Силиконовый чехол Apple, MagSafe, цвет Purple Fog',           sellingPrice: 156.90, quantity: 20, unit: 'шт', category: { id: 'c1', name: 'Чехлы' }, stockStatus: 'ok',  image: '/cases/purple-fog.jpg' },
  { id: 'd-007', name: 'Silicone Case MagSafe iPhone 17 Pro — Terra Cotta',           article: 'MGFQ4',   description: 'Силиконовый чехол Apple, MagSafe, цвет Terra Cotta',          sellingPrice: 156.90, quantity: 7,  unit: 'шт', category: { id: 'c1', name: 'Чехлы' }, stockStatus: 'ok',  image: '/cases/terra-cotta.jpg' },
  { id: 'd-008', name: 'Silicone Case MagSafe iPhone 17 Pro — Neon Yellow',           article: 'MGFM4',   description: 'Силиконовый чехол Apple, MagSafe, цвет Neon Yellow',          sellingPrice: 156.90, quantity: 4,  unit: 'шт', category: { id: 'c1', name: 'Чехлы' }, stockStatus: 'low', image: '/cases/neon-yellow.jpg' },
  { id: 'd-009', name: 'Tech21 FlexQuartz Case iPhone 17 Pro — Pink',                 article: 'HSG72',   description: 'Ударопрочный чехол Tech21 FlexQuartz, MagSafe, розовый',      sellingPrice: 176.90, quantity: 10, unit: 'шт', category: { id: 'c1', name: 'Чехлы' }, stockStatus: 'ok',  image: '/cases/guava.jpg' },

  // ── Apple Store: iPhone 17 ──
  { id: 'd-010', name: 'Silicone Case MagSafe iPhone 17 — Electric Lavender',         article: 'MHVT4',   description: 'Силиконовый чехол Apple, MagSafe, цвет Electric Lavender',    sellingPrice: 156.90, quantity: 18, unit: 'шт', category: { id: 'c1', name: 'Чехлы' }, stockStatus: 'ok',  image: '/cases/purple-fog.jpg' },
  { id: 'd-011', name: 'Tech21 FlexQuartz Case iPhone 17 — Pink',                     article: 'HSGD2',   description: 'Ударопрочный чехол Tech21 FlexQuartz, MagSafe, розовый',      sellingPrice: 176.90, quantity: 9,  unit: 'шт', category: { id: 'c1', name: 'Чехлы' }, stockStatus: 'ok',  image: '/cases/guava.jpg' },

  // ── Apple Store: iPhone Air ──
  { id: 'd-012', name: 'Case MagSafe iPhone Air — Shadow',                            article: 'MGH24',   description: 'Чехол Apple для iPhone Air, MagSafe, цвет Shadow',           sellingPrice: 156.90, quantity: 10, unit: 'шт', category: { id: 'c1', name: 'Чехлы' }, stockStatus: 'ok',  image: '/cases/midnight.jpg' },
  { id: 'd-013', name: 'Silicone Case MagSafe iPhone Air — Orange',                   article: 'HSGB2',   description: 'Силиконовый чехол Apple, MagSafe, цвет Orange',               sellingPrice: 156.90, quantity: 6,  unit: 'шт', category: { id: 'c1', name: 'Чехлы' }, stockStatus: 'ok',  image: '/cases/orange.jpg' },

  // ── Apple Store: iPhone 17e ──
  { id: 'd-014', name: 'Silicone Case MagSafe iPhone 17e — Vanilla',                  article: 'MHWJ4',   description: 'Силиконовый чехол Apple, MagSafe, цвет Vanilla',              sellingPrice: 156.90, quantity: 14, unit: 'шт', category: { id: 'c1', name: 'Чехлы' }, stockStatus: 'ok',  image: '/cases/vanilla.jpg' },
  { id: 'd-015', name: 'Silicone Case MagSafe iPhone 17e — Black',                    article: 'MHWC4',   description: 'Силиконовый чехол Apple, MagSafe, цвет Black',                sellingPrice: 156.90, quantity: 16, unit: 'шт', category: { id: 'c1', name: 'Чехлы' }, stockStatus: 'ok',  image: '/cases/black.jpg' },
  { id: 'd-016', name: 'Silicone Case MagSafe iPhone 17e — Terra Cotta',              article: 'MHR34',   description: 'Силиконовый чехол Apple, MagSafe, цвет Terra Cotta',          sellingPrice: 144.90, quantity: 8,  unit: 'шт', category: { id: 'c1', name: 'Чехлы' }, stockStatus: 'ok',  image: '/cases/terra-cotta.jpg' },

  // ── Apple Store: iPhone 16e ──
  { id: 'd-017', name: 'Silicone Case iPhone 16e — Neon Yellow',                      article: 'MGYW4',   description: 'Силиконовый чехол Apple, яркий Neon Yellow',                  sellingPrice: 124.90, quantity: 22, unit: 'шт', category: { id: 'c1', name: 'Чехлы' }, stockStatus: 'ok',  image: '/cases/neon-yellow.jpg' },
]

export const DEMO_GLASS: CaProduct[] = [
  // ── Remax ──
  { id: 'g-001', name: 'Remax GL-27 iPhone 17 Pro Max — 9H Anti-Glare',   article: 'RM-GL27-17PM', description: 'Матовое 9H стекло Remax, антибликовое, полное покрытие, пыленепроницаемый слой', sellingPrice: 14.90, quantity: 25, unit: 'шт', category: { id: 'c4', name: 'Стёкла' }, stockStatus: 'ok'  },
  { id: 'g-002', name: 'Remax GL-31 iPhone 17 Pro — Privacy Glass',        article: 'RM-GL31-17P',  description: 'Приватное стекло Remax, защита от взгляда сбоку, 9H твёрдость',                sellingPrice: 16.90, quantity: 18, unit: 'шт', category: { id: 'c4', name: 'Стёкла' }, stockStatus: 'ok'  },
  { id: 'g-003', name: 'Remax GL-52 iPhone 17 — Full Cover Crystal Clear', article: 'RM-GL52-17',   description: 'Прозрачное стекло Remax, 0.26mm, полный клей, HD Clear',                       sellingPrice: 12.90, quantity: 40, unit: 'шт', category: { id: 'c4', name: 'Стёкла' }, stockStatus: 'ok'  },
  { id: 'g-004', name: 'Remax GL-19 iPhone 16 Pro Max — Dust-Free Kit',    article: 'RM-GL19-16PM', description: 'Набор Remax: стекло 9H + рамка для поклейки + очиститель экрана',              sellingPrice: 18.90, quantity: 12, unit: 'шт', category: { id: 'c4', name: 'Стёкла' }, stockStatus: 'ok'  },

  // ── Pink Glaze ──
  { id: 'g-005', name: 'Pink Glaze iPhone 17 Pro Max — Rose Crystal',      article: 'PG-RC-17PM',   description: 'Розовое зеркальное стекло Pink Glaze, 9H, защита от царапин и сколов',         sellingPrice: 13.90, quantity: 20, unit: 'шт', category: { id: 'c4', name: 'Стёкла' }, stockStatus: 'ok'  },
  { id: 'g-006', name: 'Pink Glaze iPhone 17 — Matte Blush',               article: 'PG-MB-17',     description: 'Матовое стекло розовый туман Pink Glaze, антифингерпринт, 0.33mm',             sellingPrice: 11.90, quantity: 15, unit: 'шт', category: { id: 'c4', name: 'Стёкла' }, stockStatus: 'ok'  },

  // ── Green ──
  { id: 'g-007', name: 'Green Premium iPhone 17 Pro Max — 3D Full Cover',  article: 'GN-3D-17PM',   description: 'Стекло Green Premium 3D с рамкой, 9H, полный клей, ультразвуковой сканер ✓',  sellingPrice: 19.90, quantity: 22, unit: 'шт', category: { id: 'c4', name: 'Стёкла' }, stockStatus: 'ok'  },
  { id: 'g-008', name: 'Green Silicone Edge iPhone 17 Pro — Clear',        article: 'GN-SE-17P',    description: 'Стекло Green с силиконовыми краями, защита от сколов, прозрачное',             sellingPrice: 17.90, quantity: 9,  unit: 'шт', category: { id: 'c4', name: 'Стёкла' }, stockStatus: 'low' },
]

export const DEMO_ACCESSORIES: CaProduct[] = [
  { id: 'd-101', name: 'AirPods 4 с активным шумоподавлением', article: 'AP4-ANC', description: 'Беспроводные наушники Apple, USB-C', sellingPrice: 249.90, quantity: 8,  unit: 'шт', category: { id: 'c2', name: 'Наушники' }, stockStatus: 'ok' },
  { id: 'd-102', name: 'Apple MagSafe Charger 25W',             article: 'MS-25W',  description: 'Беспроводная зарядка MagSafe 25W', sellingPrice: 59.90,  quantity: 15, unit: 'шт', category: { id: 'c3', name: 'Зарядки'  }, stockStatus: 'ok' },
  { id: 'd-103', name: 'Защитное стекло для iPhone 17 Pro Max', article: 'SG-17PM', description: '9H, полное покрытие, антибликовое', sellingPrice: 19.90,  quantity: 30, unit: 'шт', category: { id: 'c4', name: 'Стекла'   }, stockStatus: 'ok' },
  { id: 'd-104', name: 'Apple Watch Ultra 2 — Ocean Band',       article: 'AWU2-OB', description: 'Оранжевый ремешок, 49mm',          sellingPrice: 89.90,  quantity: 5,  unit: 'шт', category: { id: 'c5', name: 'Смарт-часы'}, stockStatus: 'low' },
  { id: 'd-105', name: 'USB-C кабель плетёный 2м',               article: 'CB-2M',   description: '240W, быстрая зарядка, Apple',     sellingPrice: 14.90,  quantity: 50, unit: 'шт', category: { id: 'c6', name: 'Кабели'   }, stockStatus: 'ok' },
  { id: 'd-106', name: 'Держатель на руль + беспроводная зарядка',article: 'CH-WC',  description: 'MagSafe, 15W, авто-аксессуар',     sellingPrice: 34.90,  quantity: 12, unit: 'шт', category: { id: 'c7', name: 'Авто'     }, stockStatus: 'ok' },
  { id: 'd-107', name: 'Петличный микрофон Lightning / USB-C',    article: 'MIC-LC',  description: 'Для блогеров, шумоподавление',     sellingPrice: 24.90,  quantity: 8,  unit: 'шт', category: { id: 'c8', name: 'Блогерам' }, stockStatus: 'ok' },
  { id: 'd-108', name: 'Кольцевая лампа 26см + штатив 2м',        article: 'RL-26',   description: '3 режима, пульт, сумка',           sellingPrice: 59.90,  quantity: 6,  unit: 'шт', category: { id: 'c8', name: 'Блогерам' }, stockStatus: 'ok' },
]

export const DEMO_ANDROID_SALE: CaProduct[] = [
  { id: 'd-201', name: 'Чехол-книжка Samsung Galaxy S25 Ultra', article: 'SB-S25U', description: 'Кожзам, подставка, карман',     sellingPrice: 9.90,  quantity: 45, unit: 'шт', category: { id: 'c9', name: 'Чехлы Android' }, stockStatus: 'ok' },
  { id: 'd-202', name: 'Силиконовый чехол Xiaomi 15 Pro',        article: 'SX-15P',  description: 'Мягкий TPU, защита камеры',    sellingPrice: 5.90,  quantity: 80, unit: 'шт', category: { id: 'c9', name: 'Чехлы Android' }, stockStatus: 'ok' },
  { id: 'd-203', name: 'Чехол-книжка Huawei P60 Pro',            article: 'HB-P60',  description: 'Кожзам, магнитная застёжка',  sellingPrice: 8.90,  quantity: 35, unit: 'шт', category: { id: 'c9', name: 'Чехлы Android' }, stockStatus: 'ok' },
  { id: 'd-204', name: 'Чехол Redmi Note 13 Pro+ прозрачный',    article: 'RN-13PP', description: 'Поликарбонат, тонкий',         sellingPrice: 4.90,  quantity: 60, unit: 'шт', category: { id: 'c9', name: 'Чехлы Android' }, stockStatus: 'ok' },
  { id: 'd-205', name: 'Чехол Honor Magic 6 Pro кожаный',        article: 'HM-6P',   description: 'Экокожа, стильный',            sellingPrice: 7.90,  quantity: 28, unit: 'шт', category: { id: 'c9', name: 'Чехлы Android' }, stockStatus: 'ok' },
  { id: 'd-206', name: 'Чехол Samsung Galaxy A55 книжка',        article: 'SA-A55',  description: 'Кожзам, подставка',            sellingPrice: 6.90,  quantity: 55, unit: 'шт', category: { id: 'c9', name: 'Чехлы Android' }, stockStatus: 'ok' },
  { id: 'd-207', name: 'Чехол Xiaomi Redmi 14C ударопрочный',    article: 'XR-14C',  description: 'TPU+PC, защита углов',         sellingPrice: 5.90,  quantity: 40, unit: 'шт', category: { id: 'c9', name: 'Чехлы Android' }, stockStatus: 'ok' },
  { id: 'd-208', name: 'Чехол Honor 200 Pro матовый',            article: 'HO-200P', description: 'Soft-touch покрытие',          sellingPrice: 6.90,  quantity: 32, unit: 'шт', category: { id: 'c9', name: 'Чехлы Android' }, stockStatus: 'ok' },
]

export const ALL_DEMO_PRODUCTS = [
  ...DEMO_GLASS,
  ...DEMO_ACCESSORIES,
  ...DEMO_IPHONE_CASES,
  ...DEMO_ANDROID_SALE,
]
