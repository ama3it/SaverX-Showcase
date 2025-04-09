import { motion } from "motion/react";

const ScrollArrow = ({ onClick, currentSection }: { onClick: () => void; currentSection: number }) => {
    return (
        <motion.div
        className="scroll-arrow"
        initial={{ x: 0 }}
        // animate={{
        //     x: [0, 10, 0],
        //     // opacity: currentSection === 3 ? 0 : 1
        // }}
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
                <path d="M8 6L16 12L8 18" />
            </svg>
        </motion.div>
    )
}

export default ScrollArrow;