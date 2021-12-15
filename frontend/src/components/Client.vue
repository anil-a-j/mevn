<template>
  <div class="row">
    <div class="col">
      <p>{{ client.name }}</p>
    </div>
    <div class="col">
      <p>{{ client.email }}</p>
    </div>
    <div class="col">
      <p>{{ client.phone }}</p>
    </div>
    <div class="col">
      <p>{{ providersNames }}</p>
    </div>
    <div class="col edit">
      <p @click="$emit('show-edit-modal')">Edit</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Client",
  props: {
    client: Object,
    providers: Array,
  },
  data() {
    return {
      providersNames: "",
    };
  },
  methods: {
    selectProviders() {
      let names = [];
      this.providers.forEach((provider) => {
        this.client.providers.forEach((clientProvider) => {
          if (clientProvider == provider._id) {
            names.push(provider.name);
          }
        });
      });
      this.providersNames = names.toString();
    },
  },
  created() {
    this.selectProviders();
  },
};
</script>
<style scoped>
.edit {
  text-align: center;
  color: blue;
  text-decoration: underline;
}
.edit p {
  cursor: pointer;
}
</style>
