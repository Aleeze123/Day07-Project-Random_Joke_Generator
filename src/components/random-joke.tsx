"use client"; 
// Import necessary hooks from React
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
interface JokeResponse {
  setup: string;
  punchline: string;
}
export default function RandomJoke() {
  const [joke, setJoke] = useState<string>("");
  useEffect(() => {
    fetchJoke();
  }, []); 
  async function fetchJoke(): Promise<void> {
    try {
      // Make a GET request to the joke API
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      const data: JokeResponse = await response.json();
      setJoke(`${data.setup} - ${data.punchline}`);
    } catch (error) {
      console.error("Error fetching joke:", error);
      setJoke("Failed to fetch joke. Please try again.");
    }
  }
  // rendering the random joke UI
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('/bg.jfif')" }}>
 
      <div className="bg-transparent rounded-2xl shadow-lg p-8 w-full max-w-md">
       
        <h1 className="text-3xl font-bold mb-4 text-[black]">
          😂 Random Joke 
        </h1>
        {/* loading message */}
        <div className="bg-gradient from-yellow-400 to-orange-400 rounded-lg p-6 mb-6 text-black text-lg">
          {joke || "Loading..."}
        </div>
        <Button
          onClick={fetchJoke}
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
        >
          😂 Get New Joke 😂
        </Button>
      </div>
    </div>


  );
}