<template>
  <v-container>
    <v-row class="ml-1 mt-8 mb-10">
      <h1 class="display-1">User Management</h1>
      <v-spacer></v-spacer>
      <v-btn text small>Refresh</v-btn>
    </v-row>
    <v-data-table
      :items="users"
      :headers="userHeaders"
      class="elevation-1"
    >
      <template v-slot:item="props">
        <tr @click="onUserClick(props.item)">
          <!-- <td>{{ props.item.userId }}</td> -->
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.email }}</td>
          <td>{{ props.item.role }}</td>
        </tr>
      </template>
    </v-data-table>

    <v-dialog v-model="editUserModal" max-width="500px">
      <v-card>
        <v-card-title>Edit a user</v-card-title>
        <v-card-text>
          <v-text-field label="Username" v-model="userName"></v-text-field>
          <v-text-field label="Email" v-model="userEmail" disabled></v-text-field>
          <v-select
            label="Role"
            :items="['Student', 'Lecturer', 'Admin']"
            v-model="userRole"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="onUserSave()">Cancel</v-btn>
          <v-btn text @click="onUserSave()">Delete</v-btn>
          <v-btn text class="font-weight-bold" @click="onUserSave()">Save</v-btn>
        </v-card-actions>
      </v-card>      
    </v-dialog>
  </v-container>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import backend from '../Service'
export default {
  name: "user-management",
  data: () => {
    return {
      userName: "",
      userEmail: "",
      userRole: "",
      editUserModal: false,
      userHeaders: [
        {text: "Username", value: "username"},
        {text: "Email", value: "userEmail"},
        {text: "Role", value: "role"}
      ],
      users: [
      ]
    };
  },
  methods: {
    // On User Click
    onUserClick(user){
      this.userName = user.username
      this.userEmail = user.userEmail,
      this.userRole = user.role
      this.editUserModal = true
    },

    // On User Save
    async onUserSave(){
      const result = await backend.changeRole(this.userEmail,this.userRole)
      if (result.errCode){
        alert(result.message)
      }else{
        this.userName = this.userEmail = this.userRole = ""
        this.getAllUsers()
        this.editUserModal = false

      }
    },

    // Get All User 
    async getAllUsers(){
      //this.users = await backend.getAllUsers().data
      let _users = await backend.getAllUsers()
      _users = _users.data
      this.users = [..._users].filter(_user => _user.role !== "Device")
    }
    
  },
  created(){
    this.getAllUsers()
  }
};
</script>

<style>
</style>