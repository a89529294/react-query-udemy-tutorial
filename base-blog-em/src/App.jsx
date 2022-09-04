import { useState } from "react";
import { Posts } from "./Posts";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
  const [showPosts, setShowPosts] = useState(true);
  return (
    // provide React Query client to App
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Blog Posts</h1>
        <button onClick={() => setShowPosts((b) => !b)}>
          {showPosts ? "hide posts" : "show posts"}
        </button>
        {showPosts ? <Posts /> : null}
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
