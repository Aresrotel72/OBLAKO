import type { Metadata } from 'next'
import RegisterForm from '@/components/auth/RegisterForm'

export const metadata: Metadata = {
  title: 'Регистрация — OBLAKO',
}

export default function RegisterPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">Регистрация</h1>
        <p className="mt-1 text-sm text-[#86868b]">
          Создайте аккаунт для удобного бронирования
        </p>
      </div>
      <RegisterForm />
    </div>
  )
}
