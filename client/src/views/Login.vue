<template>
  <div class="login-view">
    <b-card
      title="Login"
    >
    <b-form @submit="onSubmit" @reset="onReset" class="login-form">
      <b-form-group
        id="input-group-1"
        label="User name:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.username"
          type="text"
          required
          placeholder="Enter user name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>
      <div class="d-flex justify-content-center">
        <b-button class="mr-3" type="submit" variant="primary" :disabled="loading">
          <b-spinner label="Spinning" variable="success" v-if="loading" class="mr-3"></b-spinner>
          Login
        </b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </div>
    </b-form>
    <b-list-group class="mt-3" v-show="error">
        <b-list-group-item variant="danger"
                           v-for="(field, error, i) in errorMsg"
                           :key="i">
          <b-list-group-item variant="danger" v-for="(text, i) in field" :key="i">
            {{text}}
          </b-list-group-item>
        </b-list-group-item>
      </b-list-group>
    </b-card>
    <div class="mt-4">
      <router-link to="/register">Create Account</router-link>|
      <router-link to="/password_reset">Reset Password</router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
    };
  },
  computed: mapState('auth', [
    'error',
    'loading',
    'errorMsg',
  ]),
  methods: {
    login({ username, password }) {
      this.$store
        .dispatch('auth/login', { username, password })
        .then(() => this.$router.push('/')).catch(() => {});
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.login(this.form);
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.username = '';
      this.form.password = '';
    },
  },
};
</script>

<style>
.login-view {
  min-height: calc(100vh - 66px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.login-form {
  min-width: 350px;
}
</style>
