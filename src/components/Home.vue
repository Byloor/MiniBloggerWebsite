<template>
  <div>
    <v-btn
      depressed
      class="ma-3"
      v-if="
        $store.state.token &&
        $store.state.blogs.length > 0 &&
        $store.state.user.username == 'Admin'
      "
      @click="deleteAll"
      color="error"
    >
      DELETE ALL BLOGS
    </v-btn>
    <v-container v-if="$store.state.blogs.length === 0" class="fill-height">
      <v-row class="d-flex justify-center red--text">
        <h1>NO BLOGS</h1>
      </v-row>
    </v-container>

    <v-container fluid>
      <v-row dense>
        <v-col v-for="(blog, i) in $store.state.blogs" :key="i" cols="4">
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
              <v-chip v-for="(tag, i) in blog.tags" :key="i">
                {{ tag }}
              </v-chip>
            </v-chip-group>
            <br />
            <v-chip class="ma-2" color="cyan" outlined>
              {{ blog.author }}
            </v-chip>
            <v-card-actions class="ma-2">
              <v-btn color="success" :to="`/blog/${blog.id}`">Open</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
      await axios.delete("http://localhost:3000/blogs").then((res) => {
        console.log("deleted");
        location.reload();
      });
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
