<!-- Login page to members to login -->

<template>
  <div>
    <base-header></base-header>
    <v-row>
      <v-col cols="6" class="mr-0"
        ><v-carousel
          cycle
          height="96vh"
          hide-delimiters
          hide-delimiter-background
          show-arrows-on-hover
          reverse-transition="fade-transition"
          transition="fade-transition"
          ><v-carousel-item
            v-for="(item, i) in imageItems"
            :key="i"
            :src="item.src"
          ></v-carousel-item></v-carousel
      ></v-col>
      <v-col cols="6">
        <v-card elevation="2" class="loginCard">
          <v-form @submit.prevent="login()" ref="loginForm">
            <v-banner><h3>LOGIN</h3></v-banner>
            <v-row>
              <v-col>
                <v-row>
                  <v-col>
                    <v-text-field
                      label="Email Id"
                      outlined
                      v-model="loginEmail"
                      autocomplete="off"
                    >
                    </v-text-field
                  ></v-col>
                </v-row>
                <v-row>
                  <v-col
                    ><v-text-field
                      :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
                      autocomplete="off"
                      :rules="[rules.required]"
                      :type="passwordVisible ? 'text' : 'password'"
                      outlined
                      v-model="loginPassword"
                      label="Password"
                      hint="At least 8 characters"
                      @click:append="passwordVisible = !passwordVisible"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row>
              <v-col class="">
                
                  <v-btn @click="login">LOGIN</v-btn></v-col
              ><v-col
                ><router-link to="/signup" right>
                  <v-btn>SIGNUP</v-btn></router-link
                ></v-col
              ></v-row
            >
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <base-footer></base-footer>
  </div>
</template>

<script>
import BaseFooter from "@/UI/BaseFooter.vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
  components: { BaseFooter },
  mounted() {
    this.$refs.loginForm.reset();
  },
  methods:{
        login(){
          const auth = getAuth();
    signInWithEmailAndPassword(auth, this.loginEmail, this.loginPassword)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    userCredential.user.displayName= this.name;
    console.log(user)
    this.$notify({group:'foo',type: 'success',text:`Sucessfully Signed by  ${userCredential.user.displayName}`})
    this.$router.push('/zones')
    // ...
  })
  .catch((error) => {
    const errorMessage = error.message;
    this.$notify({group:'foo',type:'error',title:'Error',text:errorMessage})
    // ..
  });
        }
      },
  data() {
    return {
      loginEmail: "",
      loginPassword: "",
      passwordVisible: false,
      rules: {
        required: (value) => !!value || "Required.",
      },
      imageItems: [
        {
          src: "https://www.worldbank.org/content/dam/photos/780x439/2022/jan-2/vaccine1.jpg",
        },
        {
          src: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202106/Cover-image_0.jpg?size=690:388",
        },
        {
          src: "https://cdn.downtoearth.org.in/library/large/2022-03-16/0.69543800_1647424368_istock-1207955480.jpg",
        },
      ],
    };
  },
};
</script>
<style lang="sass" scoped>
.theme--dark .input:-internal-autofill-selected
  background-color: #1e1e1e
</style>
<style scoped >
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.appBar {
  display: flex;
  align-content: space-between;
}

a {
  text-decoration: none;
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
