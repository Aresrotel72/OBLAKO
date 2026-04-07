import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { logout } from '@/app/actions/auth'
import ReservationCard from '@/components/account/ReservationCard'
import { User, Phone, LogOut, ShoppingBag } from 'lucide-react'

export const metadata = { title: 'Личный кабинет — OBLAKO' }

export default async function AccountPage() {
  const session = await getSession()
  if (!session) redirect('/auth/login')

  const reservations = await db.reservation.findMany({
    where: { customerId: session.sub },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      productName: true,
      productPrice: true,
      quantity: true,
      status: true,
      createdAt: true,
      expiresAt: true,
      confirmedAt: true,
      cancelledAt: true,
      cancelReason: true,
      contactPhone: true,
      notes: true,
    },
  })

  const active = reservations.filter((r) =>
    ['PENDING', 'CONFIRMED', 'READY'].includes(r.status)
  )
  const history = reservations.filter((r) =>
    ['COMPLETED', 'CANCELLED', 'EXPIRED'].includes(r.status)
  )

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-10">

      {/* Профиль */}
      <div className="rounded-2xl bg-white/4 border border-white/10 p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#8b5cf6]/15 border border-[#8b5cf6]/20 flex items-center justify-center">
            <User size={26} className="text-[#8b5cf6]" />
          </div>
          <div className="space-y-0.5">
            <p className="text-lg font-semibold text-white">{session.name}</p>
            <div className="flex items-center gap-1.5 text-sm text-[#86868b]">
              <Phone size={13} />
              <span>{session.phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Активные бронирования */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-white flex items-center gap-2">
          <ShoppingBag size={16} className="text-[#8b5cf6]" />
          Активные бронирования
          {active.length > 0 && (
            <span className="ml-1 px-2 py-0.5 rounded-full bg-[#8b5cf6]/15 text-[#8b5cf6] text-xs font-medium">
              {active.length}
            </span>
          )}
        </h2>

        {active.length === 0 ? (
          <div className="rounded-2xl border border-white/8 bg-white/2 px-6 py-10 text-center">
            <p className="text-sm text-[#6e6e73]">Нет активных броней</p>
            <a
              href="/catalog"
              className="mt-3 inline-block text-sm text-[#8b5cf6] hover:underline"
            >
              Перейти в каталог
            </a>
          </div>
        ) : (
          <div className="space-y-3">
            {active.map((r) => (
              <ReservationCard key={r.id} r={{ ...r, productPrice: Number(r.productPrice) }} />
            ))}
          </div>
        )}
      </section>

      {/* История */}
      {history.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-base font-semibold text-[#6e6e73]">История</h2>
          <div className="space-y-3">
            {history.map((r) => (
              <ReservationCard key={r.id} r={{ ...r, productPrice: Number(r.productPrice) }} />
            ))}
          </div>
        </section>
      )}

      {/* Выход */}
      <form action={logout}>
        <button
          type="submit"
          className="flex items-center gap-2 text-sm text-[#6e6e73] hover:text-white transition-colors"
        >
          <LogOut size={15} />
          Выйти из аккаунта
        </button>
      </form>

    </div>
  )
}
