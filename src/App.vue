<template>
  <v-app>
    <v-app-bar app color="white">
      <!-- <v-icon v-if="$store.state.token" @click="drawer = !drawer" class="pr-3">
        fas fa-list
      </v-icon> -->
      <v-toolbar-title class="d-flex flex-wrap justify-center">
        <img :src="require('./assets/mb.jpeg')" contain height="50" />
        <span style="line-height: 2.7">MINI BLOGGER</span></v-toolbar-title
      >
      <v-spacer />
      <v-btn v-if="!$store.state.token" text to="/login">Login</v-btn>
      <v-btn v-if="!$store.state.token" text to="/register">Register</v-btn>
      <v-btn v-if="$store.state.token" text @click="logout()">Logout</v-btn>
    </v-app-bar>
    <navigation-bar v-if="$store.state.token"></navigation-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Home from "./components/Home.vue";
import CreateBlog from "./components/CreateBlog";
import NavigationBar from "./components/NavigationBar";

export default {
  name: "App",
  components: {
    Home,
    CreateBlog,
    NavigationBar,
  },
  methods: {
    async logout() {
      try {
        this.$store.commit("logout");
        if (!this.$store.state.token) this.$router.push("/login");
      } catch (err) {
        console.error("Something went wrong", err);
      }
    },
  },
};
</script>