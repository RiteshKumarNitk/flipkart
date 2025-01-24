import mongoose, { Schema } from "mongoose";

const TransactionSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  paymentId:{type:String, required:true},
  orderId:{type:String, required:true},
  status: {
    type: String,
    enum: [
      "Success",
      "Failed",
      "Pending",
    ],
    required: true,
  },
  amount:{type:Number, required:true},
  createdAt: { type: Date, default: Date.now },
  updateAd: { type: Date, default: Date.now },
});
export const User = mongoose.model("Transaction", TransactionSchema);
