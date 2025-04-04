import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, easeInOut } from 'framer-motion'
import BuildingComponent from "./BuildingInfo"  // Corrected name
import SaverXIntro from "./SaverXIntro"
import Simulator from "./Simulator"
import './App.css'
import SimulationResult from './SimulationResult'

const transitionEase = easeInOut // Use a valid easing function

function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      
      // Make the detection more precise by using exact multiples of window height
      if (scrollPosition < windowHeight) {
        setCurrentSection(0)
      } else if (scrollPosition < windowHeight * 2) {
        setCurrentSection(1)
      } else if (scrollPosition < windowHeight * 3) {
        setCurrentSection(2)
      } else {
        setCurrentSection(3)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


 const handleScrollClick = () => {
  const nextSection = currentSection + 1
  
  if (nextSection <= 3) {
    // Exact multiple of window height for precise stopping
    const targetY = nextSection * window.innerHeight
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    })
  }
}


  // SaverXIntro transitions
  const introOpacity = useTransform(scrollYProgress, 
    [0, 0.2, 0.25], 
    [1, 1, 0], 
    { ease: transitionEase }
  )
  const introScale = useTransform(scrollYProgress, 
    [0, 0.2, 0.25], 
    [1, 1, 0.8], 
    { ease: transitionEase }
  )
  const introY = useTransform(scrollYProgress, 
    [0, 0.2, 0.25], 
    [0, 0, 50], 
    { ease: transitionEase }
  )

  // Building component transitions
  const buildingOpacity = useTransform(scrollYProgress, 
    [0.2, 0.25, 0.45, 0.5], 
    [0, 1, 1, 0], 
    { ease: transitionEase }
  )
  const buildingScale = useTransform(scrollYProgress, 
    [0.2, 0.25, 0.45, 0.5], 
    [0.8, 1, 1, 0.8], 
    { ease: transitionEase }
  )
  const buildingY = useTransform(scrollYProgress, 
    [0.2, 0.25, 0.45, 0.5], 
    [50, 0, 0, -50], 
    { ease: transitionEase }
  )

  // Simulator component transitions
  const simulatorOpacity = useTransform(scrollYProgress, 
    [0.45, 0.5, 0.7, 0.75], 
    [0, 1, 1, 0], 
    { ease: transitionEase }
  )
  const simulatorScale = useTransform(scrollYProgress, 
    [0.45, 0.5, 0.7, 0.75], 
    [0.8, 1, 1, 0.8], 
    { ease: transitionEase }
  )
  const simulatorY = useTransform(scrollYProgress, 
    [0.45, 0.5, 0.7, 0.75], 
    [50, 0, 0, -50], 
    { ease: transitionEase }
  )

  // Result component transitions
  const resultOpacity = useTransform(scrollYProgress, 
    [0.7, 0.75, 1], 
    [0, 1, 1], 
    { ease: transitionEase }
  )
  const resultScale = useTransform(scrollYProgress, 
    [0.7, 0.75, 1], 
    [0.8, 1, 1], 
    { ease: transitionEase }
  )
  const resultY = useTransform(scrollYProgress, 
    [0.7, 0.75, 1], 
    [50, 0, 0], 
    { ease: transitionEase }
  )

  return (
    <div className="app-container">
      <div className="transition-section">
        <div ref={containerRef} className="scroll-container">
          <motion.div
            className="component-wrapper"
            style={{
              opacity: introOpacity,
              scale: introScale,
              y: introY,
            }}
          >
            <SaverXIntro />
          </motion.div>

          <motion.div
            className="component-wrapper"
            style={{
              opacity: buildingOpacity,
              scale: buildingScale,
              y: buildingY,
            }}
          >
            <BuildingComponent />  {/* Corrected name */}
          </motion.div>

          <motion.div
            className="component-wrapper"
            style={{
              opacity: simulatorOpacity,
              scale: simulatorScale,
              y: simulatorY,
              zIndex: currentSection === 2 ? 2 : 1,
              pointerEvents: currentSection === 2 ? 'auto' : 'none'
            }}
          >
            <Simulator />
          </motion.div>

          <motion.div
            className="component-wrapper"
            style={{
              opacity: resultOpacity,
              scale: resultScale,
              y: resultY,
              zIndex: 0,
              pointerEvents: currentSection === 3 ? 'auto' : 'none'
            }}
          >
            <SimulationResult />
          </motion.div>
        </div>
      </div>

      <ScrollArrow onClick={handleScrollClick} currentSection={currentSection} />
    </div>
  )
}


const ScrollArrow = ({ onClick, currentSection }: { onClick: () => void; currentSection: number }) => {
  return (
    <motion.div
      className="scroll-arrow"
      initial={{ y: 0 }}
      animate={{ 
        y: [0, 10, 0],
        opacity: currentSection === 3 ? 0 : 1 
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      onClick={onClick}
      style={{
        display: currentSection === 3 ? 'none' : 'flex'
      }}
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