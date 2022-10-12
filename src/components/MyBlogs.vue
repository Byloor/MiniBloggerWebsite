<template>
  <div>
    <v-container
      v-if="$store.state.currentUserBlogs.length === 0"
      class="fill-height"
    >
      <v-row class="d-flex pa-12 justify-center green--text">
        <h1>NO BLOGS! please your first blog via createBlog section</h1>
      </v-row>
    </v-container>

    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="(blog, i) in $store.state.currentUserBlogs"
          :key="i"
          cols="4"
        >
          <v-card class="pa-md-4" color="#F7F6F4"
            ><v-card-title v-text="blog.title"></v-card-title>
            <!-- <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="card.title"></v-card-title>
            </v-img> -->

            <v-chip-group class="ma-2" active-class="primary--text" column>
              <v-chip color="success" v-for="(tag, i) in blog.tags" :key="i">
                category: {{ tag }}
              </v-chip>
            </v-chip-group>
            <br />
            <v-chip class="ma-2" color="cyan" outlined>
              Published by: {{ blog.author }}
            </v-chip>
            <v-card-actions class="ma-2">
              <v-spacer />
              <v-btn text color="error" @click="deleteById(blog.id)"
                >Delete</v-btn
              >
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
        $store.getters.isUserAuthenticated &&
        $store.state.currentUserBlogs.length > 0
      "
      @click="deleteAll"
      color="error"
    >
      Delete all my blogs
    </v-btn>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "MyBlogs",
  async created() {
    if (this.$store.getters.isUserAuthenticated && this.$store.state.user?.id) {
      const userid = this.$store.state.user.id;
      await this.$store.dispatch("getBlogsByUserid", userid);
    }
  },
  methods: {
    async deleteAll() {
      if (
        this.$store.getters.isUserAuthenticated &&
        this.$store.state.user?.id
      ) {
        const userid = this.$store.state.user.id;
        await axios
          .delete(`http://localhost:3000/blogs/${userid}`)
          .then((res) => {
            this.$store.commit("updateCurrentUserBlogs", []);
            console.log(res.data.message);
          })
          .catch((err) =>
            console.error("Could not delete all your blogs", err)
          );
      }
    },
    async deleteById(id) {
      await axios
        .delete(`http://localhost:3000/blog/${id}`)
        .then((res) => {
          this.$store.commit("deleteBlog", res.data.id);
          console.log(res.data.message);
        })
        .catch((err) => console.error("Deletion failed", err));
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
