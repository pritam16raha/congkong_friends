"use client";

import React, { useState } from "react";

type Action =
  | "ADD_PARTICIPANTS"
  | "CREATE_MEETING"
  | "CREATE_MATCHES"
  | "ADD_ACTIVITY_LOGS"
  | "DELETE_ALL_DATA";

export const SeedingControlPanel = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSeed = async (action: Action) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/seed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message || "Action completed successfully!");
      } else {
        throw new Error(result.error || "An unknown error occurred.");
      }
    } catch (err) {
      setMessage(
        `Error: ${
          err instanceof Error
            ? err.message
            : "Action can not be completed successfully!"
        }`
      );
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
      <h3 className="font-bold mb-4 text-lg text-gray-800">
        Demo Data Insert Form For testing
      </h3>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => handleSeed("ADD_PARTICIPANTS")}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Working..." : "Add 10 Participants"}
        </button>
        <button
          onClick={() => handleSeed("CREATE_MEETING")}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:bg-gray-400"
        >
          {loading ? "Working..." : "Create a Meeting"}
        </button>
        <button
          onClick={() => handleSeed("CREATE_MATCHES")}
          disabled={loading}
          className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 disabled:bg-gray-400"
        >
          {loading ? "Working..." : "Add 20 Matches"}
        </button>
        <button
          onClick={() => handleSeed("ADD_ACTIVITY_LOGS")}
          disabled={loading}
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 disabled:bg-gray-400"
        >
          {loading ? "Working..." : "Add Activity Logs"}
        </button>

        <button
          onClick={() => handleSeed("DELETE_ALL_DATA")}
          disabled={loading}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:bg-gray-400"
        >
          {loading ? "Working..." : "Clear All Data"}
        </button>
      </div>
      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
    </div>
  );
};
