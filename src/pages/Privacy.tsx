export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-extrabold text-white mb-2">Privacy Policy</h1>
      <p className="text-gray-500 text-sm mb-8">Last updated: December 2024</p>

      {[
        {
          title: '1. Information We Collect',
          content: 'SmartToolkit does not collect any personal information through our tools. All tool functionality — including password generation, 2FA code generation, word counting, character counting, meta tag generation, and keyword density analysis — runs entirely within your web browser. No data you enter into our tools is transmitted to our servers.'
        },
        {
          title: '2. Cookies and Analytics',
          content: 'We may use minimal analytics to understand site traffic patterns (such as which pages are visited most frequently). This data is aggregated and does not identify individual users. We do not use tracking cookies for advertising purposes.'
        },
        {
          title: '3. Third-Party Services',
          content: 'SmartToolkit may display advertisements provided by third-party advertising networks. These networks may use cookies to serve relevant advertisements. Please refer to the respective third-party privacy policies for information about their data practices.'
        },
        {
          title: '4. Security',
          content: 'Since all tool processing happens locally in your browser, sensitive data such as passwords, 2FA secret keys, and personal content never leaves your device. We do not have access to any data you process using our tools.'
        },
        {
          title: '5. Children\'s Privacy',
          content: 'Our services are not directed to children under the age of 13. We do not knowingly collect personal information from children.'
        },
        {
          title: '6. Changes to This Policy',
          content: 'We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. Your continued use of SmartToolkit after any changes constitutes your acceptance of the updated policy.'
        },
        {
          title: '7. Contact',
          content: 'If you have any questions about this Privacy Policy, please use our Contact page to reach us.'
        },
      ].map(section => (
        <div key={section.title} className="mb-8">
          <h2 className="text-lg font-bold text-white mb-3">{section.title}</h2>
          <p className="text-gray-400 text-sm leading-relaxed">{section.content}</p>
        </div>
      ))}
    </div>
  )
}
