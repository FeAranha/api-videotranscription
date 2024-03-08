import ffmpegStatic from 'ffmpeg-static'
import ffmp from 'fluent-ffmpeg'

export const createMP3 = () => new Promise((resolve, reject) => {
  const ffmpegStatic = require('ffmpeg-static');
  const ffmpeg = require('fluent-ffmpeg');

  ffmpeg.setFfmpegPath(ffmpegStatic);

  ffmpeg()

    .input('audio.mp4')

    .outputOptions('-ab', '20k')

    .saveToFile('audio.mp3')

    .on('end', () => {
      console.log('FFmpeg has finished.');
      resolve()
    })

    .on('error', (error) => {
      console.error(error)
      reject(error)
    });
})
