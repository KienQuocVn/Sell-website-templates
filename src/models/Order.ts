import mongoose, { type Document, Schema } from "mongoose"

export interface IOrderItem {
  productId: string
  title: string
  price: number
  thumbnail: string
}

export interface IOrder extends Document {
  _id: string
  userId?: string
  customerInfo: {
    name: string
    email: string
    phone?: string
  }
  items: IOrderItem[]
  totalAmount: number
  status: "pending" | "completed" | "cancelled" | "refunded"
  paymentMethod: "bank_transfer" | "momo" | "zalopay" | "credit_card"
  paymentStatus: "pending" | "paid" | "failed"
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const OrderSchema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    customerInfo: {
      name: {
        type: String,
        required: [true, "Tên khách hàng là bắt buộc"],
        trim: true,
      },
      email: {
        type: String,
        required: [true, "Email khách hàng là bắt buộc"],
        lowercase: true,
      },
      phone: {
        type: String,
        trim: true,
      },
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        thumbnail: {
          type: String,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: [true, "Tổng tiền là bắt buộc"],
      min: [0, "Tổng tiền không được âm"],
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled", "refunded"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["bank_transfer", "momo", "zalopay", "credit_card"],
      required: [true, "Phương thức thanh toán là bắt buộc"],
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    notes: {
      type: String,
      maxlength: [500, "Ghi chú không được vượt quá 500 ký tự"],
    },
  },
  {
    timestamps: true,
  },
)

// Create indexes
OrderSchema.index({ userId: 1 })
OrderSchema.index({ status: 1 })
OrderSchema.index({ createdAt: -1 })

export default mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema)
