"use client";

import { motion } from "framer-motion";
import GuyAtComputer from "@/components/GuyAtComputer";
import SectionLabel from "@/components/SectionLabel";

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full px-6 md:px-12 py-32"
    >
      <div className="max-w-7xl mx-auto">
        <SectionLabel number="01" name="ABOUT" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-7xl mx-auto items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="order-2 md:order-1"
        >
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-balance">
            Curious by nature,{" "}
            <span className="text-accent">builder by choice</span>.
          </h2>
          <p className="text-foreground/85 text-base md:text-lg leading-relaxed mb-4">
            I&apos;m Binay Siwakoti — currently studying for a{" "}
            <span className="text-foreground">Bachelor of IT</span> at{" "}
            <span className="text-foreground">Charles Darwin University</span>,
            and a self-taught tech enthusiast who genuinely enjoys taking
            things apart to understand how they work. I write across HTML,
            CSS, JavaScript, Java, VB.NET, C, C++, and Python.
          </p>
          <p className="text-foreground/85 text-base md:text-lg leading-relaxed">
            My current rabbit holes: building things on the web, exploring
            cybersecurity, and getting deeper into computer networking. Always
            learning, always shipping.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {["Student", "Tech Enthusiast", "Coder", "Always Learning"].map(
              (t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] tracking-[0.25em] px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-foreground/80"
                >
                  {t.toUpperCase()}
                </span>
              ),
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="flex justify-center order-1 md:order-2"
        >
          <GuyAtComputer size={500} />
        </motion.div>
      </div>
    </section>
  );
}
