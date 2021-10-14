<template>
  <div class="my-width">
    <div class="new-artwork">
      <h2 class="heading2 f-g font-weight-bold">New Artwork</h2>
    </div>
    <div class="mb-5">
      <div class="card1">
        <div class="card1-body">
          <div class="mb-4">
            <h2 class="heading2 f-g font-weight-normal">Add artwork images</h2>
          </div>
          <div class="artwork-form">
            <form class="method" enctype="multipart/form-data">
              <div class="artwork-button">
                <input
                  type="file"
                  hidden
                  name="artwork_add"
                  id="artwork_add"
                  accept="application/pdf"
                  @change="onImageUpload($event)"
                />
                <label for="artwork_add">
                  <img src="@/assets/images/adds.svg" class="cursor-pointer" />
                </label>
              </div>
            </form>
          </div>
          <div class="text-center px-md-5 py-3">
            <p class="mb-0 p1 text-color3 f-g">
              Have PDF file format Images of your artwork ready. Llovas uses PDF
              format scans of art work to keep our database easily viewable and
              user friendly. If you do not have a scanner and/or or the artwork
              is too large to be scanned on a traditional scanner try using the
              Adobe Scan Application or Notes on iOS
            </p>
          </div>
          <div class="mt-3 text-center">
            <button class="btn btn-continue">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
    <div ref="artworks">
      <div class="card1">
        <div class="card1-body">
          <div class="mb-4">
            <h2 class="heading2 f-g font-weight-normal">Artwork Details</h2>
          </div>
          <validation-observer ref="form" v-slot="{ invalid }">
            <div class="artwork-details">
              <div class="artwork-details-warp">
                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-md-0 mb-3">
                      <pdf
                        :src="`${artworkUrl}#toolbar=0&navpanes=0&scrollbar=0`"
                      />
                      <!-- <img
                        :src="artwork.image || artwork.image_path || NO_IMAGE"
                        class="w-100 h-100"
                      /> -->
                    </div>
                  </div>
                  <div class="col-md-6">
                    <form method="post">
                      <div class="form-group">
                        <VeeInput
                          name="name"
                          rules="required"
                          v-model="artwork.name"
                          placeholder="Name here"
                          label="Name here"
                          class-name="form-control form-input3"
                        />
                      </div>
                      <div class="row">
                        <div class="form-group col-md-6">
                          <VeeInput
                            name="width"
                            rules="required"
                            v-model="artwork.width"
                            placeholder="Width (In)"
                            label="Width (In)"
                            class-name="form-control form-input3"
                            type="number"
                          />
                        </div>
                        <div class="form-group col-md-6">
                          <VeeInput
                            name="height"
                            rules="required"
                            v-model="artwork.height"
                            placeholder="Height (In)"
                            label="Height (In)"
                            class-name="form-control form-input3"
                            type="number"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <VeeDatepicker
                          name="created_date"
                          rules="required"
                          v-model="artwork.created_date"
                          placeholder="YYYY-MM-DD"
                          label="Created Date"
                          class-name="form-control form-input3"
                          type="date"
                        />
                      </div>
                      <div class="form-group">
                        <VeeInput
                          name="material"
                          rules="required"
                          v-model="artwork.material"
                          placeholder="Material Used"
                          label="Material Used"
                          class-name="form-control form-input3"
                        />
                      </div>
                      <div class="form-group">
                        <VeeInput
                          name="price"
                          rules="required"
                          v-model="artwork.price"
                          placeholder="Price ($)"
                          label="Price ($)"
                          class-name="form-control form-input3"
                          type="number"
                        />
                      </div>
                      <div class="form-group">
                        <VeeTextarea
                          name="description"
                          v-model="artwork.description"
                          placeholder="Description"
                          label="Description"
                          :rows="6"
                          class-name="form-control form-input3"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-3 text-center">
              <button
                class="btn btn-continue"
                :disabled="invalid"
                @click="onSubmit"
              >
                {{ isEditMode && isSameUser ? "Update" : "List" }}
              </button>
            </div>
          </validation-observer>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue"
import Artwork from "@/models/Artwork"
import { getBase64 } from "@/helpers/helper"
import { ValidationObserver } from "vee-validate"
import { mapGetters } from "vuex"
import { NO_IMAGE } from "@/configs/constant"
// const NO_IMAGE = require("@/assets/images/2-1.png")
// @ts-ignore
import pdf from "vue-pdf"
export default Vue.extend({
  components: { ValidationObserver, pdf },
  data: () => ({
    artwork: new Artwork(),
    NO_IMAGE
  }),
  computed: {
    ...mapGetters({ authUser: "auth/user" }),
    isSameUser(): boolean {
      return this.artwork.artist.id === this.authUser.id
    },
    isEditMode(): boolean {
      return this.$route.query.isEdit == "true"
    },
    artworkUrl(): string | null {
      let url = null
      if (this.artwork.image_path) url = this.artwork.image_path
      if (this.artwork.image) url = this.artwork.image

      return url
    }
  },
  methods: {
    onImageUpload(event: any) {
      getBase64(event.target.files[0]).then(base64 => {
        /* @ts-ignore */
        this.artwork.image = base64
      })
    },

    onSubmit() {
      this.$api
        .post("/art-works", this.artwork)
        .then(() => {
          if (this.isEditMode) {
            this.$router.go(-1)
          } else {
            this.$router.push({ name: "profile" })
          }
        })
        .catch(error =>
          this.validationErrors(this.$refs.form, error.response.data.errors)
        )
    },
    getData(id: any) {
      this.$api.get(`/art-works/${id}`).then(response => {
        this.artwork = response.data.data
      })
    },
    validationErrors(form: any, errors: any) {
      form.setErrors(errors)
    }
  },
  mounted() {
    const id = this.$route.query.id
    if (id) this.getData(id)
  }
})
</script>
