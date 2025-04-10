import { motion } from "framer-motion";

interface ScrollArrowProps {
    onClick: () => void;
    currentSection: number;
    isNextSectionDisabled?: boolean;
}

const ScrollArrow = ({ onClick, currentSection, isNextSectionDisabled }: ScrollArrowProps) => {
    return (
        <motion.div
            className={`scroll-arrow ${isNextSectionDisabled ? 'disabled' : ''}`}
            initial={{ x: 0 }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            onClick={isNextSectionDisabled ? undefined : onClick}
            style={{
                display: currentSection === 3 ? 'none' : 'flex',
                opacity: isNextSectionDisabled ? 0.5 : 1,
                cursor: isNextSectionDisabled ? 'not-allowed' : 'pointer'
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