"use client"

import { useState } from "react"
import { BlogType } from "@/types"
import { motion, AnimatePresence } from "framer-motion"
import BlogItem from "@/components/blog/BlogItem"

interface TopListProps {
  latestBlogs: BlogType[]
  recommendedBlogs: BlogType[]
  specialBlogs: BlogType[]
}

const TopList = ({
  latestBlogs,
  recommendedBlogs,
  specialBlogs,
}: TopListProps) => {
  const [filter, setFilter] = useState("新着")

  const filteredBlogs = (() => {
    switch (filter) {
      case "新着":
        return latestBlogs
      case "オススメ":
        return recommendedBlogs
      case "特集":
        return specialBlogs
      default:
        return latestBlogs
    }
  })()

  const buttonVariants = {
    active: { backgroundColor: "#000", color: "#fff" },
    inactive: { backgroundColor: "#fff", color: "#000" },
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between border rounded-lg overflow-hidden shadow-md">
        {["新着解説", "オススメ解説", "特集解説"].map((buttonText) => (
          <motion.button
            key={buttonText}
            className="py-3 px-4 text-center flex-1 text-sm font-bold transition-colors duration-200 ease-in-out"
            onClick={() => setFilter(buttonText)}
            variants={buttonVariants}
            animate={filter === buttonText ? "active" : "inactive"}
            whileHover={{ backgroundColor: "#f3f4f6" }}
            whileTap={{ scale: 0.95 }}
          >
            {buttonText}記事
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredBlogs.map((blog) => (
            <BlogItem key={blog.id} blog={blog} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default TopList