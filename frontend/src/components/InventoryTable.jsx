import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  setFilter,
  deleteProduct,
} from "../features/products/productSlice";

export default function InventoryTable() {
  const dispatch = useDispatch();
  const { items, filter } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredItems = items.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <h2>Inventory</h2>

      <input
        placeholder="Filter products"
        onChange={(e) => dispatch(setFilter(e.target.value))}
      />

      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Name</th>
            <th>Stock</th>
            <th>Unit Price</th>
            <th>Monthly Sales</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredItems.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.current_stock}</td>
              <td>{p.unit_price}</td>
              <td>{p.monthly_sales.join(", ")}</td>
              <td>
                <button
                  onClick={() => dispatch(deleteProduct(p.id))}
                  style={{
                    color: "white",
                    backgroundColor: "red",
                    border: "none",
                    padding: "4px 8px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
