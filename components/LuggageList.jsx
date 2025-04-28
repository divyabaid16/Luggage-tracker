"use client";

import { motion, AnimatePresence } from "framer-motion";
import LuggageItem from "./LuggageItem";

const LuggageList = ({ items, onDeleteItem, isLoading }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No luggage items yet. Add your first item above!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <LuggageItem
              item={item}
              onDelete={onDeleteItem}
              isLoading={isLoading}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export { LuggageList };
