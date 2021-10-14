import Vue from "vue"

import VeeInput from "@/components/shared/inputs/VeeInput.vue"
Vue.component("VeeInput", VeeInput)

import VeeDatepicker from "@/components/shared/inputs/VeeDatepicker.vue"
Vue.component("VeeDatepicker", VeeDatepicker)

import VeeTextarea from "@/components/shared/inputs/VeeTextarea.vue"
Vue.component("VeeTextarea", VeeTextarea)

import Modal from "@/components/Modal.vue"
Vue.component("Modal", Modal)

// import VeeSelect from "@/components/shared/inputs/VeeSelect.vue"
// Vue.component("VeeSelect", VeeSelect)

// import CompanyGroupSelect from "@/components/shared/inputs/CompanyGroupSelect.vue"
// Vue.component("CompanyGroupSelect", CompanyGroupSelect)

// import UserTypeSelect from "@/components/shared/inputs/UserTypeSelect.vue"
// Vue.component("UserTypeSelect", UserTypeSelect)

// import VeeEditor from "@/components/shared/inputs/VeeEditor.vue"
// Vue.component("VeeEditor", VeeEditor)

import Notifications from "vue-notification"
Vue.use(Notifications)

// @ts-ignore
import VueConfirmDialog from "vue-confirm-dialog"
Vue.use(VueConfirmDialog)
Vue.component("vue-confirm-dialog", VueConfirmDialog.default)
