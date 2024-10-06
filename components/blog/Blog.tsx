"use client"

import { BlogType } from "@/types"
import { blogPerPage } from "@/lib/utils"
import BlogItem from "@/components/blog/BlogItem"
import PaginationButton from "@/components/pagers/PaginationButton"

interface BlogProps {
  blogs: BlogType[]
  pageCount: number
}

// ブログ
const Blog = ({ blogs, pageCount }: BlogProps) => {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {blogs.map((blog) => (
          <BlogItem key={blog.id} blog={blog} />
        ))}
      </div>

      {blogs.length !== 0 && (
        <div className="flex justify-center pb-12">
          <PaginationButton pageCount={pageCount} displayPerPage={blogPerPage} />
        </div>
      )}
    </div>
  )
}

export default Blog
