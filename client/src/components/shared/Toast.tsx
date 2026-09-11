import React from 'react'
import { CheckCircle2, X } from 'lucide-react'

interface ToastProps {
  message: string
  subtitle?: string
  isOpen: boolean
  onClose: () => void
}

export const Toast: React.FC<ToastProps> = ({ message, subtitle, isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-slide-up">
      <div className="rounded-2xl bg-[#141414] border border-[#22C55E]/40 shadow-2xl p-4 flex items-start gap-3 text-white">
        <div className="w-8 h-8 rounded-xl bg-[#22C55E]/20 border border-[#22C55E]/40 flex items-center justify-center text-[#22C55E] shrink-0 mt-0.5">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-[14px] font-bold text-white leading-tight">
            {message}
          </h4>
          {subtitle && (
            <p className="text-[12px] text-[#A1A1AA] mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-lg text-[#71717A] hover:text-white hover:bg-[#1F1F23] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default Toast
