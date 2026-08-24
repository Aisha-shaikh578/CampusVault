import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">
            Terms of Service
          </h1>

          <p className="mt-2 text-sm text-(--text-secondary)">
            Last updated: August 24, 2026
          </p>
        </div>

        {/* Introduction */}
        <section className="space-y-4">
          <p>
            Welcome to Campus Vault. These Terms of Service explain the rules
            and conditions for using Campus Vault. By creating an account or
            using the application, you agree to follow these terms.
          </p>

          {/* 1 */}
          <div>
            <h2 className="mb-2 text-xl font-semibold">
              1. About Campus Vault
            </h2>

            <p>
              Campus Vault is a resource-sharing platform designed to help
              students organize, discover, and share useful educational
              resources such as notes, documents, links, and other
              study-related materials.
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="mb-2 text-xl font-semibold">
              2. Your Account
            </h2>

            <p>
              To use certain features of Campus Vault, you may need to create
              an account. You are responsible for providing accurate
              information and keeping your account credentials secure.
            </p>

            <p className="mt-3">
              You are responsible for activity performed through your account.
              If you believe that someone has accessed your account without
              permission, you should take appropriate steps to secure it.
            </p>
          </div>

          {/* 3 */}
          <div>
            <h2 className="mb-2 text-xl font-semibold">
              3. User-Uploaded Content
            </h2>

            <p>
              Campus Vault may allow users to upload or share educational
              resources. You are responsible for the content you upload,
              including ensuring that you have the necessary rights or
              permission to share it.
            </p>

            <p className="mt-3">
              You should not upload content that is illegal, harmful,
              misleading, abusive, or that violates another person&apos;s
              intellectual property or privacy rights.
            </p>
          </div>

          {/* 4 */}
          <div>
            <h2 className="mb-2 text-xl font-semibold">
              4. Prohibited Use
            </h2>

            <p>You agree not to use Campus Vault to:</p>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Upload illegal or harmful content.</li>
              <li>Harass, threaten, or impersonate other users.</li>
              <li>Attempt to gain unauthorized access to the application.</li>
              <li>Distribute malware or other malicious content.</li>
              <li>Abuse, disrupt, or interfere with the service.</li>
              <li>Upload content that violates another person&apos;s rights.</li>
            </ul>
          </div>

          {/* 5 */}
          <div>
            <h2 className="mb-2 text-xl font-semibold">
              5. Intellectual Property
            </h2>

            <p>
              You retain ownership of content that you have the legal right to
              upload. By uploading content to Campus Vault, you grant the
              application permission to store and display that content as
              necessary to provide the platform&apos;s features.
            </p>

            <p className="mt-3">
              Campus Vault&apos;s name, design, code, branding, and other original
              elements of the application may be protected by applicable
              intellectual property laws.
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 className="mb-2 text-xl font-semibold">
              6. Content Removal and Account Restrictions
            </h2>

            <p>
              We may remove content or restrict an account if we believe it
              violates these Terms of Service, applicable laws, or the safety
              of other users.
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="mb-2 text-xl font-semibold">
              7. Service Availability
            </h2>

            <p>
              Campus Vault is provided on an &quot;as available&quot; basis. We may
              update, modify, temporarily suspend, or discontinue parts of the
              application when necessary.
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="mb-2 text-xl font-semibold">
              8. Changes to These Terms
            </h2>

            <p>
              These Terms of Service may be updated from time to time. If
              significant changes are made, the updated version will be made
              available through the application.
            </p>
          </div>

          {/* 9 */}
          <div>
            <h2 className="mb-2 text-xl font-semibold">
              9. Contact
            </h2>

            <p>
              If you have questions or concerns about these Terms of Service,
              you can contact the Campus Vault team through the contact
              information provided in the application.
            </p>
          </div>

          {/* Acceptance */}
          <div className="mt-10 rounded-lg border border-gray-200 bg-(--background) p-5">
            <p className="text-sm text-(--text-secondary)">
              By creating a Campus Vault account, you acknowledge that you
              have read, understood, and agreed to these Terms of Service.
            </p>
          </div>

          {/* Bottom navigation */}
          <div className="mt-8 border-t border-(--border) pt-6">
            <Link
              href="/signup"
              className="inline-flex rounded-lg bg-(--primary) px-5 py-2.5 text-sm font-medium text-white transition hover:bg-(--primary-hover)"
            >
              Back to Sign Up
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}