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
      <v-card class="flexcard" height="100%" slot-scope="{ invalid }">
        <v-card-title class="d-flex justify-center mb-12">
          <v-toolbar flat>
            <v-toolbar-title>
              Welcome! Please Register with your user name</v-toolbar-title
            >
            <v-spacer></v-spacer>
          </v-toolbar>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-container>
              <v-col cols="12">
                <ValidationProvider name="Name" rules="required">
                  <v-text-field
                    label="Name*"
                    slot-scope="{ errors, valid }"
                    required
                    :error-messages="errors"
                    :success="valid"
                    v-model="userInfo.username"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12">
                <ValidationProvider name="Password" rules="required">
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
              <v-col cols="12">
                <ValidationProvider name="Description" rules="required">
                  <v-text-field
                    label="Description*"
                    slot-scope="{ errors, valid }"
                    required
                    :error-messages="errors"
                    :success="valid"
                    v-model="userInfo.description"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
            </v-container>
            <small>*indicates required field</small>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="blue darken-1"
            :disabled="invalid"
            text
            @click="register"
          >
            Register
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
  name: "RegisterForm",
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
    async register() {
      try {
        await this.$refs.observer.validate();
        this.$store.dispatch("registerUser", this.userInfo);
        this.$router.push("Login");
      } catch (err) {
        console.error("Something went wrong", err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>