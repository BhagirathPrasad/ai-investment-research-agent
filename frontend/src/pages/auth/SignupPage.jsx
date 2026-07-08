import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff, FiImage, FiLoader, FiMail, FiLock, FiUser } from 'react-icons/fi'
import { toast } from 'react-hot-toast'
import AuthLayout from '../../components/auth/AuthLayout'
import { useAuth } from '../../context/AuthContext'

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('')
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm()

  const password = watch('password', '')

  const strength = useMemo(() => {
    if (!password) return { label: 'Weak', score: 1 }
    let score = 0
    if (password.length >= 8) score += 1
    if (/[A-Z]/.test(password)) score += 1
    if (/[0-9]/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1
    const label = score >= 4 ? 'Strong' : score >= 2 ? 'Medium' : 'Weak'
    return { label, score }
  }, [password])

  const onSubmit = async (data) => {
    try {
      await registerUser({ ...data, profileImage: previewUrl })
      toast.success('Account created successfully')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Registration failed')
    }
  }

  const handleImage = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => setPreviewUrl(reader.result)
    reader.readAsDataURL(file)
  }

  return (
    <AuthLayout title="Create your account" subtitle="Join the AI investment workspace with a secure, premium onboarding flow.">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Personal Information Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Personal Information</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">Full Name</label>
              <div className={`flex items-center gap-3 rounded-xl border-2 transition-all duration-200 ${
                errors.fullName
                  ? 'border-rose-400/50 bg-rose-500/5'
                  : 'border-white/15 bg-slate-950/50 hover:border-cyan-400/30 focus-within:border-cyan-400/60 focus-within:bg-slate-950/80'
              } px-4 py-3`}>
                <FiUser className="text-cyan-400" size={18} />
                <input
                  {...register('fullName', { required: 'Full name is required' })}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
                  placeholder="Alex Johnson"
                />
              </div>
              {errors.fullName && <p className="mt-1.5 text-xs font-medium text-rose-400">{errors.fullName.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">Username</label>
              <div className={`flex items-center gap-3 rounded-xl border-2 transition-all duration-200 ${
                errors.username
                  ? 'border-rose-400/50 bg-rose-500/5'
                  : 'border-white/15 bg-slate-950/50 hover:border-cyan-400/30 focus-within:border-cyan-400/60 focus-within:bg-slate-950/80'
              } px-4 py-3`}>
                <FiUser className="text-cyan-400" size={18} />
                <input
                  {...register('username', { required: 'Username is required', minLength: { value: 3, message: 'At least 3 characters' } })}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
                  placeholder="alexinvest"
                />
              </div>
              {errors.username && <p className="mt-1.5 text-xs font-medium text-rose-400">{errors.username.message}</p>}
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Contact Information</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">Email Address</label>
              <div className={`flex items-center gap-3 rounded-xl border-2 transition-all duration-200 ${
                errors.email
                  ? 'border-rose-400/50 bg-rose-500/5'
                  : 'border-white/15 bg-slate-950/50 hover:border-cyan-400/30 focus-within:border-cyan-400/60 focus-within:bg-slate-950/80'
              } px-4 py-3`}>
                <FiMail className="text-cyan-400" size={18} />
                <input
                  {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Enter a valid email address' } })}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
                  placeholder="alex@company.com"
                />
              </div>
              {errors.email && <p className="mt-1.5 text-xs font-medium text-rose-400">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">Phone (Optional)</label>
              <input
                {...register('phone')}
                className="w-full rounded-xl border-2 border-white/15 bg-slate-950/50 px-4 py-3 text-sm outline-none placeholder:text-slate-500 hover:border-cyan-400/30 focus:border-cyan-400/60 focus:bg-slate-950/80 transition-all duration-200"
                placeholder="+1 555 123 4567"
              />
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Security</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">Password</label>
              <div className={`flex items-center gap-3 rounded-xl border-2 transition-all duration-200 ${
                errors.password
                  ? 'border-rose-400/50 bg-rose-500/5'
                  : 'border-white/15 bg-slate-950/50 hover:border-cyan-400/30 focus-within:border-cyan-400/60 focus-within:bg-slate-950/80'
              } px-4 py-3`}>
                <FiLock className="text-cyan-400" size={18} />
                <input
                  {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'At least 6 characters' } })}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-slate-500 transition-colors hover:text-slate-300"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-xs font-medium text-rose-400">{errors.password.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">Confirm Password</label>
              <div className={`flex items-center gap-3 rounded-xl border-2 transition-all duration-200 ${
                errors.confirmPassword
                  ? 'border-rose-400/50 bg-rose-500/5'
                  : 'border-white/15 bg-slate-950/50 hover:border-cyan-400/30 focus-within:border-cyan-400/60 focus-within:bg-slate-950/80'
              } px-4 py-3`}>
                <FiLock className="text-cyan-400" size={18} />
                <input
                  {...register('confirmPassword', { required: 'Confirm your password', validate: (value) => value === watch('password') || 'Passwords do not match' })}
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="text-slate-500 transition-colors hover:text-slate-300"
                >
                  {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1.5 text-xs font-medium text-rose-400">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          {/* Password Strength Indicator */}
          <div className="rounded-xl border-2 border-cyan-400/30 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-300">Password Strength</span>
              <span className={`text-sm font-bold px-2 py-1 rounded-full ${
                strength.score >= 4
                  ? 'text-emerald-300 bg-emerald-500/20'
                  : strength.score >= 2
                    ? 'text-yellow-300 bg-yellow-500/20'
                    : 'text-rose-300 bg-rose-500/20'
              }`}>
                {strength.label}
              </span>
            </div>
            <div className="h-2 rounded-full bg-slate-800/50 overflow-hidden">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  strength.score >= 4
                    ? 'bg-emerald-400'
                    : strength.score >= 2
                      ? 'bg-yellow-400'
                      : 'bg-rose-400'
                }`}
                style={{ width: `${strength.score * 25}%` }}
              />
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Profile</h3>
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-white/15 hover:border-cyan-400/30 bg-slate-950/30 hover:bg-slate-950/50 px-4 py-4 transition-all duration-200">
            <FiImage className="text-cyan-400" size={18} />
            <span className="text-sm font-medium text-slate-400">Upload profile image</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
          </label>
          {previewUrl && (
            <div className="flex items-center gap-3">
              <img src={previewUrl} alt="preview" className="h-16 w-16 rounded-full object-cover border-2 border-cyan-400/30" />
              <span className="text-xs text-slate-400">Profile image selected</span>
            </div>
          )}
        </div>

        {/* Terms Section */}
        <label className="flex items-start gap-3 p-4 rounded-xl border-2 border-white/10 bg-slate-950/30 text-sm text-slate-400 cursor-pointer hover:border-cyan-400/30 hover:bg-slate-950/50 transition-all duration-200">
          <input type="checkbox" required className="mt-1 w-4 h-4 rounded border border-white/20 bg-slate-950 cursor-pointer flex-shrink-0" />
          <span>
            I agree to the <span className="text-cyan-400 font-medium">terms and conditions</span> and acknowledge I've read the privacy policy
          </span>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-8 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 px-6 py-3.5 font-semibold text-slate-950 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-400/30 hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting ? <FiLoader className="animate-spin" size={18} /> : null}
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      {/* Sign In Link */}
      <div className="mt-8 border-t border-white/10 pt-6 text-center">
        <p className="text-sm text-slate-400">
          Already have an account?{' '}
          <Link className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors" to="/login">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
