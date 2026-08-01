import React from 'react';
import type { Metadata } from 'next';
import LegalPageLayout from '@/components/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Pawan Mate Education',
  description: 'Terms and Conditions for using Pawan Mate Education services, including course access, live classes, video streaming, and offline payment policies.',
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

export default function TermsConditionsPage() {
  return (
    <LegalPageLayout
      title="Terms & Conditions"
      subtitle="Please read these terms carefully before using our website, mobile application, or any of our educational services."
      icon="terms"
      lastUpdated="February 8, 2026"
    >
      {/* 1. Acceptance of Terms */}
      <Section title="1. Acceptance of Terms">
        <p>
          By accessing, browsing, or using the Pawan Mate Education website, mobile application, or any of our
          services, you agree to be bound by these Terms & Conditions. If you do not agree with any part of
          these terms, you should not use our services.
        </p>
        <p>
          These terms apply to all students, parents, guardians, and visitors who interact with our platform.
        </p>
      </Section>

      {/* 2. Description of Services */}
      <Section title="2. Description of Services">
        <p>Pawan Mate Education provides the following educational services:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Pre-recorded video lectures for Polytechnic, Diploma, and Degree Engineering courses</li>
          <li>Live online classes conducted through third-party platforms such as Zoom</li>
          <li>Study materials, handwritten notes, DPPs (Daily Practice Problems), and formula sheets</li>
          <li>Test series and practice papers</li>
          <li>Doubt-solving support and academic guidance</li>
        </ul>
      </Section>

      {/* 3. No Online Payments / Offline Payment Model */}
      <Section title="3. No Online Payments / Offline Payment Model">
        <p className="font-semibold text-slate-800">
          Important: Pawan Mate Education does not accept any online payments through our website or mobile application.
        </p>
        <p>
          Our payment system is <strong>completely offline</strong>. The process works as follows:
        </p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>You browse available courses on our website or app.</li>
          <li>You submit a <strong>course access request</strong> through the app or website.</li>
          <li>Our team contacts you to discuss the course and payment.</li>
          <li>Payment is completed <strong>offline</strong> through bank transfer, cash, UPI (arranged directly), or any other method agreed with our team.</li>
          <li>Once payment is confirmed, our admin team grants you access to the course.</li>
        </ol>
        <p>
          We <strong>do not process, collect, or store</strong> any payment card details, bank account numbers,
          UPI IDs, or financial information through our digital platforms. All financial transactions are
          handled directly between you and our team outside of the app and website.
        </p>
      </Section>

      {/* 4. Access Requests & Approval */}
      <Section title="4. Access Requests & Approval">
        <SubSection title="4.1 Request Process">
          <p>
            When you submit a course access request, you are only requesting enrollment. Your request is
            reviewed by our administration team. Access is granted only after:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Your request is verified and approved by our team</li>
            <li>Offline payment is confirmed (where applicable)</li>
            <li>Your account and device are properly linked</li>
          </ul>
        </SubSection>

        <SubSection title="4.2 Approval Time">
          <p>
            Access requests are typically processed within 24-48 hours. You will be notified once your access
            has been granted or if additional information is required.
          </p>
        </SubSection>
      </Section>

      {/* 5. User Accounts & Responsibilities */}
      <Section title="5. User Accounts & Responsibilities">
        <ul className="list-disc pl-5 space-y-1">
          <li>You must provide accurate and complete information when registering.</li>
          <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
          <li>Your account is linked to your registered mobile number and device.</li>
          <li>You must not share your account credentials or device access with others.</li>
          <li>You must not create multiple accounts to bypass access restrictions.</li>
          <li>You are responsible for all activity that occurs under your account.</li>
        </ul>
      </Section>

      {/* 6. Intellectual Property */}
      <Section title="6. Intellectual Property">
        <p>
          All content provided through our services, including but not limited to video lectures, study notes,
          DPPs, test papers, formula sheets, and course materials, is the intellectual property of Pawan Mate
          Education and is protected by applicable copyright laws.
        </p>
        <p>You may not:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Copy, reproduce, distribute, or republish any course content without written permission</li>
          <li>Record, screen-capture, or download video lectures for redistribution</li>
          <li>Sell, rent, or sublicense any course content to third parties</li>
          <li>Use our content for any commercial purpose without authorization</li>
        </ul>
      </Section>

      {/* 7. Prohibited Activities */}
      <Section title="7. Prohibited Activities">
        <p>While using our services, you agree not to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Attempt to hack, disrupt, or interfere with our servers, systems, or services</li>
          <li>Reverse engineer, decompile, or attempt to extract source code from our app</li>
          <li>Share your login credentials or device access with unauthorized users</li>
          <li>Use automated tools, bots, or scripts to access our services</li>
          <li>Post or transmit any harmful, offensive, or illegal content</li>
          <li>Impersonate another person or entity</li>
        </ul>
      </Section>

      {/* 8. Live Class Conduct */}
      <Section title="8. Live Class Conduct">
        <p>When participating in live online classes, you agree to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Maintain respectful and professional behavior at all times</li>
          <li>Not record, screenshot, or share live class content</li>
          <li>Not disrupt the class or interfere with other students' learning</li>
          <li>Use your real name and identity during live sessions</li>
          <li>Follow the instructions of the instructor and moderators</li>
        </ul>
        <p>
          We reserve the right to remove any participant who violates these conduct rules from live sessions.
        </p>
      </Section>

      {/* 9. Refund Policy */}
      <Section title="9. Refund Policy">
        <p>
          Since all payments are handled <strong>offline</strong>, refunds are also processed offline. Our
          refund policy is as follows:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Refund requests must be made directly to Pawan Sir via phone or WhatsApp.</li>
          <li>Refunds are evaluated on a case-by-case basis.</li>
          <li>No refunds are provided once course access has been granted and used.</li>
          <li>Refunds, if approved, are processed through the same offline method used for payment.</li>
        </ul>
        <p>
          For any refund-related queries, please contact Pawan Sir at <a href="tel:9075554662" className="text-blue-600 font-semibold hover:underline">9075554662</a>.
        </p>
      </Section>

      {/* 10. Limitation of Liability */}
      <Section title="10. Limitation of Liability">
        <p>
          To the maximum extent permitted by law, Pawan Mate Education shall not be liable for any indirect,
          incidental, special, consequential, or punitive damages, including but not limited to loss of profits,
          data, or other intangible losses, arising from:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Your use or inability to use our services</li>
          <li>Any interruption, delay, or failure in service delivery</li>
          <li>Technical issues with third-party platforms (e.g., Zoom, internet connectivity)</li>
          <li>Unauthorized access to your account due to your own negligence</li>
        </ul>
      </Section>

      {/* 11. Termination */}
      <Section title="11. Termination">
        <p>
          We reserve the right to suspend or terminate your access to our services at any time, without notice,
          if you violate these Terms & Conditions or engage in any activity that may harm our platform, content,
          or other users.
        </p>
        <p>
          Upon termination, your access to courses, live classes, and study materials will be revoked. You may
          contact us to appeal a termination decision.
        </p>
      </Section>

      {/* 12. Governing Law */}
      <Section title="12. Governing Law">
        <p>
          These Terms & Conditions are governed by and construed in accordance with the laws of India. Any
          disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in
          Maharashtra, India.
        </p>
      </Section>

      {/* 13. Changes to Terms */}
      <Section title="13. Changes to These Terms">
        <p>
          We may update these Terms & Conditions from time to time. Any changes will be posted on this page
          with an updated "Last Updated" date. Continued use of our services after changes constitutes
          acceptance of the revised terms.
        </p>
      </Section>

      {/* 14. Contact Us */}
      <Section title="14. Contact Us">
        <p>If you have any questions about these Terms & Conditions, please contact us:</p>
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