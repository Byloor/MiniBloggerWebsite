<template>
  <v-container>
    <v-col cols="12">
      <v-img
        :src="require('../../assets/mb.jpeg')"
        class="my-3"
        contain
        height="200"
      />
    </v-col>
    <ValidationObserver ref="observer">
      <v-card
        color="#F7F6F4"
        class="flexcard"
        height="100%"
        slot-scope="{ invalid }"
      >
              <v-card-title class="d-flex justify-center ma-4">
          Welcome! Please Login
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-container>
              <v-col cols="12">
                <ValidationProvider name="Name" rules="required">
                  <v-text-field
                    label="UserName*"
                    slot-scope="{ errors, valid }"
                    required
                    :error-messages="errors"
                    :success="valid"
                    v-model="userInfo.username"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12">
                <ValidationProvider name="Title" rules="required">
                  <v-text-field
                    :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPass = !showPass"
                    label="Password*"
                    slot-scope="{ errors, valid }"
                    required
                    :type="showPass ? 'text' : 'password'"
                    :error-messages="errors"
                    :success="valid"
                    v-model="userInfo.password"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
            </v-container>
            <small>*indicates required field</small>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            class="ma-2"
            :color="invalid ? 'error' : 'success'"
            @click="login"
          >
            Login to your account
          </v-btn>
        </v-card-actions>
      </v-card>
    </ValidationObserver>
  </v-container>
</template>

<script>
import { required } from "vee-validate/dist/rules.umd";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
setInteractionMode("eager");
extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});
export default {
  name: "LoginForm",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      userInfo: {
        username: "",
        password: "",
      },
      showPass: false,
    };
  },
  methods: {
    async login() {
      if (this.invalid) return;

      try {
        await this.$refs.observer.validate();
        this.$store.dispatch("loginUser", this.userInfo).then((res) => {
          if (this.$store.state.token) this.$router.push("/home");
        });
      } catch (err) {
        console.error("Something went wrong", err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>