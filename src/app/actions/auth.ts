'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { db } from '@/lib/db'
import { hashPassword, verifyPassword, setSession, clearSession } from '@/lib/auth'

// ============================================
// Schemas
// ============================================

const registerSchema = z.object({
  name: z.string().min(2, 'Имя должно быть не менее 2 символов'),
  phone: z
    .string()
    .regex(/^\+?[0-9]{7,15}$/, 'Введите корректный номер телефона'),
  email: z.string().email('Некорректный email').optional().or(z.literal('')),
  password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
})

const loginSchema = z.object({
  login: z.string().min(1, 'Введите телефон или email'),
  password: z.string().min(1, 'Введите пароль'),
})

export type AuthState = {
  errors?: Record<string, string[]>
  message?: string
}

// ============================================
// Register
// ============================================

export async function register(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const raw = {
    name: formData.get('name') as string,
    phone: formData.get('phone') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const parsed = registerSchema.safeParse(raw)
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors as Record<string, string[]> }
  }

  const { name, phone, password } = parsed.data
  const email = parsed.data.email || undefined

  // Проверяем дубликаты
  const existing = await db.customer.findFirst({
    where: {
      OR: [
        { phone },
        ...(email ? [{ email }] : []),
      ],
    },
    select: { id: true, phone: true, email: true },
  })

  if (existing) {
    if (existing.phone === phone) {
      return { errors: { phone: ['Этот номер телефона уже зарегистрирован'] } }
    }
    if (email && existing.email === email) {
      return { errors: { email: ['Этот email уже зарегистрирован'] } }
    }
  }

  const passwordHash = hashPassword(password)

  const customer = await db.customer.create({
    data: { name, phone, email: email ?? null, passwordHash },
    select: { id: true, name: true, phone: true },
  })

  await setSession({ sub: customer.id, name: customer.name, phone: customer.phone })

  redirect('/account')
}

// ============================================
// Login
// ============================================

export async function login(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const raw = {
    login: formData.get('login') as string,
    password: formData.get('password') as string,
  }

  const parsed = loginSchema.safeParse(raw)
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors as Record<string, string[]> }
  }

  const { login, password } = parsed.data

  // Ищем по телефону или email
  const isEmail = login.includes('@')
  const customer = await db.customer.findFirst({
    where: isEmail ? { email: login } : { phone: login },
    select: { id: true, name: true, phone: true, passwordHash: true },
  })

  if (!customer || !verifyPassword(password, customer.passwordHash)) {
    return { message: 'Неверный телефон/email или пароль' }
  }

  await db.customer.update({
    where: { id: customer.id },
    data: { lastLoginAt: new Date() },
  })

  await setSession({ sub: customer.id, name: customer.name, phone: customer.phone })

  redirect('/account')
}

// ============================================
// Logout
// ============================================

export async function logout(): Promise<void> {
  await clearSession()
  redirect('/')
}
