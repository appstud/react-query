import React from "react";
import './App.css';
import {useComments} from "./hooks/request/useComments";
import {useParams} from "react-router-dom";

const Comment: React.FC = () => {

  const {postId} = useParams()
  const {data: comments, isLoading} = useComments({postId: Number(postId)})

  return (
      <div className="container">
        {
          isLoading ? <p>Loading...</p> : comments?.map((comment, index) => (
              <div className="item" key={index}>
                  <strong>{`${comment.name} (${comment.email})`}</strong>
                  <p>{comment.body}</p>
              </div>
          ))
        }
      </div>
  )
}

export default Comment