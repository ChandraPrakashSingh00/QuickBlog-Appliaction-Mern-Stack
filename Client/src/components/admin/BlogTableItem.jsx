// components/admin/BlogTableItem.jsx
import React from 'react';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const BlogTableItem = ({ blogs, fetchBlogs, index }) => {
  const { title, createdAt, _id, isPublished } = blogs;
  const { axios } = useAppContext();
  const blogDate = new Date(createdAt);

  const deleteBlog = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
    if (!confirmDelete) return;

    try {
      const { data } = await axios.post('/api/blog/delete', { id: _id });
      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) fetchBlogs();
    } catch (error) {
      toast.error("Delete failed: " + error.message);
    }
  };

  const togglePublish = async () => {
    try {
      const { data } = await axios.post('/api/blog/toggle-publish', { id: _id });
      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) fetchBlogs();
    } catch (error) {
      toast.error("Publish toggle failed: " + error.message);
    }
  };

  return (
    <tr className='border-y border-gray-300'>
      <th className='px-2 py-4'>{index}</th>
      <td className='px-2 py-4'>{title}</td>
      <td className='px-2 py-4 max-sm:hidden'>{blogDate.toDateString()}</td>
      <td className='px-2 py-4 max-sm:hidden'>
        <span className={`${isPublished ? 'text-green-600' : 'text-orange-700'}`}>
          {isPublished ? 'Published' : 'Unpublished'}
        </span>
      </td>
      <td className='px-2 py-4 flex gap-3 items-center'>
        <button onClick={togglePublish} className='border px-3 py-1 rounded text-sm'>
          {isPublished ? 'Unpublish' : 'Publish'}
        </button>
        <img
          src={assets.cross_icon}
          alt="Delete"
          onClick={deleteBlog}
          className='w-6 cursor-pointer hover:scale-110 transition'
        />
      </td>
    </tr>
  );
};

export default BlogTableItem;
