import React, { useRef } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Header = () => {
  const { input, setInput } = useAppContext();
  const inputRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setInput(inputRef.current.value.trim());
  };

  const onClear = () => {
    setInput('');
    inputRef.current.value = '';
  };

  return (
    <header className="relative bg-white overflow-hidden">
      {/* Background Gradient Image */}
      <img
        src={assets.gradientBackground}
        className="absolute -top-20 sm:-top-32 -z-10 opacity-40 w-full max-w-6xl mx-auto left-0 right-0 pointer-events-none"
        alt="Background Gradient"
      />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 md:px-16 xl:px-24 pt-20 pb-12 text-center">
        {/* Notification Tag */}
        <div className="inline-flex items-center justify-center gap-2 sm:gap-4 px-4 sm:px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm sm:text-base text-primary">
          <p>🚀 New: AI features integrated</p>
          <img src={assets.star_icon} className="w-3" alt="Star icon" />
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold leading-tight sm:leading-[4rem] text-gray-700">
          Your own <span className="text-primary">blogging</span><br className="hidden sm:block" /> platform
        </h1>

        {/* Subtext */}
        <p className="my-6 sm:my-8 max-w-2xl mx-auto text-sm sm:text-base text-gray-600 px-2">
          This is your space to think out loud, to share what matters, and to write without filters.
          Whether it's one word or a thousand, your story starts right here.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={onSubmitHandler}
          className="flex justify-center max-w-lg mx-auto border border-gray-300 bg-white rounded overflow-hidden shadow-md"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for blogs"
            className="w-full pl-4 py-2 outline-none text-gray-700 text-sm sm:text-base"
            required
          />
          <button
            type="submit"
            className="bg-primary text-white px-5 sm:px-7 py-2 text-sm sm:text-base rounded-r hover:scale-105 transition-all"
          >
            Search
          </button>
        </form>

        {/* Clear Button */}
        {input && (
          <div className="text-center mt-3">
            <button
              onClick={onClear}
              className="text-xs sm:text-sm border border-gray-300 font-light px-3 py-1 rounded shadow-sm hover:bg-gray-50 transition"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
