import { Storage } from "@google-cloud/storage";
import fs from 'fs';
import ffmpeg from "fluent-ffmpeg";

const storage = new Storage();
const rawVideoBucketName = "ari-yt-raw-videos";
const processedVideoBucketName = "ari-yt-processed-videos";

const localRawVideoPath = "./raw-videos";
const localProcessedVideoPath = "./processed-videos";

//create local directories for raw/processed videos
export function setupDirectories() {

    ensureDirectoryExistence(localRawVideoPath);
    ensureDirectoryExistence(localProcessedVideoPath);
}

/**
 * @param rawVideoName Name of file to convert from {@link localRawVideoPath}.
 * @param processedVideoName Name of file to convert to {@link localProcessedVideoPath}.
 * @returns Promise that resolves when video has been converted 
 */
export function convertVideo(rawVideoName: string, processedVideoName: string) {
    return new Promise<void>((resolve, reject) => {
        ffmpeg(`${localRawVideoPath}/${rawVideoName}`)
            .outputOptions("-vf", "scale=-2:360")
            .on("end", () => {
                console.log("Video processing finished successfully.");
                resolve();
            }).on("error", (err) => {
                console.log(`An error occurred: ${err.message}`);
                reject();
            })
            .save(`${localProcessedVideoPath}/${processedVideoName}`);
    });
}

/**
 * @param fileName of file to download from {@link rawVideoBucketName} bucket into {@link localRawVideoPath} folder
 * @returns promise that resolves when file has been downloaded 
 */
export async function downloadRawVideo(fileName: string) {
    await storage.bucket(rawVideoBucketName)
        .file(fileName)
        .download({ destination: `${localRawVideoPath}/${fileName}` });
    console.log(`gs://${rawVideoBucketName}/${fileName} downloaded to ${localRawVideoPath}/${fileName}.`)
}

/**
 * @param fileName of file to download from {@link localProcessedVideoPath} folder into {@link processedVideoBucketName} folder
 * @returns promise that resolves when file has been uploaded
 */
export async function uploadProcessedVideo(fileName: string) {
    const bucket = storage.bucket(processedVideoBucketName);
    await bucket.upload(`${localProcessedVideoPath}/${fileName}`, { destination: fileName });
    console.log(`${localProcessedVideoPath}/${fileName} uploaded to gs://${processedVideoBucketName}/${fileName}.`)
    await bucket.file(fileName).makePublic();
}

/**
 * @param fileName Name of file to delete from {@link localRawVideoPath} folder
 * @returns Promise that resolves when file has been deleted
 */
export function deleteRawVideo(fileName: string) {
    return deleteFile(`${localRawVideoPath}/${fileName}`)
}

/**
 * @param fileName Name of file to delete from {@link localProcessedVideoPath} folder
 * @returns Promise that resolves when file has been deleted
 */
export function deleteProcessedVideo(fileName: string) {
    return deleteFile(`${localProcessedVideoPath}/${fileName}`)
}

/**
 * @param filePath Path of file to delete
 * @returns Promise that resolves when file has been deleted 
 */
function deleteFile(filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(`Failed to delete file at ${filePath}`, err);
                    reject(err);
                }
                else {
                    console.log(`File deleted at ${filePath}`);
                    resolve();
                }
            })
        }
        else {
            console.log(`File not found at ${filePath}, skip delete`);
            resolve();
        }
    })

}

/**
 *Ensure directory exists, creating if necessary 
 * @param {string} dirPath directory path to check
 */
function ensureDirectoryExistence(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Directory created at ${dirPath}`);
    }

}