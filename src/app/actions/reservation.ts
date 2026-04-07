'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

const reservationSchema = z.object({
  productId:    z.string().min(1),
  productName:  z.string().min(1),
  productPrice: z.number().positive(),
  quantity:     z.number().int().min(1).max(99),
  contactName:  z.string().min(2, 'Введите имя (минимум 2 символа)'),
  contactPhone: z
    .string()
    .regex(/^\+?[0-9]{7,15}$/, 'Введите корректный номер телефона'),
  notes: z.string().max(500).optional(),
})

export type ReservationState = {
  errors?: Record<string, string[]>
  message?: string
  success?: boolean
  reservationId?: string
}

export async function createReservation(
  _prevState: ReservationState,
  formData: FormData
): Promise<ReservationState> {
  const session = await getSession()
  if (!session) {
    return { message: 'Необходимо войти в аккаунт' }
  }

  const raw = {
    productId:    formData.get('productId') as string,
    productName:  formData.get('productName') as string,
    productPrice: Number(formData.get('productPrice')),
    quantity:     Number(formData.get('quantity')),
    contactName:  formData.get('contactName') as string,
    contactPhone: formData.get('contactPhone') as string,
    notes:        formData.get('notes') as string || undefined,
  }

  const parsed = reservationSchema.safeParse(raw)
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors as Record<string, string[]> }
  }

  const { productId, productName, productPrice, quantity, contactName, contactPhone, notes } =
    parsed.data

  // Проверяем нет ли уже активной брони на этот товар
  const existing = await db.reservation.findFirst({
    where: {
      customerId: session.sub,
      productId,
      status: { in: ['PENDING', 'CONFIRMED', 'READY'] },
    },
    select: { id: true },
  })

  if (existing) {
    return { message: 'У вас уже есть активная бронь на этот товар' }
  }

  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // +24 часа

  const reservation = await db.reservation.create({
    data: {
      customerId:   session.sub,
      productId,
      productName,
      productPrice,
      quantity,
      contactName,
      contactPhone,
      notes:        notes ?? null,
      expiresAt,
      status:       'PENDING',
    },
    select: { id: true },
  })

  return { success: true, reservationId: reservation.id }
}

// ============================================
// Cancel
// ============================================

export type CancelState = { error?: string; success?: boolean }

export async function cancelReservation(
  _prevState: CancelState,
  formData: FormData
): Promise<CancelState> {
  const session = await getSession()
  if (!session) return { error: 'Необходимо войти в аккаунт' }

  const id = formData.get('reservationId') as string
  if (!id) return { error: 'Не указан ID брони' }

  const reservation = await db.reservation.findFirst({
    where: { id, customerId: session.sub },
    select: { id: true, status: true },
  })

  if (!reservation) return { error: 'Бронь не найдена' }
  if (!['PENDING', 'CONFIRMED'].includes(reservation.status)) {
    return { error: 'Эту бронь уже нельзя отменить' }
  }

  await db.reservation.update({
    where: { id },
    data: { status: 'CANCELLED', cancelledAt: new Date(), cancelReason: 'Отменено пользователем' },
  })

  return { success: true }
}
