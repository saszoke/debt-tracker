<template>
<v-img src="../assets/hatter.jpg" min-height="100%" class="d-flex align-center">
<v-sheet  class="mx-auto glass-container" >
<form>
    <v-text-field
        success 
        v-model="name"
        :error-messages="nameErrors"
        label="Username"

    ></v-text-field>
    <v-text-field
        success
        class="white--text" 
        v-model="email"
        :error-messages="emailErrors"
        label="E-mail"

    ></v-text-field>
    
    <v-text-field
        success
        type="password"
        class="white--text" 
        :error-messages="passwordErrors"
        v-model="password"
        label="Password"
    ></v-text-field>

    <v-text-field
        success
        type="password"
        class="white--text" 
        :error-messages="confirmErrors"
        v-model="confirm"
        label="Repeat Password"
    ></v-text-field>
    <v-btn
        
        class="green accent-1"
        dark
        width="100%"
        @click="submit"
    >
        Register
    </v-btn>
    <v-alert type="error" v-if="loginError" outlined style="max-width: 300px">
        {{ loginError }}
    </v-alert>
    </form>
</v-sheet>
</v-img>


</template>

<script>
    import { validationMixin } from 'vuelidate';
    import { required, email, sameAs } from 'vuelidate/lib/validators';
    import firebase from 'firebase/app';
    import "firebase/auth";

    export default {
        name: "Register",
        
        mixins: [validationMixin],

        validations: {
            name: { required },
            email: { required, email },
            password: { required },
            confirm: { required, sameAsPassword: sameAs( function(){ return this.password }) }
        },


        data: () => ({
            name: '',
            email: '',
            password: '',
            confirm: '',
            loginError: ''
        }),

        computed: {

        
        nameErrors () {
            const errors = []
            if (!this.$v.name.$dirty) return errors
            !this.$v.name.required && errors.push('Name is required.')
            return errors
        },
        emailErrors () {
            const errors = []
            if (!this.$v.email.$dirty) return errors
            !this.$v.email.email && errors.push('Must be valid e-mail')
            !this.$v.email.required && errors.push('E-mail is required')
            return errors
        },
        passwordErrors () {
            const errors = []
            if (!this.$v.password.$dirty) return errors
            !this.$v.password.required && errors.push('Password is required')
            return errors
        },
        confirmErrors () {
            const errors = []
            if (!this.$v.confirm.$dirty) return errors
            !this.$v.confirm.required && errors.push('Confirm password is required')
            !this.$v.confirm.sameAsPassword && errors.push('Passwords must match')
            return errors
        },
        },

        methods: {
        submit () {
            this.$v.$touch()
            
            if (!this.$v.$invalid){
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(()=>{
                    this.$router.push('/');
                    //this.$router.replace({ name: "/" });
                }).catch(error => this.loginError = error.message )
                
            }
            else{
                console.log(this.$v)
                }
        }
        },
    }
</script>

<style scoped>



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