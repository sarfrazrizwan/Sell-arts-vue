export default class User {
  id: string
  name: string
  first_name: string
  last_name: string
  access_token: string
  email: string
  password: string
  followers_count: number
  followings_count: number
  art_works_count: number
  username: string
  paypal_email: string
  is_following: boolean
  bio: string

  constructor() {
    this.id = ""
    this.name = ""
    this.first_name = ""
    this.last_name = ""
    this.access_token = ""
    this.email = ""
    this.password = ""
    this.username = ""
    this.followers_count = 0
    this.followings_count = 0
    this.art_works_count = 0
    this.is_following = false
    this.paypal_email = ""
    this.bio = ""
  }
}
