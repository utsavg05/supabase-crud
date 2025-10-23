"use client"
import { supabase } from "@/supabase-client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  created_at: string;
  // image_url: string;
}

export default function TaskManager() {
  const [newTask, setNewTask] = useState({ title: "", description: "" })
  const [tasks, setTasks] = useState<Task[]>([])
  const [newDescription, setNewDescription] = useState("")

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { error } = await supabase
    .from("tasks")
    .insert(newTask)
    .single();

    if (error) {
      console.log("Error adding task: ", error.message);
      return;
    }

    console.log("task added!!")
    setNewTask({ title: "", description: "" });
  }

  const fetchTasks = async () => {
    const { error, data } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.log("Error fetching tasks: ", error.message);
    }

    setTasks(data ?? [])
  }

  console.log(tasks)

  const deleteTask = async (id: number) => {
    const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id);

    if (error) {
      console.log("error deleting task: ", error.message);
      return;
    }

  }

  const updateTask = async (id: number) => {
    const { error } = await supabase
    .from("tasks")
    .update({description: newDescription})
    .eq("id", id);

    if (error) {
      console.log("error updating task: ", error.message);
      return;
    }

  }

  const handleFileChange = () => {

  }

  useEffect(() => {
    fetchTasks();
  }, [deleteTask, updateTask])

  return (
    // <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
    //   <h2>Task Manager CRUD</h2>

    //   {/* Form to add a new task */}
    //   <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
    //     <input
    //       type="text"
    //       placeholder="Task Title"
    //       onChange={(e) =>
    //         setNewTask((prev) => ({ ...prev, title: e.target.value }))
    //       }
    //       style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
    //     />
    //     <textarea
    //       placeholder="Task Description"
    //       onChange={(e) =>
    //         setNewTask((prev) => ({ ...prev, description: e.target.value }))
    //       }
    //       style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
    //     />

    //     <input type="file" accept="image/*" />

    //     <button type="submit" style={{ padding: "0.5rem 1rem" }}>
    //       Add Task
    //     </button>
    //   </form>

    //   {/* List of Tasks */}
    //   <ul style={{ listStyle: "none", padding: 0 }}>
    //     {tasks.map((task, key) => (
    //       <li
    //         key={key}
    //         style={{
    //           border: "1px solid #ccc",
    //           borderRadius: "4px",
    //           padding: "1rem",
    //           marginBottom: "0.5rem",
    //         }}
    //       >
    //         <div>
    //           <h3>{task.title}</h3>
    //           <p>{task.description}</p>
    //           {/* <img src={task.image_url} style={{ height: 70 }} /> */}
    //           <div>
    //             <textarea
    //               placeholder="Updated description..."
    //               onChange={(e) => setNewDescription(e.target.value)}
    //             />
    //             <button
    //               style={{ padding: "0.5rem 1rem", marginRight: "0.5rem" }}
    //               onClick={() => updateTask(task.id)}
    //             >
    //               Edit
    //             </button>
    //             <button
    //               style={{ padding: "0.5rem 1rem" }}
    //               onClick={() => deleteTask(task.id)}
    //             >
    //               Delete
    //             </button>
    //           </div>
    //         </div>
    //       </li>
    //     ))}
    //   </ul>
    // </div>

    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-gray-500 mb-6">
        📝 Task Manager
      </h2>

      {/* Add Task Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-5 border border-gray-200 mb-8"
      >
        <input
          type="text"
          placeholder="Task Title"
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, title: e.target.value }))
          }
          className="w-full border text-slate-900 border-gray-300 rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          placeholder="Task Description"
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, description: e.target.value }))
          }
          className="w-full border text-slate-900 border-gray-300 rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="file"
          accept="image/*"
          className="mb-4 block w-full text-gray-700"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition"
        >
          Add Task
        </button>
      </form>

      {/* Task List */}
      <ul className="space-y-4">
        {tasks.map((task, key) => (
          <li
            key={key}
            className="bg-white shadow-sm border border-gray-200 rounded-xl p-5 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {task.title}
                </h3>
                <p className="text-gray-600 mt-1">{task.description}</p>
              </div>
              {/* <img src={task.image_url} alt="" className="h-16 rounded-md" /> */}
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              <textarea
                placeholder="Updated description..."
                onChange={(e) => setNewDescription(e.target.value)}
                className="flex-1 text-slate-900 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={() => updateTask(task.id)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
              >
                Update
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>

  );
}
