<template>
  <v-container>
    <h1 class="display-1 my-4">Profile</h1>
    <v-divider></v-divider>
    <v-row class="my-4">
      <v-col cols="4">
        <p class="headline">Account</p>
        <v-card class="mx-auto my-4" justify-center height="350px">
          <v-btn
            absolute
            small
            right
            class="mt-2 coverPicBtn"
            @click="uploadCoverPic"
          >
            Upload Photo
            <v-icon>mdi-upload</v-icon>
          </v-btn>
          <input
            type="file"
            accept="image/*"
            ref="coverPicInput"
            @change="onCoverPicPicked"
            style="display:none"
          />
          <v-img
            :src="user.coverPic"
            alt="NO IMG"
            class="align-end align-right"
            height="200px"
            @click="showCoverPic = true"
          ></v-img>

          <v-divider></v-divider>
          <v-divider></v-divider>
          <v-divider></v-divider>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                fab
                small
                absolute
                right
                v-on="on"
                class="editProfileBtn"
                @click="editProfileDialog = true"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit Profile</span>
          </v-tooltip>

          <div class="profileInfo">
            <v-avatar size="130" class=" profilePic mb-2">
              <v-avatar size="120" class @click="showProfilePic = true">
                <img :src="user.profilePic" />
              </v-avatar>
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-btn
                    absolute
                    right
                    fab
                    small
                    v-on="on"
                    class="profilePicBtn"
                    @click="uploadProfilePic"
                  >
                    <v-icon>mdi-camera</v-icon>
                  </v-btn>
                </template>
                <span>Change Profile Picture</span>
              </v-tooltip>
              <input
                type="file"
                accept="image/*"
                ref="profilePicInput"
                @change="onProfilePicPicked"
                style="display:none"
              />
            </v-avatar>

            <p class="headline">{{ user.name }}</p>
            <p class="caption">{{ user.role }}</p>
          </div>
        </v-card>
      </v-col>

      <v-col offset="1" cols="7">
        <p class="headline">Streams</p>
        <p class="title font-regular my-4">Your History</p>
        <v-row>
          <v-col v-for="(stream, i) in user.history" :key="i" :lg="6" :md="12">
            <v-card dark @click="myClickEvent">
              <v-img
                :src="stream.img_url"
                class="white--text align-end"
                height="240px"
                alt="pic"
              >
                <v-card-title v-text="stream.streamTitle"></v-card-title>
                <v-card-subtitle v-text="stream.action"></v-card-subtitle>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-dialog v-model="showCoverPic" width="1000px">
      <v-card>
        <v-container>
          <v-img :src="user.coverPic"></v-img>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showProfilePic" width="1000px">
      <v-card>
        <v-container>
          <v-img :src="user.profilePic"></v-img>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editProfileDialog" width="500px">
      <v-card>
        <v-card-title>Edit Your Profile</v-card-title>
        <v-divider></v-divider>

        <v-container>
          <v-row justify="space-around" class="my-5">
            <v-btn @click="changeUsername = true">Change Username</v-btn>
          </v-row>
          <v-text-field
            v-if="changeUsername"
            v-model="newName"
            label="Username"
          ></v-text-field>
          <v-row justify="space-around" class="my-5">
            <v-btn @click="changePassword = true">Change Password</v-btn>
          </v-row>
          <v-text-field
            type="password"
            v-if="changePassword"
            v-model="currentPassword"
            label="Current Password"
          ></v-text-field>
          <v-text-field
            type="password"
            v-if="changePassword"
            v-model="newPassword"
            label="New Password"
          ></v-text-field>
          <v-text-field
            type="password"
            v-if="changePassword"
            v-model="confirmPassword"
            label="Confirm Password"
          ></v-text-field>
          <p class="red--text">{{ errorMsg }}</p>
        </v-container>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="cancelEditProfile">Cancel</v-btn>
          <v-btn text @click="editProfile" class="font-weight-black"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
//import { mapState } from "vuex";
import backend from "../Service";
export default {
  data() {
    return {
      //user: mapState,
      user: {},
      name: "Name",
      role: "Role",
      coverPicURL: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
      profilePicURL: "https://cdn.vuetifyjs.com/images/john.jpg",
      showCoverPic: false,
      showProfilePic: false,
      editProfileDialog: false,
      changeUsername: false,
      changePassword: false,
      newName: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      errorMsg: "",
      streams: [
      ]
    };
  },
  methods: {
    getUser() {
      this.user = this.$store.getters.user;
    },
    uploadCoverPic() {
      this.$refs.coverPicInput.click();
    },
    uploadProfilePic() {
      this.$refs.profilePicInput.click();
    },
    async onCoverPicPicked(event) {
      const files = event.target.files;
      const selectedFile = files[0];

      const fileReader = new FileReader();
      fileReader.readAsDataURL(selectedFile);

      fileReader.addEventListener("load", async () => {
        this.coverPicURL = fileReader.result;
        const response = await backend.changeCover(this.coverPicURL);
        alert(response.message);
        window.location.reload();
      });
    },
    async onProfilePicPicked(event) {
      const files = event.target.files;
      const selectedFile = files[0];

      const fileReader = new FileReader();
      fileReader.readAsDataURL(selectedFile);

      fileReader.addEventListener("load", async () => {
        this.profilePicURL = fileReader.result;
        const response = await backend.changeProfile(this.profilePicURL);
        alert(response.message);
        window.location.reload();
      });
    },
    editProfile() {
      if (this.changeUsername && this.newName != "") {
        this.name = this.newName;
        this.editProfileDialog = false;
        this.newName = "";
        this.changeUsername = false;
        this.changePassword = false;
        this.errorMsg = "";
      }
      if (this.changePassword) {
        if (this.currentPassword == "") {
          this.errorMsg = "*Please Enter Your Current Password";
        } else if (this.newPassword == "") {
          this.errorMsg = "*Please Enter Your New Password";
        } else if (this.currentPassword != "Password") {
          this.errorMsg = "*Your Current Password is Incorrect";
        } else if (this.newPassword != this.confirmPassword) {
          this.errorMsg = "*The Passwords Do Not Match";
        } else {
          console.log("Your Password Has Been Successfully Changed");
          this.editProfileDialog = false;
          this.changePassword = false;
          this.errorMsg = "";
        }
      }
    },
    cancelEditProfile() {
      this.editProfileDialog = false;
      this.changeUsername = false;
      this.changePassword = false;
      this.newName = "";
      this.currentPassword = "";
      this.newPassword = "";
      this.confirmPassword = "";
      this.errorMsg = "";
    }
  },
  created() {
    this.getUser();
    console.log(this.$store.getters.user.history);
  }
};
</script>

<style scoped>
.profilePic {
  z-index: 10;
}

.profileInfo {
  position: relative;
  text-align: center;
  bottom: 15%;
}

.profileInfo p {
  margin: 0px;
  padding: 0px;
}

.profilePicBtn {
  z-index: 10;
  top: 75%;
}

.editProfileBtn {
  z-index: 10;
}

.coverPic {
  opacity: 1;
}

.coverPicBtn {
  z-index: 10;
}
</style>
