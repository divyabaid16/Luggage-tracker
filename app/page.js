"use client"

import { useState, useEffect } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { LuggageForm } from "@/components/LuggageForm"
import { LuggageList } from "@/components/LuggageList"

const Home = () => {
  const [luggageItems, setLuggageItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [addLoading, setAddLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  useEffect(() => {
    const loadItems = () => {
      try {
        const storedItems = localStorage.getItem("luggageItems")
        if (storedItems) {
          setLuggageItems(JSON.parse(storedItems))
        }
      } catch (error) {
        console.error("Error loading items:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadItems()
  }, [])

  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem("luggageItems", JSON.stringify(luggageItems))
      } catch (error) {
        console.error("Error saving items:", error)
      }
    }
  }, [luggageItems, isLoading])

  const addLuggageItem = async (name, destination) => {
    setAddLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 800))

      const newItem = {
        id: crypto.randomUUID(),
        name,
        destination,
        createdAt: Date.now(),
      }

      setLuggageItems((prev) => [newItem, ...prev])
    } finally {
      setAddLoading(false)
    }
  }

  const deleteLuggageItem = async (id) => {
    setDeleteLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 800))

      setLuggageItems((prev) => prev.filter((item) => item.id !== id))
    } finally {
      setDeleteLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-center mb-8">Luggage Tracker</h1>

      <LuggageForm onAddItem={addLuggageItem} isLoading={addLoading} />

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Your Luggage Items</h2>
        <LuggageList items={luggageItems} onDeleteItem={deleteLuggageItem} isLoading={deleteLoading} />
      </div>
    </main>
  )
}

export default Home
