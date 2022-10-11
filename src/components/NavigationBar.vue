<template>
  <div>
    <v-navigation-drawer
      v-model="open"
      primary
      app
      fixed
      absolute
      permanent
      dark
    >
      <v-list dense nav class="py-0">
        <v-list-item two-line class="px-0">
          <v-list-item-content>
            <v-list-item-title><h2>Mini Blogger</h2></v-list-item-title>
            <v-spacer /><v-spacer />
            <v-list-item-subtitle>{{
              $store.state.user.name
            }}</v-list-item-subtitle>
            <v-spacer />
            <v-list-item-subtitle>{{
              $store.state.user.description
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.path"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>


<script>
export default {
  name: "NavigationBar",
  props: ["drawer"],
  computed: {
    // a computed getter
    open() {
      // `this` points to the vm instance
      return this.drawer;
    },
  },
  data() {
    return {
      arrayBlogs: [],
      mini: true,
      items: [
        { title: "Home", icon: "mdi-view-dashboard", path: "/" },
        { title: "Create Blog", icon: "mdi-image", path: "/create-blog" },
        // { title: "My Blogs", icon: "mdi-help-box", path: "/my-blogs" },
      ],
    };
  },
};
</script>

<style lang="scss">
</style>
