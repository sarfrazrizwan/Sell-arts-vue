import api from "@/services/instance"

export default {
  follow: (userId: string) => api.post(`user/${userId}/follow`),
  unfollow: (userId: string) => api.post(`user/${userId}/unfollow`)
}
