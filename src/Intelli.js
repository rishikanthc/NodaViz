import { ReactComponent as AiIcon } from "./AiIcon.svg";
import { ReactComponent as CopyIcon } from "./CopyIcon.svg";
import { AppContext } from "./App";
import React, { useContext, useState, useRef } from "react";
import { initOpenAI } from "./openaiService";
import { useEffect } from "react";

export const Intelli = () => {
  const { allText } = useContext(AppContext);
  const [genText, setGenText] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const panelRef = useRef(null);
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);

  const isEmpty = allText ? !(allText.length > 0) : true;

  useEffect(() => {
    // Function to check if clicked outside
    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        // If the click is outside the panel, set genText to empty or perform other actions to hide the panel
        setGenText("");
      }
    }

    // Add click event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [panelRef]);

  const clickHandler = () => {
    console.log("Intelli clicked");
    const openai = initOpenAI();
    setIsLoading(true);
    const getCompletions = async () => {
      try {
        const completion = await openai.chat.completions.create({
          messages: [
            {
              role: "system",
              content:
                "You are a knowledgeable scholar who can summarize complex topics with ease",
            },
            {
              role: "user",
              content:
                "You are given a paragraph of text on a topic. The sentences are not necessarily in order. I would like you to reorder them in the correct order which makes semantic sense and then collect all points into a single cohesive paragraph. Here's the text:" +
                allText,
            },
          ],
          model: "gpt-3.5-turbo",
        });
        // console.log(completion.choices[0].message.content);
        return completion.choices[0].message.content;
      } catch (error) {
        console.error("Failed to get completions:", error);
      }
    };

    getCompletions().then((generated) => {
      console.log(generated);
      setGenText(generated);
      setIsLoading(false);
    });
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(genText);
      setShowCopyFeedback(true); // Show 'Copied' feedback
      setTimeout(() => {
        setShowCopyFeedback(false); // Hide feedback
      }, 1000); // Adjust time as needed
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const isNull = genText === "" ? true : false;

  return (
    <div>
      <div className="flex space-x-6 text-black text-xs">
        <button disabled={isEmpty} onClick={clickHandler}>
          {isEmpty ? (
            <AiIcon className="w-6 h-6 text-gray-700" />
          ) : (
            <AiIcon
              className={`w-6 h-6 ${isLoading ? "animateIcon" : "text-black"}`}
            />
          )}
        </button>
      </div>
      {!isNull && (
        <div
          ref={panelRef}
          className="fixed top-0 right-1 mt-14 p-4 w-[32rem] h-auto max-h-[32rem] rounded-lg bg-white/5 shadow-lg border-4 border-gray-700 backdrop-blur-[15px] border-opacity-20 overflow-auto"
        >
          <div className="w-full mb-7">
            <button onClick={handleCopyText} className="absolute top-4 right-4">
              <CopyIcon className="w-6 h-6 text-gray-200" />
              {showCopyFeedback && (
                <div
                  className="absolute -top-5 right-0 bg-black text-white py-1 px-2 rounded text-xs transition-opacity duration-300 ease-out z-50"
                  style={{ opacity: showCopyFeedback ? 1 : 0 }}
                >
                  Copied!
                </div>
              )}
            </button>
          </div>
          <div className="text-gray-200">{genText}</div>
        </div>
      )}
    </div>
  );
};
