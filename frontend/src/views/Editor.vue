<template>
  <div class="users">
    <h1>Current User</h1>
    <div>{{userList}}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "User",
  data() {
    return {
      userList: [],
    };
  },

  created() {
    this.getData();
  },

  methods: {
    getData() {
      axios
        .get("http://127.0.0.1:8000/users/")
        .then((response) => {
          this.editorList = response.data;
          console.log("data", this.userList);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
}
</script>

<style scoped>

</style>
