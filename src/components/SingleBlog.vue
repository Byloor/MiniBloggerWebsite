<template>
  <div>
    <v-container fluid v-if="blogContent">
      <h1>{{ blogContent.title }}</h1>
      <p class="text-justify text--secondary" v-if="blogContent.author">
        {{ blogContent.author }}
      </p>
      <p class="text-justify font-weight-italic">{{ blogContent.summary }}</p>
      <p class="text-justify">{{ blogContent.content }}</p>
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
    ).data.details;
    console.log("this", this.blogContent);
  },
};
</script>

<style lang="scss">
</style>
