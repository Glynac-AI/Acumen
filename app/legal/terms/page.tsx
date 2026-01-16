'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';

export default function TermsOfService() {
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
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
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
                                <h2 className="text-2xl font-bold text-primary mb-4">1. Acceptance of Terms</h2>
                                <p>
                                    These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;) and Acumen Strategy LLC (&quot;Acumen Strategy,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing, browsing, or using our websites, software platforms, applications, and related services (collectively, the &quot;Services&quot;), you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
                                </p>
                                <p className="mt-4">
                                    If you do not agree to these Terms, you must not access or use our Services. If you are using the Services on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">2. Description of Services</h2>
                                <p>
                                    Acumen Strategy provides software, products, and services designed for wealth management firms. Our offerings include, but are not limited to, Glynac, Tollbooth, and related compliance, operational, and investment solutions. The specific features and functionality of each Service may vary and are subject to change without prior notice.
                                </p>
                                <p className="mt-4">
                                    Certain Services may require account registration and may be subject to additional terms, conditions, or fees as specified at the time of enrollment.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">3. User Accounts and Registration</h2>
                                <p>
                                    To access certain features of our Services, you may be required to create an account. When registering, you agree to provide accurate, current, and complete information and to update such information as necessary to maintain its accuracy.
                                </p>
                                <p className="mt-4">
                                    You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify Acumen Strategy immediately of any unauthorized use of your account or any other breach of security. Acumen Strategy will not be liable for any loss or damage arising from your failure to protect your account credentials.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">4. Acceptable Use</h2>
                                <p>You agree to use our Services only for lawful purposes and in accordance with these Terms. You shall not</p>
                                <ul className="list-disc pl-6 mt-3 space-y-2">
                                    <li>Use the Services in any manner that violates any applicable federal, state, local, or international law or regulation</li>
                                    <li>Engage in any conduct that restricts or inhibits anyone&apos;s use or enjoyment of the Services</li>
                                    <li>Attempt to gain unauthorized access to any portion of the Services, other accounts, computer systems, or networks</li>
                                    <li>Use the Services to transmit any malicious code, viruses, or harmful components</li>
                                    <li>Interfere with or disrupt the integrity or performance of the Services or related systems</li>
                                    <li>Collect or store personal data about other users without their consent</li>
                                    <li>Impersonate or attempt to impersonate Acumen Strategy, an Acumen Strategy employee, or any other person or entity</li>
                                    <li>Use any automated means (including robots, crawlers, or scrapers) to access or use the Services without express written permission</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">5. Intellectual Property Rights</h2>
                                <p>
                                    The Services and all content, features, and functionality thereof, including but not limited to information, software, text, graphics, logos, images, and the compilation thereof, are owned by Acumen Strategy, its licensors, or other content providers and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property laws.
                                </p>
                                <p className="mt-4">
                                    These Terms grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Services for your internal business purposes, subject to these Terms. No right, title, or interest in or to the Services or any content therein is transferred to you. Acumen Strategy reserves all rights not expressly granted herein.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">6. User Content</h2>
                                <p>
                                    Certain Services may permit you to submit, upload, or transmit content, including data, information, materials, or other submissions (&quot;User Content&quot;). You retain ownership of your User Content; however, by submitting User Content, you grant Acumen Strategy a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display such User Content solely for the purpose of providing and improving the Services.
                                </p>
                                <p className="mt-4">
                                    You represent and warrant that you own or have the necessary rights to submit User Content and that such content does not infringe upon the rights of any third party.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">7. Payment Terms</h2>
                                <p>
                                    Certain Services may require payment of fees. All fees are stated in United States dollars unless otherwise specified. You agree to pay all applicable fees in accordance with the payment terms presented to you at the time of purchase.
                                </p>
                                <p className="mt-4">
                                    Unless otherwise stated, fees are non-refundable. Acumen Strategy reserves the right to modify pricing at any time upon reasonable notice. Your continued use of paid Services after a price change constitutes acceptance of the new pricing.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">8. Confidentiality</h2>
                                <p>
                                    During the course of using our Services, you may receive or have access to confidential or proprietary information belonging to Acumen Strategy (&quot;Confidential Information&quot;). You agree to maintain the confidentiality of all Confidential Information and not to disclose such information to any third party without our prior written consent.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">9. Disclaimer of Warranties</h2>
                                <p>
                                    THE SERVICES ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, ACUMEN STRATEGY DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
                                </p>
                                <p className="mt-4">
                                    Acumen Strategy does not warrant that the Services will be uninterrupted, error-free, or completely secure. Your use of the Services is at your own risk.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">10. Limitation of Liability</h2>
                                <p>
                                    TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL ACUMEN STRATEGY, ITS DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, AFFILIATES, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR IN CONNECTION WITH YOUR ACCESS TO OR USE OF (OR INABILITY TO ACCESS OR USE) THE SERVICES.
                                </p>
                                <p className="mt-4">
                                    In no event shall Acumen Strategy&apos;s total aggregate liability to you for all claims arising out of or related to these Terms or your use of the Services exceed the greater of (i) the amounts paid by you to Acumen Strategy in the twelve (12) months preceding the claim, or (ii) one hundred United States dollars ($100.00).
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">11. Indemnification</h2>
                                <p>
                                    You agree to indemnify, defend, and hold harmless Acumen Strategy, its affiliates, and their respective officers, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys&apos; fees) arising out of or in any way connected with (i) your access to or use of the Services; (ii) your violation of these Terms; (iii) your violation of any third-party rights, including intellectual property rights; or (iv) any User Content you submit.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">12. Term and Termination</h2>
                                <p>
                                    These Terms remain in effect until terminated. Acumen Strategy may suspend or terminate your access to the Services at any time, with or without cause, with or without notice. Upon termination, your right to use the Services will immediately cease.
                                </p>
                                <p className="mt-4">
                                    All provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnification, and limitations of liability.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">13. Governing Law and Dispute Resolution</h2>
                                <p>
                                    These Terms shall be governed by and construed in accordance with the laws of the State of Illinois, without regard to its conflict of law principles. Any dispute arising out of or relating to these Terms or the Services shall be resolved exclusively in the state or federal courts located in Lake County, Illinois. You hereby consent to the personal jurisdiction of such courts.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">14. Modifications to Terms</h2>
                                <p>
                                    Acumen Strategy reserves the right to modify these Terms at any time. When we make material changes, we will notify you by posting the updated Terms on our website. Your continued use of the Services after any changes constitutes acceptance of the modified Terms. We encourage you to review these Terms periodically.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">15. Miscellaneous</h2>

                                <h3 className="text-xl font-semibold text-primary mt-6 mb-3">15.1 Entire Agreement</h3>
                                <p>
                                    These Terms, together with our Privacy Policy and any additional terms applicable to specific Services, constitute the entire agreement between you and Acumen Strategy regarding the Services and supersede all prior agreements and understandings.
                                </p>

                                <h3 className="text-xl font-semibold text-primary mt-6 mb-3">15.2 Severability</h3>
                                <p>
                                    If any provision of these Terms is held to be invalid or unenforceable, such provision shall be modified to the minimum extent necessary to make it valid and enforceable, and the remaining provisions shall continue in full force and effect.
                                </p>

                                <h3 className="text-xl font-semibold text-primary mt-6 mb-3">15.3 Waiver</h3>
                                <p>
                                    No waiver of any term or condition set forth in these Terms shall be deemed a further or continuing waiver of such term or any other term, and Acumen Strategy&apos;s failure to assert any right or provision under these Terms shall not constitute a waiver of such right or provision.
                                </p>

                                <h3 className="text-xl font-semibold text-primary mt-6 mb-3">15.4 Assignment</h3>
                                <p>
                                    You may not assign or transfer these Terms or your rights hereunder without the prior written consent of Acumen Strategy. Acumen Strategy may assign these Terms without restriction.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">16. Contact Information</h2>
                                <p>
                                    If you have any questions or concerns about these Terms, please contact us.
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
