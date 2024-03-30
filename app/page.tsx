"use client";

import { useRouter } from "next/navigation";
import { TextareaAutosize } from "@mui/material";
import { Container, Loader } from "@mantine/core";
import { useEffect, useRef, useState } from "react";

// Components
import scrollToBottom from "@lib/autoScrollResponse";
import generateResponse from "@lib/generateResponse";

const page = () => {
  // States
  const [userInput, setUserInput] = useState("");
  const [questionsAndResponses, setQuestionsAndResponses] = useState<
    { user: string; ai: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  // Ref
  const containerRef = useRef<HTMLDivElement>(null);

  // Render the User Input and AI Response to Chat Box
  const addQuestionResponse = (user: string, ai: string = ""): void => {
    setQuestionsAndResponses((prev: { user: string; ai: string }[]) => [
      ...prev,
      { user, ai },
    ]);
  };

  // If the user sent the Input then clear the textarea
  const clearInputAndAiTyping = () => {
    setUserInput("");
  };

  // HandleUserInput
  const handleUserInput = async () => {
    try {
      setIsLoading(true);

      // Render User Input to the chat Box
      addQuestionResponse(userInput);

      // Get the User Input
      const KaalamanAIResponse = await generateResponse(userInput);

      // Render AI response to the chat Box
      addQuestionResponse("", KaalamanAIResponse);

      // Clear User Input After Processing Imidiately
      clearInputAndAiTyping();
    } catch (error) {
      console.error("Error Fetching AI Response:", error);

      // Clear user input if there's an error
      clearInputAndAiTyping();
    } finally {
      setIsLoading(false);
    }
  };

  // HandleKeyboardEvent
  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // If Enter key is pressed without Shift, submit the message
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      // Check if user input is not empty
      if (userInput.trim() !== "") {
        handleUserInput();
        // Clear user input after submission
        setUserInput("");
      }
    }
  };

  // AutoScrollResponse
  useEffect(() => {
    scrollToBottom(containerRef);
  }, [questionsAndResponses]);

  return (
    <Container
      fluid
      className="flex flex-col h-screen items-center gap-10 mx-auto p-4 justify-center relative"
    >
      {/* Content Rendering */}
      <Container
        id="responseContainer"
        fluid
        className="flex-grow justify-center overflow-y-auto pb-[9rem] p-auto m-auto px-6 w-full"
        ref={containerRef}
      >
        {questionsAndResponses.map(({ user, ai }, index) => (
          <Container key={index} maw={865}>
            {user && (
              <div className="text-gray-600 mb-2">
                <pre style={{ whiteSpace: "pre-wrap" }}>
                  <code>
                    <h1 className="text-xl text-sky-400 font-bold">YOU</h1>
                    <p className="text-gray-400	 text-lg">{user}</p>
                  </code>
                </pre>
              </div>
            )}
            {ai && (
              <div className="text-gray-700 mb-2">
                <pre style={{ whiteSpace: "pre-wrap" }}>
                  <code>
                    <h1 className="text-xl text-sky-400 font-bold">
                      KAALAMAN-AI
                    </h1>
                    <p className="text-gray-400 text-lg ai-message">{ai}</p>
                  </code>
                </pre>
              </div>
            )}
          </Container>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="mt-4 text-gray-700 flex items-center max-w-[865px] gap-1 m-auto">
            <p className="text-text animate-thinker pl-[15px] bold">
              KAALAMAN-AI IS THINKING
            </p>
            <Loader
              className="m-[5px]"
              color="#3ee1ed"
              size="15px"
              type="bars"
            />
          </div>
        )}
      </Container>

      {/* User Input Section */}
      <div className="fixed bottom-0 left-0 w-full flex justify-center pb-[10px] px-2">
        <div className="flex-grow flex items-center px-3 py-2 rounded-lg bg-slate-800 max-w-[865px] w-full">
          <TextareaAutosize
            id="chat"
            value={userInput}
            name="userInput"
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
            disabled={isLoading}
            onKeyDown={handleKeyPress}
            className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ask KAALAMAN-AI"
          />
          {isLoading ? (
            <Loader color="red" size="15px" />
          ) : (
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleUserInput();
                setUserInput("");
              }}
              className={`inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-60 `}
            >
              <svg
                className="w-5 h-5 rotate-90 rtl:-rotate-90"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
              </svg>
              <span className="sr-only">Send message</span>
            </button>
          )}
        </div>
      </div>
    </Container>
  );
};

export default page;
