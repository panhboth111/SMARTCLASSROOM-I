<template>
  <v-container>
      <h1 class="display-1 mt-8 mb-10">Stream Management</h1>
      <v-data-table
        :items="streams"
        :headers="streamHeaders"
        class="elevation-1"
        >
      <template v-slot:item="props">
        <tr @click="onStreamClick(props.item)">
          <td>{{ props.item.streamId }}</td>
          <td>{{ props.item.streamTitle }}</td>
          <td>{{ props.item.streamAuthor }}</td>
          <td>{{ props.item.type }}</td>
          <td>{{ props.item.from }}</td>
          <td>{{ props.item.to }}</td>
        </tr>
      </template>
    </v-data-table>
    <v-dialog v-model="editStreamModal" max-width="600px">
      <v-card>
        <v-card-title>Edit a stream</v-card-title>
        <v-card-text>
          <v-text-field label="Title" v-model="streamTitle"></v-text-field>
          <v-select
            label="Type"
            :items="['Public', 'Private']"
            v-model="streamType"
          ></v-select>
          <v-select
            label="Streaming from"
            :items="['Classroom 1', 'Classroom 2', 'Classroom 3']"
            v-model="streamFrom"
          ></v-select>
          <v-select
            label="Streaming to"
            :items="['Classroom 1', 'Classroom 2', 'Classroom 3']"
            v-model="streamTo"
          ></v-select>
          
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="onStreamSave()">Cancel</v-btn>
          <v-btn text @click="onStreamSave()">Delete</v-btn>
          <v-btn text class="font-weight-bold" @click="onStreamSave()">Save</v-btn>
        </v-card-actions>
      </v-card>      
    </v-dialog>
  </v-container>
</template>

<script>
export default {
    data: () => ({
        streamTitle: "",
        streamType: "",
        streamFrom: "",
        streamTo: "",
        editStreamModal: false,
        streamHeaders: [
            {text: "id", value: "streamId"},
            {text: "Title", value: "streamTitle"},
            {text: "Author", value: "streamAuthor"},
            {text: "Type", value: "type"},
            {text: "From", value: "from"},
            {text: "To", value: "to"},
        ],
        streams: [
            {
                streamId: 1,
                streamTitle: "Introduction to Python",
                streamAuthor: "Hun Vikran",
                type: "Public",
                from: "Classroom 1",
                to: "Classroom 2"
            },
            {
                streamId: 2,
                streamTitle: "Introduction to Python",
                streamAuthor: "Hun Vikran",
                type: "Public",
                from: "Classroom 1",
                to: "Classroom 2"
            },
            {
                streamId: 3,
                streamTitle: "Introduction to Python",
                streamAuthor: "Hun Vikran",
                type: "Public",
                from: "Classroom 1",
                to: "Classroom 2"
            },
            {
                streamId: 4,
                streamTitle: "Introduction to Python",
                streamAuthor: "Hun Vikran",
                type: "Public",
                from: "Classroom 1",
                to: "Classroom 2"
            },
            {
                streamId: 5,
                streamTitle: "Introduction to Python",
                streamAuthor: "Hun Vikran",
                type: "Public",
                from: "Classroom 1",
                to: "Classroom 2"
            }
        ]
    }),
    methods: {
        // On Stream Click
        onStreamClick(stream) {
            this.streamTitle = stream.streamTitle
            this.streamType = stream.type
            this.streamFrom = stream.from
            this.streamTo = stream.to
            this.editStreamModal = true   
        },

        // On Stream Save
        onStreamSave(){
            this.streamTitle = this.streamType = this.streamFrom = this.streamTo = ""
            this.editStreamModal = false
        }
    }
}
</script>

<style>

</style>