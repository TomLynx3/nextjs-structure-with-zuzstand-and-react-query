import { Inter } from "next/font/google";
import {dehydrate, QueryClient} from "@tanstack/query-core";
import {getPosts} from "@/components/Posts/posts.api";
import styled from "styled-components";
import PostsActionBar from "@/components/Posts/views/PostsActionBar";
import Posts from "@/components/Posts/views/Posts";


const inter = Inter({ subsets: ["latin"] });

const MainWrapper = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ContentWrapper = styled.div`
  width: 600px;
  height: 600px;
  display: flex;
  flex-direction: column;
  gap:16px;
`

const PostsWrapper = styled.div`
  min-height: 200px;
  padding: 1rem 2rem;
  border-radius: 16px;
  overflow-y: scroll;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`

const PostsActionBarWrapper = styled.div`
  min-height: 65px;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`

export default function Home() {

  return (
      <MainWrapper style={inter.style}>
        <ContentWrapper>
          <PostsActionBarWrapper>
            <PostsActionBar/>
          </PostsActionBarWrapper>
          <PostsWrapper>
            <Posts />
          </PostsWrapper>
        </ContentWrapper>
      </MainWrapper>
  )
}

//Fetching posts server-side using React-Query. React-Query will
//synchronize data from the server on the client-side for us.
export async function getServerSideProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({ queryKey: ['posts'], queryFn: getPosts })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}