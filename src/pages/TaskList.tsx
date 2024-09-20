import * as Avatar from "@radix-ui/react-avatar";
import React, { useEffect, useState } from "react";
import TaskModal from "./TaskModal";

interface Step {
  description: string;
  price: string;
}

interface Task {
  title: string;
  steps: Step[];
  userName: string; // Added userName to the Task interface
  userEmail: string; // Added userEmail to the Task interface
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedStep, setSelectedStep] = useState<Step | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    const parsedTasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];
    setTasks(parsedTasks);
  }, []);

  const handleStepClick = (step: Step, task: Task) => {
    setSelectedStep(step);
    setSelectedTask(task);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
      {tasks.length === 0 ? (
        <p>You have no tasks yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="group relative block h-64 sm:h-80 lg:h-96 cursor-pointer hover:bg-gray-200 transition-all duration-300"
            >
              <div className="relative flex flex-col h-full p-4 bg-white border-2 border-black rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
                <div className="mt-2">
                  <h4 className="font-medium">Steps:</h4>
                  <ul className="list-disc pl-5 mt-1 text-sm sm:text-base">
                    {task.steps.map((step, stepIndex) => (
                      <li
                        key={stepIndex}
                        className="cursor-pointer text-blue-500 hover:underline mb-1"
                        onClick={() => handleStepClick(step, task)}
                      >
                        Step {stepIndex + 1}: {step.description} - ${step.price}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                  <Avatar.Root className="flex items-center space-x-3">
                    <Avatar.Image
                      src="https://randomuser.me/api/portraits/women/79.jpg" // Dummy avatar
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
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedStep && (
        <TaskModal
          task={selectedTask}
          step={selectedStep}
          onClose={() => {
            setSelectedStep(null);
          }}
        />
      )}
    </div>
  );
};

export default TaskList;
