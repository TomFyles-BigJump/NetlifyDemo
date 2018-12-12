<template>
  <div class="user form">
    <div class="loading" v-if="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="user">
      <form>
        <label for="firstName">First name:</label>
        <br>
        <input name="firstName" v-model="user.firstName" type="text">
        <br>
        <br>
        <label for="lastName">Last name:</label>
        <br>
        <input name="lastName" v-model="user.lastName" type="text">
        <br>
        <br>
        <label for="age">Age:</label>
        <br>
        <input name="age" v-model="user.age" type="number">
        <br>
        <br>
      </form>
      <button @click="editUser">Edit user</button>
    </div>
  </div>
</template>

<script>
import sanity from "../../sanity";
export default {
  name: "user-edit",
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      loading: true,
      user: null,
      error: false
    };
  },
  mounted() {
    const query = `*[_type == "user" && _id == $id] {
    _id,
    firstName,
    lastName,
    age
    }[0]
    `;

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
  },
  methods: {
    editUser() {
      console.log(this.user);
      const doc = {
        _id: this.user._id,
        _type: "user",
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        age: this.user.age
      };

      sanity.createOrReplace(doc).then(res => {
        this.$router.push("/users");
      });
    }
  }
};
</script>

<style scoped>
.poster {
  max-width: 150px;
  height: auto;
}
.form {
  margin-left: 10%;
  margin-top: 20px;
}
</style>