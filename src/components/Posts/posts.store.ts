import {create} from "zustand";

interface PostsStore {
    selectedPostsIds:Set<number>,
    actions:PostsStoreActions
}

interface PostsStoreActions {
    togglePostSelect:(id:number)=>void
    cleanSelectedPosts:()=>void
}

//Creating Zustand store
const usePostsStore = create<PostsStore>((set,get)=>({
    selectedPostsIds:new Set<number>(),
    actions:{
        togglePostSelect:(id:number)=>{
            // Get the current selected posts
            const {selectedPostsIds} = get()
            // If the post is already selected, remove it
            if(selectedPostsIds.has(id)){
                selectedPostsIds.delete(id)
                // If not selected, add it
            }else{
                selectedPostsIds.add(id)
            }
            // Update the state with the new set of selected post IDs
            set({selectedPostsIds:new Set(Array.from(selectedPostsIds))})
        },
        cleanSelectedPosts:()=>set({selectedPostsIds:new Set()})
    }
}))

//Custom hooks
// Hook to get the set of selected posts
export const useSelectedPostsIds = () => usePostsStore((state)=>state.selectedPostsIds)
// Hook to get actions to work with state
export const usePostsStoreActions = () => usePostsStore((state)=>state.actions)
// Hook to check if a post with the provided ID is already selected
export const usePostsIsSelected = (id:number):boolean => usePostsStore((state)=>state.selectedPostsIds.has(id))
// Get the amount of selected posts
export const useSelectedPostsCount = ():number => usePostsStore((state)=>state.selectedPostsIds.size)