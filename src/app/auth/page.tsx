'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { LogIn, UserPlus, ArrowLeft } from 'lucide-react'

export default function AuthPage() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-foreground mb-2">Добро пожаловать</h1>
        <p className="text-foreground-secondary text-sm">
          Войдите в личный кабинет для доступа к вашим бонусам и бронированиям
        </p>
      </div>

      <div className="grid gap-4">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/auth/login"
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[#0071e3] text-white font-semibold transition-all shadow-lg shadow-[#0071e3]/20"
          >
            <LogIn size={20} />
            Вход в аккаунт
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/auth/register"
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-white border border-border text-foreground font-semibold transition-all hover:bg-background-secondary shadow-sm"
          >
            <UserPlus size={20} />
            Регистрация
          </Link>
        </motion.div>
      </div>

      <div className="pt-6 text-center">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} />
          Вернуться на главную
        </Link>
      </div>
    </div>
  )
}
