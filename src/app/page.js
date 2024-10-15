"use client";
import { Todo } from "./component/Todo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Home() {
  const queryClient = new QueryClient();
  return (
    <div>
      <h1 className="text-center my-4 text-4xl">React Queary</h1>

      <div className="mx-auto w-fit">
        <QueryClientProvider client={queryClient}>
          <Todo />
        </QueryClientProvider>
      </div>
    </div>
  );
}
