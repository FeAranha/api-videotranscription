import axios from "axios";
import { startLoading, stopLoading, loadingMessage } from "./loading";
import { loadVideo, getVideoId } from "./youtube-api";

const form = document.querySelector('#form')

form.addEventListener('submit', async (event) => {
  event.preventDefault()

  try {
    loadingMessage('Iniciando a aplicação')
    startLoading()

    const formData = new FormData(form)
    const url = formData.get('url')
    await loadVideo(url)

    loadingMessage('Connecting API')
    await axios.get('http://localhost:3333/audio?v=' + getVideoId(url))

    location.reload()

  } catch (err) {
    console.log('[SUBMIT_ERROR]', err)
  } finally {
    stopLoading()
  }
})