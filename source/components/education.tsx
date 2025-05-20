"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/section-header"

export default function Education() {
  return (
    <section id="education" className="py-12">
      <div className="container px-4 md:px-6">
        <SectionHeader title="Education" subtitle="My academic background and qualifications." />

        <div className="flex justify-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Card className="max-w-md card-hover-effect">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-center h-12 w-12 rounded-full bg-[#4CAF50] text-white"
                >
                  <GraduationCap className="h-6 w-6" />
                </motion.div>
                <div>
                  <CardTitle>IGNOU</CardTitle>
                  <CardDescription>New Delhi</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Bachelor of Computer Application</span>
                    <span className="text-muted-foreground">Sep. 2018 – August 2021</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Completed Bachelor's degree in Computer Applications, focusing on programming fundamentals, software
                    development, and computer systems.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
