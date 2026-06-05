export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-extrabold text-white mb-4">About SmartToolkit</h1>
      <p className="text-gray-400 leading-relaxed mb-6">
        SmartToolkit is a collection of free, browser-based tools built for anyone who values security, productivity, and privacy. Whether you need to generate a strong password, verify a 2FA code, count words in an article, or generate SEO meta tags — we have got a tool for it.
      </p>
      <p className="text-gray-400 leading-relaxed mb-6">
        Every tool on SmartToolkit runs entirely in your browser. We do not collect your input, we do not send it to servers, and we do not store anything. What you type stays on your device.
      </p>
      <h2 className="text-xl font-bold text-white mt-10 mb-3">Our Mission</h2>
      <p className="text-gray-400 leading-relaxed mb-6">
        To provide high-quality, privacy-respecting online tools that are always free, always fast, and always accessible without an account or subscription.
      </p>
      <h2 className="text-xl font-bold text-white mt-10 mb-3">Our Tools</h2>
      <ul className="space-y-2 text-gray-400 text-sm list-disc list-inside">
        <li>Password Generator — create cryptographically secure passwords</li>
        <li>2FA Code Reader — generate TOTP two-factor authentication codes</li>
        <li>Word Counter — count words, characters, sentences, and reading time</li>
        <li>Character Counter — optimize text for Twitter, SMS, meta descriptions</li>
        <li>Meta Tag Generator — generate complete SEO and social meta tags</li>
        <li>Keyword Density Checker — analyze keyword frequency in your content</li>
      </ul>
      <h2 className="text-xl font-bold text-white mt-10 mb-3">Contact Us</h2>
      <p className="text-gray-400">
        Have a suggestion or found a bug? We would love to hear from you. Visit our <a href="/contact" className="text-sky-400 hover:underline">contact page</a>.
      </p>
    </div>
  )
}
