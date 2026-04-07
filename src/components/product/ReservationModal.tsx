'use client'

import { useActionState, useEffect, useRef } from 'react'
import { createReservation, type ReservationState } from '@/app/actions/reservation'

interface Props {
  product: {
    id: string
    name: string
    sellingPrice: number
    quantity: number
    unit: string
  }
  user: {
    name: string
    phone: string
  }
  onClose: () => void
}

const initialState: ReservationState = {}

export default function ReservationModal({ product, user, onClose }: Props) {
  const [state, formAction, isPending] = useActionState(createReservation, initialState)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Закрыть по Esc
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Блокируем прокрутку фона
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const maxQty = Math.min(product.quantity, 10)

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm px-4 pb-4 sm:pb-0"
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      <div className="w-full max-w-md bg-[#161617] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">

        {/* Заголовок */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
          <h2 className="text-base font-semibold text-white">Забронировать товар</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-white/8 hover:bg-white/15 transition-colors text-[#86868b] hover:text-white"
            aria-label="Закрыть"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {state.success ? (
          /* ── Успех ── */
          <div className="px-6 py-10 flex flex-col items-center gap-4 text-center">
            <div className="w-14 h-14 rounded-full bg-[#30d158]/15 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M6 14L11 19L22 9" stroke="#30d158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-lg mb-1">Бронь оформлена!</p>
              <p className="text-sm text-[#86868b]">
                Мы позвоним вам в течение часа для подтверждения.
                Бронь действует 24 часа.
              </p>
            </div>
            <button
              onClick={onClose}
              className="mt-2 px-6 py-2.5 rounded-xl bg-[#8b5cf6] text-white text-sm font-semibold hover:bg-[#7c3aed] transition-colors"
            >
              Отлично
            </button>
          </div>
        ) : (
          /* ── Форма ── */
          <form action={formAction} className="px-6 py-5 flex flex-col gap-4">
            {/* Скрытые поля */}
            <input type="hidden" name="productId"    value={product.id} />
            <input type="hidden" name="productName"  value={product.name} />
            <input type="hidden" name="productPrice" value={product.sellingPrice} />

            {/* Товар */}
            <div className="p-3 rounded-xl bg-white/4 border border-white/8">
              <p className="text-xs text-[#6e6e73] mb-0.5">Товар</p>
              <p className="text-sm text-white font-medium line-clamp-2">{product.name}</p>
            </div>

            {/* Количество */}
            <div>
              <label className="block text-xs text-[#86868b] mb-1.5">
                Количество <span className="text-[#6e6e73]">(до {maxQty} {product.unit})</span>
              </label>
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5].filter(n => n <= maxQty).map((n) => (
                  <label key={n} className="cursor-pointer">
                    <input type="radio" name="quantity" value={n} defaultChecked={n === 1} className="sr-only peer" />
                    <span className="block w-10 h-10 rounded-xl border border-white/10 bg-white/4 text-sm text-[#86868b] font-medium text-center leading-10 peer-checked:border-[#8b5cf6] peer-checked:bg-[#8b5cf6]/15 peer-checked:text-white transition-colors select-none">
                      {n}
                    </span>
                  </label>
                ))}
              </div>
              {state.errors?.quantity && (
                <p className="mt-1 text-xs text-[#ff453a]">{state.errors.quantity[0]}</p>
              )}
            </div>

            {/* Имя */}
            <div>
              <label className="block text-xs text-[#86868b] mb-1.5" htmlFor="res-name">
                Ваше имя
              </label>
              <input
                id="res-name"
                name="contactName"
                defaultValue={user.name}
                placeholder="Иван Иванов"
                autoComplete="name"
                className="w-full px-4 py-2.5 rounded-xl bg-white/4 border border-white/10 text-sm text-white placeholder:text-[#6e6e73] focus:outline-none focus:border-[#8b5cf6] transition-colors"
              />
              {state.errors?.contactName && (
                <p className="mt-1 text-xs text-[#ff453a]">{state.errors.contactName[0]}</p>
              )}
            </div>

            {/* Телефон */}
            <div>
              <label className="block text-xs text-[#86868b] mb-1.5" htmlFor="res-phone">
                Телефон для связи
              </label>
              <input
                id="res-phone"
                name="contactPhone"
                type="tel"
                defaultValue={user.phone}
                placeholder="+375291234567"
                autoComplete="tel"
                className="w-full px-4 py-2.5 rounded-xl bg-white/4 border border-white/10 text-sm text-white placeholder:text-[#6e6e73] focus:outline-none focus:border-[#8b5cf6] transition-colors"
              />
              {state.errors?.contactPhone && (
                <p className="mt-1 text-xs text-[#ff453a]">{state.errors.contactPhone[0]}</p>
              )}
            </div>

            {/* Заметки */}
            <div>
              <label className="block text-xs text-[#86868b] mb-1.5" htmlFor="res-notes">
                Комментарий <span className="text-[#6e6e73]">(необязательно)</span>
              </label>
              <textarea
                id="res-notes"
                name="notes"
                rows={2}
                placeholder="Например: позвоните после 18:00"
                className="w-full px-4 py-2.5 rounded-xl bg-white/4 border border-white/10 text-sm text-white placeholder:text-[#6e6e73] focus:outline-none focus:border-[#8b5cf6] transition-colors resize-none"
              />
            </div>

            {/* Общая ошибка */}
            {state.message && (
              <p className="text-sm text-[#ff453a] text-center">{state.message}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 rounded-xl bg-[#8b5cf6] text-white text-sm font-semibold hover:bg-[#7c3aed] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isPending ? 'Оформляем...' : 'Подтвердить бронь'}
            </button>

            <p className="text-xs text-center text-[#6e6e73]">
              Бронь действует 24 часа · самовывоз из магазина
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
