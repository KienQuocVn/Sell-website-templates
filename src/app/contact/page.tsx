"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
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
                Liên hệ
              </span>
              <br />
              <span className="text-gray-800">với chúng tôi</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Có câu hỏi hoặc cần hỗ trợ? Chúng tôi luôn sẵn sàng lắng nghe và giúp đỡ bạn.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Card className="border-0 shadow-2xl">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Gửi tin nhắn</h2>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên *</label>
                        <Input placeholder="Nhập họ và tên của bạn" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                        <Input type="email" placeholder="your@email.com" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                      <Input placeholder="Số điện thoại của bạn" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Chủ đề *</label>
                      <Input placeholder="Chủ đề tin nhắn" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung *</label>
                      <Textarea placeholder="Mô tả chi tiết nhu cầu hoặc câu hỏi của bạn..." rows={6} />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      <Send className="mr-2 h-4 w-4" />
                      Gửi tin nhắn
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Thông tin liên hệ</h2>
                <p className="text-gray-600 mb-8">
                  Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ qua các kênh dưới đây hoặc gửi tin nhắn trực tiếp.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    title: "Email",
                    content: "contact@kqweb.dev",
                    description: "Gửi email cho chúng tôi bất cứ lúc nào",
                    color: "text-purple-600 bg-purple-100",
                  },
                  {
                    icon: Phone,
                    title: "Điện thoại",
                    content: "+84 123 456 789",
                    description: "Gọi điện trong giờ hành chính",
                    color: "text-blue-600 bg-blue-100",
                  },
                  {
                    icon: MapPin,
                    title: "Địa chỉ",
                    content: "Hà Nội, Việt Nam",
                    description: "Văn phòng chính của chúng tôi",
                    color: "text-green-600 bg-green-100",
                  },
                  {
                    icon: Clock,
                    title: "Giờ làm việc",
                    content: "8:00 - 18:00",
                    description: "Thứ 2 - Thứ 6 (trừ ngày lễ)",
                    color: "text-orange-600 bg-orange-100",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-0 shadow-lg card-hover">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div
                            className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${item.color}`}
                          >
                            <item.icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                            <p className="text-lg font-medium text-gray-800 mb-1">{item.content}</p>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Map Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <Card className="border-0 shadow-lg overflow-hidden">
                  <div className="h-64 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                      <p className="text-gray-600">Bản đồ vị trí văn phòng</p>
                      <p className="text-sm text-gray-500 mt-2">Hà Nội, Việt Nam</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Câu hỏi thường gặp</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Những câu hỏi phổ biến từ khách hàng</p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Tôi có thể sử dụng template cho dự án thương mại không?",
                answer:
                  "Có, tất cả template của chúng tôi đều có license thương mại. Bạn có thể sử dụng cho các dự án cá nhân và thương mại.",
              },
              {
                question: "Có hỗ trợ kỹ thuật sau khi mua không?",
                answer:
                  "Chúng tôi cung cấp hỗ trợ kỹ thuật trong 6 tháng sau khi mua. Bạn có thể liên hệ qua email hoặc hệ thống ticket.",
              },
              {
                question: "Template có responsive trên mobile không?",
                answer:
                  "Tất cả template đều được thiết kế responsive, tương thích với mọi thiết bị từ desktop đến mobile.",
              },
              {
                question: "Tôi có thể tùy chỉnh template theo ý muốn không?",
                answer: "Hoàn toàn có thể. Template được cung cấp source code đầy đủ để bạn tùy chỉnh theo nhu cầu.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
