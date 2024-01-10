import React from "react";
import './App.css';
import {useComments} from "./hooks/request/useComments";

const Comments: React.FC = () => {

  const {data: comments, isLoading} = useComments()

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

export default Comments