import { Suspense } from "react"
import { microcms } from "@/lib/microcms"
import { AboutType } from "@/types"
import About from "@/components/about/About"
import LayoutWithSidebar from "@/components/layout/LayoutWithSidebar"
import hljs from "highlight.js"
import Loading from "@/app/loading"
import * as cheerio from "cheerio"
import "highlight.js/styles/github-dark.css"

export const revalidate = 0

const AboutPage = async () => {
  const about = await microcms.getList<AboutType>({
    endpoint: "about",
    queries: {
      orders: "publishedAt",
      limit: 1,
    },
  })

  let aboutContent = ""

  if (about.contents.length == 1) {
    const $ = cheerio.load(about.contents[0].content)

    $("pre").each((_, element) => {
      const parent = $(element).parent()
      const filename = parent.attr("data-filename")
      parent.addClass("my-8 rounded-lg overflow-hidden")

      $(element)
        .find("code")
        .each((_, codeElement) => {
          const codeText = $(codeElement).text()
          const className = $(codeElement).attr("class") || ""
          const languageMatch = className.match(/language-(\w+)/)
          const language = languageMatch ? languageMatch[1] : "plaintext"

          try {
            const result = hljs.highlight(codeText, { language })
            $(codeElement).html(result.value)
            $(codeElement).addClass("hljs p-4 block")
          } catch (highlightError) {
            console.error("Highlight.js error:", highlightError)
            $(codeElement).text(codeText)
          }
        })

      if (filename) {
        $(element).before(
          `<div class="bg-gray-800 text-gray-200 py-2 px-4 text-sm font-mono">${filename}</div>`
        )
      }
    })
    $("code:not(pre code)").each((_, element) => {
      $(element).addClass("bg-gray-100 py-1 px-2 text-sm rounded font-mono")
    })
    $("p").each((_, element) => {
      $(element).addClass("my-6 leading-relaxed whitespace-pre-wrap")
    })
    $("h1, h2, h3, h4, h5, h6").each((_, element) => {
      $(element).addClass("whitespace-pre-wrap")
    })
    $("h1").each((_, element) => {
      $(element).addClass("text-4xl font-bold my-8 pb-2 border-b-2 border-gray-200")
    })
    $("h2").each((_, element) => {
      $(element).addClass("text-3xl font-bold my-7")
    })
    $("h3").each((_, element) => {
      $(element).addClass("text-2xl font-semibold my-6")
    })
    $("h4").each((_, element) => {
      $(element).addClass("text-xl font-semibold my-5")
    })
    $("h5").each((_, element) => {
      $(element).addClass("text-lg font-medium my-4")
    })
    $("ul").each((_, element) => {
      $(element).addClass("list-disc ml-6 my-6 space-y-2")
    })
    $("ol").each((_, element) => {
      $(element).addClass("list-decimal ml-6 my-6 space-y-2")
    })
    $("blockquote").each((_, element) => {
      $(element).addClass("border-l-4 border-gray-300 pl-4 italic my-6 text-gray-600")
    })
    $("table").each((_, element) => {
      $(element).addClass("w-full border-collapse border border-gray-300 my-6")
    })
    $("th").each((_, element) => {
      $(element).addClass("border px-4 py-2 bg-gray-100")
    })
    $("td").each((_, element) => {
      $(element).addClass("border px-4 py-2")
    })
    $("a").each((_, element) => {
      $(element).addClass("text-blue-600 hover:text-blue-800 underline transition-colors")
    })
    $("img").each((_, element) => {
      $(element).addClass("my-6 rounded-lg max-w-full h-auto")
    })
    $("hr").each((_, element) => {
      $(element).addClass("my-8 border-t border-gray-300")
    })

    aboutContent = $.html()
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="pt-20"> {/* 追加：上部に余白を設ける */}
        <LayoutWithSidebar>
          <About content={aboutContent} />
        </LayoutWithSidebar>
      </div>
    </Suspense>
  )
}

export default AboutPage