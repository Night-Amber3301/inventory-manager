import { useState } from "react";
import { createProduct } from "../api/productApi";

export default function ProductForm({ refresh }: any) {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await createProduct({
      name,
      sku,
      price,
      quantity
    });

    refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h3>Add Product</h3>

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="SKU"
        onChange={(e) => setSku(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        onChange={(e) => setPrice(Number(e.target.value))}
      />

      <input
        type="number"
        placeholder="Quantity"
        onChange={(e) => setQuantity(Number(e.target.value))}
      />

      <button type="submit">Create</button>
    </form>
  );
}