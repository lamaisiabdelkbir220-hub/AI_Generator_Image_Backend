import env from "@/lib/env";

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Terms of Service for Chitra AI - AI Image Generator
      </h1>
      <p className="text-sm text-gray-500 mb-8 text-center">
        Last Updated: June 4, 2025
      </p>

      <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
      <p className="mb-8">
        By downloading, installing, or using Chirta AI ("the App"), you agree
        to be bound by these Terms of Service ("Terms"). If you do not agree
        to these Terms, please do not use the App.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        2. Description of Service
      </h2>
      <p className="mb-4">
        Chirta AI is an AI-powered image generation and conversion application
        that allows users to:
      </p>
      <ul className="list-disc list-inside mb-8 space-y-1">
        <li>Generate images from text prompts</li>
        <li>
          Convert images to different art styles (including Ghibli style and
          other artistic styles)
        </li>
        <li>Share and download generated images</li>
        <li>Earn and use credits for image generation</li>
        <li>Convert existing images to different art styles</li>
        <li>Save and manage generated images</li>
        <li>Share images on social media platforms</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>

      <h3 className="text-xl font-medium mb-3">3.1. Account Creation</h3>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li>You must be at least 13 years old to use the App</li>
        <li>You must provide accurate information when creating an account</li>
        <li>You are responsible for maintaining the security of your account</li>
        <li>You must notify us immediately of any unauthorized access</li>
      </ul>

      <h3 className="text-xl font-medium mb-3">3.2. Account Types</h3>
      <ul className="list-disc list-inside mb-8 space-y-1">
        <li>Free accounts receive 10 initial credits</li>
        <li>Premium features available through in-app purchases</li>
        <li>Credits can be earned through watching advertisements</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">4. Credit System</h2>

      <h3 className="text-xl font-medium mb-3">4.1. Free Credits</h3>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li>New users receive 10 free credits upon registration</li>
        <li>Free credits are non-transferable</li>
        <li>Free credits expire after 30 days of inactivity</li>
        <li>Free credits cannot be exchanged for cash or other benefits</li>
        <li>Free credits are subject to verification</li>
      </ul>

      <h3 className="text-xl font-medium mb-3">4.2. Credit Usage</h3>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li>Each image generation consumes credits</li>
        <li>Credit cost varies based on image complexity and style</li>
        <li>Credits are non-refundable</li>
        <li>Unused credits do not expire for active accounts</li>
        <li>Credit costs are displayed before generation</li>
        <li>Failed generations may still consume credits</li>
      </ul>

      <h3 className="text-xl font-medium mb-3">4.3. Credit Purchases</h3>
      <ul className="list-disc list-inside mb-8 space-y-1">
        <li>Additional credits can be purchased through in-app purchases</li>
        <li>Prices are subject to change with notice</li>
        <li>Purchases are final and non-refundable</li>
        <li>Credits are delivered immediately after purchase</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">5. User Content</h2>

      <h3 className="text-xl font-medium mb-3">5.1. Generated Images</h3>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li>You retain rights to images you generate</li>
        <li>You are responsible for the content of your prompts</li>
        <li>We may use generated images for service improvement</li>
        <li>You grant us a license to store and process your images</li>
        <li>
          Generated images may be used for:
          <ul className="list-circle list-inside ml-4 space-y-0.5">
            <li>Personal use</li>
            <li>Social media sharing</li>
            <li>Commercial use (subject to restrictions)</li>
            <li>Print and digital media</li>
          </ul>
        </li>
        <li>You must not claim AI-generated images as your original artwork</li>
      </ul>

      <h3 className="text-xl font-medium mb-3">5.2. Uploaded Images</h3>
      <ul className="list-disc list-inside mb-8 space-y-1">
        <li>You must own or have rights to upload images</li>
        <li>We may process and modify uploaded images</li>
        <li>You retain rights to your original images</li>
        <li>We may store uploaded images temporarily</li>
        <li>Uploaded images are processed for style conversion only</li>
        <li>We do not claim ownership of your uploaded images</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">6. Prohibited Uses</h2>
      <p className="mb-4">You agree not to:</p>
      <ul className="list-disc list-inside mb-8 space-y-1">
        <li>Generate illegal or harmful content</li>
        <li>Violate intellectual property rights</li>
        <li>Attempt to reverse engineer the App</li>
        <li>Use automated systems to access the service</li>
        <li>Share account credentials</li>
        <li>Circumvent the credit system</li>
        <li>Generate content that violates our policies</li>
        <li>
          Create content that:
          <ul className="list-circle list-inside ml-4 space-y-0.5">
            <li>Promotes hate or discrimination</li>
            <li>Contains explicit adult content</li>
            <li>Depicts violence or gore</li>
            <li>Infringes on copyrights</li>
            <li>Targets or harasses others</li>
            <li>Promotes illegal activities</li>
          </ul>
        </li>
        <li>
          Use the service for:
          <ul className="list-circle list-inside ml-4 space-y-0.5">
            <li>Spam or automated content generation</li>
            <li>Mass image generation</li>
            <li>Commercial resale of credits</li>
            <li>Unauthorized API access</li>
          </ul>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">
        7. Intellectual Property
      </h2>

      <h3 className="text-xl font-medium mb-3">7.1. App Ownership</h3>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li>The App and its content are owned by Chirta AI</li>
        <li>All rights are reserved</li>
        <li>You may not copy or modify the App</li>
        <li>You may not use our trademarks without permission</li>
      </ul>

      <h3 className="text-xl font-medium mb-3">7.2. User Content Rights</h3>
      <ul className="list-disc list-inside mb-8 space-y-1">
        <li>You retain rights to your generated images</li>
        <li>You grant us a license to use your content</li>
        <li>We may use your content for service improvement</li>
        <li>You are responsible for content rights</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">8. Payment Terms</h2>

      <h3 className="text-xl font-medium mb-3">8.1. In-App Purchases</h3>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li>Prices are displayed in local currency</li>
        <li>Payment is processed through app stores</li>
        <li>All purchases are final</li>
        <li>Refunds are subject to app store policies</li>
        <li>Prices may vary by region</li>
      </ul>

      <h3 className="text-xl font-medium mb-3">8.2. Subscription Terms</h3>
      <ul className="list-disc list-inside mb-8 space-y-1">
        <li>Subscriptions auto-renew unless cancelled</li>
        <li>You can cancel anytime</li>
        <li>No refunds for partial subscription periods</li>
        <li>Prices may change with notice</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">
        9. Service Modifications
      </h2>
      <p className="mb-4">We reserve the right to:</p>
      <ul className="list-disc list-inside mb-8 space-y-1">
        <li>Modify or discontinue features</li>
        <li>Change credit costs</li>
        <li>Update the App</li>
        <li>Change pricing with notice</li>
        <li>Suspend or terminate service</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">10. Termination</h2>

      <h3 className="text-xl font-medium mb-3">10.1. By User</h3>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li>You can delete your account anytime</li>
        <li>Account deletion is permanent</li>
        <li>Unused credits are forfeited</li>
        <li>Data is permanently deleted</li>
        <li>Generated images will be removed</li>
        <li>No recovery is possible after deletion</li>
      </ul>

      <h3 className="text-xl font-medium mb-3">10.2. By Company</h3>
      <p className="mb-8">We may terminate your account if you:</p>
      <ul className="list-disc list-inside mb-8 space-y-1">
        <li>Violate these Terms</li>
        <li>Engage in fraudulent activity</li>
        <li>Abuse the service</li>
        <li>Create harmful content</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">
        11. Disclaimer of Warranties
      </h2>
      <p className="mb-4">
        The App is provided "as is" without warranties of any kind, including:
      </p>
      <ul className="list-disc list-inside mb-8 space-y-1">
        <li>Fitness for a particular purpose</li>
        <li>Non-infringement</li>
        <li>Accuracy of generated images</li>
        <li>Continuous operation</li>
        <li>Error-free service</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">
        12. Limitation of Liability
      </h2>
      <p className="mb-4">We are not liable for:</p>
      <ul className="list-disc list-inside mb-8 space-y-1">
        <li>Indirect damages</li>
        <li>Lost profits</li>
        <li>Data loss</li>
        <li>Service interruptions</li>
        <li>Generated content issues</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">13. Indemnification</h2>
      <p className="mb-4">You agree to indemnify us against:</p>
      <ul className="list-disc list-inside mb-8 space-y-1">
        <li>Claims from your content</li>
        <li>Violations of these Terms</li>
        <li>Third-party claims</li>
        <li>Legal costs</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">14. Governing Law</h2>
      <p className="mb-4">These Terms are governed by:</p>
      <ul className="list-disc list-inside mb-8 space-y-1">
        <li>Applicable laws</li>
        <li>App store policies</li>
        <li>International regulations</li>
        <li>Local requirements</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">15. Changes to Terms</h2>
      <p className="mb-4">We may modify these Terms:</p>
      <ul className="list-disc list-inside mb-8 space-y-1">
        <li>With notice to users</li>
        <li>Through app updates</li>
        <li>For legal compliance</li>
        <li>For service improvements</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">
        16. Contact Information
      </h2>
      <p className="mb-4">
        For questions about these Terms, contact us at:
      </p>
      <ul className="list-disc list-inside mb-8 space-y-1">
        <li>Email: {env.CONTACT_EMAIL}</li>
        <li>Website: {env.WEBSITE_URL}</li>
        <li>Support: {env.CONTACT_EMAIL}</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">17. Severability</h2>
      <p className="mb-4">If any part of these Terms is invalid:</p>
      <ul className="list-disc list-inside mb-8 space-y-1">
        <li>The rest remains in effect</li>
        <li>We will replace invalid parts</li>
        <li>The intent will be preserved</li>
        <li>The agreement continues</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">18. Entire Agreement</h2>
      <p className="mb-8">
        These Terms constitute the entire agreement between you and Chirta AI
        regarding the App.
      </p>
    </div>
  );
};