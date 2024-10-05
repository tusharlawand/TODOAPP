import axiosInstance from './axiosInstance';

// Fetch all todos
export const fetchData = () => {
  return axiosInstance.get('todos'); // Ensure this endpoint matches your API
};

// Post new data to create a todo
export const postData = (data) => {
  return axiosInstance.post('todos', data); // Update to the correct endpoint
};

// Example of fetching a single todo by ID
export const fetchTodoById = (id) => {
  return axiosInstance.get(`todos/${id}`);
};

// Example of updating an existing todo
export const updateTodo = (id, data) => {
  return axiosInstance.put(`todos/${id}`, data);
};

// Example of deleting a todo
export const deleteTodo = (id) => {
  return axiosInstance.delete(`todos/${id}`);
};
