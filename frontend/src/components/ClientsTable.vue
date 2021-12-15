<template>
  <div class="table">
    <div class="row title">
      <div class="col">
        <h4>Name</h4>
      </div>
      <div class="col">
        <h4>Email</h4>
      </div>
      <div class="col">
        <h4>Phone</h4>
      </div>
      <div class="col">
        <h4>Providers</h4>
      </div>
      <div class="col"></div>
    </div>
    <div v-for="client in clients" :key="client._id">
      <Client
        :client="client"
        @show-edit-modal="$emit('show-edit-modal', client)"
        :providers="providers"
      />
    </div>
  </div>
</template>

<script>
import Client from "@/components/Client.vue";

export default {
  name: "Header",
  props: {
    clients: Array,
    providers: Array,
  },
  components: {
    Client,
  },
};
</script>

<style>
.table {
  font-family: sans-serif;
}
.table .row {
  display: flex;
  width: 100%;
}
.table .row.title {
  background-color: rgb(243, 243, 243);
  box-shadow: 0px 4px 12px -7px #474242;
}
.table .row .col {
  border: 1px solid rgb(214, 214, 214);
  justify-content: space-evenly;
  padding: 10px 0px 10px 20px;
}
.table .row .col:nth-child(1) {
  width: 15%;
}
.table .row .col:nth-child(2) {
  width: 20%;
}
.table .row .col:nth-child(3) {
  width: 15%;
}
.table .row .col:nth-child(4) {
  width: 40%;
}
.table .row .col:nth-child(5) {
  width: 10%;
  padding: 10px 0px;
}
.table .row .col h4,
.table .row .col p {
  margin: 0;
}
</style>
