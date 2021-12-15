<template>
  <div class="header">
    <h1>Clients</h1>
    <button @click="$emit('add-client')">New Client</button>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  padding: 0 18px;
  background: rgb(221, 225, 240);
}
.header h1 {
  font-family: sans-serif;
  color: rgb(9, 78, 206);
  margin: 5px 0px 0px 0px;
  font-weight: bold;
}
button {
  padding: 5px 10px;
  border-radius: 5px;
  margin: 8px 0px;
  font-weight: bold;
  border: 1px solid rgb(153, 153, 153);
  background: linear-gradient(180deg, rgb(255, 255, 255), rgb(230, 230, 230));
}
button:hover {
  background: linear-gradient(180deg, rgb(230, 230, 230), rgb(255, 255, 255));
}
</style>
