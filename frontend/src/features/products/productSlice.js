import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await api.get("/products");
    return res.data;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product) => {
    const res = await api.post("/products", product);
    return res.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    await api.delete(`/products/${id}`);
    return id;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    filter: "",
  },
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
    });

    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    });
  },
});

export const { setFilter } = productSlice.actions;
export default productSlice.reducer;
