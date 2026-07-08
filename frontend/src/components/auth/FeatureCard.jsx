import { motion } from 'framer-motion'

export default function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-cyan-400/20 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 cursor-pointer group"
      whileHover={{
        x: 8,
        backgroundColor: 'rgba(34, 197, 94, 0.15)',
      }}
    >
      {/* Icon */}
      <div className="flex-shrink-0 text-3xl">
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-white font-bold text-sm leading-tight group-hover:text-cyan-300 transition-colors">
          {title}
        </h3>
        <p className="text-slate-400 text-xs mt-1 leading-tight">
          {description}
        </p>
      </div>

      {/* Checkmark */}
      <div className="flex-shrink-0 text-cyan-400 text-lg opacity-0 group-hover:opacity-100 transition-opacity">
        ✓
      </div>
    </motion.div>
  )
}
