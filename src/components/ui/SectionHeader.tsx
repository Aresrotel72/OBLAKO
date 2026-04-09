'use client'

import { motion } from 'framer-motion'
import Balancer from 'react-wrap-balancer'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  shopAllHref?: string
  shopAllLabel?: string
  /** Задержка появления (framer-motion) */
  delay?: number
  className?: string
}

const ease = [0.16, 1, 0.3, 1] as const

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  shopAllHref,
  shopAllLabel = 'Смотреть всё',
  delay = 0,
  className = '',
}: SectionHeaderProps) {
  const isLeft = align === 'left'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease }}
      className={`${isLeft ? 'text-left' : 'text-center'} ${className}`}
    >
      {/* Eyebrow */}
      {eyebrow && (
        <p className="text-eyebrow mb-3">{eyebrow}</p>
      )}

      {/* Title */}
      <h2 className="text-display text-foreground mb-3">
        <Balancer>{title}</Balancer>
      </h2>

      {/* Subtitle + Shop All */}
      {(subtitle || shopAllHref) && (
        <div className={`flex flex-wrap gap-3 ${isLeft ? 'items-end justify-between' : 'flex-col items-center'}`}>
          {subtitle && (
            <p className="text-body-apple max-w-xl">
              <Balancer>{subtitle}</Balancer>
            </p>
          )}
          {shopAllHref && (
            <Link href={shopAllHref} className="link-apple shrink-0">
              {shopAllLabel}
              <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
          )}
        </div>
      )}
    </motion.div>
  )
}
