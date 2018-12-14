<template>
  <div>
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <ul class="list">
      <li v-for="cinema in cinemas" class="list__item" :key="cinema._id">
        <router-link :to="{name: 'cinema', params: {id: cinema._id}}">
          <div class="card">
            <div>{{cinema.cinemaName}}</div>
            <h3>{{cinema.cinemaAddress}}</h3>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import sanity from "../sanity";
import imageUrlBuilder from "@sanity/image-url";
const imageBuilder = imageUrlBuilder(sanity);
const query = `*[_type == "cinema"] {
  _id,
  cinemaName,
  cinemaAddress
}`;
export default {
  name: "cinemas",
  data() {
    return {
      loading: true,
      cinemas: []
    };
  },
  created() {
    this.fetchData();
    console.log('sanity-api-key');
    console.log(process.env)
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    imageUrlFor(source) {
      return imageBuilder.image(source);
    },
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      sanity.fetch(query).then(
        cinemas => {
          this.loading = false;
          this.cinemas = cinemas;
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
</style>