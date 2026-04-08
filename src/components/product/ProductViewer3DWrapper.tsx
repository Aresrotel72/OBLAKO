'use client'

import dynamic from 'next/dynamic'

const ProductViewer3D = dynamic(() => import('./ProductViewer3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-square rounded-2xl bg-background-secondary border border-border skeleton" />
  ),
})

export default function ProductViewer3DWrapper({ productName }: { productName: string }) {
  return <ProductViewer3D productName={productName} />
}
