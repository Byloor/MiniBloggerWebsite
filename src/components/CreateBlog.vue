<template>
  <div>
    <v-col cols="12">
      <v-img
        :src="require('../assets/mb-small.png')"
        class="mt-12"
        contain
        height="50"
      />
    </v-col>
    <ValidationObserver ref="observer">
      <v-card class="flexcard" height="100%" flat slot-scope="{ invalid }">
        <v-card-title class="text-uppercase d-flex justify-center mb-6">
          Create your own Blog
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <ValidationProvider name="Title" rules="required|max:30">
                    <v-text-field
                      label="Title*"
                      :counter="30"
                      slot-scope="{ errors, valid }"
                      required
                      :error-messages="errors"
                      :success="valid"
                      v-model="blogObject.title"
                      hint="Title of your awesome blog"
                      persistent-hint
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider name="Tags" rules="required">
                    <v-combobox
                      required
                      label="Tags*"
                      v-model="blogObject.tags"
                      multiple
                      :items="[
                        'Cooking',
                        'Sports',
                        'Clothing',
                        'Interior design',
                        'Programming',
                        'Architecture',
                        'Other',
                        'Gardening',
                        'Organising',
                        'Personal Interest',
                      ]"
                      blogObject.tags
                      clearable
                    >
                      <template
                        v-slot:selection="{ attrs, item, select, selected }"
                      >
                        <v-chip
                          v-bind="attrs"
                          :input-value="selected"
                          @click="select"
                        >
                          <strong>{{ item }}</strong
                          >&nbsp;
                        </v-chip>
                      </template>
                    </v-combobox>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider
                    name="Description"
                    rules="required|max:60"
                  >
                    <v-textarea
                      outlined
                      rows="2"
                      clearable
                      :counter="60"
                      slot-scope="{ errors, valid }"
                      :error-messages="errors"
                      :success="valid"
                      v-model="blogObject.summary"
                      label="Description (Summary)*"
                      value=""
                      required
                    ></v-textarea>
                  </ValidationProvider>
                </v-col>

                <v-col cols="12">
                  <ValidationProvider rules="required" name="Content">
                    <v-textarea
                      v-model="blogObject.content"
                      outlined
                      required
                      label="Content*"
                      value=""
                    ></v-textarea>
                  </ValidationProvider>
                </v-col>
                <!-- <v-col cols="12">
                  <ValidationProvider name="images" rules="required">
                    <v-file-input
                      multiple
                      accept="image/png, image/jpeg"
                      show-size
                      prepend-icon="mdi-camera"
                      label="Upload images for your blog"
                    ></v-file-input>
                  </ValidationProvider>
                </v-col> -->
                <v-col cols="6">
                  <ValidationProvider name="Author" rules="max:20">
                    <v-text-field
                      label="Author name"
                      :counter="20"
                      slot-scope="{ errors, valid }"
                      required
                      :error-messages="errors"
                      :success="valid"
                      v-model="blogObject.author"
                      hint="Provide your name if you wish to or remain anonymous"
                      persistent-hint
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="clear"> Reset </v-btn>
          <v-btn color="blue darken-1" :disabled="invalid" text @click="submit">
            Publish
          </v-btn>
        </v-card-actions>
      </v-card>
    </ValidationObserver>
    <v-snackbar v-model="snackbar">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>


<script>
import { required, max } from "vee-validate/dist/rules.umd";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
setInteractionMode("eager");
extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});
extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});
export default {
  name: "CreateBlog",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    blogObject: {
      content: "",
      tags: [],
      //images: [],
      title: "",
      summary: "",
      author: null,
    },
    snackbar: false,
    snackbarText: "",
  }),
  computed: {
    isSaveButtonDisabled() {
      // loop over all contents of the fields object and check if they exist and valid.
      return Object.keys(this.addTool).every((field) => {
        return this.addTool[field] && this.addTool[field].valid;
      });
    },
  },
  methods: {
    async submit() {
      try {
        await this.$refs.observer.validate();
        this.blogObject.author = this.blogObject.author || "Anonymous";
        await this.$store.dispatch("createBlog", this.blogObject);
        this.clear();
        this.snackbar = true;
        this.snackbarText = "Congratulations! Your blog is online";
        if (this.$store.state.newBlog) {
          this.$router.push(`/blog/${this.$store.state.newBlog.id}`);
        }
      } catch (err) {
        console.error("Something went wrong", err);
        this.snackbar = true;
        this.snackbarText = "Oops! Something went wrong";
      }
    },
    clear() {
      this.blogObject = {
        content: "",
        tags: [],
        images: [],
        title: "",
        summary: "",
      };
      this.$nextTick(() => {
        this.$refs.observer.reset();
      });
    },
  },
};
</script>

<style scoped lang="scss">
.flexcard {
  display: flex;
  flex-direction: column;
}
// Add the css below if your card has a toolbar, and if your toolbar's height increases according to the flex display.
.flexcard .v-toolbar {
  flex: 0;
}
</style>
