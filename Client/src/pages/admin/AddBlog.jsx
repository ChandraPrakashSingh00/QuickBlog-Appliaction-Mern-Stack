import React, { useEffect, useRef, useState } from 'react';
import { assets, blogCategories } from '../../assets/assets';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';
import { parse } from 'marked';

const AddBlog = () => {


  const { axios } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState(blogCategories[0]);
  const [isPublished, setIsPublished] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const generateContent = async () => {
    if (!title.trim()) return toast.error("Please enter a title");

    try {
      setLoading(true);
      const { data } = await axios.post('/api/blog/generate', { prompt: title.trim() });

      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content);
        toast.success("AI content generated");
      } else {
        toast.error(data.message || "Failed to generate content");
      }
    } catch (error) {
      toast.error(error.message || "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsAdding(true);

    try {
      const description = quillRef.current.root.innerHTML;

      const blog = {
        title,
        subtitle,
        description,
        category,
        isPublished,
      };

      const formData = new FormData();
      formData.append('blog', JSON.stringify(blog));
      formData.append('image', image);

      const { data } = await axios.post('/api/blog/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data.success) {
        toast.success(data.message);
        setImage(null);
        setTitle('');
        setSubtitle('');
        setCategory(blogCategories[0]);
        setIsPublished(false);
        quillRef.current.root.innerHTML = '';
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write your blog description here...',
      });
    }
  }, []);

  return (
    <form onSubmit={onSubmitHandler} className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll">
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
        {/* Upload Thumbnail */}
        <p>Upload Thumbnail</p>
        <label htmlFor="image">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt="Upload"
            className="mt-2 h-16 rounded cursor-pointer object-cover"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            required
            hidden
          />
        </label>

        {/* Blog Title */}
        <p className="mt-4">Blog Title</p>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          placeholder="Type Here"
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
        />

        {/* Sub Title */}
        <p className="mt-4">Sub Title</p>
        <input
          onChange={(e) => setSubtitle(e.target.value)}
          value={subtitle}
          type="text"
          placeholder="Type Here"
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
        />

        {/* Blog Description */}
        <p className="mt-4">Blog Description</p>
        <div className="max-w-lg min-h-[200px] pb-16 sm:pb-10 pt-2 relative">
          <div
            ref={editorRef}
            className="border border-gray-300 rounded p-2 bg-white h-60 overflow-y-auto"
          ></div>
          <button
            disabled={loading}
            type="button"
            onClick={generateContent}
            className="absolute bottom-2 right-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline"
          >
            {loading ? 'Generating...' : 'Generate With AI'}
          </button>
        </div>

        {/* Blog Category */}
        <p className="mt-4">Blog Category</p>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded"
        >
          <option value="">Select Category</option>
          {blogCategories.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>

        {/* Publish Checkbox */}
        <div className="flex gap-2 mt-4 items-center">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="scale-125 cursor-pointer"
          />
          <p>Publish Now</p>
        </div>

        {/* Submit Button */}
        <button
          disabled={isAdding}
          className="w-40 h-10 mt-8 bg-primary text-white rounded cursor-pointer text-sm"
          type="submit"
        >
          {isAdding ? 'Adding...' : 'Add Blog'}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
