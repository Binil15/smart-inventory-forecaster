import { useDispatch } from "react-redux";
import { addProduct } from "../features/products/productSlice";
import { useState } from "react";

export default function AddProductForm() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    unit_price: "",
    current_stock: "",
    monthly_sales: "",
  });

  const submit = () => {
    dispatch(
      addProduct({
        name: form.name,
        unit_price: Number(form.unit_price),
        current_stock: Number(form.current_stock),
        monthly_sales: form.monthly_sales
          .split(",")
          .map((n) => Number(n.trim())),
      })
    );

    setForm({
      name: "",
      unit_price: "",
      current_stock: "",
      monthly_sales: "",
    });
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      <h3>Add Product</h3>

      <input
        className="gradient-input"
        placeholder="Product Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        className="gradient-input"
        type="number"
        placeholder="Unit Price"
        value={form.unit_price}
        onChange={(e) =>
          setForm({ ...form, unit_price: e.target.value })
        }
      />

      <input
        className="gradient-input"
        type="number"
        placeholder="Current Stock"
        value={form.current_stock}
        onChange={(e) =>
          setForm({ ...form, current_stock: e.target.value })
        }
      />

      <input
        className="gradient-input"
        placeholder="Monthly Sales (e.g. 10, 20, 30)"
        value={form.monthly_sales}
        onChange={(e) =>
          setForm({ ...form, monthly_sales: e.target.value })
        }
      />

      <button className="primary-btn" onClick={submit}>
        Add Product
      </button>
    </div>
  );
}
