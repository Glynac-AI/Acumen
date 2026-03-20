// app/legal/sms-terms/page.tsx
'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Link from 'next/link';

export default function SMSTerms() {
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
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">SMS Terms & Conditions</h1>
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
                                <p>
                                    <strong>Acumen Strategy LLC Mobile Messaging Program</strong>
                                </p>
                                <p className="mt-4">
                                    Acumen Strategy LLC (&quot;Acumen Strategy,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates mobile messaging programs subject to these SMS Terms & Conditions. By opting in to receive SMS messages from us through our website contact forms or other capture methods, you agree to these terms.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">Program Description</h2>
                                <p>Acumen Strategy offers two separate SMS programs that users may opt into:</p>
                                <ol className="list-decimal pl-6 mt-3 space-y-2">
                                    <li><strong>Transactional SMS:</strong> If you opt in to receive transactional messages, Acumen Strategy may send service updates, appointment reminders, account notifications, support updates, billing alerts, and verification-related messages.</li>
                                    <li><strong>Marketing SMS:</strong> If you separately opt in to receive marketing messages, Acumen Strategy may send service announcements, educational updates, event invitations, and promotional offers.</li>
                                </ol>
                                <p className="mt-4">
                                    Consent to receive marketing SMS is completely optional and is not a condition of purchasing any property, goods, or services from Acumen Strategy. You may use our services without opting into our marketing SMS program.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">Message Frequency and Rates</h2>
                                <p>
                                    Message frequency varies depending on your interactions with us. Message and data rates may apply. Please check your mobile service provider plan for details on your specific text messaging and data plan.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">How to Opt-Out (STOP)</h2>
                                <p>
                                    You may opt out of receiving SMS messages from Acumen Strategy at any time by replying <strong>STOP</strong> to any text message you receive from us. After submitting a request to opt out, you will receive one final confirmation message stating that you have been unsubscribed. No further messages will be sent to your mobile device, unless initiated by you.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">How to Request Help (HELP)</h2>
                                <p>
                                    For assistance or more information regarding our SMS programs, reply <strong>HELP</strong> to any text message you receive from us. You may also contact our support team directly at <a href="mailto:info@acumen-strategy.com" className="text-accent hover:underline">info@acumen-strategy.com</a> or call us at <a href="tel:+18472300014" className="text-accent hover:underline">+1 847 230 0014</a>.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">Carrier Liability Disclaimer</h2>
                                <p>
                                    Mobile carriers (including but not limited to AT&T, T-Mobile, Verizon, etc.) are not liable for delayed or undelivered messages.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">Privacy</h2>
                                <p>
                                    We respect your privacy. We do not sell, rent, or share mobile phone numbers with third parties for their own marketing purposes. For more detailed information on how we collect and use your information, please review our <Link href="/legal/privacy" className="text-accent hover:underline">Privacy Policy</Link>.
                                </p>
                            </section>
                        </div>
                    </motion.div>
                </Container>
            </Section>
        </div>
    );
}
