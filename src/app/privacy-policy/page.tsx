import React from 'react';
import type { Metadata } from 'next';
import LegalPageLayout from '@/components/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy | Pawan Mate Education',
  description: 'Privacy Policy for Pawan Mate Education. Learn how we collect, use, and protect your personal information when using our app and website.',
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-bold text-[#0f2c59] mb-3">{title}</h2>
      <div className="text-sm text-slate-600 leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <h3 className="text-sm font-bold text-slate-800 mb-1.5">{title}</h3>
      <div className="text-sm text-slate-600 leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      subtitle="Your privacy matters to us. This policy explains how Pawan Mate Education collects, uses, and protects your personal information."
      icon="privacy"
      lastUpdated="February 8, 2026"
    >
      {/* 1. Introduction */}
      <Section title="1. Introduction">
        <p>
          Pawan Mate Education ("we", "our", "us") is committed to protecting the privacy of all students,
          parents, and visitors who use our website, mobile application, and services. This Privacy Policy
          explains what information we collect, how we use it, and the choices you have regarding your data.
        </p>
        <p>
          By accessing our website or using our mobile application, you agree to the collection and use of
          information in accordance with this Privacy Policy.
        </p>
      </Section>

      {/* 2. Information We Collect */}
      <Section title="2. Information We Collect">
        <SubSection title="2.1 Personal Information">
          <p>When you register or use our services, we may collect the following personal information:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Full name</li>
            <li>Mobile phone number</li>
            <li>Email address (if provided)</li>
            <li>Educational details such as university, branch, and year of study</li>
            <li>Device ID and device information for secure access</li>
          </ul>
        </SubSection>

        <SubSection title="2.2 Usage Information">
          <p>We automatically collect certain information about how you use our services:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Courses you browse, request access to, or enroll in</li>
            <li>Video lectures you watch and your progress within each course</li>
            <li>Live class participation history</li>
            <li>Study materials and notes you access</li>
            <li>App usage patterns and interaction data</li>
          </ul>
        </SubSection>

        <SubSection title="2.3 Information You Provide Voluntarily">
          <p>
            When you contact us for support, request course access, or communicate with us through WhatsApp,
            phone, or email, we may collect the information you choose to share with us.
          </p>
        </SubSection>
      </Section>

      {/* 3. How We Use Your Information */}
      <Section title="3. How We Use Your Information">
        <p>We use the information we collect for the following purposes:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>To create and manage your student account</li>
          <li>To process and manage your course access requests</li>
          <li>To grant you access to enrolled courses, video lectures, and study materials</li>
          <li>To enable participation in live online classes</li>
          <li>To track your learning progress and provide personalized recommendations</li>
          <li>To send you important notifications about classes, courses, and updates</li>
          <li>To verify your identity and secure your account</li>
          <li>To improve our services, content, and user experience</li>
          <li>To respond to your inquiries and provide customer support</li>
        </ul>
      </Section>

      {/* 4. No Online Payments */}
      <Section title="4. No Online Payments">
        <p className="font-semibold text-slate-800">
          Important: We do not accept any online payments through our website or mobile application.
        </p>
        <p>
          Our payment system is <strong>completely offline</strong>. When you request access to a course,
          you are only submitting a request for enrollment. All payments are handled offline through:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Direct bank transfer</li>
          <li>Cash payment at our coaching center</li>
          <li>UPI transfer arranged directly with our team</li>
          <li>Any other offline payment method agreed upon with Pawan Sir</li>
        </ul>
        <p>
          We <strong>do not collect, process, or store</strong> any credit card numbers, debit card numbers,
          bank account details, UPI IDs, or any other financial payment information through our app or website.
          All financial transactions occur outside of our digital platforms.
        </p>
      </Section>

      {/* 5. Data Storage & Security */}
      <Section title="5. Data Storage & Security">
        <p>
          We take the security of your personal information seriously. We implement appropriate technical and
          organizational measures to protect your data against unauthorized access, alteration, disclosure, or
          destruction.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>All data transmitted between your device and our servers is encrypted using industry-standard SSL/TLS protocols</li>
          <li>Access to your account is protected through OTP (One-Time Password) verification</li>
          <li>Your device is linked to your account to prevent unauthorized access</li>
          <li>We regularly review and update our security practices</li>
        </ul>
      </Section>

      {/* 6. Data Sharing */}
      <Section title="6. Data Sharing & Disclosure">
        <p>We do not sell, rent, or trade your personal information to third parties.</p>
        <p>We may share your information only in the following limited circumstances:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Service Providers:</strong> We may share necessary information with trusted service
            providers who help us deliver our services, such as Zoom for conducting live classes.
          </li>
          <li>
            <strong>Legal Requirements:</strong> We may disclose information if required by law, regulation,
            or legal process.
          </li>
          <li>
            <strong>With Your Consent:</strong> We may share information when you have given us explicit consent.
          </li>
        </ul>
      </Section>

      {/* 7. Your Rights */}
      <Section title="7. Your Rights">
        <p>You have the following rights regarding your personal information:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Access:</strong> You can request a copy of the personal information we hold about you.</li>
          <li><strong>Correction:</strong> You can request corrections to inaccurate or incomplete information.</li>
          <li><strong>Deletion:</strong> You can request deletion of your account and personal data.</li>
          <li><strong>Withdrawal of Consent:</strong> You can withdraw your consent for data processing at any time.</li>
        </ul>
        <p>
          To exercise any of these rights, please contact us using the details provided in the "Contact Us" section below.
        </p>
      </Section>

      {/* 8. Children's Privacy */}
      <Section title="8. Children's Privacy">
        <p>
          Our services are intended for students pursuing Polytechnic, Diploma, and Degree Engineering programs.
          We do not knowingly collect personal information from children under the age of 13. If you believe a
          child under 13 has provided us with personal information, please contact us immediately, and we will
          take steps to remove such information.
        </p>
      </Section>

      {/* 9. Cookies & Analytics */}
      <Section title="9. Cookies & Analytics">
        <p>
          Our website may use cookies and similar technologies to enhance your browsing experience and to
          understand how visitors use our site. We may use analytics tools to collect aggregated, non-personal
          information about website traffic and usage patterns.
        </p>
        <p>
          You can control cookies through your browser settings. However, disabling cookies may affect the
          functionality of certain parts of our website.
        </p>
      </Section>

      {/* 10. Changes to This Policy */}
      <Section title="10. Changes to This Privacy Policy">
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with an
          updated "Last Updated" date. We encourage you to review this policy periodically to stay informed
          about how we protect your information.
        </p>
      </Section>

      {/* 11. Contact Us */}
      <Section title="11. Contact Us">
        <p>If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:</p>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-2">
          <p className="font-bold text-[#0f2c59]">Pawan Mate Education</p>
          <p className="mt-1">Contact: Pawan Sir</p>
          <p>Phone: <a href="tel:9075554662" className="text-blue-600 font-semibold hover:underline">9075554662</a></p>
          <p>WhatsApp: <a href="https://wa.me/919075554662" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline">Chat on WhatsApp</a></p>
        </div>
      </Section>
    </LegalPageLayout>
  );
}