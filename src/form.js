import { startLoading, stopLoading, loadingMessage } from "./loading";
import { loadVideo } from "./youtube-api";

const form = document.querySelector('#form')

form.addEventListener('submit', (event) => {
  event.preventDefault()

  try {
    loadingMessage('Iniciando a aplicação')
    startLoading()

    const formData = new FormData(form)
    const url = formData.get('url')
    loadVideo(url)

  } catch (err) {
    console.log('[SUBMIT_ERROR]', err)
  } finally {
    stopLoading()
  }
})