// src/components/home/HeroSection.tsx
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

const HeroSection = () => {
    const containerRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorHovering, setCursorHovering] = useState(false);

    // Parallax effect
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Cursor follower
    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            setMousePosition({ x: clientX, y: clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const springConfig = { damping: 30, stiffness: 150 };
    const cursorX = useSpring(mousePosition.x, springConfig);
    const cursorY = useSpring(mousePosition.y, springConfig);

    // Wave animation
    const [wavePaused, setWavePaused] = useState(false);
    const toggleWaveAnimation = () => setWavePaused(!wavePaused);

    return (
        <section
            ref={containerRef}
            className="relative min-h-[110vh] w-full overflow-hidden bg-white"
            onMouseEnter={() => setCursorHovering(true)}
            onMouseLeave={() => setCursorHovering(false)}
        >
            {/* Custom cursor follower */}
            <AnimatePresence>
                {cursorHovering && (
                    <motion.div
                        className="fixed top-0 left-0 z-50 pointer-events-none mix-blend-difference"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            x: cursorX,
                            y: cursorY,
                            translateX: "-50%",
                            translateY: "-50%"
                        }}
                    >
                        <div className="w-5 h-5 rounded-full bg-white backdrop-invert"></div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient background */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-[#f5f8ff] to-white"
                    style={{
                        y: backgroundY,
                        scale: backgroundScale
                    }}
                />

                {/* Dynamic wave background */}
                <div className="absolute inset-0 opacity-[0.07]">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <motion.path
                            d="M-114,800L-114,291.8C-38,250.7,38,209.5,114,203.2C190,196.8,266,225.3,342,225.3C418,225.3,494,196.8,570,196.2C646,195.5,722,222.7,798,237.3C874,252,950,254.2,1026,248.3C1102,242.5,1178,228.7,1254,222.7C1330,216.7,1406,218.5,1482,222.2C1558,225.8,1634,231.3,1710,235.7C1786,240,1862,243.2,1938,235.7C2014,228.2,2090,210,2166,210.2C2242,210.3,2318,228.8,2394,240.8C2470,252.8,2546,258.3,2622,246C2698,233.7,2774,203.5,2850,208.2C2926,212.8,3002,252.3,3078,268.8C3154,285.3,3230,278.8,3306,276.8C3382,274.8,3458,277.3,3534,277.3C3610,277.3,3686,274.8,3724,273.5L3762,272.2L3762,800L3724,800C3686,800,3610,800,3534,800C3458,800,3382,800,3306,800C3230,800,3154,800,3078,800C3002,800,2926,800,2850,800C2774,800,2698,800,2622,800C2546,800,2470,800,2394,800C2318,800,2242,800,2166,800C2090,800,2014,800,1938,800C1862,800,1786,800,1710,800C1634,800,1558,800,1482,800C1406,800,1330,800,1254,800C1178,800,1102,800,1026,800C950,800,874,800,798,800C722,800,646,800,570,800C494,800,418,800,342,800C266,800,190,800,114,800C38,800,-38,800,-76,800L-114,800Z"
                            fill="#4F6BFF"
                            animate={wavePaused ? {} : {
                                d: [
                                    "M-114,800L-114,291.8C-38,250.7,38,209.5,114,203.2C190,196.8,266,225.3,342,225.3C418,225.3,494,196.8,570,196.2C646,195.5,722,222.7,798,237.3C874,252,950,254.2,1026,248.3C1102,242.5,1178,228.7,1254,222.7C1330,216.7,1406,218.5,1482,222.2C1558,225.8,1634,231.3,1710,235.7C1786,240,1862,243.2,1938,235.7C2014,228.2,2090,210,2166,210.2C2242,210.3,2318,228.8,2394,240.8C2470,252.8,2546,258.3,2622,246C2698,233.7,2774,203.5,2850,208.2C2926,212.8,3002,252.3,3078,268.8C3154,285.3,3230,278.8,3306,276.8C3382,274.8,3458,277.3,3534,277.3C3610,277.3,3686,274.8,3724,273.5L3762,272.2L3762,800L3724,800C3686,800,3610,800,3534,800C3458,800,3382,800,3306,800C3230,800,3154,800,3078,800C3002,800,2926,800,2850,800C2774,800,2698,800,2622,800C2546,800,2470,800,2394,800C2318,800,2242,800,2166,800C2090,800,2014,800,1938,800C1862,800,1786,800,1710,800C1634,800,1558,800,1482,800C1406,800,1330,800,1254,800C1178,800,1102,800,1026,800C950,800,874,800,798,800C722,800,646,800,570,800C494,800,418,800,342,800C266,800,190,800,114,800C38,800,-38,800,-76,800L-114,800Z",
                                    "M-114,800L-114,272.8C-38,262.1,38,251.3,114,245.5C190,239.7,266,238.8,342,228.3C418,217.8,494,197.7,570,203.8C646,210,722,242.5,798,254C874,265.5,950,256,1026,248.8C1102,241.7,1178,236.8,1254,239.5C1330,242.2,1406,252.3,1482,252.3C1558,252.3,1634,242.2,1710,238C1786,233.8,1862,235.7,1938,240.8C2014,246,2090,254.5,2166,254.5C2242,254.5,2318,246,2394,230.3C2470,214.7,2546,191.8,2622,193.3C2698,194.8,2774,220.7,2850,231.2C2926,241.7,3002,236.8,3078,232C3154,227.2,3230,222.3,3306,227.8C3382,233.3,3458,249.2,3534,255.3C3610,261.5,3686,258,3724,256.2L3762,254.3L3762,800L3724,800C3686,800,3610,800,3534,800C3458,800,3382,800,3306,800C3230,800,3154,800,3078,800C3002,800,2926,800,2850,800C2774,800,2698,800,2622,800C2546,800,2470,800,2394,800C2318,800,2242,800,2166,800C2090,800,2014,800,1938,800C1862,800,1786,800,1710,800C1634,800,1558,800,1482,800C1406,800,1330,800,1254,800C1178,800,1102,800,1026,800C950,800,874,800,798,800C722,800,646,800,570,800C494,800,418,800,342,800C266,800,190,800,114,800C38,800,-38,800,-76,800L-114,800Z",
                                    "M-114,800L-114,322.5C-38,303.5,38,284.5,114,270.7C190,256.8,266,248,342,245C418,242,494,244.8,570,237.3C646,229.8,722,212,798,209.2C874,206.3,950,218.5,1026,225.2C1102,231.8,1178,233,1254,229.5C1330,226,1406,217.8,1482,213.3C1558,208.8,1634,208,1710,211C1786,214,1862,220.8,1938,223.5C2014,226.2,2090,224.7,2166,227.2C2242,229.7,2318,236.2,2394,240.8C2470,245.5,2546,248.3,2622,246.8C2698,245.3,2774,239.5,2850,231.3C2926,223.2,3002,212.7,3078,207.8C3154,203,3230,204,3306,212C3382,220,3458,235,3534,235C3610,235,3686,220,3724,212.5L3762,205L3762,800L3724,800C3686,800,3610,800,3534,800C3458,800,3382,800,3306,800C3230,800,3154,800,3078,800C3002,800,2926,800,2850,800C2774,800,2698,800,2622,800C2546,800,2470,800,2394,800C2318,800,2242,800,2166,800C2090,800,2014,800,1938,800C1862,800,1786,800,1710,800C1634,800,1558,800,1482,800C1406,800,1330,800,1254,800C1178,800,1102,800,1026,800C950,800,874,800,798,800C722,800,646,800,570,800C494,800,418,800,342,800C266,800,190,800,114,800C38,800,-38,800,-76,800L-114,800Z"
                                ],
                                transition: {
                                    duration: 20,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut"
                                }
                            }}
                        />
                    </svg>
                </div>

                {/* Subtle grain texture */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }} />
            </div>

            {/* Floating elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Floating circle */}
                <motion.div
                    className="absolute top-[15%] right-[10%] w-64 h-64 rounded-full border border-[#4F6BFF]/10"
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, 0],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                />

                {/* Floating rectangle */}
                <motion.div
                    className="absolute bottom-[25%] left-[15%] w-40 h-40 border border-[#4F6BFF]/10 rounded-xl"
                    animate={{
                        y: [0, 15, 0],
                        rotate: [0, -3, 0],
                        scale: [1, 1.03, 1]
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: 2
                    }}
                />

                {/* Gradient orb */}
                <motion.div
                    className="absolute top-[35%] left-[20%] w-32 h-32 rounded-full bg-gradient-to-br from-[#4F6BFF]/10 to-transparent blur-xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                />
            </div>

            {/* Content layer */}
            <div className="relative h-screen flex flex-col justify-center items-center">
                <motion.div
                    className="container mx-auto px-4 text-center"
                    style={{ opacity: contentOpacity }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h1 className="text-[clamp(3rem,8vw,6.5rem)] leading-[1.1] font-display tracking-[-0.03em] text-[#0A2540]">
                            <span className="font-light block">Connecting elite</span>
                            <motion.span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-[#4F6BFF] to-[#4F6BFF]/80 font-normal inline-block relative"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                                onMouseEnter={toggleWaveAnimation}
                                onMouseLeave={toggleWaveAnimation}
                            >
                                talent
                            </motion.span>
                            <span className="font-light"> with purpose</span>
                        </h1>

                        <motion.p
                            className="mt-8 text-xl md:text-2xl text-[#505c6e] max-w-2xl mx-auto leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            A sophisticated recruiting solution for wealth management firms.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                    >
                        <motion.a
                            href="/contact"
                            className="group relative overflow-hidden rounded-full bg-[#4F6BFF] px-8 py-4 text-white shadow-lg"
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.2 }}
                        >
                            <span className="relative z-10 text-base font-medium tracking-wide">Schedule a consultation</span>
                            <motion.span
                                className="absolute inset-0 bg-gradient-to-r from-[#4F6BFF] to-[#4F6BFF]/80"
                                initial={{ x: "100%" }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.4 }}
                            />
                        </motion.a>

                        <motion.a
                            href="/services"
                            className="group relative rounded-full border border-[#E5E7EB] px-8 py-4 text-[#0A2540] hover:border-[#4F6BFF]/30 transition-colors"
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.2 }}
                        >
                            <span className="text-base font-medium tracking-wide">Explore our services</span>
                        </motion.a>
                    </motion.div>

                    <motion.div
                        className="mt-20 flex items-center justify-center gap-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                    >
                        <div className="text-center">
                            <div className="text-5xl font-light text-[#0A2540]">2,000<span className="text-[#4F6BFF]">+</span></div>
                            <div className="mt-2 text-sm text-[#505c6e] uppercase tracking-wider">Pre-screened candidates</div>
                        </div>

                        <div className="h-10 w-px bg-gradient-to-b from-transparent via-[#E5E7EB] to-transparent"></div>

                        <div className="text-center">
                            <div className="text-5xl font-light text-[#0A2540]">7-14</div>
                            <div className="mt-2 text-sm text-[#505c6e] uppercase tracking-wider">Days average time-to-hire</div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                >
                    <motion.div
                        className="w-8 h-12 rounded-full border-2 border-[#4F6BFF]/30 flex items-center justify-center"
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
                    >
                        <motion.div
                            className="w-1.5 h-3 rounded-full bg-[#4F6BFF]"
                            animate={{
                                y: [0, 5, 0],
                                opacity: [1, 0.5, 1]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "loop"
                            }}
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;