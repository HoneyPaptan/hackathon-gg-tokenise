import React, { useState } from "react";

interface Step {
  description: string;
  price: string;
}

interface StepCompletionModalProps {
  steps: Step[];
  onClose: () => void;
}

const StepCompletionModal: React.FC<StepCompletionModalProps> = ({
  steps,
  onClose,
}) => {
  const [selectedStepIndex, setSelectedStepIndex] = useState<number | null>(
    null
  );
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (selectedStepIndex !== null && file) {
      // Here, you would typically handle the file upload and other logic
      // For demo purposes, we just show a success message
      setMessage("Submitted! You will be contacted by the admin soon.");
      setFile(null); // Reset file input
      setSelectedStepIndex(null); // Reset selected step
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
        <h2 className="text-xl font-semibold mb-4">Complete a Step</h2>
        {message && <p className="text-green-500 mb-4">{message}</p>}
        <div className="mb-4">
          <label className="block mb-2">Select a Step:</label>
          <select
            value={selectedStepIndex ?? ""}
            onChange={(e) => setSelectedStepIndex(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>
              Select a step
            </option>
            {steps.map((step, index) => (
              <option key={index} value={index}>
                {step.description}
              </option>
            ))}
          </select>
        </div>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="mb-4"
        />
        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
        <button
          onClick={onClose}
          className="w-full mt-2 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default StepCompletionModal;
