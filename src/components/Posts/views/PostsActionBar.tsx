import React from 'react';
import styled from "styled-components";
import {usePostsActionController} from "@/components/Posts/posts.controller";

const ButtonWrapper = styled.button`
  border:none;
  background:none;
  padding:.45rem 2rem;
  border-radius: 6px;
  font-weight: 500;
  cursor:pointer;
  
  &:disabled{
    pointer-events: none;
    opacity: 0.6;
  }
`

const DeleteButton  = styled(ButtonWrapper)`
  color:#ffff;
  background-color: red;
`
const ReFetchButton = styled(ButtonWrapper)`
  color:#ffff;
  background-color: blue;
`

const Wrapper = styled.div`
  display: flex;
  gap:16px
`
const PostsActionBar = () => {

    const {reFetchPosts,removeSelectedPosts,selectedPostsCount,removeAll}  = usePostsActionController()

    return (
        <Wrapper>
            <ReFetchButton onClick={()=>reFetchPosts()}>ReFetch</ReFetchButton>
            <DeleteButton onClick={()=>removeSelectedPosts()} disabled={selectedPostsCount === 0}>Delete {selectedPostsCount} post{selectedPostsCount > 1 ? "s" : null}</DeleteButton>
            <DeleteButton onClick={()=>removeAll()}>Remove all</DeleteButton>
        </Wrapper>
    );
};

export default PostsActionBar;