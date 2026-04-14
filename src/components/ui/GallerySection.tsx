'use client'

import ScrollPinnedGallery from '@/components/ui/ScrollPinnedGallery'

const GALLERY_SLIDES = [
  {
    src: '/showcase/case-colorful.jpg',
    alt: 'iPhone в чехле',
    title: 'Чехлы iPhone',
    desc: 'Более 200 моделей: силикон, кожа, MagSafe, прозрачные. Для iPhone 12–17 Pro Max.',
    accent: '#0071e3',
  },
  {
    src: '/showcase/airpods.jpg',
    alt: 'AirPods Pro',
    title: 'AirPods и Аудио',
    desc: 'AirPods Pro, кейсы, наушники и всё для идеального звука каждый день.',
    accent: '#bf5af2',
  },
  {
    src: '/showcase/cable-charger.jpg',
    alt: 'Наушники',
    title: 'Аксессуары',
    desc: 'Зарядки, кабели, наушники, адаптеры — всё для полной экосистемы.',
    accent: '#30d158',
  },
  {
    src: '/showcase/case-black.jpg',
    alt: 'iPhone с чехлом на столе',
    title: 'Стиль жизни',
    desc: 'Каждый аксессуар подобран для комфорта и стиля. Приходите, выбирайте.',
    accent: '#ffd60a',
  },
]

export default function GallerySection() {
  return <ScrollPinnedGallery slides={GALLERY_SLIDES} />
}
