import type { Metadata } from 'next'
import LoginForm from '@/components/auth/LoginForm'

export const metadata: Metadata = {
  title: 'Вход — OBLAKO',
}

export default function LoginPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">Вход</h1>
        <p className="mt-1 text-sm text-[#86868b]">
          Войдите, чтобы бронировать товары и следить за заказами
        </p>
      </div>
      <LoginForm />
    </div>
  )
}
