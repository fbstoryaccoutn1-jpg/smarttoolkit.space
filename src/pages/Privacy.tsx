export default function Privacy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 gradient-text">Privacy Policy</h1>
      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <p>Last updated: March 15, 2025</p>
        <p>At SmartToolkit.space, we take your privacy seriously. This policy describes how we handle your information.</p>
        <h2 className="text-2xl font-semibold mt-6">Information We Collect</h2>
        <p>We do not collect any personal information. All tools run locally in your browser. We use localStorage to save preferences (dark mode, tool usage counts).</p>
        <h2 className="text-2xl font-semibold mt-6">Cookies</h2>
        <p>We do not use tracking cookies. We use localStorage only for functional purposes (theme preference).</p>
        <h2 className="text-2xl font-semibold mt-6">Third-Party Services</h2>
        <p>Our contact form uses Formspree which may collect your email and message. See <a href="https://formspree.io/legal/privacy-policy/" className="text-blue-600" target="_blank">Formspree's privacy policy</a>.</p>
        <h2 className="text-2xl font-semibold mt-6">Your Rights</h2>
        <p>You can clear all localStorage data through your browser settings at any time.</p>
        <h2 className="text-2xl font-semibold mt-6">Contact</h2>
        <p>Questions? Email us at support@smarttoolkit.space</p>
      </div>
    </div>
  )
}