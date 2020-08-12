<template>
    <div class="blog">
      <svg width="225" height="40"/>
      <input placeholder="search for keywords" class="searchbar" type="text"
      v-model="searchTerm">
      <!-- <i class="material-icons search">search</i> -->
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <i class="material-icons menu"
            v-bind="attrs"
            v-on="on"
            >menu</i>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              router :to="item.route"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <br/>
        <h1 class="field center">My Posts</h1>
        <div class="blog container">
            <div class="card" v-for="post in filteredPosts" :key="post.id">
                <div class="card-content">
                    <h3><br>{{ post.alias }}: {{ post.subject }}</h3>
                    <h4>{{ post.time }}<br>{{ post.date }}</h4>
                    <!-- <h4>{{ formatTime(post.time) }}<br>{{ formatDate(post.date) }}</h4> -->
                    <!-- <h4>{{ post.date.toDate().toString()}}</h4> -->
                    <p style="white-space: pre-wrap;">{{ post.message }}</p>
                    <a href="" class="btn-floating btn-small">
                      <router-link :to="{ name:'EditPost',params:{ post_slug: post.slug }}">
                        <i class="material-icons create">create</i>
                      </router-link>
                    </a>
                <!-- <i class="material-icons delete" @click="deletePost(post.id)">delete</i> -->
                    <i class="material-icons delete" v-on:click="deletePost(post.id)">delete</i>
  <!-- <v-icon class="material-icons delete" @click="deletePost(post.id)">mdi-Delete</v-icon> -->
                </div>
            </div>
        </div>
        <!-- <a href="" class="btn-floating btn-large add">
          <router-link :to="{ name: 'AddPost' }">
            <i class="material-icons add">add</i>
          </router-link>
        </a> -->
    </div>
</template>

<script>
import db from '@/firebase/init';
import firebase from 'firebase';

export default {
  name: 'MyPosts',
  data() {
    return {
      myPosts: [

      ],
      searchTerm: '',
      items: [
        { title: 'Home', route: '/' },
        { title: 'My Posts', route: '/my-posts' },
      ],
    };
  },
  methods: {
    deletePost(id) {
      // eslint-disable-next-line no-alert, no-restricted-globals
      if (confirm('Are you sure you want to delete this post?')) {
      // delete doc from firestore
        db.collection('posts').doc(id).delete()
          .then(() => {
            this.myPosts = this.myPosts.filter((myPost) => myPost.id !== id);
          });
      }
    },
  },
  computed: {
    filteredPosts() {
      const newSearchTerm = (this.searchTerm) ? this.searchTerm.toLowerCase() : this.searchTerm;
      return this.myPosts.filter((post) => post.message.toLowerCase().match(newSearchTerm)
        || post.date.match(this.searchTerm)
        || post.subject.toLowerCase().match(newSearchTerm)
        || post.alias.toLowerCase().match(newSearchTerm)
        || post.time.match(this.searchTerm));
    },
  },
  created() {
    // fetch data from firestore
    db.collection('posts').orderBy('date', 'desc').orderBy('time', 'desc').get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const post = doc.data();
          post.id = doc.id;
          const userId = firebase.auth().currentUser.uid;
          if (post.user_id.match(userId)) {
            this.myPosts.push(post);
          }
        });
      });
    // get current user
    // db.collection('users').where('user_id', '==', firebase.auth().currentUser.uid).get()
    //   .then((snapshot) => {
    //     snapshot.forEach((doc) => {
    //       const post = doc.data();
    //       post.id = doc.id;
    //       this.myPosts.push(post);
    //   this.user = doc.data();
    //   this.user.id = doc.id;
    // });
    // this.alias = this.user.alias;
    //   });
  },
};
</script>

