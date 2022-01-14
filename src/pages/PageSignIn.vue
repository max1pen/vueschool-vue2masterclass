<template>
  <div class="flex-grid justify-center">
        <div class="col-2">

            <form @submit.prevent="signIn" class="card card-form">
                <h1 class="text-center">Login</h1>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input id="email" v-model="form.email" type="text" class="form-input">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input id="password" v-model="form.password" type="password" class="form-input">
                </div>

                <div class="push-top">
                    <button type="submit" class="btn-blue btn-block">Log in</button>
                </div>

                <div class="form-actions text-right">
                    <router-link :to="{name: 'Register'}">Create an account?</router-link>
                </div>
            </form>

            <div class="push-top text-center">
                <button @click="signInWithGoogle" class="btn-red btn-xsmall"><i class="fa fa-google fa-btn"></i>Sign in with Google</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
        return {
            form: {
                email: null,
                password: null
            }
        }
    },
    methods: {
        signIn() {
            this.$store.dispatch('auth/signInWithEmailAndPassword', {
                email: this.form.email,
                password: this.form.password
            })
            .then(() => this.successRedirect())
            .catch(error => alert('Something went wrong with Signin', error.message))
        },

        signInWithGoogle() {
            this.$store.dispatch('auth/signInWithGoogle')
            .then(() => this.successRedirect())
            .catch(error => alert('Something went wrong with Signin', error.message))
        },

        successRedirect () { // redirect to old path click from
            const redirectTo = this.$route.query.redirectTo || {name: "Home"}
            this.$router.push(redirectTo)

        }
    },
    created() {
        this.$emit('ready')
    }
}
</script>

<style>

</style>