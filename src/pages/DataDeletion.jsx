import { Link } from "react-router-dom";

export default function DataDeletion() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen text-gray-700">
      {/* Hero Section */}
      <section className="py-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#2F4A7D] mb-4">
          User Data Deletion Policy
        </h2>

        <p className="text-gray-500 text-lg">
          WHY Platform
        </p>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-white shadow-xl rounded-3xl p-8 md:p-12 space-y-10">

          <div>
            <p>
              If you wish to delete your WHY account and associated data,
              you may do so by following one of the methods outlined below.
            </p>
          </div>

          {/* Option 1 */}
          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              Option 1: Through the App
            </h3>

            <ul className="list-disc pl-6 space-y-2">
              <li>Log into your WHY account</li>
              <li>Go to Profile Settings</li>
              <li>
                Click on{" "}
                <span className="font-medium text-[#41D0C3]">
                  “Delete Account”
                </span>
              </li>
              <li>Confirm deletion</li>
            </ul>
          </div>

          {/* Option 2 */}
          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              Option 2: Email Request
            </h3>

            <p className="mb-4">
              You may also request deletion by sending an email to:
            </p>

            <p className="font-medium text-[#2F4A7D] mb-4">
              techadmin@thewhyservices.com
            </p>

            <p className="mb-2 font-medium">
              Include the following details:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Registered email ID</li>
              <li>Registered mobile number</li>
              <li>
                Subject line:{" "}
                <span className="font-medium text-[#41D0C3]">
                  “Account Deletion Request”
                </span>
              </li>
            </ul>

            <p className="mt-4">
              We will process your request within{" "}
              <span className="font-medium text-[#2F4A7D]">
                7–14 business days
              </span>.
            </p>
          </div>

          {/* After Deletion */}
          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              After Deletion
            </h3>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                Your personal data will be permanently removed from active
                systems.
              </li>
              <li>
                Some data may be retained for legal or compliance purposes.
              </li>
            </ul>

            <p className="mt-4">
              If you logged in using Facebook Login, you may also remove WHY
              from your Facebook Apps settings.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2F4A7D] text-white py-6 text-center">
        <p className="text-sm opacity-80">
          © 2026 WHY. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}