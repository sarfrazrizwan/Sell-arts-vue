import App from "@/models/store/App"
import { getAllItems } from "@/helpers/cart"
const states: App = {
  loading: false,
  cartItems: getAllItems() || []
}

export default states
