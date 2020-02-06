<template>
  <v-dialog v-model="create_stream" max-width="670px">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" outlined id="startStreamBtn">
        <v-icon left>mdi-record</v-icon>Go Live
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <span class="title font-weight-regular">Create stream</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            id="streamTitleInput"
            label="Title"
            color="black"
            required
            v-model="streamTitle"
          ></v-text-field>
          <v-text-field
            id="owner"
            label="owner"
            color="black"
            v-if="user.role === 'device'"
            v-model="streamBy"
          ></v-text-field>
          <v-text-field
            id="descriptionInput"
            label="Description"
            color="black"
            v-model="description"
            required
          ></v-text-field>

          <v-switch
            v-if="user.role !== 'Student'"
            class="pa-0"
            dense
            color="grey darken-2"
            v-model="is_from_webcam"
            label="From your webcam"
          ></v-switch>
          <v-switch
            v-if="is_from_webcam"
            id="isPrivateToggle"
            class="pa-0 mt-5"
            dense
            color="grey darken-2"
            v-model="is_private"
            label="Private stream"
          ></v-switch>
          <v-text-field label="Password" color="black" required v-if="is_private"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="black darken-1" text @click="create_stream = false">Cancel</v-btn>
        <v-btn
          text
          v-on="on"
          class="font-weight-black"
          @click="user.role === 'Student' || user.role === 'device' || is_from_webcam ? startStream() : select_class = true"
          id="startStreamBtn"
        >Continue</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {};
</script>

<style>
</style>