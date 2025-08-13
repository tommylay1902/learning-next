"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function Home() {
  const [connectionStatus, setConnectionStatus] = useState("Connecting....");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const eventSource = new EventSource("/api/sse");
    eventSource.onopen = () => {
      setConnectionStatus("Connected");
    };
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data.message]);
    };
    eventSource.onerror = () => {
      setConnectionStatus("Connecting...");
    };
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-800">
      <header className="px-8 py-6 border-b bg-white dark:bg-gray-800 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Web Analytics Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400">{connectionStatus}</p>
        </div>
      </header>

      <div className="flex  justify-center text-center mt-3">
        <Card className="max-h-[30vh] min-w-[25vw] overflow-y-scroll">
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <CardDescription>Messages sent from the server</CardDescription>
          </CardHeader>
          <CardContent>
            {messages.map((message, index) => (
              <p key={index}>{message}</p>
            ))}
          </CardContent>
        </Card>
      </div>
      <div className="p-8 flex justify-center items-center justify-items-center">
        <h3 className="text-xl font-bold">
          Messages from Server: {messages.length}
        </h3>
      </div>
    </div>
  );
}
