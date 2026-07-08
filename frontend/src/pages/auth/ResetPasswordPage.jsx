import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { FiEye, FiEyeOff, FiLoader, FiLock } from 'react-icons/fi'
import { toast } from 'react-hot-toast'
import AuthLayout from '../../components/auth/AuthLayout'
import { authApi } from '../../services/authApi'

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token') || ''
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    try {
      await authApi.resetPassword({ token, password: data.password })
      toast.success('Password reset successfully')
      navigate('/login')
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unable to reset password')
    }
  }

  return (
    <AuthLayout title="Choose a new password" subtitle="Create a strong password to secure your account.">
      <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="mb-2 block text-sm text-slate-400">New Password</label>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3">
            <FiLock className="text-cyan-300" />
            <input {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'At least 6 characters' } })} type={showPassword ? 'text' : 'password'} className="w-full bg-transparent outline-none" placeholder="••••••••" />
            <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="text-slate-400">
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.password ? <p className="mt-1 text-sm text-rose-400">{errors.password.message}</p> : null}
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-400">Confirm Password</label>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3">
            <FiLock className="text-cyan-300" />
            <input {...register('confirmPassword', { required: 'Confirm your password', validate: (value) => value === watch('password') || 'Passwords do not match' })} type={showConfirmPassword ? 'text' : 'password'} className="w-full bg-transparent outline-none" placeholder="••••••••" />
            <button type="button" onClick={() => setShowConfirmPassword((prev) => !prev)} className="text-slate-400">
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.confirmPassword ? <p className="mt-1 text-sm text-rose-400">{errors.confirmPassword.message}</p> : null}
        </div>

        <button type="submit" disabled={isSubmitting} className="flex w-full items-center justify-center gap-2 rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:scale-[1.01]">
          {isSubmitting ? <FiLoader className="animate-spin" /> : null}
          {isSubmitting ? 'Updating password...' : 'Update password'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Back to <Link className="font-semibold text-cyan-300" to="/login">sign in</Link>
      </p>
    </AuthLayout>
  )
}
