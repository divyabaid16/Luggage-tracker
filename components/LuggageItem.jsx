"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { LoadingSpinner } from "./ui/loading-spinner";

const LuggageItem = ({ item, onDelete, isLoading }) => {
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-gray-500">
              Destination: {item.destination}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Added: {formatDate(item.createdAt)}
            </p>
          </div>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => onDelete(item.id)}
            disabled={isLoading}
            className="h-8 w-8"
            aria-label={`Delete ${item.name}`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <LoadingSpinner size="small" />
              </span>
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LuggageItem;
