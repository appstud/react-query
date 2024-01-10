import React from "react";
import './post.css';
import {usePostComment} from "./hooks/request/usePosts";
import {Field, Form, Formik} from "formik";
import {PostFormType} from "./data/schema/PostsSchema";

const Post: React.FC = () => {

  const {mutate: postComment, isSuccess} = usePostComment()

  const initialValues: PostFormType = {
    title: '',
    body: '',
    userId: 0,
  }

  const handleSubmit = (values: PostFormType) => {
    postComment({
      title: values.title,
      body: values.body,
      userId: values.userId
    })
  }

  return (

      <div className="card">
        <div className="card-header">
          <h2>Post comment</h2>
        </div>
        <div className="card-body">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <label htmlFor="userId">UserID:</label>
              <Field type="userId" id="userId" name="userId" required/>

              <label htmlFor="title">Title:</label>
              <Field type="text" id="title" name="title" required/>

              <label htmlFor="body">Comment:</label>
              <Field as="textarea" id="body" name="body" required/>

              <div className="card-footer">
                <button type="submit">Save</button>
              </div>
            </Form>
          </Formik>
          {isSuccess && <span style={{color: 'green'}}>Succès</span> }
        </div>
      </div>
  )
}

export default Post