<template>
  <div class="modal">
    <div class="modal-box">
      <div class="modal-header">
        <h2 v-if="addClient === true">New Client</h2>
        <h2 v-else>Edit Client</h2>
      </div>
      <form @submit="onSubmit">
        <div class="modal-body">
          <div class="form-control">
            <label for="name" class="label">Name:</label>
            <input type="text" v-model="name" class="input" name="name" />
          </div>
          <div class="form-control">
            <label for="email" class="label">Email:</label>
            <input type="email" v-model="email" class="input" name="email" />
          </div>
          <div class="form-control">
            <label for="phone" class="label">Phone:</label>
            <input type="text" v-model="phone" class="input" name="phone" />
          </div>
          <div class="form-control">
            <label for="providersName" class="label">Providers:</label>
            <div class="input">
              <input type="text" readonly class="input" name="providersName" />
              <button @click="addProviders">Add Provider</button>
            </div>
          </div>
          <div class="providersSection" v-show="showProviders">
            <div v-for="provider in providers" :key="provider.id">
              <div class="form-control">
                <input
                  type="checkbox"
                  v-model="providerIds"
                  :value="provider._id"
                />
                <label>{{ provider.name }}</label>
                <i class="fas fa-edit"></i>
                <i class="fas fa-trash-alt"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            v-if="addClient === false"
            @click="deleteClient"
            class="delete"
          >
            Delete Client
          </button>
          <button @click="changeTodefault" class="cancel">cancel</button>
          <button type="submit">Save Client</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "ClientModal",
  props: {
    addClient: Boolean,
    providers: Array,
    client: [String, Object],
  },
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      showProviders: false,
      providerIds: [],
    };
  },
  methods: {
    deleteClient(e) {
      e.preventDefault();
      this.$emit("delete-client");
    },
    addProviders(e) {
      e.preventDefault();
      this.showProviders = !this.showProviders;
    },
    changeTodefault(e) {
      e.preventDefault();
      this.showProviders = false;
      this.$emit("close-modal");
    },
    onSubmit(e) {
      e.preventDefault();
      if (this.client != "") {
        const clientNewData = {
          id: this.client._id,
          name: this.name,
          email: this.email,
          phone: this.phone,
          providers: this.providerIds,
        };

        this.$emit("update-client", clientNewData);
      } else {
        if (!this.name) {
          alert("Please add a name");
          return;
        }
        if (!this.email) {
          alert("Please add an email");
          return;
        }
        if (!this.phone) {
          alert("Please add a phone number");
          return;
        }
        if (this.providerIds.length === 0) {
          alert("select atleast a provider");
          return;
        }

        const newClient = {
          name: this.name,
          email: this.email,
          phone: this.phone,
          providers: this.providerIds,
        };

        this.$emit("add-new-client", newClient);

        this.name = "";
        this.email = "";
        this.phone = "";
        this.providersIds = [];
      }
    },
  },
  created() {
    if (this.client != "") {
      this.name = this.client.name;
      this.email = this.client.email;
      this.phone = this.client.phone;
      this.providerIds = this.client.providers;
      this.showProviders = true;
    }
  },
};
</script>
<style>
.modal {
  position: absolute;
  display: flex;
  z-index: 999;
  top: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: top;
  background: rgba(185, 185, 185, 0.384);
}
.modal .modal-box {
  background: white;
  width: 70%;
  border: 1px solid rgb(214, 214, 214);
  align-self: baseline;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.modal .modal-box .modal-header {
  padding: 0px 20px;
  border-bottom: 1px solid rgb(214, 214, 214);
}
.modal .modal-box .modal-header h2 {
  font-family: sans-serif;
  color: rgb(9, 78, 206);
  margin: 9px;
}
.modal .modal-box .modal-body {
  padding-top: 20px;
  justify-content: center;
}
.modal .modal-box .modal-footer {
  padding: 0px 20px;
  border-top: 1px solid rgb(214, 214, 214);
}
form {
  width: 100%;
}
.modal-body .form-control {
  width: 80%;
  display: flex;
  margin-bottom: 15px;
}
form .providersSection .form-control {
  width: 70%;
}
form .form-control label.label {
  width: 40%;
  display: block;
  text-align: right;
  padding-right: 20px;
  font-family: sans-serif;
  align-self: center;
  font-weight: bold;
}
form .form-control input.input {
  width: 70%;
  height: 30px;
  border-radius: 5px;
  border: 1px solid rgb(214, 214, 214);
}
form .form-control:nth-child(4) .input {
  display: flex;
  width: 70%;
}
form .form-control button {
  margin: 0px 0px 0px 10px;
  flex: 1;
}
form .providersSection {
  width: 31.5%;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(214, 214, 214);
  padding: 20px 20px 0px 20px;
  margin-left: 30.1%;
  margin-bottom: 20px;
}
form .providersSection input {
  margin: 2px 20px 0px 0px;
  width: 20px;
}
form .providersSection .fas {
  margin-left: 20px;
}
.modal-footer {
  display: flex;
}
.modal-footer button {
  height: 40px;
  width: 150px;
}
.modal-footer button.delete {
  background: linear-gradient(180deg, rgb(223, 50, 50), rgb(165, 11, 11));
  color: white;
}
.modal-footer button.delete:hover {
  background: linear-gradient(180deg, rgb(165, 11, 11), rgb(223, 50, 50));
}
.modal-footer button.cancel {
  margin-left: auto;
  margin-right: 10px;
}
</style>
