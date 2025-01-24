import mongoose, { Schema } from "mongoose";

const ItemSchema = new Schema({
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  quantity: { type: Number, required: true },
});

const OrderSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  Address: { type: String },
  DeliveryaDate: { type: Date },
  items: { type: [ItemSchema], required: true },
  status: {
    type: String,
    enum: [
      "Order Placed",
      "Shipping",
      "Out For Delivery",
      "Delivered",
      "Cancelled",
    ],
    default: "Order Placed",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updateAd: { type: Date, default: Date.now },
});
export const User = mongoose.model("Order", OrderSchema);
