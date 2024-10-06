"use client"

import { BlogType } from "@/types"
import { format } from "date-fns"
import Image from "next/image"
import BlogItem from "@/components/blog/BlogItem"
import { Calendar } from "lucide-react"

interface BlogDetailProps {
  blog: BlogType
  relatedBlogs: BlogType[]
}

// ブログ詳細
const BlogDetail = ({ blog, relatedBlogs }: BlogDetailProps) => {
  const categoryColor = blog.category.color || "gray"

  return (
    <div className="max-w-4xl mx-auto space-y-12 px-4">
      <header className="space-y-4">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full text-sm"
          style={{ backgroundColor: `${categoryColor}20`, color: categoryColor }}>
          {blog.category.name}
        </div>
        <h1 className="font-bold text-3xl md:text-4xl leading-tight">{blog.title}</h1>
        <time className="flex items-center text-gray-500 gap-2">
          <Calendar size={18} />
          {format(new Date(blog.createdAt), "yyyy/MM/dd")}
        </time>
      </header>

      <div className="aspect-video relative rounded-2xl overflow-hidden shadow-lg">
        <Image
          src={blog.image.url}
          width={1200}
          height={675}
          alt="thumbnail"
          className="object-cover"
          priority={true}
        />
      </div>

      <article className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-img:rounded-xl">
        <div 
          dangerouslySetInnerHTML={{ __html: blog.content }}
          className="break-words whitespace-normal overflow-wrap-normal"
        />
      </article>

      <section className="pt-10 border-t">
        <h2 className="font-bold text-2xl mb-8">Related Articles</h2>

        {relatedBlogs.length === 0 ? (
          <div className="text-center text-gray-500 py-12">No related articles found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedBlogs.map((blog) => (
              <BlogItem key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default BlogDetail
