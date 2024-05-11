'use client';
import React, {Fragment, useState} from "react";
import { uploadVideo } from "../firebase/functions";
import { useRouter } from "next/navigation";

export interface Video {
    id?: string,
    uid?: string,
    filename?: string,
    status?: "processing" | "processed",
    title?: string,
    description?: string,
    thumbnail?: File
}


export default function Upload(){
    const router = useRouter();

    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    const[video, setVideo] = useState<File | null>(null);
    const[thumbnail, setThumbnail] = useState<File | null>(null);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const videoinfo = {
            title, description, video, thumbnail
        }
        console.log(videoinfo);
        handleUpload(videoinfo);

    }

    const handleUpload = async (videoinfo: {title: string, description: string, video: File | null, thumbnail: File | null}) => {
        try{
            if(videoinfo.video) {
                // const response = await uploadVideo(videoinfo.video);
                const response = await uploadVideo(videoinfo);
                alert(`File uploaded successfully Response: ${JSON.stringify(response)}`);
            }
            else {
                alert(`Video file is empty, submission failed`);
            }
            
            
        }
        catch(error){
            alert(`Failed to upload files: ${error}`);
        }

    }

    // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = event.target.files?.item(0);
    //     console.log(file?.name);
    //     if (file) {
    //         //handleUpload(file);
    //     }
    // }
    // const handleUpload = async (file: File) => {
    //     try{
    //         const response = await uploadVideo(file);
    //         alert(`File uploaded successfully Response: ${JSON.stringify(response)}`);
    //     }
    //     catch(error){
    //         alert(`Failed to upload files: ${error}`);
    //     }
    // }
    return(
        <Fragment>
            <div className="flex justify-center">
                <div className="w-full max-w-xs">
                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        {/** Title  */}
                        <div className="mb-6">
                            <label htmlFor="title"  className="block text-gray-700 text-sm font-bold mb-2">
                                Title
                            </label>
                            <input required onChange={(e) => setTitle(e.target.value)} value={title} name="title" id="title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Title" />
                        </div>
                        {/** Description */}
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                                Description
                            </label>
                            <textarea required onChange={(e) => setDescription(e.target.value)} value={description} name="description" id="description" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"  placeholder="Description" />
                        </div>
                        {/** Upload Video */}
                        <label htmlFor="video" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700"  >Upload Video</label>
                        <input required onChange={(e) => setVideo(e.target.files?.item(0) || null)} name="video" id="video" type="file" accept="video/*" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" ></input>
                        {/** Upload Thumbnail */}
                        <label htmlFor="thumbnail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700" >Upload Thumbnail</label>
                        <input required onChange={(e) => setThumbnail(e.target.files?.item(0) || null)} name="thumbnail" id="thumbnail" type="file" accept="image/*" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" ></input>
                        {/** Submit */}
                        <div className= "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700">Submit</div>
                        <label htmlFor="upload" className="flex justify-center item-center w-12 h-12 rounded-full text-white bg-blue-500 cursor-pointer p-4 hover:bg-slate-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                        </label>
                        <input id="upload" className="hidden" type="submit"/>
                        {/* <input id="upload" className="hidden" type="file" accept="video/*" onChange={handleFileChange}/> */}
                    </form>
                </div>
            </div>
        </Fragment>
    )
}