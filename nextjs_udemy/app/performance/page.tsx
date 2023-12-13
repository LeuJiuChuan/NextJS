import React from 'react'
import perfomanceImg from '@/public/performance.jpg'
import Hero from '../components/hero'

export default function PerformancePage() {
  return (
    <div>
      <Hero imgData={perfomanceImg} imgAlt='welding' title='we serve high performance applications' />
    </div>
  )
}
