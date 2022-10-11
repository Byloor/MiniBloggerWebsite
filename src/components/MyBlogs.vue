<template>
  <div>
    <!-- <v-list dense>
      <v-list-item v-for="(blog, i) in $store.state.blogs" :key="i">
        <v-list-item-content>
          <v-list-item-title v-text="blog.title"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list> -->
    <v-container fluid>
      <v-row dense>
        <v-col v-for="(blog, i) in $store.state.blogs" :key="i" cols="4">
          <v-card
            ><v-card-title v-text="blog.details.title"></v-card-title>
            <!-- <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="card.title"></v-card-title>
            </v-img> -->
            <v-chip-group active-class="primary--text" column>
              <v-chip v-for="(tag, i) in blog.details.tags" :key="i">
                {{ tag }}
              </v-chip>
            </v-chip-group>
            <br />
            <v-chip
              class="ma-2"
              color="orange"
              outlined
            >
              {{ blog.details.author }}
            </v-chip>
            <v-card-actions>
              <v-btn icon color="blue" :to="`blog/${i}`">Open</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <!-- https://codesandbox.io/s/vuetify-drawer-forked-yd595k?file=/index.html:160-245 -->
</template>


<script>
export default {
  name: "MyBlogs",
  async created() {
    this.$store.dispatch("getBlogs", userId);
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
