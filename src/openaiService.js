import OpenAI from "openai";

export const initOpenAI = () => {
  const apiKey = localStorage.getItem("apiKey");

  if (!apiKey) {
    throw new Error(
      "No API key found. Please set your API key in settings first",
    );
  } else {
    console.log(apiKey);
  }

  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });
  return openai;
};
