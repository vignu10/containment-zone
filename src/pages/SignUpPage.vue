<template>
  <div>
    <v-container fluid pa-0>
      <v-form @submit.prevent="register">
        <v-card elevation="2" class="loginCard"
          ><v-card-title>Enter Details to Register</v-card-title>
          <v-card-text>
            <v-row no-gutters class="mb-5"
              ><v-col class="mr-3"
                ><v-text-field
                  label="Name"
                  hide-details="auto"
                  outlined
                  v-model="name"
                ></v-text-field></v-col
              ><v-col
                ><v-text-field
                  label="Email"
                  hide-details="auto"
                  outlined
                  v-model="email"
                ></v-text-field></v-col
            ></v-row>
            <v-row no-gutters
              ><v-col class="mr-3 mb-5"
                ><v-text-field
                  v-model="password"
                  :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="passwordVisible = !passwordVisible"
                  :type="passwordVisible ? 'text' : 'password'"
                  hide-details="auto"
                  label="Create New Password"
                  outlined
                ></v-text-field></v-col
              ><v-col
                ><v-text-field
                  label="Confirm Password"
                  :append-icon="
                    resetPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'
                  "
                  @click:append="resetPasswordVisible = !resetPasswordVisible"
                  :type="resetPasswordVisible ? 'text' : 'password'"
                  hide-details="auto"
                  outlined
                  v-model="confirmPassword"
                ></v-text-field></v-col
            ></v-row>
            <p class="red--text" v-if="passwordMismatch">
              The password entered are not the same!
            </p>
            <v-row no-gutters>
              <v-col class="text-center">
                <v-btn :disabled="disableSubmitBtn" @click="register">
                  SIGN UP</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-form>
    </v-container>
  </div>
</template>
<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default {
  data() {
    return {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
      passwordVisible: false,
      resetPasswordVisible: false,
    };
  },
  computed: {
    passwordMismatch() {
      return this.password !== this.confirmPassword ? true : false;
    },
    disableSubmitBtn() {
      if (
        this.email === null ||
        this.email === "" ||
        this.name === "" ||
        this.name === null ||
        this.password === "" ||
        this.password === null ||
        this.password !== this.confirmPassword ||
        this.confirmPassword === "" ||
        this.confirmPassword === null
      ) {
        return true;
      }
      return false;
    },
  },
  methods: {
    register() {
      if (
        this.email !== null ||
        this.email !== "" ||
        this.name !== "" ||
        this.name !== null ||
        this.password !== "" ||
        this.password !== null ||
        this.password === this.confirmPassword ||
        this.confirmPassword !== "" ||
        this.confirmPassword !== null
      ) {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            userCredential.user.displayName = this.name;
            console.log(user);
            this.$notify({
              group: "foo",
              type: "success",
              text: `Sucessfully created account for ${userCredential.user.displayName}`,
            });
            this.$router.replace("/home/zones");
            // ...
          })
          .catch((error) => {
            const errorMessage = error.message;
            this.$notify({
              group: "foo",
              type: "error",
              title: "Error",
              text: errorMessage,
            });
            // ..
          });
      }
    },
  },
};
</script>

<style scoped>
textarea {
  border: 1px;
  border-color: black;
}
header {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.loginCard {
  margin: 10rem auto;
  max-width: 45rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  align-items: center;
  justify-content: center;
}
</style>
