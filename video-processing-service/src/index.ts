import express from "express";
import { convertVideo, deleteProcessedVideo, deleteRawVideo, downloadRawVideo, setupDirectories, uploadProcessedVideo } from "./storage";
import { isVideoNew, setVideo } from "./firestore";
import { setMaxIdleHTTPParsers } from "http";


setupDirectories();

const app = express();
// app.use(express.json());

const multer = require('multer');
// const upload = multer({ dest : 'uploads/' })
const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
      cb(null, 'uploads/')  // Specify the destination directory
    },
    filename: function (req: any, file: any, cb: any) {
      cb(null, file.originalname); // Keep the original filename
    }
  });
const upload = multer({ storage: storage })



app.post("/process-video", upload.single('video'), async (req, res) => {
    // sent form with: {title: string, description: string, video: File | null, thumbnail: File | null}

    console.log("req.body: ", req.body);
    console.log("req.file: ", req.file);
    console.log("req.files: ", req.files);

    // console.log("req.body.title: ", req.body.title);
    // console.log("req.body.description: ", req.body.description);
    // const title = req.body.title;
    // const description = req.body.description;
    // console.log("title: ", title);
    // console.log("description: ", description);


    // const video = req.file;
    // console.log("video: ", video);
    // console.log(typeof video);
    // console.log('video.originalname: ', video?.originalname);
    // console.log(typeof video?.originalname);
    // let videoFile;
    // let thumbnailFile;
    // if(req.files){
    //     // Type assertion to tell TypeScript that req.files is of type { [fieldname: string]: Express.Multer.File[]; }
    //     const files = req.files as any;
    //     console.log("files: ", files);
    //     console.log("files[video]: ", files['video']);
    //     videoFile = files['video'][0]; // Assuming there's only one file uploaded for each field
    //     thumbnailFile = files['thumbnail'][0];
    // }
    // else
    //     throw new Error(`Invalid message payload received.`);
    // const video = videoFile;
    // console.log("video: " + video);
    // const thumbnail = thumbnailFile;
    // console.log("thumbnail: " + thumbnail);


    // try {
    //     console.log("req.body: "+ req.body);
    //     console.log("req.files: "+ req.files);
    //     console.log("Title: " + title);
    //     console.log("Description: " + description);

    //     console.log("videoFile: " + video);
    //     console.log("thumbnailFile: " + thumbnail);
        
    //     if (!video.name)
    //         throw new Error(`Invalid message payload received.`);
    // }
    // catch (error) {
    //     console.log(error);
    //     return res.status(400).send(`Bad Request: missing filename.`);
    // }

    // let data;
    // try {
    //     const message = Buffer.from(req.body.message.data, 'base64').toString('utf8');
    //     data = JSON.parse(message);
    //     if (!data.name) {
    //         throw new Error(`Invalid message payload received.`);
    //     }
    // }
    // catch (error) {
    //     console.error(error);
    //     return res.status(400).send(`Bad Request: missing filename.`);
    // }

    // if(!video){
    //     throw new Error(`Invalid message payload received.`);
    // }
    // if(!req.file){
    //     console.log("No files uploaded");
    //     return;
    // }
        
    // const inputFileName = req.file?.originalname;

    // // const inputFileName = data.name;
    // const outputFileName = `processed-${inputFileName}`;
    // const videoId = inputFileName.split('.')[0];

    // if(!isVideoNew(videoId)){
    //     return res.status(400).send('Bad Request: video already processing or processed');
    // }
    // else{
    //     setVideo(videoId, {
    //         id: videoId,
    //         uid: videoId.split("-")[0],
    //         status: "processing",
    //     });
    // }
    // //Download raw video from Cloud storage
    // await downloadRawVideo(inputFileName);

    // //convert to 360p
    // try {
    //     await convertVideo(inputFileName, outputFileName);
    // }
    // catch (err) {
    //     await Promise.all([
    //         deleteRawVideo(inputFileName),
    //         deleteProcessedVideo(outputFileName)
    //     ]);
    //     console.error(err);
    //     return res.status(500).send(`Internal Server Error: video processing failed.`);
    // }

    // //Upload processed video to Cloud Storage
    // await uploadProcessedVideo(outputFileName);
    // await setVideo(videoId, {
    //     status: "processed",
    //     filename: outputFileName
    // });
    // await Promise.all([
    //     deleteRawVideo(inputFileName),
    //     deleteProcessedVideo(outputFileName)
    // ]);

    return res.status(200).send(`Processing finished successfully`);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Video processing service listening at http://localhost:${port}`);
});

