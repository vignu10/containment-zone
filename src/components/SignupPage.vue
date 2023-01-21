<template>
  <div>
    <base-header></base-header>
    <v-container>
      <v-form @submit.prevent="register"
        ><v-card elevation="2" class="loginCard">
          <v-banner><h3>Register to SignIn</h3></v-banner>
          <v-row no-gutters class="ma-2"
            ><v-col
              ><v-text-field
                label="Name"
                outlined
                v-model="name"
              ></v-text-field></v-col
            ><v-col
              ><v-text-field
                label="Email"
                outlined
                v-model="email"
              ></v-text-field></v-col
          ></v-row>
          <v-row no-gutters class="ma-2"
            ><v-col
              ><v-text-field
                v-model="password"
                label="Create New Password"
                type="password"
                outlined
              ></v-text-field></v-col
            ><v-col
              ><v-text-field
                label="Confirm Password"
                type="password"
                outlined
                v-model="confirmPassword"
              ></v-text-field></v-col
          ></v-row>

          <v-row no-gutters class="ma-2">
            <v-btn :disabled="disableSubmitBtn" @click="register"> SIGN UP</v-btn>
            </v-row
          >
        </v-card>
      </v-form>
    </v-container>
    <base-footer></base-footer>
  </div>
</template>
<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default {
  data() {
    return {
      email: "",
      password: "",
      name: '',
      confirmPassword: "",
    };
  },
  computed:{
    disableSubmitBtn(){
      if( this.email === null ||
        this.email === "" ||
        this.name===''||this.name===null||
        this.password === "" ||
        this.password === null ||
        this.password !== this.confirmPassword ||
        this.confirmPassword === "" ||
        this.confirmPassword === null)
        {
          return true;
        }
        return false;
    }
  },
  methods: {
    register() {
      if (
        this.email !== null ||
        this.email !== "" ||
        this.name!==''||this.name!==null||
        this.password !== "" ||
        this.password !== null ||
        this.password === this.confirmPassword ||
        this.confirmPassword !== "" ||
        this.confirmPassword !== null
      ){
      const auth = getAuth();
createUserWithEmailAndPassword(auth, this.email, this.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    userCredential.user.displayName= this.name;
    console.log(user)
    this.$notify({group:'foo',type: 'success',text:`Sucessfully created account for ${userCredential.user.displayName}`})
    this.$router.replace('/zones')
    // ...
  })
  .catch((error) => {
    const errorMessage = error.message;
    this.$notify({group:'foo',type:'error',title:'Error',text:errorMessage})
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
