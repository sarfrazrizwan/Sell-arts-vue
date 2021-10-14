import Artwork from "@/models/Artwork"
import { notifySuccess, notifyError } from "@/helpers/notification"
import store from "@/store"

const isInCart = (item: Artwork, items: Artwork[]): boolean => {
  return items.find(x => x.id === item.id) ? true : false
}
const getAllItems = () => {
  const items = localStorage.getItem("cartItems") || "[]"
  return JSON.parse(items)
}
const setItems = (items: Artwork[]) => {
  localStorage.setItem("cartItems", JSON.stringify(items))
  store.commit("app/cartItems", items)
}
const addItem = (item: Artwork) => {
  const items: Artwork[] = getAllItems()
  if (!isInCart(item, items)) {
    items.push(item)
    setItems(items)
    notifySuccess("Added to cart")
  } else {
    notifyError("Already in cart")
  }
}

const removeItem = (id: string) => {
  let items: Artwork[] = getAllItems()
  items = items.filter(item => item.id !== id)
  setItems(items)
  notifySuccess("Item Removed")
}
const flush = () => {
  return setItems([])
}

export { addItem, getAllItems, removeItem, flush }
