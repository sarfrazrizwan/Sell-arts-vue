import App from "@/models/store/App"
import Artwork from "@/models/Artwork"
export default {
  cartItems(state: App, payLoad: Artwork[]) {
    return (state.cartItems = payLoad)
  }
}
