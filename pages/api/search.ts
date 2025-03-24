import { NextApiRequest, NextApiResponse } from "next";
import { SearchService } from "../../services/SearchService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { query } = req.body;
    const searchService = new SearchService();
    const results = await searchService.search(query);

    res.status(200).json({ results });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
