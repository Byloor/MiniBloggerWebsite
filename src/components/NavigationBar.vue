<template>
  <div>
    <v-navigation-drawer
      height="100%"
      v-model="drawer"
      primary
      app
      fixed
      absolute
    >
      <v-list dense nav class="py-0">
        <v-list-item two-line class="px-0">
          <v-list-item-content>
            <v-list-item-title>
              <h1 class="py-4">
                Welcome Blogger! <v-icon color="red"> fas fa-heart </v-icon>
              </h1>
              <h1>
                {{ $store.state.user.username }}
              </h1></v-list-item-title
            >
            <v-spacer /><v-spacer />

            <v-spacer /><v-spacer />
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
  data() {
    return {
      arrayBlogs: [],
      mini: false,
      items: [
        {
          title: "Dash Board",
          color: "green",
          icon: "mdi-home-modern",
          path: "/home",
        },
        { title: "Create Blog", icon: "mdi-pencil", path: "/create-blog" },
        { title: "My Blogs", icon: "mdi-clipboard-text", path: "/my-blogs" },
      ],
    };
  },
};
</script>

<style lang="scss">
</style>
