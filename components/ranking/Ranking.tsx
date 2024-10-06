"use client"

import { BlogType } from "@/types"
import BlogItem from "@/components/blog/BlogItem"

interface RankingProps {
  blogs: BlogType[]
}

const Ranking = ({ blogs }: RankingProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Top Ranking Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog, index) => (
          <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 relative">
            <div className="absolute top-0 left-0 bg-blue-500 text-white px-3 py-1 rounded-br-lg z-10">
              #{index + 1}
            </div>
            <BlogItem blog={blog} isRanking />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Ranking