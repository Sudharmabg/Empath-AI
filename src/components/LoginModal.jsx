import { useState } from 'react'
import { XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline'

export default function LoginModal({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email === 'test1@test.com' && password === 'test1234') {
      onLogin({ firstName: 'Test', lastName: 'User', email, role: 'student' })
      onClose()
    } else if (email === 'admin@empathai.com' && password === 'admin1234') {
      onLogin({ firstName: 'Admin', lastName: 'User', email, role: 'admin' })
      onClose()
    } else {
      setError('Invalid credentials.')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-primary/20 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 w-full max-w-md relative overflow-hidden border border-white">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-0"></div>

        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-primary transition-colors z-10 p-2 hover:bg-gray-50 rounded-full"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <div className="text-center mb-10 relative z-10">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20 rotate-3">
            <SparklesIcon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-lora font-bold text-dark-navy mb-2 tracking-tight">Welcome Back</h2>
          <p className="text-gray-500 font-medium">Continue your emotional journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 ml-1">Account Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition-all font-medium text-gray-700 placeholder:text-gray-300"
              placeholder="name@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 ml-1">Secure Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition-all font-medium text-gray-700 placeholder:text-gray-300"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-xs font-bold py-3 px-4 rounded-xl text-center border border-red-100 animate-fade-in">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full btn-primary !rounded-2xl !py-4 flex items-center justify-center gap-2 group"
          >
            Start Access
            <SparklesIcon className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </form>

        <div className="mt-10 p-5 bg-gray-50 rounded-2xl border border-gray-100 relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 text-center">Test Credentials</p>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="bg-white p-3 rounded-xl border border-gray-100">
              <p className="font-bold text-gray-400 mb-1 uppercase tracking-tighter">Student</p>
              <p className="font-bold text-dark-navy truncate">test1@test.com</p>
              <p className="text-gray-500 font-medium">test1234</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-gray-100">
              <p className="font-bold text-primary mb-1 uppercase tracking-tighter">Admin</p>
              <p className="font-bold text-primary truncate">admin@empathai.com</p>
              <p className="text-gray-500 font-medium">admin1234</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}