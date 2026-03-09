import { create } from "zustand";

const useCourseStore = create((set, get) => ({
  courses: [],
  setCourses: (courses) => set({ courses }),

  addCourse: async (course) => {
    const res = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course),
    });
    const savedCourse = await res.json();
    set({ courses: [savedCourse, ...get().courses] });
  },

  updateCourse: async (id, updates) => {
    const res = await fetch("/api/courses", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updates }),
    });
    const updatedCourse = await res.json();
    set({
      courses: get().courses.map((c) => (c._id === id ? updatedCourse : c)),
    });
  },

  removeCourse: async (id) => {
    await fetch("/api/courses", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: [id] }),
    });
    set({ courses: get().courses.filter((c) => c._id !== id) });
  },

  removeCourses: async (ids) => {
    await fetch("/api/courses", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    });
    set({ courses: get().courses.filter((c) => !ids.includes(c._id)) });
  },

  fetchCourses: async () => {
    const res = await fetch("/api/courses");
    const data = await res.json();
    set({ courses: data });
  },
}));

export default useCourseStore;