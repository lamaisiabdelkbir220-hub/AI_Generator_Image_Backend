import env from "@/lib/env";

export const dynamic = "force-static";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Privacy Policy for Chitra AI - AI Image Generator
      </h1>
      <p className="text-sm text-gray-500 mb-8 text-center">
        Last Updated: June 4, 2025
      </p>

      <p className="mb-4">
        Chitra AI ("Chitra AI," "we," "us," or "our") is committed to protecting
        your privacy. This Privacy Policy explains how we collect, use,
        disclose, and safeguard your information when you use our mobile
        application Chirta AI - AI Image Generator (the "App").
      </p>
      <p className="mb-8">
        Please read this Privacy Policy carefully. If you do not agree with the
        terms of this Privacy Policy, please do not use the App.
      </p>

      <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>

      <h3 className="text-xl font-medium mb-3">
        1.1. Information You Provide Directly:
      </h3>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li>
          <strong>Account Information</strong>:
          <ul className="list-circle list-inside ml-4 space-y-0.5">
            <li>Email address (when you sign in with Google or Apple)</li>
            <li>Basic profile information from your Google or Apple account</li>
            <li>Username (if you choose to create one)</li>
          </ul>
        </li>
        <li>
          <strong>Image Data</strong>:
          <ul className="list-circle list-inside ml-4 space-y-0.5">
            <li>Images you upload for conversion</li>
            <li>Generated images based on your prompts</li>
            <li>Art style preferences and selections</li>
            <li>Image metadata (size, format, creation date)</li>
          </ul>
        </li>
        <li>
          <strong>Prompts</strong>:
          <ul className="list-circle list-inside ml-4 space-y-0.5">
            <li>Text inputs for image generation</li>
            <li>Style preferences</li>
            <li>Customization options</li>
          </ul>
        </li>
        <li>
          <strong>Payment Information</strong>:
          <ul className="list-circle list-inside ml-4 space-y-0.5">
            <li>For in-app purchases (processed securely by third-party payment processors)</li>
            <li>Purchase history</li>
            <li>Credit balance and transaction records</li>
          </ul>
        </li>
      </ul>

      <h3 className="text-xl font-medium mb-3">
        1.2. Information We Collect Automatically:
      </h3>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li>
          <strong>Device Information</strong>:
          <ul className="list-circle list-inside ml-4 space-y-0.5">
            <li>Device type and device ID</li>
            <li>Operating system version</li>
            <li>App version</li>
            <li>Network information</li>
          </ul>
        </li>
        <li>
          <strong>Usage Data</strong>:
          <ul className="list-circle list-inside ml-4 space-y-0.5">
            <li>Credit usage and balance</li>
            <li>Features accessed</li>
            <li>Time and date of visits</li>
            <li>Session duration</li>
            <li>Image generation history</li>
            <li>Style preferences</li>
            <li>Error logs and performance data</li>
          </ul>
        </li>
      </ul>

      <h3 className="text-xl font-medium mb-3">
        1.3. Permissions We Request:
      </h3>
      <ul className="list-disc list-inside mb-8 space-y-1">
        <li>
          <strong>Photo Library access</strong>:
          <ul className="list-circle list-inside ml-4 space-y-0.5">
            <li>To upload images for conversion</li>
            <li>To save generated images</li>
            <li>To share images</li>
          </ul>
        </li>
        <li>
          <strong>Camera access</strong>:
          <ul className="list-circle list-inside ml-4 space-y-0.5">
            <li>Optional, for taking photos to convert</li>
            <li>Only when you choose to use the camera feature</li>
          </ul>
        </li>
        <li>
          <strong>Internet access</strong>:
          <ul className="list-circle list-inside ml-4 space-y-0.5">
            <li>Required for AI processing</li>
            <li>Required for image generation</li>
            <li>Required for credit system</li>
            <li>Required for in-app purchases</li>
          </ul>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">
        2. How We Use Your Information
      </h2>
      <p className="mb-4">We use the information we collect to:</p>
      <ol className="list-decimal list-inside mb-8 space-y-2">
        <li>
          <strong>Provide Our Services</strong>:
          <ul className="list-disc list-inside ml-4 space-y-0.5">
            <li>Generate images based on your prompts</li>
            <li>Convert your images to different art styles (e.g., Cartoon style)</li>
            <li>Manage your credits (10 free initial credits)</li>
            <li>Process in-app purchases</li>
            <li>Enable image sharing and downloading</li>
            <li>Store your generated images</li>
            <li>Provide style recommendations</li>
          </ul>
        </li>
        <li>
          <strong>Credit System Management</strong>:
          <ul className="list-disc list-inside ml-4 space-y-0.5">
            <li>Track free credits (10 initial credits)</li>
            <li>Process earned credits from watching ads</li>
            <li>Manage in-app purchases for additional credits</li>
            <li>Monitor credit usage and balance</li>
            <li>Prevent credit system abuse</li>
          </ul>
        </li>
        <li>
          <strong>Improve Our Services</strong>:
          <ul className="list-disc list-inside ml-4 space-y-0.5">
            <li>Analyze usage patterns</li>
            <li>Enhance AI algorithms</li>
            <li>Improve user experience</li>
            <li>Optimize image generation quality</li>
            <li>Develop new features and styles</li>
            <li>Fix bugs and technical issues</li>
          </ul>
        </li>
        <li>
          <strong>Communicate With You</strong>:
          <ul className="list-disc list-inside ml-4 space-y-0.5">
            <li>Send important updates about the App</li>
            <li>Respond to support requests</li>
            <li>Send promotional offers (with your consent)</li>
            <li>Notify about credit system changes</li>
            <li>Inform about new features</li>
          </ul>
        </li>
      </ol>

      <h2 className="text-2xl font-semibold mb-4">
        3. Data Storage and Security
      </h2>
      <ul className="list-disc list-inside mb-8 space-y-1">
        <li>Your generated images are stored securely on our servers</li>
        <li>
          We implement appropriate security measures to protect your data:
          <ul className="list-circle list-inside ml-4 space-y-0.5">
            <li>End-to-end encryption for data transmission</li>
            <li>Secure cloud storage</li>
            <li>Regular security audits</li>
            <li>Access control systems</li>
          </ul>
        </li>
        <li>We retain your data only as long as necessary to provide our services</li>
        <li>You can request deletion of your data at any time</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">
        4. Third-Party Services
      </h2>
      <p className="mb-4">We use the following third-party services:</p>
      <ul className="list-disc list-inside mb-8 space-y-1">
        <li>
          <strong>Authentication</strong>:
          <ul className="list-circle list-inside ml-4 space-y-0.5">
            <li>Google Sign-In</li>
            <li>Apple Sign-In</li>
          </ul>
        </li>
        <li>
          <strong>Advertising</strong>:
          <ul className="list-circle list-inside ml-4 space-y-0.5">
            <li>Google AdMob (for rewarded advertisements)</li>
          </ul>
        </li>
        <li>
          <strong>Payments</strong>:
          <ul className="list-circle list-inside ml-4 space-y-0.5">
            <li>Payment processors for in-app purchases</li>
          </ul>
        </li>
        <li>
          <strong>Analytics</strong>:
          <ul className="list-circle list-inside ml-4 space-y-0.5">
            <li>Usage tracking and performance monitoring</li>
          </ul>
        </li>
        <li>
          <strong>Cloud Services</strong>:
          <ul className="list-circle list-inside ml-4 space-y-0.5">
            <li>Image storage and processing</li>
          </ul>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
      <p className="mb-4">You have the right to:</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Access your personal data</li>
        <li>Correct inaccurate data</li>
        <li>Request deletion of your data</li>
        <li>Opt-out of marketing communications</li>
        <li>Delete your account and associated data</li>
        <li>Control app permissions through your device settings</li>
      </ul>
      <p className="mb-8">
        Note: We do not provide data export functionality. However, you can
        delete your account and all associated data at any time through the app
        settings.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        6. Children's Privacy and Content Safety
      </h2>

      <h3 className="text-xl font-medium mb-3">Children's Privacy</h3>
      <p className="mb-4">
        Our App is not intended for children under 13 years of age. We do not
        knowingly collect personal information from children under 13. If you
        are a parent or guardian and believe your child has provided us with
        personal information, please contact us immediately.
      </p>

      <h3 className="text-xl font-medium mb-3">Parental Controls</h3>
      <p className="mb-4">We recommend that parents and guardians:</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Monitor their children's use of the App</li>
        <li>Ensure children do not share personal information</li>
        <li>Supervise image generation and sharing activities</li>
        <li>Review and approve any in-app purchases</li>
      </ul>

      <h3 className="text-xl font-medium mb-3">Content Safety</h3>
      <p className="mb-4">
        We are committed to maintaining a safe environment for all users. We
        strictly prohibit:
      </p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Generation of inappropriate or adult content</li>
        <li>Creation of content that promotes violence or hate</li>
        <li>Generation of content that infringes on others' rights</li>
        <li>Creation of content that could be harmful to minors</li>
      </ul>

      <h3 className="text-xl font-medium mb-3">Content Moderation</h3>
      <p className="mb-4">
        We implement automated and manual content moderation to:
      </p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Filter inappropriate prompts</li>
        <li>Block generation of prohibited content</li>
        <li>Remove violating content</li>
        <li>Suspend accounts that violate our policies</li>
      </ul>

      <h3 className="text-xl font-medium mb-3">Reporting Abuse</h3>
      <p className="mb-4">
        Users can report inappropriate content or behavior by:
      </p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Using the in-app reporting feature</li>
        <li>Contacting our support team</li>
        <li>Reporting through the app store</li>
      </ul>
      <p className="mb-8">We take all reports seriously and will:</p>
      <ul className="list-disc list-inside mb-8 space-y-1">
        <li>Review reported content promptly</li>
        <li>Take appropriate action against violators</li>
        <li>Maintain user privacy during investigations</li>
        <li>Cooperate with law enforcement when necessary</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">
        7. International Data Transfers
      </h2>
      <p className="mb-4">
        Your information may be transferred to and processed in countries other
        than your own. We ensure appropriate safeguards are in place for such
        transfers, including:
      </p>
      <ul className="list-disc list-inside mb-8 space-y-1">
        <li>Standard contractual clauses</li>
        <li>Data processing agreements</li>
        <li>Compliance with international data protection laws</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">
        8. Changes to This Privacy Policy
      </h2>
      <p className="mb-4">
        We may update this privacy policy from time to time. We will notify you
        of any changes by:
      </p>
      <ul className="list-disc list-inside mb-8 space-y-1">
        <li>Posting the new privacy policy on this page</li>
        <li>Updating the "Last Updated" date</li>
        <li>Sending you a notification through the App</li>
        <li>Requiring your acceptance of the new policy</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
      <p className="mb-4">
        If you have any questions about this privacy policy or our data
        practices, please contact us at:
      </p>
      <ul className="list-disc list-inside mb-8 space-y-1">
        <li>Email: {env.CONTACT_EMAIL}</li>
        <li>Website: {env.WEBSITE_URL}</li>
        <li>Support: {env.CONTACT_EMAIL}</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">
        10. Compliance with App Store Guidelines
      </h2>
      <p className="mb-4">This privacy policy complies with:</p>
      <ul className="list-disc list-inside mb-8 space-y-1">
        <li>Google Play Store's Developer Program Policies</li>
        <li>Apple App Store's App Review Guidelines</li>
        <li>General Data Protection Regulation (GDPR)</li>
        <li>California Consumer Privacy Act (CCPA)</li>
        <li>Children's Online Privacy Protection Act (COPPA)</li>
        <li>Other applicable data protection laws</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">11. Data Sharing</h2>
      <p className="mb-4">
        We do not share your personal information with third-party companies or
        external parties. We only collect and use data that is necessary for:
      </p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>App functionality</li>
        <li>User experience improvement</li>
        <li>Basic analytics</li>
        <li>Credit system management</li>
        <li>Image generation and processing</li>
      </ul>
      <p className="mb-4">The only external services we use are:</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Google Sign-In and Apple Sign-In (for authentication only)</li>
        <li>Payment processors (for in-app purchases only)</li>
        <li>Google AdMob (for rewarded advertisements only)</li>
      </ul>
      <p className="mb-8">
        We do not sell, rent, or share your personal data with any third parties
        for marketing or other purposes.
      </p>

      <h2 className="text-2xl font-semibold mb-4">12. Security Measures</h2>
      <p className="mb-4">
        We implement appropriate technical and organizational measures to
        protect your personal information, including:
      </p>
      <ul className="list-disc list-inside mb-8 space-y-1">
        <li>Encryption of data in transit and at rest</li>
        <li>Regular security assessments</li>
        <li>Access controls and authentication</li>
        <li>Secure data storage systems</li>
        <li>Regular backups</li>
        <li>Incident response procedures</li>
        <li>Employee training on data protection</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">13. Consent</h2>
      <p className="mb-4">
        By using our App, you consent to our privacy policy and agree to its
        terms. You can withdraw your consent at any time by:
      </p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Deleting your account through the app settings</li>
        <li>Uninstalling the App</li>
        <li>Contacting us to request account deletion</li>
      </ul>
      <p className="mb-8">When you delete your account:</p>
      <ul className="list-disc list-inside mb-8 space-y-1">
        <li>All your personal data will be permanently deleted</li>
        <li>Your generated images will be removed from our servers</li>
        <li>Your credit balance and transaction history will be erased</li>
        <li>You will no longer have access to your account</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">
        14. Prohibited Content and Usage
      </h2>

      <h3 className="text-xl font-medium mb-3">Prohibited Content</h3>
      <p className="mb-4">
        Users are strictly prohibited from generating, uploading, or sharing:
      </p>
      <ol className="list-decimal list-inside mb-6 space-y-2">
        <li>
          <strong>Adult Content</strong>:
          <ul className="list-disc list-inside ml-4 space-y-0.5">
            <li>Nudity or sexually explicit material</li>
            <li>Pornographic content</li>
            <li>Sexually suggestive material</li>
          </ul>
        </li>
        <li>
          <strong>Violent Content</strong>:
          <ul className="list-disc list-inside ml-4 space-y-0.5">
            <li>Graphic violence</li>
            <li>Gore</li>
            <li>Content promoting self-harm</li>
            <li>Content promoting violence against others</li>
          </ul>
        </li>
        <li>
          <strong>Hate Speech and Discrimination</strong>:
          <ul className="list-disc list-inside ml-4 space-y-0.5">
            <li>Content promoting hate</li>
            <li>Discriminatory content</li>
            <li>Content targeting specific groups</li>
            <li>Content promoting intolerance</li>
          </ul>
        </li>
        <li>
          <strong>Illegal Content</strong>:
          <ul className="list-disc list-inside ml-4 space-y-0.5">
            <li>Content promoting illegal activities</li>
            <li>Copyrighted material without permission</li>
            <li>Trademarked content without authorization</li>
            <li>Content violating intellectual property rights</li>
          </ul>
        </li>
        <li>
          <strong>Harmful Content</strong>:
          <ul className="list-disc list-inside ml-4 space-y-0.5">
            <li>Content that could harm minors</li>
            <li>Content promoting dangerous activities</li>
            <li>Content that could cause emotional distress</li>
            <li>Content that could lead to physical harm</li>
          </ul>
        </li>
      </ol>

      <h3 className="text-xl font-medium mb-3">Consequences of Violation</h3>
      <p className="mb-4">
        Violation of these policies may result in:
      </p>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li>Immediate account suspension</li>
        <li>Permanent account termination</li>
        <li>Loss of credits and purchased items</li>
        <li>Legal action if necessary</li>
        <li>Reporting to appropriate authorities</li>
      </ul>

      <h3 className="text-xl font-medium mb-3">Content Review Process</h3>
      <p className="mb-4">We reserve the right to:</p>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li>Review any generated content</li>
        <li>Remove content that violates our policies</li>
        <li>Suspend or terminate accounts</li>
        <li>Take legal action when necessary</li>
        <li>Report violations to law enforcement</li>
      </ul>

      <h3 className="text-xl font-medium mb-3">User Responsibility</h3>
      <p className="mb-4">Users are responsible for:</p>
      <ul className="list-disc list-inside mb-8 space-y-1">
        <li>Ensuring their prompts comply with our policies</li>
        <li>Not sharing inappropriate content</li>
        <li>Reporting violations they encounter</li>
        <li>Maintaining appropriate usage of the App</li>
        <li>Protecting their account credentials</li>
      </ul>
    </div>
  );
};
