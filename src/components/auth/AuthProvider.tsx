'use client'

import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuth((s) => s.setUser)

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setUser(data))
      .catch(() => setUser(null))
  }, [setUser])

  return <>{children}</>
}
