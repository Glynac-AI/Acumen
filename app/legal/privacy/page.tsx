// app/legal/privacy/page.tsx
'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Link from 'next/link';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen">
            {/* Header */}
            <Section background="gradient" padding="lg" className="text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
                <Container className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
                        <p className="text-white/80 text-lg">Acumen Strategy LLC</p>
                    </motion.div>
                </Container>
            </Section>

            {/* Content */}
            <Section background="white" padding="lg">
                <Container maxWidth="md">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="prose prose-lg max-w-none"
                    >
                        <div className="space-y-8 text-primary/80 leading-relaxed">
                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">1. Introduction</h2>
                                <p>
                                    Acumen Strategy LLC (&quot;Acumen Strategy,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting the privacy and security of personal information. This Privacy Policy describes how we collect, use, disclose, and safeguard information obtained through our websites, software platforms, and related services (collectively, the &quot;Services&quot;).
                                </p>
                                <p className="mt-4">
                                    Acumen Strategy provides software, products, and services designed for wealth management firms, including but not limited to Glynac, Tollbooth, and related compliance and operational solutions. By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">2. Information We Collect</h2>
                                
                                <h3 className="text-xl font-semibold text-primary mt-6 mb-3">2.1 Information You Provide Directly</h3>
                                <p>We may collect information you voluntarily provide when using our Services, including</p>
                                <ul className="list-disc pl-6 mt-3 space-y-2">
                                    <li>Contact information such as name, email address, telephone number, and business address</li>
                                    <li>Company and professional information, including job title, company name, and industry</li>
                                    <li>Account credentials and authentication information</li>
                                    <li>Payment and billing information</li>
                                    <li>Communications and correspondence with Acumen Strategy</li>
                                    <li>Information submitted through forms, surveys, or feedback mechanisms</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-primary mt-6 mb-3">2.2 Information Collected Automatically</h3>
                                <p>When you access our Services, we may automatically collect certain technical information, including</p>
                                <ul className="list-disc pl-6 mt-3 space-y-2">
                                    <li>Device information, including device type, operating system, and browser type</li>
                                    <li>Internet Protocol (IP) address and general geographic location</li>
                                    <li>Usage data, including pages visited, features accessed, and interaction patterns</li>
                                    <li>Cookies and similar tracking technologies as described in Section 5</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-primary mt-6 mb-3">2.3 Information from Third Parties</h3>
                                <p>We may receive information from third-party sources, including</p>
                                <ul className="list-disc pl-6 mt-3 space-y-2">
                                    <li>Business partners and service providers</li>
                                    <li>Publicly available sources</li>
                                    <li>Third-party authentication services</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">3. How We Use Your Information</h2>
                                <p>Acumen Strategy uses collected information for the following purposes</p>
                                <ul className="list-disc pl-6 mt-3 space-y-2">
                                    <li>Providing, maintaining, and improving our Services</li>
                                    <li>Processing transactions and managing your account</li>
                                    <li>Communicating with you regarding our Services, including updates, security alerts, and support messages</li>
                                    <li>Sending promotional communications where permitted by law (you may opt out at any time)</li>
                                    <li>Analyzing usage patterns to enhance user experience and develop new features</li>
                                    <li>Ensuring the security and integrity of our Services</li>
                                    <li>Complying with legal obligations and regulatory requirements</li>
                                    <li>Protecting our rights, property, and safety, as well as those of our users</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">4. Disclosure of Information</h2>
                                <p>We may share information with third parties in the following circumstances</p>
                                <ul className="list-disc pl-6 mt-3 space-y-2">
                                    <li><strong>Service Providers</strong> — With vendors and contractors who perform services on our behalf, subject to confidentiality obligations</li>
                                    <li><strong>Business Transfers</strong> — In connection with any merger, acquisition, reorganization, or sale of assets</li>
                                    <li><strong>Legal Requirements</strong> — When required by law, regulation, legal process, or governmental request</li>
                                    <li><strong>Protection of Rights</strong> — To protect the rights, property, or safety of Acumen Strategy, our users, or others</li>
                                    <li><strong>With Consent</strong> — When you have provided explicit consent to the disclosure</li>
                                </ul>
                                <p className="mt-4">
                                    We do not sell, rent, or lease personal information to third parties for their marketing purposes without your explicit consent.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">5. Cookies and Tracking Technologies</h2>
                                <p>
                                    Acumen Strategy uses cookies and similar tracking technologies to collect information about your use of our Services. Cookies are small data files stored on your device that help us improve your experience by remembering preferences and analyzing usage patterns.
                                </p>
                                <p className="mt-4">
                                    Most web browsers allow you to control cookies through browser settings. However, disabling certain cookies may affect the functionality of our Services.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">6. Email Communications and Third-Party Services</h2>
                                <p>
                                    Acumen Strategy uses Amazon Web Services Simple Email Service (AWS SES) to deliver transactional and marketing email communications. When you provide your email address and consent to receive communications from us, your email address and related communication data may be processed through AWS SES infrastructure.
                                </p>
                                <p className="mt-4">
                                    This processing is subject to Amazon Web Services&apos; privacy practices and data protection standards. AWS SES processes your information solely for the purpose of delivering our communications and does not use your personal information for independent marketing purposes. Email communications may include
                                </p>
                                <ul className="list-disc pl-6 mt-3 space-y-2">
                                    <li>Product updates and feature announcements</li>
                                    <li>Account-related notifications and security alerts</li>
                                    <li>Marketing and promotional content (with your consent)</li>
                                    <li>Responses to inquiries and support requests</li>
                                </ul>
                                <p className="mt-4">
                                    You may manage your email preferences or unsubscribe from marketing communications at any time by visiting our <Link href="/legal/unsubscribe" className="text-accent hover:underline">Email Preferences</Link> page or by contacting us directly. Please note that you may continue to receive transactional emails related to your account or ongoing business relationship even after opting out of marketing communications.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">7. Data Security</h2>
                                <p>
                                    We implement appropriate technical and organizational measures designed to protect personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, access controls, and regular security assessments.
                                </p>
                                <p className="mt-4">
                                    However, no method of transmission over the Internet or electronic storage is completely secure. While we strive to protect personal information, we cannot guarantee absolute security.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">8. Data Retention</h2>
                                <p>
                                    We retain personal information for as long as necessary to fulfill the purposes described in this Privacy Policy, unless a longer retention period is required or permitted by law. The retention period may vary depending on the context of our relationship with you and our legal obligations.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">9. Your Rights and Choices</h2>
                                <p>Depending on your jurisdiction, you may have certain rights regarding your personal information, including</p>
                                <ul className="list-disc pl-6 mt-3 space-y-2">
                                    <li>The right to access and receive a copy of your personal information</li>
                                    <li>The right to correct inaccurate or incomplete information</li>
                                    <li>The right to request deletion of your personal information</li>
                                    <li>The right to restrict or object to certain processing activities</li>
                                    <li>The right to data portability</li>
                                    <li>The right to withdraw consent where processing is based on consent</li>
                                </ul>
                                <p className="mt-4">
                                    To exercise any of these rights, please contact us using the information provided in Section 12. We will respond to your request in accordance with applicable law.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">10. Third-Party Links</h2>
                                <p>
                                    Our Services may contain links to third-party websites or services. This Privacy Policy does not apply to those third-party sites, and we are not responsible for their privacy practices. We encourage you to review the privacy policies of any third-party sites you visit.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">11. Children&apos;s Privacy</h2>
                                <p>
                                    Our Services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us, and we will take steps to delete such information.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">12. Changes to This Privacy Policy</h2>
                                <p>
                                    We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. When we make material changes, we will notify you by posting the updated Privacy Policy on our website. Your continued use of our Services after any changes constitutes acceptance of the updated Privacy Policy.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">13. Contact Us</h2>
                                <p>
                                    If you have questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us.
                                </p>
                                <div className="mt-4 p-6 bg-gray-50 rounded-lg">
                                    <p className="font-semibold text-primary">Acumen Strategy LLC</p>
                                    <p className="mt-2">272 Market Square</p>
                                    <p>Lake Forest, IL 60045</p>
                                    <p className="mt-2">
                                        Phone: <a href="tel:+18472300014" className="text-accent hover:underline">+1 847 230 0014</a>
                                    </p>
                                    <p className="mt-2">
                                        Email: <a href="mailto:info@acumen-strategy.com" className="text-accent hover:underline">info@acumen-strategy.com</a>
                                    </p>
                                </div>
                            </section>
                        </div>
                    </motion.div>
                </Container>
            </Section>
        </div>
    );
}
