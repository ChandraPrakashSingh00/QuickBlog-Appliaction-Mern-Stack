import React, { useEffect, useState } from 'react';
import { assets, dashboard_data } from '../../assets/assets';
import BlogTableItem from '../../components/admin/BlogTableItem';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';


const Dashboard = () => {

  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  });

  const { axios } = useAppContext();

const fetchDashboard = async () => {
  try {
    const { data } = await axios.get('/api/admin/dashboard');
    console.log("📊 Dashboard Response:", data); // Debugging

    if (data.success && data.dashboardData) {
      setDashboardData(data.dashboardData); // ✅ Set correct state
    } else {
      toast.error(data.message || "Dashboard data not found");
    }
  } catch (error) {
    console.error("❌ Dashboard fetch error:", error);
    toast.error(error.message || "Error fetching dashboard");
  }
};



  // ✅ Correct frontend Axios call
useEffect(() => {
  fetchDashboard();
}, []);


  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>
      {/* Cards */}
      <div className='flex flex-wrap gap-4'>
        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_1} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.blogs}</p>
            <p className='text-gray-400 font-light'>Blogs</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_2} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.comments}</p>
            <p className='text-gray-400 font-light'>Comments</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_3} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.drafts}</p>
            <p className='text-gray-400 font-light'>Drafts</p>
          </div>
        </div>
      </div>

      {/* Latest Blogs */}
      <div className='flex items-center gap-3 m-4 mt-6 text-gray-600'>
        <img src={assets.dashboard_icon_4} alt="" />
        <p>Latest Blog</p>
      </div>

      <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-gray-600 text-left uppercase'>
            <tr>
              <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
              <th scope='col' className='px-2 py-4'>Blog Title</th>
              <th scope='col' className='px-2 py-4 max-sm:hidden'>Date</th>
              <th scope='col' className='px-2 py-4 max-sm:hidden'>Status</th>
              <th scope='col' className='px-2 py-4'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.recentBlogs.map((blog, index) => (
              <BlogTableItem key={blog._id} blogs={blog} fetchBlogs={fetchDashboard} index={index + 1} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
