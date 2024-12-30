interface LoginPayload {
  email: string
  password: string
}
interface LoginResponse {
  status: string
  message: string
  data: {
    id: number
    username: string
  }
}
export const uselogin = (playload: LoginPayload) => {
  console.log('playload', playload)
  return useFetch<LoginResponse>('/login', {
    baseURL: useBaseUrl(),
    method: 'POST',
    body: playload,
  })
}
