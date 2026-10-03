import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How No Sweat® collects, uses and protects personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const currentYear = new Date().getFullYear();
  return (
    <section className="on-paper band bg-paper text-ink">
      <div className="wrap">
        <h1 className="display display-lg">Privacy policy</h1>
        <div className="prose-ns mt-8">
        {/* Introduction and high‑level summary */}
        <p>
          This Global Privacy Policy (the “Policy”) describes how No Sweat™
          (“Company,” “we,” “our,” or “us”) collects, uses, discloses and
          safeguards personal information across all current and future websites,
          subdomains and online services (collectively, the “Services”). This
          Policy sets a global standard for privacy compliance and data
          protection in accordance with the highest international legal
          frameworks, including but not limited to the General Data Protection
          Regulation (EU) 2016/679 (“GDPR”), the California Consumer Privacy Act
          and Privacy Rights Act (CCPA/CPRA), the Virginia Consumer Data
          Protection Act (VCDPA), the Canadian Personal Information Protection
          and Electronic Documents Act (PIPEDA) and the Brazilian General Data
          Protection Law (LGPD). It applies to all users regardless of
          geographic location.
        </p>
        {/* Table of Contents */}
        <div>
          <h2>
            Contents
          </h2>
          <ol>
            <li>
              <a href="#scope">
                Scope &amp; Applicability
              </a>
            </li>
            <li>
              <a href="#info">
                Information We Collect
              </a>
            </li>
            <li>
              <a href="#ai">
                Automated &amp; AI‑Based Processing
              </a>
            </li>
            <li>
              <a href="#use">
                How We Use Information
              </a>
            </li>
            <li>
              <a href="#disclosure">
                Disclosure &amp; Data Sharing
              </a>
            </li>
            <li>
              <a href="#transfers">
                International Data Transfers
              </a>
            </li>
            <li>
              <a href="#retention">
                Data Retention
              </a>
            </li>
            <li>
              <a href="#children">
                Children’s Privacy
              </a>
            </li>
            <li>
              <a href="#rights">
                Your Rights
              </a>
            </li>
            <li>
              <a href="#security">
                Security &amp; Safeguards
              </a>
            </li>
            <li>
              <a href="#cookies">
                Cookies &amp; Tracking Technologies
              </a>
            </li>
            <li>
              <a href="#principles">
                Cross‑Border Compliance Principles
              </a>
            </li>
            <li>
              <a href="#dpo">
                Data Protection Officer &amp; Contact
              </a>
            </li>
            <li>
              <a href="#updates">
                Updates to This Policy
              </a>
            </li>
          </ol>
        </div>
        {/* Sections */}
        <div>
          {/* 1. Scope */}
          <section id="scope">
            <h2>
              1.&nbsp;Scope &amp; Applicability
            </h2>
            <p>
              This Policy applies to all visitors, customers and users of our
              Services and to all data collected online or offline through any
              form of interaction. By using our Services, you consent to the
              practices described herein.
            </p>
          </section>
          {/* 2. Information We Collect */}
          <section id="info">
            <h2>
              2.&nbsp;Information We Collect
            </h2>
            <p>
              We collect personal data directly and automatically, including:
            </p>
            <ul>
              <li>
                Identifiers: name, email, phone number and address
              </li>
              <li>
                Commercial data: transactions, purchases and payment methods
              </li>
              <li>
                Biometric &amp; health data (where applicable)
              </li>
              <li>
                Geolocation &amp; device identifiers
              </li>
              <li>
                Internet activity &amp; behavioural analytics
              </li>
              <li>
                Any other data required for lawful and legitimate business
                operations
              </li>
            </ul>
          </section>
          {/* 3. Automated & AI‑Based Processing */}
          <section id="ai">
            <h2>
              3.&nbsp;Automated &amp; AI‑Based Processing
            </h2>
            <p>
              We utilise Artificial Intelligence and Machine Learning (“AI/ML”)
              technologies to analyse behavioural data, enhance service
              personalisation, detect fraud and improve user experience.
            </p>
            <p>
              Automated decision‑making may influence personalised
              recommendations or fraud prevention mechanisms, never without
              appropriate human oversight and legal safeguards.
            </p>
          </section>
          {/* 4. How We Use Information */}
          <section id="use">
            <h2>
              4.&nbsp;How We Use Information
            </h2>
            <p>
              We process data for legitimate business purposes including:
            </p>
            <ul>
              <li>
                Service delivery &amp; account management
              </li>
              <li>
                Communication &amp; customer support
              </li>
              <li>
                Compliance with legal obligations
              </li>
              <li>
                Analytics, marketing &amp; personalisation
              </li>
              <li>
                Platform security &amp; fraud prevention
              </li>
            </ul>
          </section>
          {/* 5. Disclosure & Data Sharing */}
          <section id="disclosure">
            <h2>
              5.&nbsp;Disclosure &amp; Data Sharing
            </h2>
            <p>
              We do not sell personal data. We share information only with
              trusted service providers, payment processors, affiliates,
              analytics vendors and legal authorities when required by law.
            </p>
            <p>
              Each third‑party partner is contractually obligated to maintain
              equivalent data protection standards.
            </p>
          </section>
          {/* 6. International Data Transfers */}
          <section id="transfers">
            <h2>
              6.&nbsp;International Data Transfers
            </h2>
            <p>
              Data may be processed and stored in the United States and other
              jurisdictions. All transfers comply with GDPR Chapter V and
              equivalent safeguards through Standard Contractual Clauses,
              adequacy decisions or binding corporate rules.
            </p>
          </section>
          {/* 7. Data Retention */}
          <section id="retention">
            <h2>
              7.&nbsp;Data Retention
            </h2>
            <p>
              Personal data is retained only for as long as necessary to fulfil
              the purposes for which it was collected or as required by law.
            </p>
            <p>
              Retention schedules are periodically reviewed for compliance and
              minimisation.
            </p>
          </section>
          {/* 8. Children’s Privacy */}
          <section id="children">
            <h2>
              8.&nbsp;Children’s Privacy
            </h2>
            <p>
              We comply with the Children’s Online Privacy Protection Act (COPPA)
              and do not knowingly collect data from children under 13 years
              old (or 16 in applicable jurisdictions) without verifiable
              parental consent.
            </p>
            <p>
              Parents may contact us to review or delete their child’s data at
              any time.
            </p>
          </section>
          {/* 9. Your Rights */}
          <section id="rights">
            <h2>
              9.&nbsp;Your Rights
            </h2>
            <p>
              Depending on your jurisdiction, you may have the right to:
            </p>
            <ul>
              <li>
                Access, correct or delete your data
              </li>
              <li>
                Restrict or object to processing
              </li>
              <li>
                Port your data to another service
              </li>
              <li>
                Withdraw consent where processing is based on consent
              </li>
            </ul>
            <p>
              Requests can be submitted using the contact information below.
            </p>
          </section>
          {/* 10. Security & Safeguards */}
          <section id="security">
            <h2>
              10.&nbsp;Security &amp; Safeguards
            </h2>
            <p>
              We employ administrative, technical and physical safeguards that
              meet or exceed industry standards, including encryption,
              pseudonymisation, role‑based access controls, multi‑factor
              authentication and continuous threat monitoring.
            </p>
          </section>
          {/* 11. Cookies & Tracking Technologies */}
          <section id="cookies">
            <h2>
              11.&nbsp;Cookies &amp; Tracking Technologies
            </h2>
            <p>
              We use cookies, web beacons and similar tools for site
              functionality, analytics and marketing. Users can control cookie
              preferences via browser settings or our Cookie Management Tool.
            </p>
          </section>
          {/* 12. Cross‑Border Compliance Principles */}
          <section id="principles">
            <h2>
              12.&nbsp;Cross‑Border Compliance Principles
            </h2>
            <p>
              This Policy incorporates global privacy principles such as
              lawfulness, fairness, transparency, purpose limitation, data
              minimisation, accuracy, integrity and accountability. These
              principles apply uniformly across all operations and subsidiaries.
            </p>
          </section>
          {/* 13. Data Protection Officer & Contact */}
          <section id="dpo">
            <h2>
              13.&nbsp;Data Protection Officer &amp; Contact
            </h2>
            <p>
              We maintain a designated Data Protection Officer (“DPO”) to
              oversee compliance. Users may exercise their rights or submit
              complaints via email at&nbsp;
              <a
                href="mailto:privacy@nosweatsealer.com"
              >
                privacy@nosweatsealer.com
              </a>
              &nbsp;or by mail to our registered office in Florida, USA.
            </p>
          </section>
          {/* 14. Updates to This Policy */}
          <section id="updates">
            <h2>
              14.&nbsp;Updates to This Policy
            </h2>
            <p>
              We may update this Policy to reflect legal, technical or business
              developments. The latest version will always be available on our
              website, with a new “Last Updated” date.
            </p>
            <p>
              Continued use of our Services constitutes acceptance of any
              modifications.
            </p>
          </section>
          {/* Footer note */}
          <p>
            © {currentYear} No Sweat. All rights reserved.
          </p>
        </div>
      
        </div>
      </div>
    </section>
  );
}
