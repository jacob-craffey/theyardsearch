import OpenAI from "openai";
import { Pinecone, QueryResponse } from "@pinecone-database/pinecone";
import { SearchResult } from "../types/SearchResult";

export class SearchService {
  private openai: OpenAI;
  private pinecone: Pinecone;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
  }

  async search(query: string, topK: number = 5): Promise<SearchResult[]> {
    // Generate embedding for the search query
    const embedding = await this.createEmbedding(query);

    // Query Pinecone
    const index = this.pinecone.Index(process.env.PINECONE_INDEX!);
    const queryResponse = await index.query({
      vector: embedding,
      topK,
      includeMetadata: true,
    });

    return queryResponse.matches as unknown as SearchResult[];
  }

  private async createEmbedding(text: string): Promise<number[]> {
    const response = await this.openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text,
    });

    return response.data[0].embedding;
  }
}
