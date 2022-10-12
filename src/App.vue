<template>
  <v-app>
    <v-app-bar app color="white">
      <v-icon
        v-if="$store.getters.isUserAuthenticated"
        @click="drawer = !drawer"
        class="pr-3"
        color="success"
      >
        fas fa-navicon
      </v-icon>
      <v-toolbar-title class="d-flex flex-wrap justify-center">
    
        <span style="line-height: 2.7">MINI BLOGGER</span></v-toolbar-title
      >
      <v-spacer />
      <v-btn v-if="!$store.getters.isUserAuthenticated" text to="/login"
        >Login</v-btn
      >
      <v-btn v-if="!$store.getters.isUserAuthenticated" text to="/register"
        >Register</v-btn
      >
      <v-btn v-if="$store.getters.isUserAuthenticated" text @click="logout()"
        >Logout</v-btn
      >
    </v-app-bar>
    <navigation-bar
      :drawer="drawer"
      v-if="$store.getters.isUserAuthenticated"
    ></navigation-bar>
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
  data() {
    return {
      drawer: true,
    };
  },
  methods: {
    async logout() {
      try {
        this.$store.commit("logout");
        if (!this.$store.getters.isUserAuthenticated)
          this.$router.push("/login");
      } catch (err) {
        console.error("Something went wrong", err);
      }
    },
  },
};
</script>