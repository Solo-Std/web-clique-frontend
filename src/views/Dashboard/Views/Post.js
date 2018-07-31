import React from "react";
import PostComponent from "./PostComponent";


const Post = ({match}) => {
  return <PostComponent id={ match.params.id }/>
}

export default Post
