<template>
<v-img src="../assets/hatter.jpg" min-height="100%" class="d-flex align-center">
<v-sheet  class="mx-auto glass-container" >
    <form>
        <v-text-field
            success 
            v-model="email"
            :error-messages="nameErrors"
            label="Email"
        ></v-text-field>
        <v-text-field
            success
            type="password"
            class="white--text" 
            v-model="password"
            :error-messages="passwordErrors"
            label="Password"
        ></v-text-field>
        

        <v-btn
            
            class="green accent-1"
            dark
            width="100%"
            @click.prevent="submit"
        >
            Log in
        </v-btn>
        <div class="green--text caption mt-5">
            Do not have an account yet? <v-btn plain class="text-decoration-none" @click="$router.push('/register')">Register</v-btn>
        </div>
        <v-alert type="error" v-if="loginError" outlined style="max-width: 300px">
            {{ loginError }}
        </v-alert>

    </form>

</v-sheet>
</v-img>


</template>

<script>
    import { validationMixin } from 'vuelidate';
    import { required} from 'vuelidate/lib/validators';
    import firebase from 'firebase/app';
    import "firebase/auth";
    import {mapActions} from 'vuex';

    export default {
        name: "Login",

        mixins: [validationMixin],

        validations: {
            email: { required },
            password: { required }
        },


        data: () => ({
            email: '',
            password: '',
            loginError: ''
        }),

        computed: {
            nameErrors () {
                const errors = []
                if (!this.$v.email.$dirty) return errors
                !this.$v.email.required && errors.push('Name is required.')
                return errors
            },
            passwordErrors () {
                const errors = []
                if (!this.$v.password.$dirty) return errors
                !this.$v.password.required && errors.push('Password is required')
                return errors
            },
        },

        methods: {
            ...mapActions([
                'resetState'
            ]),
            submit () {
                this.$v.$touch()
                if (!this.$v.$invalid){
                    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then( () =>{
                        console.log("USER SIGNED IN:::::")
                        console.log(firebase.auth().currentUser)
                        this.$router.replace({ name: "Home" });
                        this.resetState()
                        console.log(this.$store.state)
                    }).catch(err => {
                        console.log(err)
                        this.loginError = err.message
                    })
                }
                this.$v.$reset()
            }
            },
    }
</script>

<style scoped>

body{
  /* background-image: url('public/hatter.jpg') */
}

.glass-container{
    width: 700px;
    height: 375px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    border-radius: 50px;
    backdrop-filter: blur(10px);
    background-color: rgba(230,232,201, 0.1);
    box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
    border: 2px rgba(255,255,255,0.4) solid;
    border-bottom: 2px rgba(40,40,40,0.35) solid;
    border-right: 2px rgba(40,40,40,0.35) solid;
}
</style>