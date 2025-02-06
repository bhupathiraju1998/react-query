import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import { Link } from 'react-router-dom';
const PostsRQ = () => {

  const {data,isLoading,isError,error
    , isFetching //used to do a background fetch to check if the data is updated 
    , refetch //on click of button we can call an api
  } = useQuery({
    queryKey:["posts"],
    queryFn:()=>{
      return axios.get("http://localhost:4000/posts")

    },
    //enabled:false //this stop auto fetch on page load
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

  return (<>
    <button onClick={refetch}>Fetch Posts</button>
    {data?.data.map(post => (
        <Link key={post.id} to={`/rq-posts/${post.id}`}>

          <div className='post-item' key={post.id}>
              <h3 className='post-title'>{post.title}</h3>
              <p className='post-body'>{post.body}</p>
          </div>
        </Link>
       
  ))}</>
  )
}

export default PostsRQ