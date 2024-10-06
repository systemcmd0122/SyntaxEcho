"use client"

import { useEffect, useRef } from 'react'

interface AboutProps {
  content: string
}

const About = ({ content }: AboutProps) => {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      const links = contentRef.current.getElementsByTagName('a')
      for (let i = 0; i < links.length; i++) {
        links[i].setAttribute('target', '_blank')
        links[i].setAttribute('rel', 'noopener noreferrer')
      }
    }
  }, [content])

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <article className="prose prose-lg prose-gray mx-auto overflow-hidden">
        <div 
          ref={contentRef}
          className="whitespace-pre-wrap break-words"
          dangerouslySetInnerHTML={{ __html: content }} 
        />
      </article>
    </div>
  )
}

export default About