<style>
.blog h1{
  text-align: center;
  color: rgba(79, 79, 79, 0.86);
  font-size: 30px !important;
  font-family: 'Raleway', sans-serif !important;
  font-weight: 800 !important;
}
h1.field.center{
  text-align: center;
  color: rgba(79, 79, 79, 0.86);
  font-size: 30px !important;
  font-family: 'Raleway', sans-serif !important;
  font-weight: 800 !important;
}
h3 {
  font-family: 'Raleway', sans-serif;
  font-size: 20px;
  color: #000000;
  font-weight: 500;
}
h4 {
  position: absolute;
  top: 0px;
  bottom: 100px;
  left: 26px;
  font-family: 'Raleway', sans-serif;
  /* font-size: 16px;
  color: rgba(79, 79, 79, 0.86);
  font-weight: lighter; */
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  /* color: #404040; */
  color: rgba(185, 185, 185, 0.86);
}
p {
  text-align: left;
  font-family: 'Raleway', sans-serif;
  font-style: lighter;
  font-size: 18px;
  font-weight: 50;
  color: #000000;
  font-weight: lighter;
}
.container {
  margin: auto;
  /* width: 60%;
  height: 40%;
  background: #FFFF;
  left: 80px;
  right: 80px;
  top: 200px;
  bottom: 50px;
  padding-right:30px;
  padding-left:30px;
  padding-top:10px;
  padding-bottom:10px; */
}
.card {
  margin: auto;
  margin-top:20px;
  margin-bottom:20px;
  width: 80%;
}
/* .btn-floating {
    background-color: #C4C4C4;
} */
/* .btn {
   position: absolute;
   background-color: #C4C4C4;
   bottom: 200px;
   right: 200px;
   cursor: pointer;
} */
/* .btn {
   position: relative;
   background-color: #C4C4C4;
   top: 100px;
   cursor: pointer;
} */
/* .btn .create {
    background-color: #C4C4C4;
    cursor: pointer;
    position: absolute;
    top: 4px;
    right: 4px;
} */
.btn-small {
  background-color: #C4C4C4;
  position: absolute;
  top: 15px;
  right: 20px;
  cursor: pointer;
}
/* button.v-icon.notranslate.material-icons.delete.v-icon--link.mdi.mdi-delete.theme--light::before{
  position: absolute;
  top: 19px;
  right: 65px;
  bottom: 171px;
  left: 830px;
  cursor: pointer;
  color: #C4C4C4;
  font-size: 1.6em;
}
button.v-icon.notranslate.material-icons.delete.v-icon--link.mdi.mdi-delete.theme--light::after{
  position: absolute;
  top: -171px;
  right: -830px;
  cursor: pointer;
  font-size: 1.6em;
} */
i.material-icons.delete{
  position: absolute;
  top: 19px;
  right: 65px;
  cursor: pointer;
  color: #C4C4C4;
  font-size: 1.8em;
}
.btn-large.add {
  /* position: -webkit-sticky !important; */
  position: sticky !important;
  background-color: #C4C4C4;
  cursor: pointer;
  bottom: 150px;
  left: 1280px !important;
}
i.material-icons.create {
  text-align: center;
  cursor: pointer;
}
svg {
    position: absolute;
    left: 30px;
    top: 100px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: #7e7e7e;
}
/* .mdi-magnify {
    position: absolute;
    left: 77px;
    top: 78px;
    font-size: 2.4em;
    color: #e4e4e4
} */
i.v-icon.notranslate.mdi.mdi-magnify.theme--light::before {
    position: absolute;
    left: -5px;
    top: -5px;
    font-size: 1.4em;
    color: #e4e4e4
}
button.v-btn.v-btn--flat.v-btn--icon.v-btn--round.theme--light.v-size--default {
    position: absolute;
    left: 37px;
    top: 103px;
    font-size: 2.4em;
}
i.material-icons.menu {
    position: absolute;
    right: 120px;
    top: 105px;
    font-size: 2.4em;
    color: #7e7e7e;
    cursor: pointer;
}
div.v-list-item_title{
  text-align: center;
  color: #7e7e7e;
  font-family: 'Raleway', sans-serif;
}
.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  /* text-align: center; */
  color: #7e7e7e;
  font-family: 'Raleway', sans-serif;
  cursor: pointer;
}
input.searchbar[type=text]:not(.browser-default) {
  position: absolute;
  left: 80px;
  top: 102px;
  width: 155px;
  height: 30px;
  border-color: #e4e4e4;
}
input {
    font-family: 'Raleway', sans-serif;
}
input.placeholder {
  font-family: 'Raleway', sans-serif;
}
button, input.searchbar, optgroup, select, textarea {
    font-family: Raleway;
    color: #e4e4e4;
}
</style>
