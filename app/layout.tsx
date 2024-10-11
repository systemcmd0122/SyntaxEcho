import "./globals.css"
import type { Metadata, Viewport } from "next"
import { M_PLUS_1 } from "next/font/google"
import QueryProvider from "@/components/providers/QueryProvider"
import Head from "next/head"

// Googleフォント M_PLUS_1 をインポート
const mPlus1 = M_PLUS_1({
  weight: ["400", "700", "900"], // フォントのウェイトを指定
  subsets: ["latin"], // 対応する文字のサブセットを指定
})

// メタデータの設定
export const metadata: Metadata = {
  title: {
    template: "SyntaxEcho | %s", // ページタイトルのテンプレート
    default: "SyntaxEcho", // デフォルトのページタイトル
  },
  description: "SyntaxEchoは最新のプログラム技術を扱うプラットフォームです。",
  openGraph: {
    title: "SyntaxEcho",
    description: "最新のプログラム技術を扱うプラットフォーム、SyntaxEcho。",
    url: "https://syntax-echo.vercel.app/",
    siteName: "SyntaxEcho",
    images: [
      {
        url: "https://yqgzdjhafrorvvngavrc.supabase.co/storage/v1/object/public/blogs/7b285743-53d8-4dee-a649-1832c94843b5/2969afcf-9252-45a1-9aea-8eee748927f2.png",
        width: 1200,
        height: 630,
        alt: "SyntaxEchoのOGP画像",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
}

export const viewport: Viewport = {
  maximumScale: 1, // 最大拡大率を1に設定
  userScalable: false, // ユーザーがズームできないようにする
}

interface RootLayoutProps {
  children: React.ReactNode
}

// ルートレイアウト
const RootLayout = async ({ children }: RootLayoutProps) => {
  return (
    <html lang="ja">
      <Head>
        {/* OGP関連のメタタグ */}
        <meta property="og:title" content="SyntaxEcho" />
        <meta property="og:description" content="SyntaxEchoは最新のWeb技術を扱うプラットフォームです。" />
        <meta property="og:image" content="https://syntaxecho.example.com/og-image.jpg" />
        <meta property="og:url" content="https://syntaxecho.example.com" />
        <meta property="og:site_name" content="SyntaxEcho" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ja_JP" />

        {/* Twitter用メタタグ */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SyntaxEcho" />
        <meta name="twitter:description" content="SyntaxEchoは最新のWeb技術を扱うプラットフォームです。" />
        <meta name="twitter:image" content="https://syntaxecho.example.com/og-image.jpg" />
      </Head>
      <body className={mPlus1.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}

export default RootLayout
