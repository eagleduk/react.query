import { Posts } from "./Posts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    // provide React Query client to App
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Blog Posts</h1>
        <Posts />
      </div>
    </QueryClientProvider>
  );
}

export default App;
