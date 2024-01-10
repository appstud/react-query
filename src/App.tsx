import React from 'react';

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Comments from "./Comments";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Comment from "./Comment";
import Post from "./Post";

function App() {
  return (
      <QueryClientProvider client={new QueryClient()}>
        <BrowserRouter>
          <Routes>
            <Route path='/comments' element={<Comments />} />
            <Route path='/comments/:postId' element={<Comment />} />
            <Route path='/posts' element={<Post />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
  );
}

export default App;
