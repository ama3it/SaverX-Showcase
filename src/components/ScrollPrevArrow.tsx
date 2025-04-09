import { motion } from "motion/react";

const ScrollPrevArrow = ({ onClick, currentSection }: { onClick: () => void; currentSection: number }) => {
    return (
        <motion.div
            className="scroll-arrow scroll-arrow-prev"
            initial={{ x: 0 }}
            // animate={{
            //     x: [0, -10, 0],
            // }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            onClick={onClick}
            style={{
                display: currentSection === 0 ? 'none' : 'flex'
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
                <path d="M16 18L8 12L16 6" />
            </svg>
        </motion.div>
    )
}

export default ScrollPrevArrow;