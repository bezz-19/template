export default function DataDeletionPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold mb-6">Data Deletion Instructions</h1>
        <p className="text-sm text-gray-600 mb-8">How to request deletion of your data</p>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">Request Data Deletion</h2>
            <p className="text-gray-700 mb-4">
              If you would like to delete your personal data from our system, please follow these steps:
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Method 1: Via WhatsApp</h2>
            <p className="text-gray-700">
              Send a message to our WhatsApp business number with the text:
            </p>
            <div className="bg-gray-100 p-4 rounded-md mt-2 mb-4">
              <code className="text-sm">"DELETE MY DATA"</code>
            </div>
            <p className="text-gray-700">
              Our team will process your request within 30 days and confirm the deletion via WhatsApp.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Method 2: Via Email</h2>
            <p className="text-gray-700">
              Send an email to our support team with:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>Subject: "Data Deletion Request"</li>
              <li>Include your WhatsApp phone number</li>
              <li>Include your name (if provided)</li>
            </ul>
            <p className="text-gray-700 mt-4">
              We will respond within 30 days to confirm the deletion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">What Data Will Be Deleted</h2>
            <p className="text-gray-700">
              When you request data deletion, we will permanently remove:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>Your phone number</li>
              <li>Your name and profile information</li>
              <li>All messages exchanged with us</li>
              <li>Any other personal data we have collected</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Processing Time</h2>
            <p className="text-gray-700">
              Data deletion requests are typically processed within 30 days. 
              You will receive a confirmation once your data has been deleted.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Questions?</h2>
            <p className="text-gray-700">
              If you have any questions about data deletion, please contact us via WhatsApp.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
