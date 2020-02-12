<template>
  <v-container>
    <h1 class="display-1 mt-8 mb-10">User Management</h1>
    <v-data-table
      :items="users"
      :headers="userHeaders"
      class="elevation-1"
    >
      <template v-slot:item="props">
        <tr @click="onUserClick(props.item)">
          <td>{{ props.item.userId }}</td>
          <td>{{ props.item.username }}</td>
          <td>{{ props.item.userEmail }}</td>
          <td>{{ props.item.role }}</td>
        </tr>
      </template>
    </v-data-table>

    <v-dialog v-model="editUserModal" max-width="500px">
      <v-card>
        <v-card-title>Edit a user</v-card-title>
        <v-card-text>
          <v-text-field label="Username" v-model="userName"></v-text-field>
          <v-text-field label="Email" v-model="userEmail"></v-text-field>
          <v-select
            label="Role"
            :items="['Student', 'Lecturer', 'Admin', 'Device']"
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
export default {
  name: "user-management",
  data: () => {
    return {
      userName: "",
      userEmail: "",
      userRole: "",
      editUserModal: false,
      userHeaders: [
        {text: "id", value: "userId"},
        {text: "Username", value: "username"},
        {text: "Email", value: "userEmail"},
        {text: "Role", value: "role"}
      ],
      users: [
        {
          userId: 1,
          username: "Vira",
          userEmail: "lychunvira@gmail.com",
          role: "Student"
        },
        {
          userId: 2,
          username: "Vira",
          userEmail: "lychunvira@gmail.com",
          role: "Student"
        },
        {
          userId: 3,
          username: "Vira",
          userEmail: "lychunvira@gmail.com",
          role: "Student"
        },
        {
          userId: 4,
          username: "Vira",
          userEmail: "lychunvira@gmail.com",
          role: "Student"
        },
        {
          userId: 5,
          username: "Vira",
          userEmail: "lychunvira@gmail.com",
          role: "Student"
        },
        {
          userId: 6,
          username: "Vira",
          userEmail: "lychunvira@gmail.com",
          role: "Student"
        },
        {
          userId: 7,
          username: "Vira",
          userEmail: "lychunvira@gmail.com",
          role: "Student"
        },
        {
          userId: 8,
          username: "Vira",
          userEmail: "lychunvira@gmail.com",
          role: "Student"
        },
        {
          userId: 9,
          username: "Vira",
          userEmail: "lychunvira@gmail.com",
          role: "Student"
        },
        {
          userId: 10,
          username: "Vira",
          userEmail: "lychunvira@gmail.com",
          role: "Student"
        }
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
    onUserSave(){
      this.userName = this.userEmail = this.userRole = ""
      this.editUserModal = false
    }
    
  }
};
</script>

<style>
</style>