import React from "react";

interface Step {
  description: string;
  price: string;
}

interface Task {
  title: string;
  steps: Step[];
  logo?: string;
  additionalSteps?: { title: string; description: string }[];
}

interface TaskModalProps {
  task: Task | null;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, onClose }) => {
  if (!task) return null;

  const stepsPerRow = Math.floor(window.innerWidth / 150); // Adjust width as needed

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {task.steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <span className="font-medium mr-2">Step {index + 1}:</span>
              {step.description}
            </div>
          ))}
          {task.logo && (
            <div className="flex items-center">
              <img src={task.logo} alt="Task logo" className="w-8 h-8 mr-2" />
              {/* You can customize the logo title here if needed */}
            </div>
          )}
          {task.additionalSteps &&
            task.additionalSteps.map((step, index) => (
              <div key={index} className="flex items-center">
                <span className="font-medium mr-2">&gt;</span>
                <span>{step.title}</span>
              </div>
            ))}
        </div>
        <button
          className="mt-4 w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TaskModal;
