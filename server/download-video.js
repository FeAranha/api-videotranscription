import ytdl from 'ytdl-core'
import fs from 'fs'

export const downloader = async (videoId) => new Promise((resolve, reject) => {
  const videoURL = 'https://youtube.com/watch?v=' + videoId
  console.log('start_download: ', videoURL)

  ytdl(videoURL, {
    quality: 'lowestaudio',
    filter: 'audioonly',
  })
    .on('end', () => {
      console.log('end download')
      resolve()
    })
    .on('error', (error) => {
      console.error('Erro durante o download=> ', error)
      reject('Erro durante o download do vídeo')
    })
    .pipe(fs.createWriteStream('audio.mp4'))
})

