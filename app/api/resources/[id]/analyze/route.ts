import { GoogleGenAI } from "@google/genai";
import { fetchResourceById } from "@/services/resourceService";

const ai = new GoogleGenAI({
apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(
_request: Request,
{ params }: { params: Promise<{ id: string }> }
) {
try {
const { id } = await params;

const resource = await fetchResourceById(id);  

if (!resource) {  
  return Response.json(  
    { error: "Resource not found" },  
    { status: 404 }  
  );  
}  

const prompt = `

Analyze this student resource and return:

1. A short, clear summary.


2. The most important key points.



Keep the response useful and easy for a student to understand.
`;

const response = await ai.models.generateContent({  
  model: "gemini-3.5-flash",  
  contents: [  
    {  
      fileData: {  
        fileUri: resource.fileUrl,  
        mimeType: "application/pdf",  
      },  
    },  
    {  
      text: prompt,  
    },  
  ],  
  config: {  
    responseMimeType: "application/json",  
    responseSchema: {  
      type: "object",  
      properties: {  
        summary: {  
          type: "string",  
        },  
        keyPoints: {  
          type: "array",  
          items: {  
            type: "string",  
          },  
        },  
      },  
      required: ["summary", "keyPoints"],  
    },  
  },  
});  

if (!response.text) {  
  throw new Error("Gemini returned an empty response");  
}  

const analysis = JSON.parse(response.text);  

return Response.json({ analysis });

} catch (error) {
console.error("Resource analysis failed:", error);

 return Response.json(  
  { error: "Failed to analyze resource" },  
  { status: 500 }  
  );
 }
}