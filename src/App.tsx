import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import SaverXIntro from './SaverXIntro'
import BuildingComponent from './BuildingInfo'
import Simulator from './Simulator'
import SimulationResult from './SimulationResult'
import { useState } from 'react'
import './App.css'
import { useBuilding } from './context/BuildingContext'
import { isMobileDevice } from './utils/deviceDetection'
import MobileBlocker from './components/MobileBlocker'
import { SimulationFormValues } from './lib/validation'
import { SaverXPredictionResponse } from './lib/reponse'

const App = () => {
  const sectionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]
  const appContainerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [resultData, setResultData] = useState<SaverXPredictionResponse | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const { selectedBuilding } = useBuilding()

  // This function manually controls scrolling within the container
  const scrollToSection = (index: number) => {
    if (appContainerRef.current && sectionRefs[index]?.current) {
      const container = appContainerRef.current
      const section = sectionRefs[index].current as HTMLElement

      // Calculate the scroll position (section's offsetTop relative to container)
      container.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth'
      })

      setCurrentSection(index)
    }
  }

  const handleNext = () => {
    if (currentSection === 2 && resultData === null) {
      // Prevent scrolling to Section 3 if resultData is null
      alert('Enter the simulation info before proceeding.');
      return;
    }

    if (currentSection < 3) {
      scrollToSection(currentSection + 1);
    }
  };

  const handleSimulation = async (data: SimulationFormValues) => {
    setLoading(true)
    scrollToSection(3)

    try {
      const building_type = selectedBuilding === 'Office' ? '1' : '2'
      const response = await fetch('https://saverxdemo-server-435059368913.asia-south1.run.app/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cooling_water_temperature_setpoint: data.chilledWaterTemp,
          chiller_setpoint_temperature: data.coolingWaterTemp,
          ahu_opening_percentage: data.ahuOpening,
          city: data.location.toLowerCase(),
          building_type
        })
      })

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

      await new Promise(resolve => setTimeout(resolve, 20000)) // Simulated delay
      const result = await response.json()
      setResultData(result)
    } catch (err) {
      console.error(err)
      setResultData(null)
      scrollToSection(2)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const updateMobile = () => setIsMobile(isMobileDevice())
    updateMobile()
    window.addEventListener('resize', updateMobile)
    return () => window.removeEventListener('resize', updateMobile)
  }, [])

  // Add scroll event listener to detect current section
  useEffect(() => {
    const handleScroll = () => {
      if (!appContainerRef.current) return

      const container = appContainerRef.current
      const scrollPosition = container.scrollTop
      const windowHeight = window.innerHeight

      // Determine which section is most visible
      let maxVisibleSection = 0
      let maxVisibleAmount = 0

      sectionRefs.forEach((ref, index) => {
        if (ref.current) {
          const element = ref.current as HTMLElement
          const elementTop = element.offsetTop
          const elementHeight = element.offsetHeight

          // Calculate how much of the section is visible
          const visibleTop = Math.max(elementTop, scrollPosition)
          const visibleBottom = Math.min(elementTop + elementHeight, scrollPosition + windowHeight)
          const visibleAmount = Math.max(0, visibleBottom - visibleTop)

          if (visibleAmount > maxVisibleAmount) {
            maxVisibleAmount = visibleAmount
            maxVisibleSection = index
          }
        }
      })

      // Prevent scrolling to Section 3 if resultData is null and current section is 2, but allow scrolling when loading is true
      if (maxVisibleSection === 3 && currentSection === 2 && resultData === null && !loading) {
        container.scrollTo({
          // @ts-expect-error sectionrefs status
          top: sectionRefs[2].current?.offsetTop || 0,
          behavior: 'smooth',
        });
        return;
      }

      if (maxVisibleSection !== currentSection) {
        setCurrentSection(maxVisibleSection)
      }
    }

    const container = appContainerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [currentSection, resultData, loading])

  if (isMobile) return <MobileBlocker />

  return (
    <div ref={appContainerRef} className="app-container">
      {[SaverXIntro, BuildingComponent, Simulator, SimulationResult].map((_Component, index) => {
        const ref = sectionRefs[index]
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const isVisible = useInView(ref, { margin: '-30% 0px -30% 0px' })
        return (
          <motion.div
            key={index}
            ref={ref}
            className="section"
            initial={{ y: 100, opacity: 0 }}
            animate={isVisible ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            {index === 0 && <SaverXIntro />}
            {index === 1 && <BuildingComponent />}
            {index === 2 && <Simulator onSimulate={handleSimulation} />}
            {index === 3 && <SimulationResult loading={loading} chartData={resultData} />}
          </motion.div>
        )
      })}

      {
        currentSection === 3 ? <>
          <button
            className="nav-button"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
        </> :
          <button
            className="nav-button"
            onClick={handleNext}
            disabled={currentSection === 3}
          >
            {currentSection === 0 ? "Let's Begin" : "Continue"}
          </button>

      }


    </div>
  )
}

export default App