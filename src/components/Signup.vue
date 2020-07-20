<template>
    <div class="signup container">
       <form @submit.prevent="signup" class="card-panel">
           <h2 class="center">Signup</h2>
           <div class="field">
               <label for="email">Email:</label>
               <input type="email" name="email" v-model="email">
           </div>
           <div class="field">
               <label for="password">Password:</label>
               <input type="password" name="password" v-model="password">
           </div>
           <div class="field">
               <label for="alias">Alias:</label>
               <input type="text" name="alias" v-model="alias">
           </div>
           <p class="red-text center" v-if="feedback">{{ feedback }}</p>
           <div class="field center">
               <button class="btn">Signup</button>
           </div>
        </form>
    </div>
</template>

<script>
import slugify from 'slugify';
import db from '@/firebase/init';
import firebase from 'firebase';
// import functions from 'firebase/functions';

export default {
  name: 'Signup',
  data() {
    return {
      email: null,
      password: null,
      alias: null,
      feedback: null,
      slug: null,
    };
  },
  methods: {
    signup() {
      if (this.alias && this.email && this.password) {
        this.feedback = null;
        this.slug = slugify(this.alias, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true,
        });
        // //Second method: Fixing database error
        // db.collection('users').doc('test').set({
        //     field: 'dummy'
        // }).catch(err => {
        //     console.log(err)
        // })
        // //Second method: Fixing database error

        /* let checkAlias = firebase.functions().httpsCallable('checkAlias')
                checkAlias({ slug: this.slug }).then(result => {
                    console.log(result) */
        const ref = db.collection('users').doc(this.slug);
        ref.get().then((doc) => {
          // if(!result.data.unique){
          if (doc.exists) {
            this.feedback = 'This alias already exists.';
          } else {
            ref.set({ alias: this.alias })
            // db.collection('users').doc.set({ alias: this.alias })
              .then(() => firebase.auth().createUserWithEmailAndPassword(this.email, this.password))
              .then((cred) => ref.update({ user_id: cred.user.uid }))
            // return db.collection('users').doc.update({ user_id: cred.user.uid })
              .then(() => {
                this.$router.push({ name: 'Blog' });
              })
            // Second method: Fixing database error
            // db.collection('users').doc('test').delete().then(function() {
            //     console.log("Document successfully deleted!");
            // }).catch(function(error) {
            //     console.error("Error removing document: ", error);
            // }) Second method: Fixing database error
              .catch((err) => {
                console.log(err);
                this.feedback = err.message;
              });
            this.feedback = 'This alias is free to use.';
          }
        });
      } else {
        this.feedback = 'You must enter all fields.';
      }
    },
  },
};
</script>

<style>
.signup{
    max-width: 400px;
    margin-top: 60px;
}
.signup h2{
   font-size: 2.4em;
   font-family: 'Raleway', sans-serif;
   /* font-size: 30px; */
   color: rgba(79, 79, 79, 0.86);
   /* font-weight: 800; */
}
.signup .field{
    margin-bottom: 16px;
    font-family: 'Raleway', sans-serif;
    color: rgba(79, 79, 79, 0.86);
}
.btn {
  text-align: center;
  background-color: #C4C4C4;
  font-family: 'Raleway', sans-serif;
}
div.signup.container{
    max-width: 400px;
}
</style>
