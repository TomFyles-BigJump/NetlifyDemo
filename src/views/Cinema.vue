<template>
  <div class="cinema">
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="cinema">
        <h1 class="text-center">{{cinema.cinemaName}}</h1>
        <p class="text-center">{{cinema.cinemaAddress}}</p>
        <h2 class="text-center" >Showings</h2>
        <ul class="no-indication">
            <hr>
            <li v-for="showing in cinema.showings" :key="showing._key">
                <h3>{{showing.title}}</h3>
                <p>Release date : {{showing.releaseDate}}</p>
                <p>Poster</p>
                <img :src="imageUrlFor(showing.posterUrl)" class="poster" />
                <hr>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import sanity from "../sanity";
import blocksToHtml from "@sanity/block-content-to-html";
import imageUrlBuilder from "@sanity/image-url";
const imageBuilder = imageUrlBuilder(sanity);
const query = `*[_type == "cinema" && _id == $id] {
  _id,
  cinemaName,
  cinemaAddress,
  "showings": showings[]->{
    _id,
    title,
    releaseDate,
    poster,
    "posterUrl": poster.asset->url,
  }
}[0]
`;
export default {
  props: {
    id: {
      type: String
    }
  },
  name: "cinema",
  data() {
    return {
      loading: true,
      cinema: null
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    imageUrlFor(source) {
      return imageBuilder.image(source);
    },
    fetchData() {
      this.error = this.cinema = null;
      this.loading = true;
      sanity.fetch(query, { id: this.id }).then(
        cinema => {
          this.loading = false;
          this.cinema = cinema;
          console.log(this.cinema);
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