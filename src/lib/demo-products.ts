// Тестовые товары для демо-просмотра сайта
// Используются как fallback когда API возвращает 0 товаров

import type { CaProduct } from '@/types/product'

export const DEMO_IPHONE_CASES: CaProduct[] = [
  // ── Apple Store: iPhone 17 Pro Max ──
  { id: 'd-001', name: 'Silicone Case MagSafe iPhone 17 Pro Max — Vanilla',           article: 'MHW54',   description: 'Силиконовый чехол Apple, MagSafe, цвет Vanilla',              sellingPrice: 156.90, quantity: 12, unit: 'шт', category: { id: 'c1', name: 'Чехлы' }, stockStatus: 'ok' },
  { id: 'd-002', name: 'TechWoven Case MagSafe iPhone 17 Pro Max — Green',            article: 'MGFD4',   description: 'Плетёный чехол Apple TechWoven, MagSafe, цвет Green',         sellingPrice: 189.90, quantity: 8,  unit: 'шт', category: { id: 'c1', name: 'Чехлы' }, stockStatus: 'ok' },
  { id: 'd-003', name: 'mophie Optical Check Case iPhone 17 Pro Max',                 article: 'HSFV2',   description: 'Прозрачный чехол mophie с оптическим узором',                 sellingPrice: 192.90, quantity: 6,  unit: 'шт', category: { id: 'c1', name: 'Чехлы' }, stockStatus: 'ok' },
  { id: 'd-004', name: 'Tech21 FlexQuartz Case iPhone 17 Pro Max — Pink',             article: 'HSG92',   description: 'Ударопрочный чехол Tech21 FlexQuartz, MagSafe, розовый',      sellingPrice: 176.90, quantity: 5,  unit: 'шт', category: { id: 'c1', name: 'Чехлы' }, stockStatus: 'low' },

  // ── Apple Store: iPhone 17 Pro ──
  { id: 'd-005', name: 'Silicone Case MagSafe iPhone 17 Pro — Bright Guava',          article: 'MHW04',   description: 'Силиконовый чехол Apple, MagSafe, цвет Bright Guava',         sellingPrice: 156.90, quantity: 15, unit: 'шт', category: { id: 'c1', name: 'Чехлы' }, stockStatus: 'ok' },
  { id: 'd-006', name: 'Clear Case MagSafe iPhone 17 Pro',                            article: 'MGFT4',   description: 'Прозрачный чехол Apple, MagSafe, поликарбонат',               sellingPrice: 156.90, quantity: 20, unit: 'шт', category: { id: 'c1', name: 'Чехлы' }, stockStatus: 'ok' },
  { id: 'd-007', name: 'TechWoven Case MagSafe iPhone 17 Pro — Sienna',               article: 'MGF64',   description: 'Плетёный чехол Apple TechWoven, MagSafe, цвет Sienna',        sellingPrice: 189.90, quantity: 7,  unit: 'шт', category: { id: 'c1', name: 'Чехлы' }, stockStatus: 'ok' },
  { id: 'd-008', name: 'mophie Check Case iPhone 17 Pro',                             article: 'HSFS2',   description: 'Чехол mophie с геометрическим узором, MagSafe',              sellingPrice: 192.90, quantity: 4,  unit: 'шт', category: { id: 'c1', name: 'Чехлы' }, stockStatus: 'low' },
  { id: 'd-009', name: 'Tech21 FlexQuartz Case iPhone 17 Pro — Pink',                 article: 'HSG72',   description: 'Ударопрочный чехол Tech21 FlexQuartz, MagSafe, розовый',      sellingPrice: 176.90, quantity: 10, unit: 'шт', category: { id: 'c1', name: 'Чехлы' }, stockStatus: 'ok' },

  // ── Apple Store: iPhone 17 ──
  { id: 'd-010', name: 'Silicone Case MagSafe iPhone 17 — Electric Lavender',         article: 'MHVT4',   description: 'Силиконовый чехол Apple, MagSafe, цвет Electric Lavender',    sellingPrice: 156.90, quantity: 18, unit: 'шт', category: { id: 'c1', name: 'Чехлы' }, stockStatus: 'ok' },
  { id: 'd-011', name: 'Tech21 FlexQuartz Case iPhone 17 — Pink',                     article: 'HSGD2',   description: 'Ударопрочный чехол Tech21 FlexQuartz, MagSafe, розовый',      sellingPrice: 176.90, quantity: 9,  unit: 'шт', category: { id: 'c1', name: 'Чехлы' }, stockStatus: 'ok' },

  // ── Apple Store: iPhone Air ──
  { id: 'd-012', name: 'Case MagSafe iPhone Air — Shadow',                            article: 'MGH24',   description: 'Чехол Apple для iPhone Air, MagSafe, цвет Shadow',           sellingPrice: 156.90, quantity: 10, unit: 'шт', category: { id: 'c1', name: 'Чехлы' }, stockStatus: 'ok' },
  { id: 'd-013', name: 'Tech21 FlexQuartz Case iPhone Air — Pink',                    article: 'HSGB2',   description: 'Ударопрочный чехол Tech21 FlexQuartz, MagSafe, розовый',      sellingPrice: 176.90, quantity: 6,  unit: 'шт', category: { id: 'c1', name: 'Чехлы' }, stockStatus: 'ok' },

  // ── Apple Store: iPhone 17e ──
  { id: 'd-014', name: 'Silicone Case MagSafe iPhone 17e — Soft Pink',                article: 'MHWJ4',   description: 'Силиконовый чехол Apple, MagSafe, цвет Soft Pink',            sellingPrice: 156.90, quantity: 14, unit: 'шт', category: { id: 'c1', name: 'Чехлы' }, stockStatus: 'ok' },
  { id: 'd-015', name: 'Clear Case MagSafe iPhone 17e',                               article: 'MHWC4',   description: 'Прозрачный чехол Apple, MagSafe, поликарбонат',               sellingPrice: 156.90, quantity: 16, unit: 'шт', category: { id: 'c1', name: 'Чехлы' }, stockStatus: 'ok' },
  { id: 'd-016', name: 'Beats Case MagSafe iPhone 17e — Bedrock Blue',                article: 'MHR34',   description: 'Чехол Beats, MagSafe, цвет Bedrock Blue',                    sellingPrice: 144.90, quantity: 8,  unit: 'шт', category: { id: 'c1', name: 'Чехлы' }, stockStatus: 'ok' },

  // ── Apple Store: iPhone 16e ──
  { id: 'd-017', name: 'Silicone Case iPhone 16e — Neon Yellow',                      article: 'MGYW4',   description: 'Силиконовый чехол Apple, яркий Neon Yellow',                 sellingPrice: 124.90, quantity: 22, unit: 'шт', category: { id: 'c1', name: 'Чехлы' }, stockStatus: 'ok' },
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
  ...DEMO_IPHONE_CASES,
  ...DEMO_ACCESSORIES,
  ...DEMO_ANDROID_SALE,
]
