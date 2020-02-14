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
          <td>{{ props.item.streamCode }}</td>
          <td>{{ props.item.streamTitle }}</td>
          <td>{{ props.item.ownerName }}</td>
          <td>{{ props.item.description }}</td>
          <td>{{ props.item.streamFrom }}</td>
          <td :class="props.item.isActive ? 'red--text' : 'blue--text'">{{ (props.item.isActive)?"LIVE":"ENDED" }}</td>
          <td>       
            <v-btn outlined v-if="props.item.isActive" class="red white--text" id="stopStreamBtn" @click="stopStream()">
              <v-icon left>mdi-record</v-icon>Stop Stream
            </v-btn> 
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-dialog v-model="editStreamModal" max-width="600px">
      <v-card>
        <v-card-title>Edit a stream</v-card-title>
        <v-card-text>
          <v-text-field label="Title" v-model="streamTitle"></v-text-field>
          <v-text-field label="Description" v-model="description"></v-text-field>          
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="onCancel()">Cancel</v-btn>
          <v-btn text class="font-weight-bold" @click="onStreamSave()">Save</v-btn>
        </v-card-actions>
      </v-card>      
    </v-dialog>
  </v-container>
</template>

<script>
import backend from '../Service'

export default {
    data: () => ({
        streamCode : "",
        streamTitle: "",
        description: "",
        editStreamModal: false,
        streamHeaders: [
            {text: "Stream Code", value: "streamCode"},
            {text: "Title", value: "streamTitle"},
            {text: "Author", value: "streamAuthor"},
            {text: "Description", value: "description"},
            {text: "From", value: "from"},
            {text: "Status", value: "status"},
            {text: "Stop Stream", value: "Stop Stream"}
        ],
        streams: [
        ]
    }),
    methods: {
        // On Stream Click
        onStreamClick(stream) {
            this.streamTitle = stream.streamTitle
            this.description = stream.description
            this.streamCode = stream.streamCode


            this.editStreamModal = true   
        },
        onCancel(){
          this.editStreamModal = false
        },
        // On Stream Save
        async onStreamSave(){
            const result = await backend.editStream(this.streamCode, this.streamTitle, this.description)
            if (result.errCode){
              alert(result.message)
            }else{
              this.streamTitle = this.description = this.streamCode = ""
              this.getAllStream()
              this.editStreamModal = false
            }
        },
        async getAllStream(){
          const streams = await backend.getCurrentlyStreaming(6,null)
          
          this.streams = streams.data
          console.log(this.streams)
        }
    },
    created(){
      this.getAllStream()
    }
}
</script>

<style>

</style>