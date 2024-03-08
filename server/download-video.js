import ytdl from 'ytdl-core';
import fs from 'fs';

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

    const audioStream = ytdl(videoURL, {
      quality: 'lowestaudio',
      filter: 'audioonly',
    });

    audioStream
      .pipe(fs.createWriteStream('audio.mp4'))
      .on('finish', () => {
        console.log('Download completo:');
      })
      .on('error', (error) => {
        console.error('Erro durante o download:', error);
        throw new Error('Erro durante o download do vídeo');
      });

  } catch (error) {
    console.error('Erro:', error);
    throw error;
  }
};
