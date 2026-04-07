'use client'

import { useActionState } from 'react'
import { cancelReservation, type CancelState } from '@/app/actions/reservation'
import { formatPrice } from '@/lib/utils'
import type { ReservationStatus } from '@prisma/client'

interface ReservationItem {
  id: string
  productName: string
  productPrice: number
  quantity: number
  status: ReservationStatus
  createdAt: Date
  expiresAt: Date
  confirmedAt: Date | null
  cancelledAt: Date | null
  cancelReason: string | null
  contactPhone: string
  notes: string | null
}

const STATUS_CONFIG: Record<ReservationStatus, { label: string; dot: string; text: string }> = {
  PENDING:   { label: 'Ожидает подтверждения', dot: 'bg-[#ffd60a]', text: 'text-[#ffd60a]' },
  CONFIRMED: { label: 'Подтверждена',          dot: 'bg-[#8b5cf6]', text: 'text-[#8b5cf6]' },
  READY:     { label: 'Готова к выдаче',       dot: 'bg-[#30d158]', text: 'text-[#30d158]' },
  COMPLETED: { label: 'Выкуплена',             dot: 'bg-[#6e6e73]', text: 'text-[#6e6e73]' },
  CANCELLED: { label: 'Отменена',              dot: 'bg-[#6e6e73]', text: 'text-[#6e6e73]' },
  EXPIRED:   { label: 'Истекла',               dot: 'bg-[#6e6e73]', text: 'text-[#6e6e73]' },
}

const initialState: CancelState = {}

function CancelButton({ reservationId }: { reservationId: string }) {
  const [state, formAction, isPending] = useActionState(cancelReservation, initialState)

  if (state.success) {
    return <span className="text-xs text-[#6e6e73]">Отменена</span>
  }

  return (
    <form action={formAction}>
      <input type="hidden" name="reservationId" value={reservationId} />
      {state.error && <p className="text-xs text-[#ff453a] mb-1">{state.error}</p>}
      <button
        type="submit"
        disabled={isPending}
        className="text-xs text-[#ff453a] hover:text-[#ff6b6b] disabled:opacity-50 transition-colors"
      >
        {isPending ? 'Отменяем...' : 'Отменить бронь'}
      </button>
    </form>
  )
}

const canCancel = (status: ReservationStatus) =>
  status === 'PENDING' || status === 'CONFIRMED'

const isActive = (status: ReservationStatus) =>
  status === 'PENDING' || status === 'CONFIRMED' || status === 'READY'

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('ru', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(date))
}

export default function ReservationCard({ r }: { r: ReservationItem }) {
  const cfg = STATUS_CONFIG[r.status]
  const active = isActive(r.status)

  return (
    <div className={`rounded-2xl border p-5 space-y-3 transition-opacity ${active ? 'bg-white/4 border-white/10' : 'bg-white/2 border-white/6 opacity-60'}`}>
      {/* Заголовок */}
      <div className="flex items-start justify-between gap-3">
        <p className={`text-sm font-medium leading-snug ${active ? 'text-white' : 'text-[#86868b]'}`}>
          {r.productName}
        </p>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
          <span className={`text-xs font-medium ${cfg.text}`}>{cfg.label}</span>
        </div>
      </div>

      {/* Детали */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#6e6e73]">
        <span>{formatPrice(r.productPrice)} · {r.quantity} шт.</span>
        <span>Оформлена {formatDate(r.createdAt)}</span>
        {active && r.status !== 'READY' && (
          <span>Действует до {formatDate(r.expiresAt)}</span>
        )}
      </div>

      {/* Заметка */}
      {r.notes && (
        <p className="text-xs text-[#6e6e73] italic">«{r.notes}»</p>
      )}

      {/* Отмена */}
      {canCancel(r.status) && (
        <div className="pt-1 border-t border-white/6">
          <CancelButton reservationId={r.id} />
        </div>
      )}
    </div>
  )
}
