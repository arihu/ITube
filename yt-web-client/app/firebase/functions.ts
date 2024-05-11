import {httpsCallable} from 'firebase/functions';
import { functions } from './firebase';


const generateUploadUrl = httpsCallable(functions, 'generateUploadUrl');
const getVideosFunction = httpsCallable(functions, 'getVideos');

export interface Video {
  id?: string,
  uid?: string,
  filename?: string,
  status?: "processing" | "processed",
  title?: string,
  description?: string
}

export async function uploadVideo(videoinfo: {title: string, description: string, video: File | null, thumbnail: File | null}){
    const file = videoinfo.video;
    if (!file){
        console.log("File is null upload terminated");
    }
    else{
        const response: any = await generateUploadUrl({
            fileExtension: file?.name.split('.').pop()
        });
        // upload file via signed url
        console.log("Sending response(firebase/functions/uploadVideo): ");
        console.log(videoinfo);

        //Add attributes using form (JSON stringify can't transfer File formats)
        const formvideoinfo = new FormData();
        formvideoinfo.append('title', videoinfo.title);
        formvideoinfo.append('description', videoinfo.description);
        if(videoinfo.video && videoinfo.thumbnail){
            formvideoinfo.append('video', videoinfo.video); // Assuming videoinfo.video is a File object
            // formvideoinfo.append('thumbnail', videoinfo.thumbnail); // Assuming videoinfo.thumbnail is a File object
        }
        else
            return;
        // console.log("form: " + formvideoinfo);
        // console.log("title: ", formvideoinfo.get('title'));
        // console.log("description: ", formvideoinfo.get('description'));
        // console.log("video: ", formvideoinfo.get('video'));
        //console.log("thumbnail: ", formvideoinfo.get('thumbnail'));
        

        await fetch(response?.data?.url, {
            method: 'PUT',
            body: formvideoinfo,
        });

        // await fetch(response?.data?.url, {
        //     method: 'PUT',
        //     body: file,
        //     headers: {
        //         'Content-Type': file.type
        //     }
        // });
        // return;
    }
    return;
}

// export async function uploadVideo(file: File){
//     const response: any = await generateUploadUrl({
//         fileExtension: file.name.split('.').pop()
//     });
//     //upload file via signed url
//     await fetch(response?.data?.url, {
//         method: 'PUT',
//         body: file,
//         headers: {
//             'Content-Type': file.type
//         }
//     });
//     return;
// }

export async function getVideos() {
    const response = await getVideosFunction();
    return response.data as Video[];
}