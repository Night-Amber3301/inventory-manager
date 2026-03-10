import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../api/productApi";
import ProductForm from "../components/ProductForm";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container">

      <h1>Inventory Management</h1>

      {/* Add Product Card */}
      <div className="card">
        <ProductForm refresh={fetchProducts} />
      </div>

      {/* Products Table Card */}
      <div className="card">
        <h3>Products</h3>

        <table border={1}>
          <thead>
            <tr>
              <th>Name</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p: any) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.sku}</td>
                <td>{p.price}</td>
                <td>{p.quantity}</td>

                <td>
                  <button onClick={() => handleDelete(p.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}