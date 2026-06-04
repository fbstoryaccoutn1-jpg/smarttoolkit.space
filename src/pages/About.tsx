export default function About() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 gradient-text">About SmartToolkit</h1>
      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <p>SmartToolkit.space was founded with a single mission: to help content creators and website owners get approved for Google AdSense faster.</p>
        <p>After struggling with AdSense approval ourselves, we realized there was a lack of easy-to-use, free tools that specifically target the requirements Google looks for. So we built our own toolkit.</p>
        <h2 className="text-2xl font-semibold mt-8">Our Tools</h2>
        <p>Each tool in our suite addresses a specific AdSense requirement:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Word Counter</strong> - Ensure your content has sufficient length</li>
          <li><strong>Meta Tag Generator</strong> - Create SEO-friendly titles and descriptions</li>
          <li><strong>Plagiarism Checker</strong> - Verify content uniqueness</li>
          <li><strong>Keyword Density</strong> - Avoid over-optimization penalties</li>
          <li><strong>Grammar Checker</strong> - Produce professional, error-free content</li>
          <li><strong>Readability Score</strong> - Make your content accessible to all users</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8">Our Promise</h2>
        <p>All tools are and will always be 100% free. No signups, no credit cards, no hidden fees. Just professional-grade SEO tools for everyone.</p>
      </div>
    </div>
  )
}