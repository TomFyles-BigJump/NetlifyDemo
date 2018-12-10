<template>
  <div class="user form">
    <form>
        <label for="firstName">First name:</label><br>
        <input name="firstName" v-model="user.firstName" type="text"><br><br>
        <label for="lastName">Last name:</label><br>
        <input name="lastName" v-model="user.lastName" type="text"><br><br>
        <label for="age">Age:</label><br>
        <input name="age" v-model="user.age" type="number"><br><br>
    </form>
    <button  @click="createUser">Create user</button>
  </div>
</template>

<script>
import sanity from "../../sanity";
export default {
  name: "user-create",
  data() {
    return {
      user: {
          firstName: "",
          lastName: "",
          age: null
      }
    };
  },
  methods: {
      createUser(){
          const doc = {
            _type: 'user',
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            age: this.user.age
            }

            sanity.create(doc).then(res => {
                this.$router.push("/users");
            })
      }
  }
};
</script>

<style scoped>
.poster{
    max-width: 150px;
    height: auto;
}
.form{
    margin-left: 10%;
    margin-top: 20px;
}

</style>