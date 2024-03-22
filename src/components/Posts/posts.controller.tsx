import {usePostsStoreActions, useSelectedPostsCount, useSelectedPostsIds} from "@/components/Posts/posts.store";
import {useCallback} from "react";
import {usePosts, useRemoveAllPosts, useRemoveSelectedPosts} from "@/components/Posts/posts.queries";


export const usePostsActionController = ()=>{
    const selectedPostsCount = useSelectedPostsCount()
    const selectedPostsIds = useSelectedPostsIds()
    const {cleanSelectedPosts} = usePostsStoreActions()
    const {remove} = useRemoveSelectedPosts(cleanSelectedPosts)
    const {removeAll} = useRemoveAllPosts(cleanSelectedPosts)
    const {refetch} = usePosts()


    const removeSelectedPosts = useCallback(()=>{
        remove(Array.from(selectedPostsIds))
    },[selectedPostsIds,remove])

    return {
        selectedPostsCount,
        removeSelectedPosts,
        reFetchPosts:refetch,
        removeAll
    }
}