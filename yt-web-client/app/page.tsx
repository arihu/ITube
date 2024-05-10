import Link from "next/link";
import { getVideos } from "./firebase/functions";
import Image from "next/image";

export default async function Home() {
    const videos = await getVideos();

    return (
        <main className="flex m-10">
          <h1 className="mb-4 text-3xl">Home</h1> 
            {
                videos.map((video) => (
                    <Link href={`/watch?v=${video.filename}`} key={video.id}>
                        <Image src="/thumbnail.PNG" alt="video" width={210} height={140} className="m-10" />
                    </Link>
                ))
            }
        </main>
    )
}

export const revalidate = 30;
