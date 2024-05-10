'use client';
import React, {Fragment} from "react";
import { uploadVideo } from "../firebase/functions";

export default function Upload(){
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.item(0);
        if (file) {
            handleUpload(file);
        }
    }
    const handleUpload = async (file: File) => {
        try{
            const response = await uploadVideo(file);
            alert(`File uploaded successfully Response: ${JSON.stringify(response)}`);
        }
        catch(error){
            alert(`Failed to upload files: ${error}`);
        }
    }
    return(
        <Fragment>
            <input id="upload" className="hidden" type="file" accept="video/*" 
                onChange={handleFileChange} 
            />
            <label htmlFor="upload" className="flex justify-center item-center w-25 h-25 rounded-full text-white bg-slate-600 cursor-pointer p-4 hover:bg-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>

            </label>
        </Fragment>
    )
}