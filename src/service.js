import axios from 'axios';

const apiUrl = "http://localhost:5102"
axios.defaults.baseURL = apiUrl;

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.error('Interceptor error:', error);
    return Promise.reject(error);
  }
);

export default {
  getTasks: async () => {
    const result = await axios.get(`/items`)    
    return result.data;
  },

  addTask: async(name)=>{
    const result = await axios.post(`/`, { name: name, isComplete: false})
    return {};
  },

  setCompleted: async (todo, isComplete) => {
    try {
      const result = await axios.put(`/${todo.id}`, { name: todo.name, isComplete });
      return result.data;
    } catch (ex) {
      console.error('Error updating item:', ex.toString());
      throw ex;
    }
  },

  deleteTask:async(id)=>{
    await axios.delete(`/${id}`)
  }
};
