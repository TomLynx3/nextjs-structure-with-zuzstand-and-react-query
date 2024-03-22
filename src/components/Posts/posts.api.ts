export interface IPostItem{
    userId:number,
    id:number,
    title:string,
    body:string
}

//Utility to mock API delay time
function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Getting posts
export const getPosts = async ():Promise<IPostItem[]> =>{

    const res:Response = await fetch('https://jsonplaceholder.typicode.com/posts')

    if(res.ok){
        return await res.json()
    }

    throw new Error('Posts could not be fetched');
}

//JSONPlacehodler does not have a method for deleting multiple items.
export const removeSelectedPosts = async (ids:number[]):Promise<number[]> =>{
    await sleep(1200)
    return ids
}
//JSONPlaceholder does not have a method for deleting all posts.
export const removeAllPosts = async ():Promise<void> =>{
    await sleep(1000)
}