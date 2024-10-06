"use client"

import { BlogType } from "@/types"
import { format } from "date-fns"
import Image from "next/image"
import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"

interface BlogItemProps {
  blog: BlogType
  isRanking?: boolean
}

const BlogItem = ({ blog, isRanking }: BlogItemProps) => {
  const categoryColor = blog.category.color || "gray"

  return (
    <Link 
      href={`/blog/${blog.id}`} 
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
    >
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={blog.image.url}
          width={768}
          height={432}
          alt="thumbnail"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          priority={false}
        />
        
        <div
          className="absolute top-4 left-4 text-xs font-medium rounded-full px-4 py-1.5 backdrop-blur-md"
          style={{ backgroundColor: `${categoryColor}99` }}
        >
          {blog.category.name}
        </div>

        {isRanking && blog.ranking && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full h-10 w-10 flex items-center justify-center font-bold text-lg shadow-sm">
            {blog.ranking}
          </div>
        )}
      </div>

      <div className="p-6 space-y-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg leading-snug group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
          {blog.title}
        </h3>
        
        <div className="flex items-center text-sm text-gray-500 gap-2 mt-auto">
          <Calendar size={16} />
          <time>{format(new Date(blog.createdAt), "yyyy/MM/dd")}</time>
        </div>
        
        <div className="pt-2 flex items-center text-blue-600 text-sm font-medium opacity-0 transform -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
          Read More <ArrowRight size={16} className="ml-1" />
        </div>
      </div>
    </Link>
  )
}

export default BlogItem