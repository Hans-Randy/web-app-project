import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
    imageId: { type: mongoose.Schema.Types.ObjectId, ref: "productImages" },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;