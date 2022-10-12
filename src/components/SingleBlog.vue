<template>
  <div>
    <v-container fluid v-if="blogContent && $store.getters.isUserAuthenticated">
      <h1 class="d-flex flex-wrap">Title: {{ blogContent.title }}</h1>
      <h5 class="text-justify text--secondary">
        Published by: {{ blogContent.author }}
      </h5>
      <br />
      <br />
      <p class="text-justify font-weight-italic">
        <h3>Summary: </h3>  {{ blogContent.summary }}
      </p>
      <p class="text-justify">
        <h3>Content: </h3>
        {{ blogContent.content }}
      </p>
    </v-container>
  </div>
</template>


<script>
export default {
  name: "Blog",
  data() {
    return {
      blogContent: null,
    };
  },
  async created() {
    this.blogContent = (
      await this.$store.dispatch("getBlog", this.$route.params.id)
    ).data;
  },
};
</script>

<style lang="scss">
</style>
