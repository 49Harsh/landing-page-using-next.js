import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const Hero = () => {
  return (
    <section id="home" className="bg-gray-100 py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Our Landing Page</h1>
          <p className="text-xl mb-8">Discover amazing features and boost your productivity</p>
          <Button size="lg">Get Started</Button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero