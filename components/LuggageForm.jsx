"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const LuggageForm = ({ onAddItem, isLoading }) => {
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !destination.trim()) {
      setError("Please fill in both fields");
      return;
    }

    setError("");

    try {
      await onAddItem(name, destination);
      setName("");
      setDestination("");
    } catch (error) {
      setError("Failed to add item. Please try again.");
      console.error("Error adding luggage item:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Luggage Item</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-500 p-2 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Item Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Backpack, Suitcase"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="destination" className="text-sm font-medium">
              Destination
            </label>
            <Input
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g., Dubai, Abu Dhabi"
              disabled={isLoading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center gap-2">
                <LoadingSpinner size="small" />
                Adding...
              </span>
            ) : (
              "Add Item"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export { LuggageForm };
