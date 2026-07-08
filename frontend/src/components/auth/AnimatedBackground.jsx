import { motion } from 'framer-motion'

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Dark Navy Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-blue-950 to-slate-950" />

      {/* Animated Gradient Mesh */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Grid Pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-5"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="url(#gridGradient)"
              strokeWidth="0.5"
            />
          </pattern>
          <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 0.7, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Glowing Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Ambient Light Rays */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-cyan-500 to-transparent"
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
        />
      </div>
    </div>
  )
}
