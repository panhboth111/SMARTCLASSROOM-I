<template>
  <v-container>
    <h1 class="display-1 my-4">User Management</h1>
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-left">UserId</th>
          <th class="text-left">Username</th>
          <th class="text-left">Email</th>
          <th class="text-left">Role</th>
          <th class="text-left">Settings</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.userId">
          <td>{{ user.userId }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.userEmail }}</td>
          <td>{{ user.role }}</td>
          <td>
            <v-btn icon>
              <v-icon dense>mdi-settings</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-row>
      <v-col col="12">
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <span>Page 1</span>
        <v-btn icon>
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "user-management",
  data: () => {
    return {
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
  }
};
</script>

<style>
</style>