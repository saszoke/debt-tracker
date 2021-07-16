<template>
<v-img src="../assets/hatter.jpg" min-height="100%" class="d-flex align-center">
<v-sheet  class="mx-auto glass-container" >
<form>
    <v-text-field
        success 
        v-model="name"
        :error-messages="nameErrors"
        label="Username"
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
        success
        type="password"
        class="white--text" 
        v-model="password"
        label="Password"
    ></v-text-field>
    

    <v-btn
        
        class="green accent-1"
        dark
        width="100%"
        @click="submit"
    >
        Log in
    </v-btn>
    <div class="green--text caption mt-5">
        Do not have an account yet? <v-btn plain class="text-decoration-none" @click="$router.push('/register')">Register</v-btn>
    </div>
    </form>
</v-sheet>
</v-img>


</template>

<script>
    import { validationMixin } from 'vuelidate'
    import { required, maxLength, email } from 'vuelidate/lib/validators'

    export default {
        name: "Login",

        mixins: [validationMixin],

        validations: {
        name: { required, maxLength: maxLength(10) },
        email: { required, email }
        },


        data: () => ({
            name: '',
            email: '',
            password: ''
        }),

        computed: {
        nameErrors () {
            const errors = []
            if (!this.$v.name.$dirty) return errors
            !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
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
        },

        methods: {
        submit () {
            this.$v.$touch()
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