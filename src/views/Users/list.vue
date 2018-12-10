<template>
  <div>
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <ul class="list">
      <li v-for="user in users" class="list__item" :key="user._id">
        <router-link :to="{name: 'user', params: {id: user._id}}">
          <div class="card">
            <h3>{{user.firstName}}  {{user.lastName}}</h3>
            <p>{{user.age}}</p>
          </div>
        </router-link>
      </li>
    </ul>

    <button class="mt-10" @click="createAUser()">Create</button>
  </div>
</template>

<script>
import sanity from "../../sanity";
import imageUrlBuilder from "@sanity/image-url";
const imageBuilder = imageUrlBuilder(sanity);
const query = `*[_type == "user"] {
  _id,
  firstName,
  lastName,
  age
}`;
export default {
  name: "users",
  data() {
    return {
      loading: true,
      users: []
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    createAUser(){
      this.$router.push("/users/create");
    },
    imageUrlFor(source) {
      return imageBuilder.image(source);
    },
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      sanity.fetch(query).then(
        users => {
          this.loading = false;
          this.users = users;
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
.card{
  box-shadow: 0 1px 5px rgba(0, 0, 0, .2), 0 2px 2px rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12);
  padding: 5px;
  margin-bottom: 20px;
}

.mt-10{
  margin-top: 10vh;
}
</style>