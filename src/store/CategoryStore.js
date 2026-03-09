import { create } from "zustand";

const useCategoryStore = create((set, get) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),

  addCategory: async (category) => {
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });
    const saved = await res.json();
    set({ categories: [saved, ...get().categories] });
  },

  updateCategory: async (id, updates) => {
    const res = await fetch("/api/categories", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updates }),
    });
    const updated = await res.json();
    set({
      categories: get().categories.map((c) => (c._id === id ? updated : c)),
    });
  },

  removeCategory: async (id) => {
    await fetch("/api/categories", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: [id] }),
    });
    set({ categories: get().categories.filter((c) => c._id !== id) });
  },

  removeCategories: async (ids) => {
    await fetch("/api/categories", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    });
    set({ categories: get().categories.filter((c) => !ids.includes(c._id)) });
  },

  fetchCategories: async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    set({ categories: data });
  },
}));

export default useCategoryStore;
