"use server";

import OpenAI from "openai";

const BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export type VideoProps = {
    id: {
        videoId: string;
    };
    snippet: {
        title: string;
        thumbnails: {
            medium: {
                url: string;
            };
        };
    };
};

// Function to search for a YouTube video by a search term
export async function searchYoutubeVideo(searchTerm: string) {
    const url = `${BASE_URL}/search`;
    const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
    });

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "user",
                    content: `
                        You are a mental health expert. Give me a YouTube video search keyword that is related to the following search term: ${searchTerm}. 
                        The keyword should be related to what the main search term. 
                        Your response should only contain the keyword itself, no explanation, and no other text should be included except for the keyword or key sentence.
                    `
                }
            ]
        });

        // Remove quotation marks from the response
        const keySearch = completion.choices[0].message.content as string;

        const response = await fetch(
            `${url}?part=snippet&q=${encodeURIComponent(
                keySearch
            )}&type=video&maxResults=10&videoType=any&key=${API_KEY}`
        );

        if (!response.ok) {
            console.error(`Error fetching YouTube API: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch data from YouTube API:", error);
    }
}
