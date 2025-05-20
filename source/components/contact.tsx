"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Linkedin, Github } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";

export default function Contact() {
  return (
    <section id="contact" className="py-12">
      <div className="container px-4 md:px-6">
        <SectionHeader
          title="Get In Touch"
          subtitle="Have a project in mind or want to discuss opportunities? Feel free to reach out!"
        />

        <div className="grid gap-8 md:grid-cols-2 mt-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Card className="card-hover-effect h-full">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Feel free to reach out through any of these channels.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-center h-9 w-9 rounded-full bg-[#EA4335] text-white">
                    <Mail className="h-5 w-5" />
                  </div>
                  <a
                    href="mailto:anshumanpathak4@gmail.com"
                    className="hover:underline hover:text-primary transition-colors"
                  >
                    anshumanpathak4@gmail.com
                  </a>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-center h-9 w-9 rounded-full bg-[#0A66C2] text-white">
                    <Linkedin className="h-5 w-5" />
                  </div>
                  <a
                    href="https://linkedin.com/in/anshumanxda"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-primary transition-colors"
                  >
                    linkedin.com/in/anshumanxda
                  </a>
                </motion.div>
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-center h-9 w-9 rounded-full bg-[#24292e] text-white">
                    <Github className="h-5 w-5" />
                  </div>
                  <a
                    href="https://github.com/anshumanxda"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-primary transition-colors"
                  >
                    github.com/anshumanxda
                  </a>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Card className="card-hover-effect">
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and I'll get back to you as soon as
                  possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Input
                        id="name"
                        placeholder="Your Name"
                        className="transition-all focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your Email"
                        className="transition-all focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Input
                      id="subject"
                      placeholder="Subject"
                      className="transition-all focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Textarea
                      id="message"
                      placeholder="Your Message"
                      className="min-h-[120px] transition-all focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button className="w-full transition-all hover:scale-[1.02]">
                  Send Message
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
