import mongoose, { type Document, Schema } from "mongoose"

export interface IContact extends Document {
  _id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: "new" | "read" | "replied"
  createdAt: Date
  updatedAt: Date
}

const ContactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: [true, "Tên là bắt buộc"],
      trim: true,
      maxlength: [50, "Tên không được vượt quá 50 ký tự"],
    },
    email: {
      type: String,
      required: [true, "Email là bắt buộc"],
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Email không hợp lệ"],
    },
    phone: {
      type: String,
      trim: true,
    },
    subject: {
      type: String,
      required: [true, "Chủ đề là bắt buộc"],
      trim: true,
      maxlength: [100, "Chủ đề không được vượt quá 100 ký tự"],
    },
    message: {
      type: String,
      required: [true, "Nội dung tin nhắn là bắt buộc"],
      maxlength: [1000, "Tin nhắn không được vượt quá 1000 ký tự"],
    },
    status: {
      type: String,
      enum: ["new", "read", "replied"],
      default: "new",
    },
  },
  {
    timestamps: true,
  },
)

// Create indexes
ContactSchema.index({ status: 1 })
ContactSchema.index({ createdAt: -1 })

export default mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema)
