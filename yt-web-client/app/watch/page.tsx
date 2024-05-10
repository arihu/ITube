'use client';
import { useSearchParams } from "next/navigation";

export default async function Watch() {
    const videoPrefix = 'https://storage.googleapis.com/ari-yt-processed-videos/';
    const videoSrc = useSearchParams().get('v');
    return (
        <div className="m-10">
            <h1 className="mb-4 text-3xl">Watch Page</h1> 
            <video controls src={videoPrefix + videoSrc}/>
        </div>
    );
}