import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import BuildngComponent from "./BuildingInfo"
import SaverXIntro from "./SaverXIntro"
import Simulator from "./Simulator"
import './App.css'

function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Track scroll position to update section state
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      
      if (scrollPosition < windowHeight * 0.5) {
        setCurrentSection(0)
      } else if (scrollPosition < windowHeight * 1.5) {
        setCurrentSection(1)
      } else {
        setCurrentSection(2)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScrollClick = () => {
    const nextSection = (currentSection + 1) % 3
    const targetY = nextSection * window.innerHeight
    
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    })
  }

  // Smooth transitions for Building component
  const buildingOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0])
  const buildingScale = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0.8])
  const buildingY = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 0, 50])

  // Smooth transitions for Simulator component
  const simulatorOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 1])
  const simulatorScale = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0.8, 1, 1])
  const simulatorY = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [50, 0, 0])

  return (
    <div className="app-container">
      <div 
        className="intro-section" 
        style={{ height: '100vh' }}
      >
        <SaverXIntro />
      </div>

      <div className="transition-section">
        <div ref={containerRef} className="scroll-container">
          <motion.div
            className="component-wrapper"
            style={{
              opacity: buildingOpacity,
              scale: buildingScale,
              y: buildingY,
            }}
            transition={{ duration: 0.5 }}
          >
            <BuildngComponent />
          </motion.div>

          <motion.div
            className="component-wrapper"
            style={{
              opacity: simulatorOpacity,
              scale: simulatorScale,
              y: simulatorY,
            }}
            transition={{ duration: 0.5 }}
          >
            <Simulator />
          </motion.div>
        </div>
      </div>

      <ScrollArrow onClick={handleScrollClick} />
    </div>
  )
}

const ScrollArrow = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.div
      className="scroll-arrow"
      initial={{ y: 0 }}
      animate={{ y: [0, 10, 0] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      onClick={onClick}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 5v14M5 12l7 7 7-7" />
      </svg>
    </motion.div>
  )
}

export default App