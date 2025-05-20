"use client";
import { ArrowRight, Github, Linkedin, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="py-12 md:py-20 lg:mt-40">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Anshuman Pathak{" "}
              <span className="text-muted-foreground">— Frontend Engineer</span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-[700px] mx-auto"
            >
              Passionate frontend engineer with expertise in React, Redux, and
              Next.js. Building beautiful, responsive, and accessible web
              applications.
            </motion.p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-4 mt-8 items">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Link
                href="#contact"
                className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                Contact Me
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex gap-4"
            >
              <a
                href="https://linkedin.com/in/anshumanxda"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90 transition-all hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/anshumanxda"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#24292e] text-white hover:bg-[#24292e]/90 transition-all hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:anshumanpathak4@gmail.com"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#EA4335] text-white hover:bg-[#EA4335]/90 transition-all hover:scale-110"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
