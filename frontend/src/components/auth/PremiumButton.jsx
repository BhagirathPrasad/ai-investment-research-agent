import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

export default function PremiumButton({
  type = 'button',
  children,
  isLoading = false,
  disabled = false,
  ...props
}) {
  return (
    <motion.button
      type={type}
      disabled={disabled || isLoading}
      className={`
        w-full h-14 rounded-full font-bold text-lg
        bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500
        text-white
        hover:shadow-[0_0_40px_rgba(34,197,94,0.3)]
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-300
        flex items-center justify-center gap-2
        relative overflow-hidden group
      `}
      whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg" />

      {/* Button content */}
      <span className="relative z-10 font-bold">
        {isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-5 h-5 border-2 border-transparent border-t-white border-r-white rounded-full inline-block"
          />
        ) : (
          <>
            {children}
            <motion.span
              className="inline-block ml-2"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FiArrowRight size={18} />
            </motion.span>
          </>
        )}
      </span>
    </motion.button>
  )
}
