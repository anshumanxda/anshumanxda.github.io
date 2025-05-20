"use client"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/section-header"

export default function Experience() {
  const experiences = [
    {
      company: "Fynd (Shopsense Retail Technologies Ltd.)",
      position: "SDE I",
      location: "Mumbai, Maharashtra",
      period: "July 2024 – Present",
      description: [
        "Optimized form performance by implementing data caching, reducing server calls, and enhancing overall efficiency.",
        "Translated business requirements into actionable features, ensuring they align with project goals and improve functionality.",
        "Developed and integrated reusable React components, facilitating collaboration and promoting consistency across the project by enabling peers to use them.",
      ],
    },
    {
      company: "Samespace",
      position: "SDE II - Frontend Engineer",
      location: "Mumbai, Maharashtra",
      period: "June 2023 – June 2024",
      description: [
        "Worked on an application that showcases employees' productivity with charts and integrated a leave management feature.",
        "Revamped the existing UI component by leveraging the Radix library to migrate all components to a new one, ensuring enhanced accessibility features for improved usability.",
        "Contributed to a Bot application that utilized WebSockets and WebRTC for seamless chatting and calling functionalities.",
        "Built a comprehensive video calling application using Livekit, enabling support for video, audio, and screen sharing functionalities.",
        "Assisted individuals in learning Git, aiding them in conflict resolution and teaching them how to effectively use commands like cherry pick, rebase, etc.",
      ],
    },
    {
      company: "Compose.ly, Inc",
      position: "Sr. Frontend Engineer",
      location: "Remote",
      period: "May 2022 – May 2023",
      description: [
        "Translated Figma designs into code to create UI components, ensuring pixel-perfect accuracy in their implementation.",
        "Utilized React Query to optimize API calls by implementing caching, resulting in improved performance and enhanced user experience.",
        "Implemented ChakraUI for UI components, crafting custom styles for a cohesive and visually appealing interface.",
        "Developed reusable form components and ensured mobile responsiveness, optimizing accessibility across devices.",
      ],
    },
    {
      company: "Rupyz",
      position: "Front End Engineer",
      location: "Gurugram, Haryana",
      period: "Nov 2021 – April 2022",
      description: [
        "Developed a comprehensive dashboard website for Rupyz, an Android application, to provide users with insightful data and analytics. Leveraged React.js and Redux for front-end development, ensuring a responsive and intuitive user interface.",
        "Designed and implemented a robust blog management system within the Rupyz website using CKEditor. Enabled content creators to compose and publish engaging blog posts seamlessly.",
        "Developed a business portfolio application using Next.js and Tailwind CSS, delivering a sleek and responsive user interface.",
      ],
    },
  ]

  return (
    <section id="experience" className="py-12">
      <div className="container px-4 md:px-6">
        <SectionHeader
          title="Professional Experience"
          subtitle="My professional journey and contributions in the tech industry."
        />

        <div className="space-y-8 mt-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card className="overflow-hidden card-hover-effect">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold">{exp.company}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <p className="font-medium">{exp.position}</p>
                        <p className="text-sm text-muted-foreground">
                          {exp.location} • {exp.period}
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-2 list-disc pl-5">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-sm">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
