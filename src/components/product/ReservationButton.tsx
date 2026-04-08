'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

const ReservationModal = dynamic(() => import('./ReservationModal'), { ssr: false })

interface Props {
  product: {
    id: string
    name: string
    sellingPrice: number
    quantity: number
    unit: string
  }
  productPagePath: string
}

export default function ReservationButton({ product, productPagePath }: Props) {
  const [open, setOpen] = useState(false)
  const user = useAuth((s) => s.user)
  const router = useRouter()

  function handleClick() {
    if (!user) {
      router.push(`/auth/login?redirect=${encodeURIComponent(productPagePath)}`)
      return
    }
    setOpen(true)
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="w-full py-3.5 rounded-xl bg-[#0071e3] text-white text-sm font-semibold hover:bg-[#0077ed] active:scale-[0.98] transition-all select-none"
      >
        Забронировать
      </button>

      {open && user && (
        <ReservationModal
          product={product}
          user={user}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
