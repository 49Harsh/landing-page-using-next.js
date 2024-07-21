'use client'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import ContactForm from '@/components/ContactForm'
import { useSmoothScroll } from '@/hooks/useSmootScroll'

export default function Home() {
  useSmoothScroll()

  return (
    <main>
      <Header />
      <Hero />
      <Features />
      <ContactForm />
    </main>
  )
}