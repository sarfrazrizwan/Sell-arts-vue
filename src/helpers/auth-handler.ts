/* eslint-disable */
import User from "@/models/User"

export function setUser(user: User) {
  localStorage.setItem("id", user.id)
  localStorage.setItem("name", user.name)
  localStorage.setItem("username", user.username)
  localStorage.setItem("first_name", user.first_name)
  localStorage.setItem("last_name", user.last_name)
  localStorage.setItem("paypal_email", user.paypal_email)
  localStorage.setItem("email", user.email)
  localStorage.setItem("access_token", user.access_token)
  localStorage.setItem("followers_count", `${user.followers_count}`)
  localStorage.setItem("followings_count", `${user.followings_count}`)
  localStorage.setItem("art_works_count", `${user.art_works_count}`)
}
export function updateUser(user: User) {
  localStorage.setItem("name", user.name)
  localStorage.setItem("username", user.username)
  localStorage.setItem("first_name", user.first_name)
  localStorage.setItem("last_name", user.last_name)
  localStorage.setItem("paypal_email", user.paypal_email)
  localStorage.setItem("bio", user.bio)
}
export function getUser(): any {
  const id = localStorage.getItem("id") || ""
  const name = localStorage.getItem("name") || ""
  const username = localStorage.getItem("username") || ""
  const firstName = localStorage.getItem("first_name") || ""
  const lastName = localStorage.getItem("last_name") || ""
  const bio = localStorage.getItem("bio") || ""
  const accessToken = localStorage.getItem("access_token") || ""
  const email = localStorage.getItem("email") || ""
  const image = localStorage.getItem("image") || ""
  const followers_count = localStorage.getItem("followers_count") || 0
  const followings_count = localStorage.getItem("followings_count") || 0
  const artworks_count = localStorage.getItem("artworks_count") || 0

  if (accessToken) {
    return {
      id,
      name,
      username,
      first_name: firstName,
      last_name: lastName,
      email,
      access_token: accessToken,
      image,
      followers_count,
      followings_count,
      artworks_count,
      bio
    }
  }
  return undefined
}
