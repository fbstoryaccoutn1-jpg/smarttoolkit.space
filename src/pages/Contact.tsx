import { useState } from 'react'
import { Mail, MessageSquare } from 'lucide-react'

export default function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <div className="max-w-2xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-extrabold text-white mb-3">Contact Us</h1>
      <p className="text-gray-400 mb-10">Have a question, suggestion, or found a bug? We would love to hear from you.</p>

      <div className="section-card">
        {sent ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">✅</div>
            <h2 className="text-xl font-bold text-white mb-2">Message Sent!</h2>
            <p className="text-gray-400 text-sm">Thank you for reaching out. We will get back to you soon.</p>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
              <input type="text" placeholder="John Doe" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input type="email" placeholder="john@example.com" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
              <input type="text" placeholder="Tool suggestion, bug report..." className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <textarea rows={5} placeholder="Tell us more..." className="textarea-field" />
            </div>
            <button onClick={() => setSent(true)} className="btn-primary w-full flex items-center justify-center gap-2">
              <Mail size={16} /> Send Message
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 glass rounded-xl p-5 flex items-start gap-3">
        <MessageSquare size={18} className="text-sky-400 mt-0.5 flex-shrink-0" />
        <div>
          <div className="text-sm font-semibold text-white mb-1">Response Time</div>
          <p className="text-gray-400 text-sm">We typically respond within 24–48 hours on business days.</p>
        </div>
      </div>
    </div>
  )
}
