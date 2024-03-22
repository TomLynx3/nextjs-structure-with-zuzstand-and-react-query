import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getPosts, IPostItem, removeAllPosts, removeSelectedPosts} from "@/components/Posts/posts.api";

export const usePosts = () =>{
    const { data,refetch } = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts
    })
    return {posts:data,refetch}
}

export const useRemoveSelectedPosts = (onSuccess?:Function) =>{
    const queryClient = useQueryClient();

    const { mutate:remove } = useMutation({
        mutationFn:removeSelectedPosts,
        onSuccess: (ids:number[]) => {
            //Updating posts state
            queryClient.setQueryData(["posts"],(prev:IPostItem[])=>{
                return prev.filter(x=>!ids.includes(x.id))
            })
            //Trigger side effects
            onSuccess?.()
        },
    });

    return {remove}
}

export  const useRemoveAllPosts = (onSuccess?:Function) =>{
    const queryClient = useQueryClient();

    const { mutate:removeAll } = useMutation({
        mutationFn:removeAllPosts,
        onSuccess: () => {
            //Updating posts state
            queryClient.setQueryData(["posts"],()=>{
                return []
            })
            //Trigger side effects
            onSuccess?.()
        },
    });

    return {removeAll}
}