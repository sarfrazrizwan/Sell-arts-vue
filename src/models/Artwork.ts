/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/camelcase */
import User from "@/models/User"
export default class Artwork {
  id: string
  name: string
  slug: string
  width: number
  height: number
  created_date: string
  description: string
  material: string
  image: string
  image_path: string
  price: number
  is_following: boolean
  artist: User

  constructor() {
    this.id = ""
    this.name = ""
    this.width = 500
    this.height = 400
    this.created_date = ""
    this.material = ""
    this.image = ""
    this.image_path = ""
    this.price = 0
    this.is_following = false
    this.artist = new User()
    ;(this.description = ""), (this.slug = "")
  }
}
