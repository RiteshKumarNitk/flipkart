import mongoose, { Schema } from "mongoose";

const ItemSchema = new Schema({
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  quantity: { type: Number, required: true },
});

const OrderSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  address: { type: String },  // Fixed case
  deliveryDate: { type: Date },  // Fixed typo
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
  updatedAt: { type: Date, default: Date.now }, // Fixed typo
});

// Prevent model overwrite error
const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
