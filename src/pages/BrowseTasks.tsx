import * as Avatar from "@radix-ui/react-avatar";
import React, { useEffect, useState } from "react";
import StepCompletionModal from "./StepCompletion";

interface Step {
  description: string;
  price: string;
}

interface Task {
  title: string;
  steps: Step[];
  userName: string;
  userEmail: string;
}

const BrowseTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    const parsedTasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];
    setTasks(parsedTasks);
  }, []);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setShowCompletionModal(true); // Open the completion modal
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Browse Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="group relative block h-64 sm:h-80 lg:h-96 cursor-pointer hover:bg-gray-200 transition-all duration-300"
              onClick={() => handleTaskClick(task)}
            >
              <span className="absolute inset-0 border-2 border-dashed border-black"></span>

              <div className="relative flex flex-col h-full p-4 bg-white border-2 border-black">
                <h2 className="text-xl font-medium">{task.title}</h2>
                <div className="mt-2">
                  <h3 className="font-medium">Steps:</h3>
                  <ul className="list-disc pl-5 mt-1 text-sm sm:text-base">
                    {task.steps.map((step, index) => (
                      <li key={index}>
                        <strong>Step {index + 1}:</strong> {step.description}
                        {step.price && (
                          <span className="text-gray-600">
                            &nbsp;&nbsp;Price: {step.price}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                <Avatar.Root className="flex items-center space-x-3">
                  <Avatar.Image
                    src="https://randomuser.me/api/portraits/women/79.jpg"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <span className="text-gray-700 text-sm font-medium">
                      {task.userName}
                    </span>
                    <span className="block text-gray-700 text-xs">
                      {task.userEmail}
                    </span>
                  </div>
                </Avatar.Root>
                <button
                  className="py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTaskClick(task);
                  }}
                >
                  Read more
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showCompletionModal && selectedTask && (
        <StepCompletionModal
          steps={selectedTask.steps}
          onClose={() => setShowCompletionModal(false)}
        />
      )}
    </div>
  );
};

export default BrowseTasks;
