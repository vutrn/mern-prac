import { create } from "zustand";

const useProductStore = create((set) => ({
  products: [], // initial state
  setProduct: (products) => set({ products }), // action

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "All fields are required" };
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    console.log("Create product response:", data);
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: data.message };
  },

  fetchProduct: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },

  deleteProduct: async (id) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    console.log("response:", res);
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({ products: state.products.filter((value) => value._id !== id) })); // remove the product then rerender the component
    return { success: true, message: data.message };
  },

  updateProduct: async (id, updatedProduct) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    console.log("update response data:", data);
    if (!data.success) return { success: false, message: data.message };

    // update the product then rerender the component
    set((state) => ({
      products: state.products.map((value) => (value._id === id ? data.data : value)),
    }));
    return { success: true, message: data.message };
  },
}));

// const [state, setState] = useState([]);

export default useProductStore;
