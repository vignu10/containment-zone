<template>
  <div>
    <v-system-bar height="50" color="primary" window>
      <v-row no-gutters>
        <v-col class="text-left align-self-center white--text">
          <header><b> Track wise </b></header></v-col
        >
        <v-col class="text-right" cols="5"
          ><v-col
            ><v-btn color="secondary" depressed outlined @click="signOut">
              LOGOUT</v-btn
            >
          </v-col>
        </v-col>
      </v-row>
    </v-system-bar>
    <v-container fluid pa-0>
      <router-view></router-view>
    </v-container>
    <v-footer absolute class="pa-0">
      <v-row justify="center" no-gutters>
        <v-col class="primary py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} — <strong>Track wise</strong>
        </v-col>
        <notifications group="foo" animation-type="velocity" />
      </v-row>
    </v-footer>
  </div>
</template>
<script>
import { getAuth, signOut } from "firebase/auth";
export default {
  data() {
    return {};
  },
  methods: {
    signOut() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.$notify({
            group: "foo",
            type: "success",
            text: `Sucessfully Signed out`,
          });
          this.$router.replace("/home/login");
        })
        .catch((error) => {
          this.$notify({ group: "foo", type: "error", text: error.message });
        });
    },
  },
};
</script>
