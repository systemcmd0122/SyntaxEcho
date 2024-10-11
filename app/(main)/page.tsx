import { Suspense } from "react";
import { microcms } from "@/lib/microcms";
import { BlogType } from "@/types";
import Top from "@/components/top/Top";
import TopList from "@/components/top/TopList";
import LayoutWithSidebar from "@/components/layout/LayoutWithSidebar";
import Loading from "@/app/loading";
import Head from "next/head";

export const revalidate = 0;

// メインページ
const HomePage = async () => {
  const [latestBlogs, recommendedBlogs, specialBlogs] = await Promise.all([
    // 最新のブログ記事を取得
    microcms.getList<BlogType>({
      endpoint: "blog",
      queries: {
        orders: "-publishedAt",
        limit: 12,
      },
    }),

    // オススメ記事を取得
    microcms.getList<BlogType>({
      endpoint: "blog",
      queries: {
        filters: "isRecommended[equals]true",
      },
    }),

    // 特集記事を取得
    microcms.getList<BlogType>({
      endpoint: "blog",
      queries: {
        filters: "isSpecial[equals]true",
      },
    }),
  ]);

  return (
    <>
      <Head>
        <title>SyntaxEcho - 最新のプログラム解説サイト</title>
        <meta property="og:title" content="SyntaxEcho" />
        <meta property="og:description" content="最新のプログラミング言語やNext.jsやReactなどのフレームワークに関する解説記事を提供しています。" />
        <meta property="og:image" content="https://yqgzdjhafrorvvngavrc.supabase.co/storage/v1/object/public/blogs/7b285743-53d8-4dee-a649-1832c94843b5/2969afcf-9252-45a1-9aea-8eee748927f2.png" />
        <meta property="og:url" content="https://syntax-echo.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SyntaxEcho - 最新のプログラム解説サイト" />
        <meta name="twitter:description" content="最新のプログラミング言語やNext.jsやReactなどのフレームワークに関する解説記事を提供しています。" />
        <meta name="twitter:image" content="https://yqgzdjhafrorvvngavrc.supabase.co/storage/v1/object/public/blogs/7b285743-53d8-4dee-a649-1832c94843b5/2969afcf-9252-45a1-9aea-8eee748927f2.png" />
      </Head>

      <Suspense fallback={<Loading />}>
        <div className="pt-16 space-y-10 mb-10"> {/* pt-16を追加 */}
          <Top blogs={recommendedBlogs.contents} />

          <LayoutWithSidebar>
            <TopList
              latestBlogs={latestBlogs.contents}
              recommendedBlogs={recommendedBlogs.contents}
              specialBlogs={specialBlogs.contents}
            />
          </LayoutWithSidebar>
        </div>
      </Suspense>
    </>
  );
};

export default HomePage;
