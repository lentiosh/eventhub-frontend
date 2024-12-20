const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background-color">
      <div className="max-w-3xl w-full bg-background-alt-color/30 backdrop-blur-sm border border-border-color/20 rounded-3xl shadow-xl p-8 space-y-6">
        <h1 className="text-4xl font-bold text-text-color mb-4">
          Privacy Policy
        </h1>

        <p className="text-text-alt-color text-base">
          Last updated: 16/12/2024
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-text-color mt-8">
            Introduction
          </h2>
          <p className="text-text-alt-color text-base mt-2">
            Welcome to EventHub. We respect your privacy and are committed to protecting the personal information you may provide to us. This Privacy Policy outlines how we collect, use, and safeguard your information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-text-color mt-8">
            Information We Collect
          </h2>
          <p className="text-text-alt-color text-base mt-2">
            We may collect personal information that you voluntarily provide, such as your name, email address, and password when you register for an account. We also collect non-personal information such as device type, browser type, and usage data to enhance user experience.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-text-color mt-8">
            Use of Your Information
          </h2>
          <p className="text-text-alt-color text-base mt-2">
            We use your personal information to:
          </p>
          <ul className="list-disc list-inside text-text-alt-color text-base mt-2 space-y-1">
            <li>Create and manage your account</li>
            <li>Provide, maintain, and improve our services</li>
            <li>Send you notifications, updates, and promotional offers</li>
            <li>Analyze usage and trends to enhance user experience</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-text-color mt-8">
            Sharing Your Information
          </h2>
          <p className="text-text-alt-color text-base mt-2">
            We do not sell or rent your personal information to third parties. We may share your information with:
          </p>
          <ul className="list-disc list-inside text-text-alt-color text-base mt-2 space-y-1">
            <li>Service providers assisting with hosting, analytics, or customer support</li>
            <li>Legal authorities if required by law or to protect our rights</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-text-color mt-8">
            Google OAuth
          </h2>
          <p className="text-text-alt-color text-base mt-2">
            Our Application may use Google OAuth for user authentication. By using Google OAuth, you agree to Google s Privacy Policy. We only access your basic profile information and email address for account creation and login purposes. We do not store or use your data beyond what is necessary to provide our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-text-color mt-8">
            Data Security
          </h2>
          <p className="text-text-alt-color text-base mt-2">
            We implement industry-standard security measures to protect your information. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-text-color mt-8">
            Your Rights and Choices
          </h2>
          <p className="text-text-alt-color text-base mt-2">
            You have the right to access, update, or delete your personal information at any time by logging into your account or contacting us. You may also opt out of receiving promotional emails by following the unsubscribe link in the email.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-text-color mt-8">
            Changes to This Privacy Policy
          </h2>
          <p className="text-text-alt-color text-base mt-2">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised “Last updated” date. We encourage you to review this policy periodically.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-text-color mt-8">
            Contact Us
          </h2>
          <p className="text-text-alt-color text-base mt-2">
            If you have any questions or concerns about this Privacy Policy, please contact us at:{' '}
            <a href="mailto:support@youreventapp.com" className="text-link-color hover:underline ml-1">
            support@eventhub.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
