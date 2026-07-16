import axios from 'axios'

const chatapi = axios.create({
  baseURL: 'https://localhub-b.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 50000,
})

export async function sendMessage(messages) {
  const response = await chatapi.post('/api/v1/chat', {
    messages,
  })

  return response.data.data
}
