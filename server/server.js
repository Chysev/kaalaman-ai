import path from "path";
import Fastify from "fastify";
import cors from "@fastify/cors";
import CustomChatPromptWrapper from "./promptWrapperChat.js";
import {
  LlamaModel,
  LlamaContext,
  LlamaChatSession,
  LlamaChatPromptWrapper,
} from "node-llama-cpp";

// Initialize
const wrapper = new CustomChatPromptWrapper();
const fastify = Fastify({
  logger: true,
});

// Cross Origin
fastify.register(cors);

// Models
const Models = {
  llama2_7b_chat_Q8: "llama-2-7b-chat.Q8_0.gguf", // Requires higher specs
  codellama_7b_Q8: "codellama-7b.Q8_0.gguf", // Requires higher specs
  mistral_7b_instruct_Q8: "mistral-7b-instruct-v0.2.Q8_0", // Requires higher specs
  orca2_7b_Q8: "orca-2-7b.Q8_0.gguf", // Requires higher specs
};

const Models2 = {
  llama2_7b_chat_Q4: "llama-2-7b-chat.Q4_0.gguf", // Mid-low higher specs
  codellama_7b_Q4: "codellama-7b.Q4_0.gguf", // Mid-low higher specs
  mistral_7b_instruct_Q4: "mistral-7b-instruct-v0.2.Q4_0", // Mid-low higher specs
  orca2_7b_Q4: "orca-2-7b.Q4_0.gguf", // Mid-low higher specs
};

// Model Path
const model = new LlamaModel({
  modelPath: path.join(
    process.cwd(),
    "../../../../GGUFMODELS",
    Models.llama2_7b_chat_Q8
  ),
});

// New Chat Session
const context = new LlamaContext({ model });
const session = new LlamaChatSession({
  context,
  promptWrapper: new LlamaChatPromptWrapper(), // Replace this with LlamaChatPromptWrapper if you're using Llama2 model. If not, use the custom one and alter it in line with the prompt structure model.
});

fastify.post("/api/kaalaman", async function handler(request, reply) {
  try {
    const { userInput } = request.body;

    if (!userInput) return;

    const KaalamanAIResponse = await session.prompt(userInput);

    await reply.code(200).send({ KaalamanAIResponse });
  } catch (error) {
    console.error("Error: " + error);
  }
});

try {
  fastify.listen({ port: 3001 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
