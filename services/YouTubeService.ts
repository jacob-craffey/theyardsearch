import axios from "axios";

export class YouTubeService {
  private apiKey = process.env.YOUTUBE_API_KEY;
  private baseUrl = "https://www.googleapis.com/youtube/v3";

  async getVideoTitle(videoId: string): Promise<string> {
    try {
      const response = await axios.get(`${this.baseUrl}/videos`, {
        params: {
          part: "snippet",
          id: videoId,
          key: this.apiKey,
        },
      });

      if (response.data.items && response.data.items.length > 0) {
        return response.data.items[0].snippet.title;
      }
      return "";
    } catch (error) {
      console.error(`Error fetching video title for ${videoId}:`, error);
      return "";
    }
  }
}
