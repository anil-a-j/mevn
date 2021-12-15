<template>
  <div class="home">
    <Header @add-client="addClientModal" />
    <ClientsTable
      :clients="clients"
      @show-edit-modal="showModal"
      :providers="providers"
    />
    <ClientModal
      @close-modal="closeModal"
      v-if="modalView"
      :addClient="addClient"
      :client="client"
      :providers="providers"
      @delete-client="deleteClient"
      @add-new-client="addNewClient"
      @update-client="updateClient"
    />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import ClientsTable from "@/components/ClientsTable.vue";
import ClientModal from "@/components/ClientModal.vue";

export default {
  name: "Home",
  components: {
    Header,
    ClientsTable,
    ClientModal,
  },
  data() {
    return {
      clients: [],
      providers: [],
      modalView: false,
      addClient: false,
      client: "",
    };
  },
  methods: {
    async deleteClient() {
      if (this.deleteId !== "" && this.addClient === false) {
        const res = await fetch(`api/clients/delete/${this.client._id}`, {
          method: "DELETE",
        });

        this.modalView = false;

        if (res.status === 200) {
          this.clients = this.clients.filter(
            (client) => client._id !== this.client._id
          );
        } else {
          alert("Error deleting client");
        }
      }
    },
    async updateClient(clientNewData) {
      const res = await fetch("api/clients/update", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(clientNewData),
      });

      if (res.status == 404) {
        throw new Error("client not found");
      }
      const data = await res.json();

      this.clients = this.clients.map((client) => {
        if (client._id === clientNewData.id) {
          return {
            ...client,
            name: data.name,
            email: data.email,
            phone: data.phone,
            providers: data.providers,
          };
        } else {
          return client;
        }
      });

      this.modalView = false;
    },
    closeModal() {
      this.modalView = false;
    },
    showModal(client) {
      this.modalView = true;
      this.addClient = false;
      this.client = client;
    },
    addClientModal() {
      this.modalView = true;
      this.addClient = true;
      this.client = "";
    },
    async fetchProviders() {
      const res = await fetch("api/providers", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      return data;
    },
    async fetchClients() {
      const res = await fetch("api/clients", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      return data;
    },
    async addNewClient(newClient) {
      const res = await fetch("api/clients/add", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newClient),
      });

      if (res.status == 400) {
        throw new Error("client already exists");
      }

      const data = await res.json();

      this.clients = [...this.clients, data];

      this.modalView = false;
    },
  },
  async created() {
    this.providers = await this.fetchProviders();
    this.clients = await this.fetchClients();
  },
};
</script>
