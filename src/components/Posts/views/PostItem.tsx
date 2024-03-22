import React from 'react';
import styled from "styled-components";
import {usePostsIsSelected, usePostsStoreActions} from "@/components/Posts/posts.store";
import {IPostItem} from "@/components/Posts/posts.api";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap:8px;

  p{
    margin: 0;
    font-size: 0.875em;
  }
`

const CheckBox = styled.input`
  transform: scale(1.5);
  cursor: pointer;
`

const Wrapper = styled.div`
  padding: 1rem;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: flex;
  align-items: center;
  gap:16px;

`
const PostItem = ({title,body,id}:IPostItem) => {

    // Hook to select the post
    const {togglePostSelect} = usePostsStoreActions()
    return (
        <Wrapper>
            <CheckBox type="checkbox" checked={usePostsIsSelected(id)} onChange={()=>togglePostSelect(id)}/>
            <ContentWrapper>
                <h3>{title}</h3>
                <p>{body}</p>
            </ContentWrapper>
        </Wrapper>
    );
};

export default PostItem;