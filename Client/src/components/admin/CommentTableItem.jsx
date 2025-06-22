import React from 'react';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';

const CommentTableItem = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id, name, content, isApproved } = comment;
  const formattedDate = new Date(createdAt).toLocaleDateString();

  const { axios } = useAppContext();

  const approveComment = async () => {
    try {
      const res = await axios.post('/api/admin/approve-comment', { id: _id });
      if (res.data.success) {
        toast.success(res.data.message || 'Comment approved!');
        fetchComments();
      } else {
        toast.error(res.data.message || 'Approval failed');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const deleteComment = async () => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this comment?');
      if (!confirm) return;

      const res = await axios.post('/api/admin/delete-comment', { id: _id });
      if (res.data.success) {
        toast.success(res.data.message || 'Comment deleted!');
        fetchComments();
      } else {
        toast.error(res.data.message || 'Deletion failed');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <tr className="border-b border-gray-300">
      <td className="px-6 py-4">
        <b className="font-medium text-gray-600">Blog</b>: {blog?.title || <span className="text-red-500">[Deleted]</span>}
        <br /><br />
        <b className="font-medium text-gray-600">Name</b>: {name}
        <br />
        <b className="font-medium text-gray-600">Content</b>: {content}
      </td>

      <td className="px-6 py-4 max-sm:hidden">{formattedDate}</td>

      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">
          {!isApproved ? (
            <img
              onClick={approveComment}
              src={assets.tick_icon}
              alt="Approve"
              className="w-5 hover:scale-110 transition-all cursor-pointer"
            />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 px-3 rounded-full py-1">
              Approved
            </p>
          )}
          <img
            onClick={deleteComment}
            src={assets.bin_icon}
            alt="Delete"
            className="w-5 hover:scale-110 transition-all cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
