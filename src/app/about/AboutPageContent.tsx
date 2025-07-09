"use client"

import { motion } from "framer-motion"
import { Code, Heart, Users, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function AboutPageContent() {
  const milestones = [
    {
      year: "2020",
      title: "Khởi đầu hành trình",
      description: "Bắt đầu với ý tưởng tạo ra những template website chất lượng cao",
    },
    {
      year: "2021",
      title: "Ra mắt sản phẩm đầu tiên",
      description: "Template đầu tiên được phát hành và nhận được phản hồi tích cực",
    },
    { year: "2022", title: "Mở rộng thị trường", description: "Phục vụ hơn 1000 khách hàng trên toàn quốc" },
    { year: "2023", title: "Đạt mốc 10,000 khách hàng", description: "Trở thành nền tảng template hàng đầu Việt Nam" },
    {
      year: "2024",
      title: "Tương lai tươi sáng",
      description: "Tiếp tục phát triển và mang đến những sản phẩm tốt nhất",
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Câu chuyện
              </span>
              <br />
              <span className="text-gray-800">của KQ Web</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Từ một ý tưởng đơn giản đến nền tảng template website hàng đầu Việt Nam. Hành trình của chúng tôi bắt đầu
              từ niềm đam mê tạo ra những sản phẩm chất lượng.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Image
                src="/founder-image.jpg"
                alt="Người sáng lập KQ Web"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
                priority
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Người sáng lập</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Xin chào, tôi là Quang - người sáng lập KQ Web. Với hơn 8 năm kinh nghiệm trong lĩnh vực phát triển web,
                tôi đã từng làm việc với hàng trăm dự án từ startup đến doanh nghiệp lớn.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Nhận thấy nhu cầu ngày càng tăng về những template website chất lượng cao nhưng giá cả phải chăng, tôi
                quyết định thành lập KQ Web với sứ mệnh democratize web design - làm cho thiết kế web trở nên dễ tiếp
                cận với mọi người.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">8+</div>
                  <div className="text-sm text-gray-600">Năm kinh nghiệm</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">500+</div>
                  <div className="text-sm text-gray-600">Dự án hoàn thành</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Giá trị cốt lõi</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Những nguyên tắc định hướng mọi hoạt động của chúng tôi
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Code,
                title: "Chất lượng",
                description: "Code sạch, thiết kế đẹp và hiệu suất tối ưu",
                color: "text-purple-600 bg-purple-100",
              },
              {
                icon: Heart,
                title: "Đam mê",
                description: "Yêu thích công việc và tận tâm với từng sản phẩm",
                color: "text-red-600 bg-red-100",
              },
              {
                icon: Users,
                title: "Khách hàng",
                description: "Đặt nhu cầu khách hàng lên hàng đầu",
                color: "text-blue-600 bg-blue-100",
              },
              {
                icon: Award,
                title: "Xuất sắc",
                description: "Không ngừng cải tiến và vượt qua giới hạn",
                color: "text-green-600 bg-green-100",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full border-0 shadow-lg card-hover">
                  <CardContent className="p-6">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${value.color}`}
                    >
                      <value.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Hành trình phát triển</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Những cột mốc quan trọng trong quá trình xây dựng KQ Web
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center mb-12 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                  <div className="text-2xl font-bold text-purple-600 mb-2">{milestone.year}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
                <div className="w-4 h-4 bg-purple-600 rounded-full relative z-10">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-purple-200 rounded-full -z-10"></div>
                </div>
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
