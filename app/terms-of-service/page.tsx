export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <p className="text-sm text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-700">
              By using our WhatsApp CRM service, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Use of Service</h2>
            <p className="text-gray-700">
              Our service allows you to communicate with us via WhatsApp. You agree to:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>Provide accurate information</li>
              <li>Use the service for lawful purposes only</li>
              <li>Not spam or abuse the service</li>
              <li>Respect other users and our staff</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Service Availability</h2>
            <p className="text-gray-700">
              We strive to provide reliable service, but we do not guarantee uninterrupted access. 
              We reserve the right to modify or discontinue the service at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. User Responsibilities</h2>
            <p className="text-gray-700">
              You are responsible for:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>Maintaining the confidentiality of your account</li>
              <li>All activities that occur under your account</li>
              <li>Complying with all applicable laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Limitation of Liability</h2>
            <p className="text-gray-700">
              We are not liable for any indirect, incidental, special, or consequential damages 
              arising from your use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Changes to Terms</h2>
            <p className="text-gray-700">
              We reserve the right to modify these terms at any time. 
              Continued use of the service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Contact</h2>
            <p className="text-gray-700">
              For questions about these Terms of Service, please contact us via WhatsApp.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
