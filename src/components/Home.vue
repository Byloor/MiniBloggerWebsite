<template>
  <div>
    <v-container v-if="$store.state.blogs.length === 0" class="fill-height">
      <v-row class="d-flex pa-12 justify-center green--text">
        <h1>NO BLOGS! please your first blog via createBlog section</h1>
      </v-row>
    </v-container>

    <v-container fluid>
      <v-row dense>
        <v-col v-for="(blog, i) in $store.state.blogs" :key="i" cols="4">
          <v-card class="pa-md-4" color="#F7F6F4"
            ><v-card-title v-text="blog.title"></v-card-title>
            <v-chip-group class="ma-2" active-class="primary--text" column>
              <v-chip v-for="(tag, i) in blog.tags" :key="i">
                {{ tag }}
              </v-chip>
            </v-chip-group>
            <br />
            <v-chip class="ma-2" color="cyan" outlined>
              {{ blog.author }}
            </v-chip>
            <v-card-actions class="ma-2">
              <v-spacer />
              <v-btn color="success" :to="`/blog/${blog.id}`">Open</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-btn
      depressed
      class="ma-3"
      text
      v-if="
        $store.state.token &&
        $store.state.blogs.length > 0 &&
        $store.state.user.username == 'Admin'
      "
      @click="deleteAll"
      color="error"
    >
      Delete all the blogs
    </v-btn>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {};
  },
  async created() {
    await this.$store.dispatch("getBlogs");
  },
  methods: {
    async deleteAll() {
      await axios
        .delete("http://localhost:3000/blogs")
        .then((res) => {
          console.log("deleted", res);
          this.$store.commit("updateBlogs", []);
        })
        .catch((err) => console.error("Could not delete all blogs", err));
    },
  },
};
</script>

<style lang="scss">
.flex {
  flex-grow: 0;
}

.flex-empty {
  height: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;

  div {
    width: 150px;
  }
}
</style>
