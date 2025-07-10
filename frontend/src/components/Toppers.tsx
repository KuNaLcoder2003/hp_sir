import React from 'react'

const Toppers = () => {
  return (
    <div className="bg-white text-black p-4 rounded-2xl w-70 shadow-lg">
      {/* Album Art */}
      <div className="overflow-hidden rounded-xl h-[90%] overflow-hidden">
        <img
        loading="lazy"
          src={'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'} // your image file
          alt="Where Are You Now"
          className="w-full max-h-40 object-cover"
        />
      </div>

      {/* Song Info */}
      <div className="mt-4">
        <p className="font-semibold text-black leading-tight truncate">
          Kunal Singh
        </p>
        <p className="text-gray-400 text-sm mt-1">{'90%'}</p>
        <p>Class 12th</p>
      </div>
    </div>
  )
}

export default Toppers
