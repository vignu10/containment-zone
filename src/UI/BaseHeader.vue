
<!-- Base header file for web -->

<template>
  <div>
    <v-app-bar
      color="primary lighten-1"
      dense
      elevation="4"
      class="fixed-header"
      rounded
    >
      <v-toolbar-title>Containment Zone</v-toolbar-title>
      <v-spacer></v-spacer>
   <v-btn color="primary" class="mr-4 mb-2" @click="signOut">LOGOUT</v-btn>
      <v-switch
        v-model="$vuetify.theme.dark"
        inset
        label="Dark Theme"
        persistent-hint
        color="black"
      ></v-switch>
    </v-app-bar>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
export default {
  data() {
    return {};
  },
  methods:{
    signOut(){
      const auth = getAuth();
signOut(auth).then(() => {
  this.$router.replace('/login')
  this.$notify({group:'foo',type: 'success',text:`Sucessfully Signed out`})
}).catch((error) => {
  this.$notify({group:'foo',type: 'error',text:error.message})
});
    }
  }
};
</script>
