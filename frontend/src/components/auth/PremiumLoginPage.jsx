import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi'
import { SiGoogle, SiGithub } from 'react-icons/si'
import { toast } from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'
import PremiumInput from './PremiumInput'
import PremiumButton from './PremiumButton'
import FeatureCard from './FeatureCard'
import FuturisticRobot from './FuturisticRobot'
import AnimatedBackground from './AnimatedBackground'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

export default function PremiumLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      await login(data)
      toast.success('Welcome back to AI Invest!')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative w-screen min-h-screen overflow-hidden bg-slate-950">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Main Container */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 py-8">
        <motion.div
          className="w-full max-w-5xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:rounded-3xl overflow-hidden lg:h-screen">
            {/* LEFT PANEL - AI Branding Section (55%) - Hidden on Mobile/Tablet */}
            <motion.div
              className="hidden lg:flex lg:col-span-7 flex-col justify-between p-12 relative bg-linear-to-br from-blue-600/10 via-purple-600/5 to-slate-900/20 backdrop-blur-3xl border border-white/10"
              variants={itemVariants}
            >
              {/* Decorative elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-30 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-30 animate-pulse" />
              </div>

              <motion.div className="relative z-20" variants={itemVariants}>
                {/* Logo & Branding */}
                <div className="mb-8">
                  <motion.div
                    className="flex items-center gap-3 mb-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-10 h-10 bg-linear-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">⚡</span>
                    </div>
                    <span className="text-white font-bold text-2xl">AI Invest</span>
                  </motion.div>
                  <p className="text-cyan-400 font-semibold text-sm tracking-wide">
                    Research Smarter. Invest Better.
                  </p>
                </div>

                {/* Main Heading */}
                <div className="mb-8">
                  <h1 className="text-5xl font-bold leading-tight mb-4">
                    <span className="text-white">Secure Research,</span>
                    <br />
                    <span className="bg-linear-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                      Confident Decisions.
                    </span>
                  </h1>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    AI Invest is your AI-powered investment research platform that helps you analyze companies, track market trends, and make data-driven investment decisions with enterprise-grade security.
                  </p>
                </div>
              </motion.div>

              {/* 3D Robot Illustration */}
              <motion.div
                className="my-12 flex justify-center"
                variants={itemVariants}
              >
                <FuturisticRobot />
              </motion.div>

              {/* Feature Cards */}
              <motion.div
                className="space-y-3"
                variants={itemVariants}
              >
                <FeatureCard
                  icon="🔐"
                  title="Bank-level Security"
                  description="Enterprise-grade encryption and security"
                />
                <FeatureCard
                  icon="🤖"
                  title="AI-Powered Analysis"
                  description="Advanced AI models for market insights"
                />
                <FeatureCard
                  icon="📊"
                  title="Real-time Analytics"
                  description="Live market data and trend analysis"
                />
              </motion.div>

              {/* Quote Card */}
              <motion.div
                className="mt-8 p-4 rounded-2xl bg-linear-to-r from-blue-500/10 to-purple-500/10 border border-cyan-400/20 backdrop-blur-sm"
                variants={itemVariants}
              >
                <p className="text-slate-300 italic">
                  "Institutional-grade security with seamless enterprise experience."
                </p>
              </motion.div>
            </motion.div>

            {/* Mobile/Tablet Branding - Shown above login form on smaller screens */}
            <motion.div
              className="lg:hidden col-span-1 flex flex-col items-center justify-center gap-8 mb-12 px-6"
              variants={itemVariants}
            >
              {/* Logo & Branding */}
              <div className="text-center">
                <motion.div
                  className="flex items-center justify-center gap-3 mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-12 h-12 bg-linear-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">⚡</span>
                  </div>
                  <span className="text-white font-bold text-3xl">AI Invest</span>
                </motion.div>
                <p className="text-cyan-400 font-semibold text-sm tracking-wide">
                  Research Smarter. Invest Better.
                </p>
              </div>

              {/* Robot - Smaller version for mobile */}
              <div className="w-48 h-64">
                <FuturisticRobot />
              </div>
            </motion.div>

            {/* RIGHT PANEL - Login Form (45% on desktop, 100% on mobile) */}
            <motion.div
              className="col-span-1 lg:col-span-5 p-8 md:p-10 lg:p-12 flex flex-col justify-center bg-linear-to-br from-slate-900/50 via-purple-900/20 to-blue-900/20 backdrop-blur-2xl border border-white/10 lg:rounded-none rounded-3xl"
              variants={itemVariants}
            >
              {/* Heading */}
              <motion.div className="mb-8" variants={itemVariants}>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-slate-400 text-sm md:text-base">
                  Sign in to your account to continue
                </p>
              </motion.div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Email Input */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-slate-300 mb-3">
                    Email Address
                  </label>
                  <PremiumInput
                    type="email"
                    placeholder="name@company.com"
                    icon={FiMail}
                    error={errors.email}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                  {errors.email && (
                    <motion.p
                      className="mt-2 text-sm text-rose-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Password Input */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-slate-300 mb-3">
                    Password
                  </label>
                  <div className="relative">
                    <PremiumInput
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      icon={FiLock}
                      error={errors.password}
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters',
                        },
                      })}
                    />
                    <motion.button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {showPassword ? (
                        <FiEyeOff size={20} />
                      ) : (
                        <FiEye size={20} />
                      )}
                    </motion.button>
                  </div>
                  {errors.password && (
                    <motion.p
                      className="mt-2 text-sm text-rose-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {errors.password.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Remember Me & Forgot Password */}
                <motion.div
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                  variants={itemVariants}
                >
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      {...register('rememberMe')}
                      className="w-5 h-5 rounded-lg bg-slate-800 border border-slate-600 cursor-pointer accent-cyan-400 transition-all hover:border-cyan-400"
                    />
                    <span className="text-sm text-slate-400 group-hover:text-slate-300">
                      Remember me
                    </span>
                  </label>
                  <motion.a
                    href="/forgot-password"
                    className="text-sm text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    Forgot password?
                  </motion.a>
                </motion.div>

                {/* Sign In Button */}
                <motion.div variants={itemVariants} className="pt-2">
                  <PremiumButton
                    type="submit"
                    isLoading={isLoading}
                  >
                    Sign In
                  </PremiumButton>
                </motion.div>
              </form>

              {/* Divider */}
              <motion.div
                className="flex items-center gap-4 my-8"
                variants={itemVariants}
              >
                <div className="flex-1 h-px bg-linear-to-r from-transparent via-slate-600 to-transparent" />
                <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">OR CONTINUE WITH</span>
                <div className="flex-1 h-px bg-linear-to-r from-transparent via-slate-600 to-transparent" />
              </motion.div>

              {/* Social Login Buttons */}
              <motion.div
                className="grid grid-cols-2 gap-4"
                variants={itemVariants}
              >
                <motion.button
                  type="button"
                  className="h-14 rounded-2xl border-2 border-slate-600 bg-slate-800/50 hover:bg-slate-700/50 hover:border-cyan-400/50 text-slate-300 font-semibold flex items-center justify-center gap-2 transition-all duration-300 group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SiGoogle size={20} className="group-hover:text-cyan-400 transition-colors" />
                  <span className="hidden sm:inline">Google</span>
                </motion.button>

                <motion.button
                  type="button"
                  className="h-14 rounded-2xl border-2 border-slate-600 bg-slate-800/50 hover:bg-slate-700/50 hover:border-cyan-400/50 text-slate-300 font-semibold flex items-center justify-center gap-2 transition-all duration-300 group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SiGithub size={20} className="group-hover:text-cyan-400 transition-colors" />
                  <span className="hidden sm:inline">GitHub</span>
                </motion.button>
              </motion.div>

              {/* Sign Up Link */}
              <motion.div
                className="mt-8 text-center"
                variants={itemVariants}
              >
                <p className="text-slate-400 text-sm md:text-base">
                  Don't have an account?{' '}
                  <motion.a
                    href="/signup"
                    className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
                    whileHover={{ x: 2 }}
                  >
                    Create Account
                  </motion.a>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
