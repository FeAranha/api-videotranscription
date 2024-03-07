import ytdl from 'ytdl-core';
import fs from 'fs';
import path from 'path';

const getVideoTitle = async (videoId) => {
  try {
    const videoURL = 'http://youtube.com/watch?v=' + videoId;
    const info = await ytdl.getInfo(videoURL);
    return info.videoDetails.title;
  } catch (error) {
    console.error('Error fetching video info:', error);
    throw new Error('Error fetching video info =/');
  }
};

export const downloader = async (videoId) => {
  const videoURL = 'http://youtube.com/watch?v=' + videoId;

  console.log('start_download: ', videoURL);

  try {
    const title = await getVideoTitle(videoId);
    console.log('Video title:', title);

    let outputPath = path.join('/home/fe/devs/nodeJS/api-videoTranscription/download', `${title}.mp4`);

    let counter = 1;
    while (fs.existsSync(outputPath)) {
      outputPath = path.join('/home/fe/devs/nodeJS/api-videoTranscription/download', `${title} (${counter}).mp4`);
      counter++;
    }

    ytdl(videoURL, {
      quality: 'lowestaudio',
      filter: 'audioonly',
    })
      .on('end', () => {
        console.log('done_download');
      })
      .on('error', (error) => {
        console.error('Error download:', error);
        throw new Error('Error downloading video');
      })
      .pipe(fs.createWriteStream(outputPath));

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
