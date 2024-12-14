"use client";

import { searchYoutubeVideo, VideoProps } from "@/actions/video-actions";
import useMoodStore from "@/store/mood.store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PlayCircle } from "lucide-react";

const VideoPlayer = ({ hasMoodToday }: { hasMoodToday: boolean }) => {
    const selectedMood = useMoodStore((state) => state.selectedMood);
    const [videoId, setVideoId] = useState<string | null>(null);
    const [videoThumbnails, setVideoThumbnails] = useState<
        { id: string; thumbnail: string; title: string }[]
    >([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchYoutubeVideos = async (mood: string) => {
        try {
            if (loading) return; // Prevent duplicate requests
            setLoading(true);

            const videoResult = await searchYoutubeVideo(`${mood} mental health`);

            if (videoResult && videoResult.items && videoResult.items.length > 0) {
                const videos = videoResult.items.map((item: VideoProps) => ({
                    id: item.id.videoId,
                    thumbnail: item.snippet.thumbnails.medium.url,
                    title: item.snippet.title
                }));

                setVideoId(videos[0]?.id || null);
                setVideoThumbnails(videos);
            } else {
                console.warn("No videos found for the selected mood.");
                setVideoId(null);
                setVideoThumbnails([]);
            }
        } catch (error) {
            console.error("Error fetching videos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (hasMoodToday && selectedMood) {
            fetchYoutubeVideos(selectedMood);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasMoodToday, selectedMood]);

    return (
        <Card className="w-full">
            <CardContent className="p-6">
                {/* Video Player Section */}
                <div className="aspect-video rounded-md overflow-hidden mb-6">
                    {loading || !videoId ? (
                        <VideoPlayerSkeleton />
                    ) : (
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    )}
                </div>

                {/* Video Thumbnails Section */}
                <h4 className="text-muted-foreground text-lg font-semibold mb-2">More Videos:</h4>
                {loading ? (
                    <VideoPlaylistSkeleton />
                ) : videoThumbnails.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">
                        No videos available for this mood.
                    </p>
                ) : (
                    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                        <div className="flex w-max space-x-4 p-4">
                            {videoThumbnails.map((video) => (
                                <div
                                    key={video.id}
                                    className={`relative w-[250px] cursor-pointer rounded-lg group ${
                                        video.id === videoId
                                            ? "ring-2 ring-slate-800 border border-slate-800"
                                            : ""
                                    }`}
                                    onClick={() => setVideoId(video.id)}
                                >
                                    <div className="overflow-hidden rounded-md">
                                        <Image
                                            src={video.thumbnail}
                                            alt={video.title}
                                            width={250}
                                            height={140}
                                            className="object-cover transition-all hover:scale-105"
                                        />
                                        <div
                                            className={`absolute inset-0 ${
                                                video.id === videoId
                                                    ? "bg-slate-800/80"
                                                    : "bg-black bg-opacity-0"
                                            } group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center rounded-md`}
                                        >
                                            <PlayCircle
                                                className={`text-white opacity-0 group-hover:opacity-100 transition-all duration-300`}
                                                size={48}
                                            />
                                        </div>
                                    </div>
                                    <p className="mt-2 text-sm font-medium leading-tight line-clamp-2">
                                        {video.title}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                )}
            </CardContent>
        </Card>
    );
};

export const VideoPlaylistSkeleton = () => {
    return (
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <div className="flex w-max space-x-4 p-4">
                {[1, 2, 3, 4, 5].map((index) => (
                    <div key={index} className="relative w-[250px] cursor-pointer group">
                        <div className="overflow-hidden rounded-md">
                            <div className="w-full h-[140px] animate-pulse bg-gray-200"></div>
                            <div className="absolute inset-0 rounded-md bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                                <PlayCircle
                                    className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                                    size={48}
                                />
                            </div>
                        </div>
                        <p className="mt-2 text-sm font-medium leading-tight line-clamp-2">
                            Video {index}
                        </p>
                    </div>
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
};

export const VideoPlayerSkeleton = () => {
    return (
        <div className="aspect-video rounded-md overflow-hidden mb-6">
            <div className="w-full h-full animate-pulse bg-gray-200"></div>
        </div>
    );
};

export default VideoPlayer;
