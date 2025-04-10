import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, easeInOut } from 'framer-motion'
import BuildingComponent from "./BuildingInfo"  // Corrected name
import SaverXIntro from "./SaverXIntro"
import Simulator from "./Simulator"
import './App.css'
import SimulationResult from './SimulationResult'
import ScrollArrow from './components/ScrollArrow'
import ScrollPrevArrow from './components/ScrollPrevArrow'
import { SimulationFormValues } from './lib/validation'
import { SaverXPredictionResponse } from './lib/reponse'
import { isMobileDevice } from './utils/deviceDetection'
import MobileBlocker from './components/MobileBlocker'
import { useBuilding } from './context/BuildingContext'

const transitionEase = easeInOut 

const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [resultData, setResultData] = useState<SaverXPredictionResponse | null >(null);
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })
  const [isMobile, setIsMobile] = useState(false);
  const { selectedBuilding } = useBuilding();
 

  const handleSimulation = async (data: SimulationFormValues) => {
    setLoading(true);
    if (!resultData && !loading) {
      const targetY = 3 * window.innerHeight;
      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });
      setCurrentSection(3);
    }
    
    try {
      const simulatedResult = await fetchPrediction(data);
      setResultData(simulatedResult);
    } catch (error) {
      console.error("API call failed:", error);
      alert("An error occurred while fetching the prediction. Please try again.");
      setResultData(null);
      // Scroll back to simulator section on error
      const targetY = 2 * window.innerHeight;
      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });
      setCurrentSection(2);
    } finally {
      setLoading(false);
    }
  };

  const fetchPrediction = async (data: SimulationFormValues) => {
    const building_type=selectedBuilding==="Office"?"1":"2"
    const response = await fetch('https://saverxdemo-server-435059368913.asia-south1.run.app/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cooling_water_temperature_setpoint: data.chilledWaterTemp,
        chiller_setpoint_temperature: data.coolingWaterTemp,
        ahu_opening_percentage: data.ahuOpening,
        city: data.location.toLowerCase(),
        building_type: building_type
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    // Add 20 second delay
    await new Promise(resolve => setTimeout(resolve, 15000));

    return result;
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
    
      const sectionIndex = Math.round(scrollPosition / windowHeight)

      const newSection = Math.max(0, Math.min(3, sectionIndex))
      if (newSection !== currentSection) {
        setCurrentSection(newSection)
      }
    }

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentSection])

  const handleScrollClick = () => {
    const nextSection = currentSection + 1;
    
    // Prevent scrolling to result section if no data and not loading
    if (nextSection === 3 && !resultData && !loading) {
      return;
    }

    if (nextSection <= 3) {
      const targetY = nextSection * window.innerHeight;
      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });
    }
  }

  const handleScrollPrevious = () => {
    const prevSection = currentSection - 1

    if (prevSection >= 0) {
      const targetY = prevSection * window.innerHeight
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

  useEffect(() => {
    setIsMobile(isMobileDevice());
    
    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return <MobileBlocker />;
  }
  
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
              zIndex: currentSection === 0 ? 4 : 0,
              pointerEvents: currentSection === 0 ? 'auto' : 'none'
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
              zIndex: currentSection === 1 ? 3 : 0,
              pointerEvents: currentSection === 1 ? 'auto' : 'none'
            }}
          >
            <BuildingComponent />
          </motion.div>

          <motion.div
            className="component-wrapper"
            style={{
              opacity: simulatorOpacity,
              scale: simulatorScale,
              y: simulatorY,
              zIndex: currentSection === 2 ? 2 : 0,
              pointerEvents: currentSection === 2 ? 'auto' : 'none'
            }}
          >
            <Simulator onSimulate={handleSimulation} />
          </motion.div>

          <motion.div
            className="component-wrapper"
            style={{
              opacity: resultOpacity,
              scale: resultScale,
              y: resultY,
              zIndex: currentSection === 3 ? 1 : 0,
              pointerEvents: currentSection === 3 ? 'auto' : 'none'
            }}
          >
            <SimulationResult loading={loading} chartData={resultData} />
          </motion.div>
        </div>
      </div>

      <ScrollPrevArrow onClick={handleScrollPrevious} currentSection={currentSection} />
      <ScrollArrow 
        onClick={handleScrollClick} 
        currentSection={currentSection} 
        isNextSectionDisabled={currentSection === 2 && !resultData && !loading} 
      />
    </div>
  )
}


export default App