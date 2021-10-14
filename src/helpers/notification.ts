import Vue from "vue"
const notifySuccess = (message: string) => {
  Vue.notify({
    title: "Success",
    text: message,
    type: "success"
  })
}
const notifyError = (message: string) => {
  Vue.notify({
    title: "Error",
    text: message,
    type: "error"
  })
}

export { notifySuccess, notifyError }
