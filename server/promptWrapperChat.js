// Defaults
import { ChatPromptWrapper } from "node-llama-cpp";

// Use ChatML for Orca and Capybara Hermes
const ChatML = {
  getStopStrings: "<|im_start|>user\n<|im_end|>",
  getDefaultStopString: "<|im_start|>user\n<|im_end|>",
};

const Mistral = {
  getStopStrings: "[INST][/INST]",
  getDefaultStopStrings: "[INST][/INST]",
};

const CodeLlama = {
  getStopStrings: "[INST] [/INST]",
  getDefaultStopStrings: "[INST] [/INST]",
};

// Modify accordance to model prompt
class CustomChatPromptWrapper extends ChatPromptWrapper {
  constructor() {
    super();
    // Wrapper name
    this.wrapperName = "CustomChatPromptWrapper";
  }

  // Wrap the prompt with appropriate prefixes
  wrapPrompt(prompt, { systemPrompt, promptIndex }) {
    // Templates
    const ChatML = {
      ChatML: `<|im_start|>system${systemPrompt}\n<|im_end|>\n<|im_start|>user${prompt}\n<|im_end|>\n<|im_start|>assistant\n<|im_end|>`,
      ElseChatML: `<|im_start|>user${prompt}\n<|im_end|>\n<|im_start|>assistant\n<|im_end|>`,
    };
    const Mistral = {
      Mistral: `<s>[INST] ${systemPrompt} [INST] ${prompt} [/INST] </s>`,
      ElseMistral: `[INST]${prompt}[/INST]</s>`,
    };

    const CodeLlama = {
      CodeLlama: `[INST] ${systemPrompt}\n[INST] ${prompt} [/INST]\n\n`,
      ElseCodeLlama: `[INST] ${prompt} [/INST]\n`,
    };

    if (promptIndex === 0) {
      return ChatML.ChatML;
    } else {
      return ChatML.ElseChatML;
    }
  }

  getStopStrings() {
    return [ChatML.getStopStrings];
  }

  getDefaultStopString() {
    return ChatML.getDefaultStopString;
  }
}

export default CustomChatPromptWrapper;
