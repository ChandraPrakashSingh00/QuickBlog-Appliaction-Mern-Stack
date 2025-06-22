import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// ✅ Set base URL from env or fallback
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

// ✅ Create Context
const AppContext = createContext();

// ✅ Provider Component
const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  // ✅ Global States
  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState('');

  // ✅ Fetch all blogs from server
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('/api/blog/all');
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to fetch blogs');
    }
  };

  // ✅ Initialize on app load
  useEffect(() => {
    fetchBlogs();

    const storedToken = localStorage.getItem('token'); // ✅ Fixed typo here
    if (storedToken) {
      setToken(storedToken);
      axios.defaults.headers.common['Authorization'] = storedToken;
    }
  }, []);

  // ✅ All global values
  const value = {
    axios,
    navigate,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
    refreshBlogs: fetchBlogs, // ✅ Expose for dashboard/blog page
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// ✅ Export hook
const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };
