import { Mail, MapPin, Phone } from 'lucide-react'

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 gradient-text text-center">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <form action="https://formspree.io/f/xeoqdnwr" method="POST" className="space-y-4">
            <input type="text" name="name" placeholder="Your Name" required className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900" />
            <input type="email" name="email" placeholder="Your Email" required className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900" />
            <textarea name="message" placeholder="Your Message" rows={5} required className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900"></textarea>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition w-full">Send Message</button>
          </form>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Information</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-blue-600" /><span>support@smarttoolkit.space</span></div>
            <div className="flex items-center gap-3"><MapPin className="w-5 h-5 text-blue-600" /><span>Online, Available Worldwide</span></div>
            <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-blue-600" /><span>Response within 24 hours</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}