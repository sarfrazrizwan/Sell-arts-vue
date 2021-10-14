<template>
  <div class="form-wrap">
    <div class="text-right edit-btn" v-if="isSameUser && !isEditMode">
      <button class="btn btn-edit p-0" @click="isEditMode = true">
        <img class="ml-1" src="@/assets/images/pencil_edit.svg" />
      </button>
    </div>
    <div class="d-flex flex-md-row flex-column justify-content-md-between">
      <h1 class="heading3 f-g font-weight-bold">{{ user.name }}</h1>

      <!-- <button class="btn btn-custom">
            <img src="@/assets/images/bell.svg" />
          </button> -->
      <div @click="follow(user.is_following, user.id)" v-if="!isSameUser">
        <button class="btn btn-custom" v-if="user.is_following">
          Following
        </button>
        <button class="btn btn-custom" v-else>
          <img src="@/assets/images/add.svg" /> Follow
        </button>
      </div>
      <div v-else>
        <button class="btn btn-custom" @click="logout">
          Logout
        </button>
      </div>
    </div>
    <div>{{ user.username }}</div>

    <validation-observer ref="form" v-slot="{ invalid }" v-if="isSameUser">
      <div class="form-group row mt-3">
        <div class="col-md-6">
          <VeeInput
            name="first_name"
            rules="required"
            v-model="user.first_name"
            placeholder="First Name"
            label="First Name"
            class-name="form-control form-input3"
            :disabled="!isEditMode"
          />
        </div>
        <div class="col-md-6">
          <VeeInput
            name="last_name"
            rules="required"
            v-model="user.last_name"
            placeholder="Last Name"
            label="Last Name"
            class-name="form-control form-input3"
            :disabled="!isEditMode"
          />
        </div>
        <div class="col-md-6">
          <VeeInput
            name="username"
            :rules="{ regex: /^[a-zA-Z0-9]+$/ }"
            v-model="user.username"
            placeholder="Username"
            label="Username"
            class-name="form-control form-input3"
            :disabled="!isEditMode"
          />
        </div>
        <div class="col-md-6">
          <VeeInput
            name="paypal_email"
            rules="email"
            v-model="user.paypal_email"
            placeholder="Paypal Email"
            label="Paypal Email"
            class-name="form-control form-input3"
            :disabled="!isEditMode"
          />
        </div>
        <div class="col-md-12">
          <VeeTextarea
            name="bio"
            v-model="user.bio"
            placeholder="Bio"
            label="Bio"
            class-name="form-control form-input3"
            :disabled="!isEditMode"
          />
        </div>

        <div class="col-md-12" v-if="isEditMode">
          <button
            class="btn btn-custom mt-2 float-right"
            :disable="invalid"
            v-if="!invalid"
            @click="updateUser"
          >
            Save
          </button>
        </div>
      </div>
    </validation-observer>
    <div class="d-flex flex-wrap">
      <div
        class="users-following cursor-pointer"
        @click="getSiblings('followings')"
      >
        <span class="heading3 font-weight-normal text-color2 f-g"
          >Following:</span
        >
        <span class="heading3 font-weight-bold text-dark f-g ml-1">{{
          user.followings_count
        }}</span>
      </div>
      <div
        class="users-following cursor-pointer  ml-md-4"
        @click="getSiblings('followers')"
      >
        <span class="heading3 font-weight-normal text-color2 f-g"
          >Followers:</span
        >
        <span class="heading3 font-weight-bold text-dark f-g ml-1">{{
          user.followers_count
        }}</span>
      </div>
      <div class="users-artworks ml-md-4">
        <span class="heading3 font-weight-normal text-color2 f-g"
          >Artworks:</span
        >
        <span class="heading3 font-weight-bold text-dark f-g ml-1">{{
          user.artworks_count
        }}</span>
      </div>
    </div>
    <users-modal
      :isOpen="modalOpen"
      :users="siblings"
      :title="title"
      @close="modalOpen = false"
    ></users-modal>
  </div>
</template>
<script lang="ts">
import Vue from "vue"
import { mapGetters, mapMutations } from "vuex"
import User from "../../models/User"
import user from "@/services/user"
import { ValidationObserver } from "vee-validate"
import UsersModal from "@/components/modals/Users.vue"
export default Vue.extend({
  components: { ValidationObserver, UsersModal },
  computed: {
    ...mapGetters({ authUser: "auth/user" }),
    isSameUser(): boolean {
      return this.user.id === this.authUser.id
    }
  },
  data() {
    return {
      user: new User(),
      isEditMode: false,
      modalOpen: false,
      siblings: [],
      title: ""
    }
  },
  methods: {
    ...mapMutations({ _updateUser: "auth/updateUser", _logout: "auth/logout" }),
    getUserInfo(userId: string) {
      this.$api.get(`/user/${userId}`).then(response => {
        this.user = response.data.data
      })
    },
    logout() {
      this._logout()
      location.reload()
    },
    follow(isFollowing: boolean, userId: string) {
      this.user.is_following = !isFollowing
      if (isFollowing) {
        user.unfollow(userId)
      } else {
        user.follow(userId)
      }
    },
    updateUser() {
      this.$api
        .patch(`/user`, this.user)
        .then(response => {
          // this.user = response.data.data
          this._updateUser(response.data.data)
        })
        .catch(error =>
          this.validationErrors(this.$refs.form, error.response.data.errors)
        )
    },
    validationErrors(form: any, errors: any) {
      form.setErrors(errors)
    },
    getSiblings(type: string) {
      const userId = this.$route.params.userId || this.authUser.id
      this.$api.get(`/${type}/${userId}`).then(response => {
        this.siblings = response.data.data
        this.modalOpen = true
        this.title = type
      })
    }
  },

  mounted() {
    this.user = this.authUser
    const userId = this.$route.params.userId || this.authUser.id
    this.getUserInfo(userId)
  },
  watch: {
    "$route.params.userId": {
      handler: function(id) {
        if (!id) {
          id = this.authUser.id
        }
        this.getUserInfo(id)
      },
      deep: true,
      immediate: true
    }
  }
})
</script>
<style scoped>
.form-wrap {
  position: relative;
}
.edit-btn {
  position: absolute;
  right: 16px;
  top: 16px;
}
</style>
<style>
.form-label1 {
  font-size: 18px;
}
</style>
