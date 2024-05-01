import { ReactComponent as SettingsIcon } from "./SettingsIcon.svg";
import React, { useState, useRef, useEffect } from "react";

export const Settings = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");
  const panelRef = useRef(null);

  useEffect(() => {
    // Function to check if clicked outside
    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        // If the click is outside the panel, set genText to empty or perform other actions to hide the panel
        setIsPanelOpen(!isPanelOpen);
        setError("");
      }
    }

    // Add click event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [panelRef, isPanelOpen]);

  const handleSave = () => {
    // Basic validation: check if the API key is not empty.
    // Replace this with your actual validation logic
    if (apiKey.trim() === "") {
      setError("API Key is invalid.");
      return;
    }
    localStorage.setItem("apiKey", apiKey); // Save the API key to local storage
    setIsPanelOpen(false); // Close the panel
    setError(""); // Reset any error messages
  };

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
    setError(""); // Clear error when panel is toggled
  };

  return (
    <div className="flex space-x-6 text-black text-xs relative justify-end items-end">
      <button onClick={togglePanel} className="z-10">
        <SettingsIcon className="w-6 h-6 text-black" />
      </button>
      {isPanelOpen && (
        <div
          ref={panelRef}
          className="fixed top-0 right-1 mt-14 p-4 w-96 z-20 rounded-lg bg-white/10 shadow-xl border-4 border-gray-700 backdrop-blur-[25px] border-opacity-30"
        >
          <label
            htmlFor="apiKeyInput"
            className="block text-sm font-medium text-gray-200"
          >
            API Key
          </label>
          <input
            id="apiKeyInput"
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-200 rounded-md bg-white/30 backdrop-blur-md border-opacity-20 text-gray-800"
          />
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          <button
            onClick={handleSave}
            className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};
