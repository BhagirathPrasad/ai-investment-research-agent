import { motion } from 'framer-motion'

export default function FuturisticRobot() {
  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  }

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  }

  return (
    <motion.div
      className="relative w-64 h-80 flex items-center justify-center"
      animate={floatingAnimation}
    >
      {/* Glowing background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-blue-500/30 via-purple-500/20 to-transparent rounded-full blur-3xl"
        animate={pulseAnimation}
      />

      {/* SVG Robot Illustration */}
      <svg
        viewBox="0 0 200 300"
        className="w-full h-full relative z-10"
        fill="none"
      >
        {/* Holographic Grid Background */}
        <defs>
          <linearGradient id="robotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Robot Head */}
        <motion.g
          animate={{
            rotateY: [0, 5, -5, 0],
            rotateZ: [0, 2, -2, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          {/* Head Box */}
          <rect
            x="75"
            y="40"
            width="50"
            height="50"
            rx="8"
            stroke="url(#robotGradient)"
            strokeWidth="2"
            filter="url(#glow)"
          />

          {/* Eyes */}
          <motion.circle
            cx="85"
            cy="55"
            r="4"
            fill="#06b6d4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle
            cx="115"
            cy="55"
            r="4"
            fill="#06b6d4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Visor */}
          <line
            x1="80"
            y1="63"
            x2="120"
            y2="63"
            stroke="url(#robotGradient)"
            strokeWidth="1.5"
          />
        </motion.g>

        {/* Body */}
        <motion.rect
          x="60"
          y="100"
          width="80"
          height="70"
          rx="6"
          stroke="url(#robotGradient)"
          strokeWidth="2"
          filter="url(#glow)"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Chest Panel */}
        <rect
          x="75"
          y="115"
          width="50"
          height="40"
          rx="4"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="1.5"
          opacity="0.6"
        />

        {/* Holographic Charts */}
        <motion.g
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          {/* Chart lines */}
          <polyline
            points="85,135 90,130 95,135 100,128 105,133 110,125 115,130"
            stroke="#06b6d4"
            strokeWidth="1.5"
            fill="none"
          />
          <polyline
            points="85,150 90,148 95,150 100,145 105,148 110,142 115,146"
            stroke="#3b82f6"
            strokeWidth="1.5"
            fill="none"
          />
        </motion.g>

        {/* Left Arm */}
        <motion.line
          x1="60"
          y1="120"
          x2="30"
          y2="110"
          stroke="url(#robotGradient)"
          strokeWidth="2"
          filter="url(#glow)"
          animate={{
            x1: [60, 55],
            x2: [30, 25],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* Right Arm */}
        <motion.line
          x1="140"
          y1="120"
          x2="170"
          y2="110"
          stroke="url(#robotGradient)"
          strokeWidth="2"
          filter="url(#glow)"
          animate={{
            x1: [140, 145],
            x2: [170, 175],
            rotate: [0, -10, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* Left Hand */}
        <circle cx="30" cy="110" r="4" fill="#06b6d4" filter="url(#glow)" />

        {/* Right Hand */}
        <circle cx="170" cy="110" r="4" fill="#8b5cf6" filter="url(#glow)" />

        {/* Legs */}
        <line
          x1="85"
          y1="170"
          x2="85"
          y2="210"
          stroke="url(#robotGradient)"
          strokeWidth="2"
        />
        <line
          x1="115"
          y1="170"
          x2="115"
          y2="210"
          stroke="url(#robotGradient)"
          strokeWidth="2"
        />

        {/* Feet */}
        <rect x="70" y="210" width="30" height="6" rx="3" fill="#06b6d4" />
        <rect x="100" y="210" width="30" height="6" rx="3" fill="#8b5cf6" />

        {/* Floating Data Points */}
        <motion.g animate={{ y: [-10, 10, -10] }} transition={{ duration: 3, repeat: Infinity }}>
          <circle cx="40" cy="80" r="2" fill="#06b6d4" opacity="0.6" />
          <circle cx="160" cy="100" r="2" fill="#3b82f6" opacity="0.6" />
        </motion.g>

        {/* Floating Circles - Holographic Elements */}
        <motion.circle
          cx="100"
          cy="50"
          r="60"
          fill="none"
          stroke="url(#robotGradient)"
          strokeWidth="1"
          opacity="0.3"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.circle
          cx="100"
          cy="50"
          r="75"
          fill="none"
          stroke="url(#robotGradient)"
          strokeWidth="1"
          opacity="0.2"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
      </svg>

      {/* Floating Analytics Label */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-cyan-400/30 rounded-lg px-3 py-1.5 backdrop-blur-sm"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <p className="text-xs text-cyan-300 font-semibold">AI Analysis Active</p>
      </motion.div>
    </motion.div>
  )
}
