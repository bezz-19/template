export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-sm text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
            <p className="text-gray-700">
              We collect information that you provide directly to us through WhatsApp messages, including:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>Your phone number</li>
              <li>Messages you send to us</li>
              <li>Profile information (name, profile picture)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
            <p className="text-gray-700">
              We use the information we collect to:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>Respond to your inquiries and provide customer support</li>
              <li>Manage and organize customer conversations</li>
              <li>Improve our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Data Storage and Security</h2>
            <p className="text-gray-700">
              We store your data securely using industry-standard encryption and security practices. 
              Your messages are stored in our secure database and are only accessible to authorized personnel.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Data Sharing</h2>
            <p className="text-gray-700">
              We do not sell, trade, or rent your personal information to third parties. 
              We may share your information only when required by law or to protect our rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Your Rights</h2>
            <p className="text-gray-700">
              You have the right to:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>Access your personal data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about this Privacy Policy, please contact us via WhatsApp.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
