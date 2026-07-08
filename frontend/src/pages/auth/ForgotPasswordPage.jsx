import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { FiLoader, FiMail } from 'react-icons/fi'
import { toast } from 'react-hot-toast'
import AuthLayout from '../../components/auth/AuthLayout'
import { authApi } from '../../services/authApi'

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    try {
      await authApi.forgotPassword(data)
      setSent(true)
      toast.success('Reset instructions sent')
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unable to send reset link')
    }
  }

  return (
    <AuthLayout title="Reset your password" subtitle="Receive a secure link to recover access to your account.">
      {sent ? (
        <div className="mt-8 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-300">
          If that account exists, a reset instruction has been sent to your email.
        </div>
      ) : (
        <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="mb-2 block text-sm text-slate-400">Email</label>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3">
              <FiMail className="text-cyan-300" />
              <input {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Enter a valid email' } })} className="w-full bg-transparent outline-none" placeholder="name@company.com" />
            </div>
            {errors.email ? <p className="mt-1 text-sm text-rose-400">{errors.email.message}</p> : null}
          </div>

          <button type="submit" disabled={isSubmitting} className="flex w-full items-center justify-center gap-2 rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:scale-[1.01]">
            {isSubmitting ? <FiLoader className="animate-spin" /> : null}
            {isSubmitting ? 'Sending...' : 'Send reset link'}
          </button>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-slate-400">
        Back to <Link className="font-semibold text-cyan-300" to="/login">sign in</Link>
      </p>
    </AuthLayout>
  )
}
