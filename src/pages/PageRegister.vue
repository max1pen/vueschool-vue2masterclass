<template>
  <div class="flex-grid justify-center">
          <div class="col-2">

              <form @submit.prevent="register" class="card card-form">
                  <h1 class="text-center">Register</h1>

                  <div class="form-group">
                      <label for="name">Full Name</label>
                      <input id="name"
                      @blur="$v.form.name.$touch()"
                       v-model="form.name" type="text" class="form-input">
                       <template v-if="$v.form.name.$error">
                           <span v-if="!$v.form.name.required" class="form-error">This field is required</span>
                       </template>
                  </div>

                  <div class="form-group">
                      <label for="username">Username</label>
                      <input id="username"
                     @blur="$v.form.username.$touch()"
                       v-model="form.username" type="text" class="form-input">
                       <template v-if="$v.form.username.$error">
                           <span v-if="!$v.form.username.required" class="form-error">This field is required</span>
                           <span v-if="!$v.form.username.unique" class="form-error">Sorry! This username is taken</span>
                       </template>
                  </div>

                  <div class="form-group">
                      <label for="email">Email</label>
                      <input id="email"
                       @blur="$v.form.email.$touch()"
                       v-model.lazy="form.email" type="email" class="form-input">
                       <template v-if="$v.form.email.$error">
                           <span v-if="!$v.form.email.required" class="form-error">This field is required</span>
                           <span v-if="!$v.form.email.email" class="form-error">This is not a valid email address</span>
                           <span v-if="!$v.form.email.unique" class="form-error">Sorry! This email is taken</span>
                       </template>
                  </div>

                  <div class="form-group">
                      <label for="password">Password</label>
                      <input id="password"
                       @blur="$v.form.password.$touch()"
                       v-model="form.password" type="password" class="form-input">
                       <template v-if="$v.form.password.$error">
                           <span v-if="!$v.form.password.required" class="form-error">This field is required</span>
                           <span v-if="!$v.form.password.minLength" class="form-error">The password must be at least 6 characters long</span>
                       </template>
                  </div>

                  <div class="form-group">
                      <label for="avatar">Avatar</label>
                      <input id="avatar"
                       @blur="$v.form.avatar.$touch()"
                       v-model.lazy="form.avatar" type="text" class="form-input">
                       <template v-if="$v.form.avatar.$error">
                           <span v-if="!$v.form.avatar.url" class="form-error">The supplied URL is invalid</span>
                           <span v-else-if="!$v.form.avatar.supportImageFile" class="form-error">This file type is not supported by our system.</span>
                           <span v-else-if="!$v.form.avatar.responseOk" class="form-error">This image cannot be found.</span>
                       </template>
                  </div>

                  <div class="form-actions">
                      <button type="submit" class="btn-blue btn-block">Register</button>
                  </div>

              </form>
              <div class="text-center push-top">
                  <button @click="registerWithGoogle" class="btn-red btn-xsmall"><i class="fa fa-google fa-btn"></i>Sign up with Google</button>
              </div>
          </div>
      </div>
</template>

<script>
import { required, email, url, minLength } from 'vuelidate/lib/validators'
import { uniqueUsername, uniqueEmail, supportedImageFile, responseOk } from '@/utils/validators'

export default {
    data() {
        return {
            form: {
                name: null,
                username: null,
                email: null,
                password: null,
                avatar: null,
            }
        }
    },
    validations: {
        form: {
            name: {
                required
            },
            username: {
                required,
                unique: uniqueUsername
            },
            email: {
                required,
                email,
                unique: uniqueEmail
            },
            password: {
                required,
                minLength: minLength(6)
            },
            avatar: {
                url,
                supportedImageFile,
                responseOk
            },
        }
    },
    methods: {
        register() {
            this.$v.form.$touch()
            if(this.$v.form.$invalid) {
                return
            }
            this.$store.dispatch('auth/registerUserWithEmailAnadPassword', this.form)
            .then(() => this.$router.push('/'))
        },

        registerWithGoogle() {
            this.$store.dispatch('auth/signInWithGoogle')
            .then(() => this.$router.push('/'))
        }
    },
    created() {
        this.$emit('ready')
    }
}
</script>

<style>

</style>