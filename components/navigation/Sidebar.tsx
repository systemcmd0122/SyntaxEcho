"use client"

import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { microcms } from "@/lib/microcms"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Folder, NewspaperIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BlogType, ArchiveMonthType, CategoryCountType, SidebarData } from "@/types"

// サイドバーのデータを取得する関数
const fetchSidebarData = async (): Promise<SidebarData> => {
  const allBlogs = await microcms.getAllContents<BlogType>({
    endpoint: "blog",
    queries: {
      orders: "-publishedAt",
    },
  })

  // 最新の5件を取得
  const latestBlogs = allBlogs.slice(0, 5)

  // アーカイブの年月を取得
  const extractArchiveMonths = (blogs: BlogType[]): ArchiveMonthType[] => {
    const monthCounts = new Map<string, ArchiveMonthType>()
    blogs.forEach((blog) => {
      const date = new Date(blog.publishedAt || blog.createdAt)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const key = `${year}-${month}`
      const current = monthCounts.get(key) || { year, month, count: 0 }
      monthCounts.set(key, { ...current, count: current.count + 1 })
    })
    return Array.from(monthCounts.values()).sort(
      (a, b) => b.year - a.year || b.month - a.month
    )
  }

  // カテゴリごとの記事数を取得
  const extractCategoryCounts = (blogs: BlogType[]): CategoryCountType[] => {
    const categoryCounts = new Map<string, CategoryCountType>()
    blogs.forEach((blog) => {
      const { id, name } = blog.category
      const current = categoryCounts.get(id) || { id, name, count: 0 }
      categoryCounts.set(id, { ...current, count: current.count + 1 })
    })
    return Array.from(categoryCounts.values()).sort((a, b) => b.count - a.count)
  }

  return {
    latestBlogs,
    archiveMonths: extractArchiveMonths(allBlogs),
    categoryCounts: extractCategoryCounts(allBlogs),
  }
}

const Sidebar = () => {
  const { data: sidebarData, isLoading } = useQuery({
    queryKey: ["sidebarData"],
    queryFn: fetchSidebarData,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  })

  const latestBlogs = sidebarData?.latestBlogs || []
  const categoryCounts = sidebarData?.categoryCounts || []
  const archiveMonths = sidebarData?.archiveMonths || []

  return (
    <div className="space-y-8">
      {/* Profile Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col items-center space-y-4">
          <Link href="/about" className="relative group">
            <div className="absolute inset-0 bg-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            <Image
              src="/default.png"
              width={120}
              height={120}
              alt="avatar"
              className="rounded-full ring-2 ring-purple-100 transition-transform duration-300 group-hover:scale-105"
              priority={false}
            />
          </Link>
          <h2 className="font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Tisk_01010100
          </h2>
          <p className="text-sm text-gray-600 text-center">
            主にアプリケーション開発を中心として活動している開発者です。
          </p>
        </div>
      </div>

      {/* Latest Posts Section */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2 font-semibold">
            <NewspaperIcon className="h-5 w-5 text-purple-500" />
            <span>新着記事</span>
          </div>
        </div>
        <div className="divide-y">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : (
            latestBlogs.map((blog, index) => (
              <Link
                key={index}
                href={`/blog/${blog.id}`}
                className="flex items-center space-x-4 p-4 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={blog.image.url}
                    fill
                    alt={blog.title}
                    className="object-cover transition-transform duration-200 hover:scale-110"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium line-clamp-2 text-gray-900">
                    {blog.title}
                  </h3>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2 font-semibold">
            <Folder className="h-5 w-5 text-purple-500" />
            <span>カテゴリ</span>
          </div>
        </div>
        <div className="p-4">
          {isLoading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {categoryCounts.map((category) => (
                <Link key={category.id} href={`/category/${category.id}`}>
                  <Button
                    variant="outline"
                    className="h-auto text-sm py-1 px-3 hover:bg-gray-100"
                  >
                    {category.name}
                    <span className="ml-2 bg-gray-100 px-2 py-0.5 rounded-full text-xs">
                      {category.count}
                    </span>
                  </Button>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Archives Section */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2 font-semibold">
            <Calendar className="h-5 w-5 text-purple-500" />
            <span>アーカイブ</span>
          </div>
        </div>
        <div className="divide-y">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : (
            archiveMonths.map((archive, index) => (
              <Link
                key={index}
                href={`/archive/${archive.year}/${archive.month}`}
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-sm text-gray-600">
                  {format(new Date(archive.year, archive.month - 1), "yyyy年MM月")}
                </span>
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                  {archive.count}
                </span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar