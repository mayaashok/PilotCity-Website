<template>
    <div class="navbar">
        <nav class="nav-extended">
            <router-link :to="{ name: 'Blog' }">
                <img src="../assets/CompanyLogo.png"/>
            </router-link>
                <ul class="right">
                    <li v-if="!user">
                      <router-link :to="{ name: 'Signup' }">Sign Up</router-link>
                    </li>
                    <li v-if="!user"><router-link :to="{ name: 'Login' }">Login</router-link></li>
                    <li v-if="user"><a>{{ user.email }}</a></li>
                    <li v-if="user"><a @click="logout">Logout</a></li>
                </ul>
        </nav>
    </div>
</template>

<script>
// import db from '@/firebase/init';
import firebase from 'firebase';

export default {
  name: 'Navbar',
  data() {
    return {
      posts: [
      ],
      searchTerm: '',
      user: null,
    };
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        this.$router.push({ name: 'Login' });
      });
    },
  },
  created() {
    // let user = firebase.auth().currentUser
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
};
</script>

<style>
nav.nav-extended {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    background: #4F4F4F;
    height: 4em;
}
.navbar nav {
  padding: 0 55px;
}
img {
    position: absolute;
    left: 68px;
    top: 10px;
    object-fit: cover;
    height: 40px;
}
li {
    font-family: 'Raleway', sans-serif;
    position: relative;
    color: #ffff;
}
.v-application a {
    color:white var(--v-anchor-base);
}
a {
    color: #ffffff;
    font-family: 'Raleway', sans-serif;
}
</style>
