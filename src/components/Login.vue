<template>
    <div class="login container">
        <form @submit.prevent="login" class="card-panel">
            <h2 class="center">Login</h2>
            <div class="field">
               <label for="email">Email:</label>
               <input type="email" name="email" v-model="email">
           </div>
           <div class="field">
               <label for="password">Password:</label>
               <input type="password" name="password" v-model="password">
           </div>
           <p v-if="feedback" class="red-text center">{{ feedback }}</p>
           <div class="field center">
               <button class="btn">Login</button>
           </div>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase';
import db from '@/firebase/init';

export default {
  name: 'Login',
  data() {
    return {
      email: null,
      password: null,
      feedback: null,
      alias: null,
    };
  },
  methods: {
    login() {
      if (this.email && this.password) {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then((cred) => {
            console.log(cred.user);
            // get current user
            db.collection('users').where('user_id', '==', firebase.auth().currentUser.uid).get()
              .then((snapshot) => {
                snapshot.forEach((doc) => {
                  this.user = doc.data();
                  this.user.id = doc.id;
                });
                console.log('get current user id');
                console.log(this.user.id);
                console.log(this.user.alias);
                this.alias = this.user.alias;
              });
            this.$router.push({ name: 'Blog' });
          }).catch((err) => {
            this.feedback = err.message;
          });
        this.feedback = null;
      } else {
        this.feedback = 'Please fill in both fields.';
      }
    },
  },
};
</script>

<style>
.login{
    max-width: 400px;
    margin-top: 60px;
}
.login h2{
   font-size: 2.4em;
   font-family: 'Raleway', sans-serif;
   /* font-size: 30px; */
   color: rgba(79, 79, 79, 0.86);
   /* font-weight: 800; */
}
.login .field{
   margin-bottom: 16px;
   font-family: 'Raleway', sans-serif;
   color: rgba(79, 79, 79, 0.86);
}
.btn {
  text-align: center;
  background-color: #C4C4C4;
  font-family: 'Raleway', sans-serif;
}
.theme--light.v-btn {
  color: #FFFF;
}
div.login.container{
    max-width: 400px;
}
</style>
