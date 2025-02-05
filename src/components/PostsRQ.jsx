import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
const PostsRQ = () => {

  const {data,isLoading,isError,error
    , isFetching //used to do a background fetch to check if the data is updated 
  } = useQuery({
    queryKey:["posts"],
    queryFn:()=>{
      return axios.get("http://localhost:4000/posts")

    },
    //refetchIntervalInBackground:true//to refetch evn on tab change
    //refetchInterval:1000 //default false , polling the data live calls
    //staleTime:30000 //for 30 secs the refetch will not be done in the background if we navigate to this page
  })
  if(isLoading){
    return <div>page is loading ....</div>
  }
  if(isError){
    return <div>{error.message}</div>
  }

  console.log('data',data)
  return (<>
    {data?.data.map(post => (
       <div className='post-item' key={post.id}>
              <h3 className='post-title'>{post.title}</h3>
              <p className='post-body'>{post.body}</p>
          </div>
  ))}</>
  )
}

export default PostsRQ