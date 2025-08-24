import type React from "react"


const Toppers: React.FC<{ url: string }> = ({ url }) => {
  return (
    <div className="bg-white text-black p-4 rounded-2xl w-70 shadow-lg">
      {/* Album Art */}
      <div className="overflow-hidden rounded-xl h-40 w-full">
        <img
          loading="lazy"
          src={url}
          alt="Where Are You Now"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Song Info */}
      <div className="mt-4">
        <p className="font-semibold text-black leading-tight truncate">
          Kunal Singh
        </p>
        <p className="text-gray-400 text-sm mt-1">{'90%'}</p>
        <p className="text-gray-600 text-sm">Class 12th</p>
      </div>
    </div>

  )
}

export default Toppers
