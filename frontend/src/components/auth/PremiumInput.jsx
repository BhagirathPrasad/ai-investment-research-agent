import { motion } from 'framer-motion'
import { forwardRef } from 'react'

const PremiumInput = forwardRef(
  ({ type = 'text', placeholder, icon: Icon, error, ...props }, ref) => {
    return (
      <motion.div
        className={`
          relative h-14 rounded-2xl border-2 transition-all duration-300 flex items-center px-4
          backdrop-blur-sm
          ${
            error
              ? 'border-rose-400/50 bg-rose-500/5 focus-within:border-rose-400 focus-within:bg-rose-500/10'
              : 'border-slate-600 bg-slate-800/50 hover:border-cyan-400/30 focus-within:border-cyan-400/80 focus-within:bg-slate-800/80'
          }
        `}
        whileFocus={{ scale: 1.02 }}
      >
        {Icon && (
          <Icon
            size={20}
            className={`mr-3 flex-shrink-0 transition-colors duration-300 ${
              error
                ? 'text-rose-400'
                : 'text-slate-400 group-focus-within:text-cyan-400'
            }`}
          />
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className="w-full bg-transparent text-white placeholder:text-slate-500 outline-none text-base font-medium"
          {...props}
        />
      </motion.div>
    )
  }
)

PremiumInput.displayName = 'PremiumInput'

export default PremiumInput
