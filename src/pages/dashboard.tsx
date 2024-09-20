import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("create");

  const tabItems = [
    { title: "Create Task", value: "create" },
    { title: "My Tasks", value: "my-tasks" },
  ];

  return (
    <div className="min-h-screen bg-white p-4">
      <Tabs.Root
        className="max-w-screen-xl mt-2 mx-auto px-4 md:px-8"
        value={activeTab}
        onValueChange={(val: any) => setActiveTab(val as string)}
      >
        <Tabs.List
          className="hidden bg-gray-100 py-1.5 px-2.5 rounded-lg gap-x-3 overflow-x-auto text-sm sm:flex"
          aria-label="Manage your tasks"
        >
          {tabItems.map((item) => (
            <Tabs.Trigger
              key={item.value}
              className="data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm py-1.5 px-3 rounded-lg duration-150 text-gray-500 hover:text-indigo-600 hover:bg-white active:bg-white/50 font-medium"
              value={item.value}
            >
              {item.title}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <div className="relative text-gray-500 sm:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="pointer-events-none w-5 h-5 absolute right-2 inset-y-0 my-auto"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
          <select
            value={activeTab}
            className="py-2 px-3 w-full bg-transparent appearance-none outline-none border rounded-lg shadow-sm focus:border-indigo-600 text-sm"
            onChange={(e) => setActiveTab(e.target.value)}
          >
            {tabItems.map((item) => (
              <option key={item.value} value={item.value}>
                {item.title}
              </option>
            ))}
          </select>
        </div>

        {tabItems.map((item) => (
          <Tabs.Content key={item.value} className="py-6" value={item.value}>
            {item.value === "create" && <TaskForm />}
            {item.value === "my-tasks" && <TaskList />}
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
  );
};

export default Dashboard;
