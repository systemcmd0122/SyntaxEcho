"use client"

import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { format } from "date-fns"
import { BlogType } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface TopProps {
  blogs: BlogType[]
}

const Top = ({ blogs }: TopProps) => {
  const slideSettings = {
    0: {
      slidesPerView: 1,
      spaceBetween: 16,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 32,
    },
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      breakpoints={slideSettings}
      centeredSlides={true}
      loop={true}
      speed={800}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
        bulletClass: 'swiper-pagination-bullet bg-gray-300 opacity-50',
        bulletActiveClass: 'swiper-pagination-bullet-active bg-gray-800 opacity-100',
      }}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      className="max-w-full"
    >
      {blogs.map((blog) => (
        <SwiperSlide key={blog.id}>
          <Link href={`/blog/${blog.id}`}>
            <motion.div 
              className="aspect-video relative overflow-hidden group max-h-[600px] rounded-lg shadow-lg"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={blog.image.url}
                fill
                alt={blog.title}
                className="object-cover"
                priority={true}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="text-sm mb-2">{format(new Date(blog.createdAt), "yyyy/MM/dd")}</div>
                <h2 className="text-xl font-bold mb-2 line-clamp-2">{blog.title}</h2>
                <span
                  className="inline-block text-xs font-semibold py-1 px-2 rounded"
                  style={{ backgroundColor: blog.category.color || "#4B5563" }}
                >
                  {blog.category.name}
                </span>
              </div>
            </motion.div>
          </Link>
        </SwiperSlide>
      ))}
      <div className="swiper-button-next !text-white after:text-2xl"></div>
      <div className="swiper-button-prev !text-white after:text-2xl"></div>
    </Swiper>
  )
}

export default Top