<template>
    <v-container>
        <h1 class="display-1 my-4">Profile</h1>
        <v-divider></v-divider>
        <v-row class="my-4">
            <v-col cols="2">
                <h1 class="headline">Account</h1>
                <v-card class="mx-auto my-4" justify-center>
                    <v-img
                        class="align-end align-right"
                        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                        height="300px"
                    >
                        <v-btn fab class="ma-2" small>
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                    </v-img>
                    <v-list-item two-line class="my-3">
                        <v-list-item-avatar>
                            <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{ user.name }}</v-list-item-title>
                            <v-list-item-subtitle class="caption text-uppercase">{{ user.role }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="editProfileDialog = true">Edit</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col offset="1" cols="9">
                <h1 class="headline">Streams</h1>
                <h1 class="title font-regular my-4">Your previous streams</h1>
                <v-row>
                    <v-col v-for="(stream, i) in streams" :key="i" :lg="4" :md="6" :xs="12">
                        <v-card
                            dark
                            @click="myClickEvent"
                            >
                        <v-img :src="stream.img_url" class="white--text align-end" height="240px">
                            <v-card-title v-text="stream.title"></v-card-title>
                            <v-card-subtitle v-text="stream.author"></v-card-subtitle>
                        </v-img>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-dialog v-model="editProfileDialog" width="500px">
            <v-card>
                <v-card-title>Edit your profile</v-card-title>
                <v-card-text>
                    <v-text-field label="Username" v-model="user.name"></v-text-field>
                    <v-text-field label="Password" v-model="user.password"></v-text-field>
                    <v-text-field label="Email" v-model="user.email"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text>Cancel</v-btn>
                    <v-btn text class="font-weight-black">Edit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { mapState } from "vuex"

export default {
    data: () => ({
        msg: "",
        imageURL: "",
        editProfileDialog: false,
        streams: [
            {
                img_url: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
                title: "Introduction to pissing",
                author: "Hun Vikran"
            },
            {
                img_url: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
                title: "Introduction to pissing",
                author: "Hun Vikran"
            },
            {
                img_url: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
                title: "Introduction to pissing",
                author: "Hun Vikran"
            },
            {
                img_url: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
                title: "Introduction to pissing",
                author: "Hun Vikran"
            },
            {
                img_url: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
                title: "Introduction to pissing",
                author: "Hun Vikran"
            },
            {
                img_url: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
                title: "Introduction to pissing",
                author: "Hun Vikran"
            }
        ]
    }),
    computed: {
        ...mapState(["user"])
    }
}
</script>

<style>

</style>