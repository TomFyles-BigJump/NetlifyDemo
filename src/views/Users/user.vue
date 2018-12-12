<template>
  <div class="user">
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="user">
        <h1 class="text-center">{{user.firstName}}  {{user.lastName}}</h1>
        <h2 class="text-center">{{user.age}}</h2>
        <button @click="editUser()">Edit</button>
    </div>
  </div>
</template>

<script>
import sanity from "../../sanity";
import blocksToHtml from "@sanity/block-content-to-html";
import imageUrlBuilder from "@sanity/image-url";
const imageBuilder = imageUrlBuilder(sanity);
const query = `*[_type == "user" && _id == $id] {
  _id,
  firstName,
  lastName,
  age
}[0]
`;
export default {
  props: {
    id: {
      type: String
    }
  },
  name: "user",
  data() {
    return {
      loading: true,
      user: null
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    editUser(){
      this.$router.push(`/user/${this.id}/edit`);
    },
    imageUrlFor(source) {
      return imageBuilder.image(source);
    },
    fetchData() {
      this.error = this.user = null;
      this.loading = true;
      sanity.fetch(query, { id: this.id }).then(
        user => {
          this.loading = false;
          this.user = user;
          console.log(this.user);
        },
        error => {
          this.error = error;
        }
      );
    }
  }
};
</script>

<style scoped>
.poster{
    max-width: 150px;
    height: auto;
}

</style>