import React from 'react'
import Header from '../../components/Header'
import Features from './components/Features'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Testimonial from './components/Testimonial'

export default function Home() {
  return (
    <>
    <Header />
    <Hero />
    <Features />
    <Stats />
    <Testimonial />
    <Footer />
    </>
  )
}
