import { useState } from "react";

const TaskForm: React.FC = () => {
  const [mainTitle, setMainTitle] = useState(""); // New main title state
  const [description, setDescription] = useState(""); // New description state
  const [steps, setSteps] = useState([{ description: "", price: "" }]);
  const [error, setError] = useState("");

  const addStep = () => {
    setSteps([...steps, { description: "", price: "" }]);
  };

  const removeStep = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index);
    setSteps(newSteps);
  };

  const handleSubmit = () => {
    // Validation
    if (
      !mainTitle.trim() ||
      !description.trim() ||
      steps.some((step) => !step.description.trim() || !step.price)
    ) {
      setError("Please fill in all fields before submitting.");
      return;
    }

    const storedTasks = localStorage.getItem("tasks");
    const tasks = storedTasks ? JSON.parse(storedTasks) : []; // Handle null case
    const task = { title: mainTitle, description, steps }; // Include description in the task object

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Clear the form fields
    setMainTitle("");
    setDescription("");
    setSteps([{ description: "", price: "" }]);
    setError(""); // Clear any previous errors
    alert("Task created successfully!");
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Create a New Task
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <input
        type="text"
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        placeholder="Main Task Title"
        value={mainTitle}
        onChange={(e) => setMainTitle(e.target.value)}
      />
      <textarea
        className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {steps.map((step, index) => (
        <div key={index} className="mb-6">
          <input
            type="text"
            className="w-full p-3 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder={`Step ${index + 1} Description`}
            value={step.description}
            onChange={(e) => {
              const newSteps = [...steps];
              newSteps[index].description = e.target.value;
              setSteps(newSteps);
            }}
          />
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Price"
            value={step.price}
            onChange={(e) => {
              const newSteps = [...steps];
              newSteps[index].price = e.target.value;
              setSteps(newSteps);
            }}
          />
          <button
            className="mt-2 text-red-500"
            onClick={() => removeStep(index)}
          >
            Remove Step
          </button>
        </div>
      ))}
      <button
        className="w-full px-4 py-2 mb-4 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition"
        onClick={addStep}
      >
        Add Another Step
      </button>
      <button
        className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition"
        onClick={handleSubmit}
      >
        Submit Task
      </button>
    </div>
  );
};

export default TaskForm;
