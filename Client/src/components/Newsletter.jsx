import React from 'react'

const Newsletter = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center space-y-2 my-32'>
      <h1 className='md:text-4xl text-2xl font-semibold'>Never Miss a Blog</h1>
      <p className='md-text-lg text-gray-500/70 pb-8'>Ubscribe to get the latest Blog, new tech, and exclusive news</p>
      <form className='flex items-center justify-betwwen max-w-2xl w-full md:h-13 h-12'>
        <input className='border border-gray-300 rounded-md h-full border-r-0 w-full outline-none rounded-r-none px-3 text-gray-500' type="text" placeholder='Enter Your Email id' required />
        <button className='md:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-md rounded-l-none' type='submit'>Subscribe</button>
      </form>
    </div>
  )
}

export default Newsletter
