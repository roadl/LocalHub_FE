import api from './api'

export async function sendMessage(messages) {
  const response = await api.post('/api/v1/chat', {
    messages,
  })

  return response.data.data
}
