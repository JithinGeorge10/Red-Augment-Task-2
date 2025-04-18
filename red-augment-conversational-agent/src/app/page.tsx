'use client';
import React, { useState, useEffect, useRef } from "react";
import { Send, X, RefreshCw, Minus, Mic } from "lucide-react";

type CardItem = {
  title: string;
  imageSrc: string;
  price: string;
};

type Message = {
  from: "bot" | "user";
  text?: string;
  type?: "text" | "card" | "card-group";
  imageSrc?: string;
  cards?: CardItem[];
};

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}


const ChatApp = () => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: "Welcome to Halleck Vineyard fellow wine enthusiast! I am Halle, your Virtual Concierge and Wine Educator, here to be your guide. Ask me anything about Wine & Halleck.",
    },
    { from: "bot", text: "Taste our wines" },
    { from: "bot", text: "Explore our Memberships" },
    { from: "bot", text: "Shop your wines" },
    { from: "bot", text: "Events" },
    { from: "bot", text: "Ask a question" },
  ]);
  const [input, setInput] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    handleOptionClick(input);
    setInput("");
  };
  const handleMic = () => {


    //since azure says You're not eligible for an Azure free account

    //i am using webkitSpeechRecognition

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const spokenText = event.results[0][0].transcript;
      console.log("User said:", spokenText);
      handleOptionClick(spokenText)
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
    };

    recognition.start();
  };


  const handleOptionClick = (text: string) => {
    const userMessage: Message = { from: "user", text };
    setMessages((prev) => [...prev, userMessage]);

    if (text === "Taste our wines" || text === 'taste our wines') {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Here are some experiences you shouldn't miss: Join us at our Halleck Estate for a sublime tasting experience.",
          type: "card",
          imageSrc: "/tasteWine.png",
        },
      ]);
    } else if (text === "Shop your wines" || text === "shop your wines") {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "We have so many good wines so let's figure out your preference. Is there something specific you are looking for? You can choose any of the options below or type your favorite",
        },
        { from: "bot", text: "North Coast" },
        { from: "bot", text: "Russian river valley" },
        { from: "bot", text: "Sonoma Coast" },
        { from: "bot", text: "Sonoma Mountain" },
      ]);
    } else if (
      ["North Coast", 'north coast', "Russian river valley", 'russian river valley', "Sonoma Coast", 'sonoma coast', "Sonoma Mountain", 'sonoma mountain'].includes(text)
    ) {
      // Add card group horizontally scrollable
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: `Here are some wines from ${text}:`,
        },
        {
          from: "bot",
          type: "card-group",
          cards: [
            {
              title: "Pinot Noir",
              imageSrc: "/wine1.png",
              price: "$45",
            },
            {
              title: "Chardonnay",
              imageSrc: "/wine2.png",
              price: "$38",
            },
            {
              title: "Zinfandel",
              imageSrc: "/wine2.png",
              price: "$50",
            },
            {
              title: "Zinfandel",
              imageSrc: "/wine1.png",
              price: "$50",
            },
            {
              title: "Zinfandel",
              imageSrc: "/wine2.png",
              price: "$50",
            },
          ],
        },
      ]);
    } else if (text === "Events" || text === 'events') {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Here are some Upcoming Events. If You want to Explore more you can click on the link",
        },
        {
          from: "bot",
          type: "card-group",
          cards: [
            {
              title: "Wine Tour Adventure",
              imageSrc: "/tour1.png",
              price: "$20,889.00/p",
            },
            {
              title: "Vineyard Harvest Party",
              imageSrc: "/tour2.png",
              price: "$145p",
            },
            {
              title: "Wine Tour Adventure",
              imageSrc: "/tour1.png",
              price: "$20,889.00/p",
            },
          ],
        },
      ]);
    }

    else if (text === "Explore our Memberships" || text === 'explore our memberships') {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "We have so many Membership tailored to your taste. You can choose any of the options below",
        },
        { from: "bot", text: "6 Bottle Club" },
        { from: "bot", text: "12 Bottle Club" }
      ]);
    } else if (
      ["12 Bottle Club", "6 Bottle Club", '12 bottle club', '6 bottle club'].includes(text)
    ) {
      // Add card group horizontally scrollable
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: `We have so many Membership tailored to your taste. You can choose any of the options below`,
        },
        {
          from: "bot",
          type: "card-group",
          cards: [
            {
              title: "Pinot Noir only",
              imageSrc: "/wine1.png",
              price: "$325",
            },
            {
              title: "Pinot Noir only",
              imageSrc: "/wine1.png",
              price: "$325",
            },

          ],
        },
      ]);
    }









  };

  return (
    <div className="max-w-sm mx-auto h-screen flex flex-col border shadow-lg overflow-hidden">
      <div className="flex items-center justify-between p-3 text-black" style={{ backgroundColor: "#ecded2" }}>
        <img src="/nav-logo.png" alt="Halleck Logo" className="h-12" />
        <div className="flex gap-2">
          <RefreshCw size={18} className="cursor-pointer" />
          <Minus size={18} className="cursor-pointer" />
          <X size={18} className="cursor-pointer" />
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-cover bg-center rounded-t-2xl overflow-hidden" style={{ backgroundImage: "url('/chat-bg.png')" }}>
        <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col-reverse">
          <div className="flex flex-col">
            {messages.map((msg, index) => {
              if (msg.type === "card-group" && msg.cards) {
                return (
                  <div key={index} className="overflow-x-auto whitespace-nowrap space-x-4 flex py-3">
                    {msg.cards.map((card, idx) => (
                      <div
                        key={idx}
                        className="inline-block w-48 bg-white rounded-lg shadow-lg mr-2"
                      >
                        <img
                          src={card.imageSrc}
                          alt={card.title}
                          className="w-full h-32 object-cover rounded-t-lg"
                        />
                        <div className="p-2">
                          <h4 className="text-sm text-black font-semibold">{card.title}</h4>
                          <p className="text-xs text-gray-600">{card.price}</p>
                          <button className="mt-2 bg-orange-400 text-white text-xs px-3 py-1 rounded">Buy Now</button>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }

              return (
                <div
                  key={index}
                  className={`max-w-[80%] px-4 py-2 rounded-xl text-sm my-1 
                    ${msg.from === "user"
                      ? "bg-blue-100 text-blue-900 self-end ml-auto"
                      : "bg-gray-200 text-black self-start cursor-pointer"}`}
                  onClick={() =>
                    msg.from === "bot" &&
                      msg.text && [
                        "Taste our wines",
                        "Explore our Memberships",
                        "Shop your wines",
                        "Events",
                        "Ask a question",
                        "North Coast",
                        "Russian river valley",
                        "Sonoma Coast",
                        "Sonoma Mountain",
                      ].includes(msg.text)
                      ? handleOptionClick(msg.text ?? "")
                      : undefined
                  }
                >
                  {msg.type === "card" ? (
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <div className="relative">
                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-30 rounded-t-lg"></div>
                        <img
                          src={msg.imageSrc}
                          alt="Wine Tasting"
                          className="w-full h-40 object-cover rounded-t-lg"
                        />
                        <div className="absolute top-2 right-2 bg-white text-black px-2 py-1 text-sm rounded-lg shadow">
                          $65/person
                        </div>
                        <div className="absolute bottom-2 left-2 bg-white text-black px-2 py-1 text-xs rounded-lg shadow">
                          Sonoma Wine Tasting
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-700">
                        <ul className="list-inside list-disc text-gray-600">
                          <li>20 guests max per wine tasting</li>
                          <li>Open Thursday thru Sunday</li>
                          <li>Seated wine tastings at 11 am & 3 pm</li>
                          <li>Reservations Required</li>
                          <li>$78pp for groups of 7-12</li>
                        </ul>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <button className="bg-white text-black px-4 py-2 text-sm rounded-lg shadow transition">
                          Reserve
                        </button>
                      </div>
                    </div>
                  ) : (
                    msg.text
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="p-3 border-t bg-white flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask me anything..."
            className="flex-1 bg-gray-100 border-gray-300 rounded text-black px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend} className="text-[#574D39] hover:text-[#574D39] transition">
            <Send size={20} className="fill-[#574D39]" />
          </button>
          <button onClick={handleMic} className="text-[#574D39] hover:text-[#574D39] transition">
            <Mic size={20} className="fill-[#574D39]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
