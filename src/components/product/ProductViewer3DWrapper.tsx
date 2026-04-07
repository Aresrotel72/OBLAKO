'use client'

import dynamic from 'next/dynamic'

const ProductViewer3D = dynamic(() => import('./ProductViewer3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-square rounded-2xl bg-[#0d0d0f] border border-white/8 skeleton" />
  ),
})

export default function ProductViewer3DWrapper({ productName }: { productName: string }) {
  return <ProductViewer3D productName={productName} />
}
