import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

interface Particle {
  x: number
  y: number
  color: string
  velocityX: number
  velocityY: number
}

const Particle: React.FC<Particle> = ({ x, y, color }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full"
    style={{
      backgroundColor: color,
      left: x,
      top: y,
    }}
    animate={{ x, y }}
    transition={{ type: 'spring', stiffness: 50 }}
  />
)

const Hero: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    setIsMounted(true)
    
    if (typeof window !== 'undefined') {
      const handleMouseMove = (event: MouseEvent) => {
        setMousePosition({ x: event.clientX, y: event.clientY })
      }

      window.addEventListener('mousemove', handleMouseMove)

      const initialParticles: Particle[] = Array.from({ length: 20 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        velocityX: (Math.random() - 0.5) * 2,
        velocityY: (Math.random() - 0.5) * 2
      }))
      setParticles(initialParticles)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  useEffect(() => {
    if (isMounted) {
      const moveParticles = () => {
        setParticles(prevParticles =>
          prevParticles.map(particle => {
            let newX = particle.x + particle.velocityX + (mousePosition.x - particle.x) * 0.02
            let newY = particle.y + particle.velocityY + (mousePosition.y - particle.y) * 0.02

            // Boundary check
            if (newX < 0 || newX > window.innerWidth) particle.velocityX *= -1
            if (newY < 0 || newY > window.innerHeight) particle.velocityY *= -1

            return {
              ...particle,
              x: newX,
              y: newY,
            }
          })
        )
      }

      const intervalId = setInterval(moveParticles, 50)

      return () => clearInterval(intervalId)
    }
  }, [mousePosition, isMounted])

  return (
    <section id="home" className="bg-gray-900 py-20 relative overflow-hidden min-h-screen">
       
      {isMounted && particles.map((particle, index) => (
        <Particle key={index} {...particle} />
      ))}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">Welcome to Our Landing Page</h1>
          <p className="text-xl mb-8 text-gray-300">Discover amazing features and boost your productivity</p>
          <Button size="lg">Get Started</Button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero