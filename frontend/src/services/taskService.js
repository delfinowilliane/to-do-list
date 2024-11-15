const API_URL = "http://localhost:8080/api/tasks";

export const taskService = {
  getTasks: async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        console.error("Failed to fetch tasks:", response.statusText);
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
  },

  createTask: async (task) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        console.error("Failed to create task:", response.statusText);
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  },

  updateTask: async (id, task) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        console.error("Failed to delete task:", response.statusText);
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  },
};
