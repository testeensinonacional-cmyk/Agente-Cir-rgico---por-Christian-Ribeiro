import { GoogleGenAI, Chat, GenerativeModel, Modality } from "@google/genai";
import { SYSTEM_INSTRUCTION, PODCAST_PROMPT } from '../constants';

let client: GoogleGenAI | null = null;
let chatSession: Chat | null = null;

// Audio context for playback
let audioContext: AudioContext | null = null;
let currentSource: AudioBufferSourceNode | null = null;

// Initialize the API client
export const initializeGemini = () => {
  if (!process.env.API_KEY) {
    console.error("API_KEY is missing from environment variables");
    return;
  }
  client = new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const startChatSession = async (): Promise<void> => {
  if (!client) initializeGemini();
  if (!client) throw new Error("Failed to initialize Gemini Client");

  try {
    // Using gemini-2.5-flash for reliable low-latency responses.
    const modelId = 'gemini-2.5-flash'; 
    
    chatSession = client.chats.create({
      model: modelId,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, // Balance between creative scripts and strict methodology
      },
    });
  } catch (error) {
    console.error("Error creating chat session:", error);
    throw error;
  }
};

export const sendMessage = async (message: string): Promise<string> => {
  if (!chatSession) {
    await startChatSession();
  }
  if (!chatSession) throw new Error("Chat session not initialized");

  try {
    const response = await chatSession.sendMessage({ message });
    return response.text || "Desculpe, não consegui processar a resposta.";
  } catch (error) {
    console.error("Error sending message:", error);
    return "Erro de conexão com o Christian Bot. Verifique sua chave de API ou tente novamente.";
  }
};

// --- PODCAST / AUDIO GENERATION ---

// Helper to stop current audio if playing
export const stopAudio = () => {
  if (currentSource) {
    currentSource.stop();
    currentSource = null;
  }
};

// Function to generate podcast audio
export const playFullPodcastEpisode = async (): Promise<void> => {
    if (!client) initializeGemini();
    if (!client) throw new Error("Gemini Client not initialized");

    try {
        // 1. Generate the speech audio directly using the prompt
        // Using tts model
        const response = await client.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: PODCAST_PROMPT }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Kore' }, // A strong, clear voice
                    },
                },
            },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

        if (!base64Audio) {
            throw new Error("No audio data received from Gemini");
        }

        // 2. Decode and play audio
        if (!audioContext) {
            audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }

        // Stop any currently playing audio
        stopAudio();

        const audioBuffer = await decodeAudioData(
            decode(base64Audio),
            audioContext,
            24000,
            1 
        );

        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.start();
        currentSource = source;

        // Add onended event if needed to update UI state, but for now user handles via UI toggle
        
    } catch (error) {
        console.error("Error generating podcast:", error);
        throw error;
    }
};

// --- AUDIO UTILS (From Google GenAI Docs) ---

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}