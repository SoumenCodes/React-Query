"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { addTodo, fetchTodos } from "../API";

export function Todo() {
  const queryClient = useQueryClient();
  const [title, settitle] = useState("");

  const { data, isLoading } = useQuery({
    queryFn: () => fetchTodos(),
    queryKey: ["todos"],
  });

  const { mutateAsync } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  async function handleSubmit() {
    try {
      await mutateAsync({ title });
      settitle("");
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading) {
    return <div>Loading... </div>;
  }
  return (
    <div>
      <div>
        <input
          type="text"
          onChange={(e) => settitle(e.target.value)}
          value={title}
          className="mr-4 text-blue-600 text-xl p-1"
        />
        <button
          onClick={handleSubmit}
          className="cursor-pointer border-blue-600 border-2 p-2 rounded-md"
        >
          Add Todo
        </button>
      </div>
      <h1 className="my-8">Todo List {data?.length}</h1>
      <div>
        {data?.map((todo) => (
          <div key={todo.id}>{todo.title}</div>
        ))}
      </div>
    </div>
  );
}
