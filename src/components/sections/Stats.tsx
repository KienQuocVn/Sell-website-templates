"use client"

import { motion } from "framer-motion"
import { Users, Download, Star, Zap } from "lucide-react"

export default function Stats() {
  const stats = [
    {
      icon: Users,
      number: "10,000+",
      label: "Khách hàng hài lòng",
      color: "text-purple-600",
    },
    {
      icon: Download,
      number: "50,000+",
      label: "Lượt tải xuống",
      color: "text-blue-600",
    },
    {
      icon: Star,
      number: "4.9/5",
      label: "Đánh giá trung bình",
      color: "text-yellow-500",
    },
    {
      icon: Zap,
      number: "99%",
      label: "Thời gian hoạt động",
      color: "text-green-600",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 ${stat.color}`}
              >
                <stat.icon className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
