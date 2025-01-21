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
    console.log(data)
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product created successfully" };
  },
}));

// const [state, setState] = useState([]);

export default useProductStore;
