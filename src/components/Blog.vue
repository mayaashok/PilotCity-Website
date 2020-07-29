<template>
    <div class="blog">
      <svg width="225" height="40"/>
      <input placeholder="search for keywords" class="searchbar" type="text" v-model="searchTerm">
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
        <h1 class="field center">PilotCity Social Network</h1>
        <div class="blog container">
            <div class="card" v-for="post in filteredPosts" :key="post.id">
                <div class="card-content">
                    <h3><br>{{ post.alias }}: {{ post.subject }}</h3>
                    <!-- <h4>{{ post.time }}<br>{{ post.date }}</h4> -->
                    <h4>{{ formatTime(post.time) }}<br>{{ formatDate(post.date) }}</h4>
                    <!-- <h4>{{ post.date.toDate().toString()}}</h4> -->
                    <p>{{ post.message }}</p>
                    <!-- <a href="" class="btn-floating btn-small">
                      <router-link :to="{ name:'EditPost',params:{ post_slug: post.slug }}">
                        <i class="material-icons create">create</i>
                      </router-link>
                    </a> -->
                <!-- <i class="material-icons delete" @click="deletePost(post.id)">delete</i> -->
                <div id="blog">
                  <!-- <span class="emoji">&#128077;</span> -->
  <v-btn class="like" text icon color="blue lighten-2" @click="incrementLikes(post); post.likes++"
  style="top: 20px; left:750px">
<v-badge bottom color="blue darken-1" :content="post.likes" :value="post.likes"
style="bottom: 5px; left:5px">
  <v-icon>mdi-thumb-up</v-icon>
</v-badge>
  </v-btn>
<!--<v-badge color="blue darken-1" :content="likes" :value="likes" style="bottom:
100px; left:755px">
</v-badge> -->
<!-- <button class="reactionButton" v-on:click="emoji++" v-on:dblclick="emoji--"> {{ emoji }}
</button> -->
                  <!-- <span class="emoji2"> &#128078;</span> -->
  <v-btn class="dislike" text icon color="red lighten-2" @click="incrementDislikes(post);
post.dislikes++" style="top: 20px; left:810px">
<v-badge bottom color="red darken-1" :content="post.dislikes" :value="post.dislikes"
style="bottom: 5px; left:5px">
  <v-icon>mdi-thumb-down</v-icon>
</v-badge>
  </v-btn>
<!-- <button class="reactionButton2" v-on:click="emoji2(1)" v-on:dblclick="emoji2(-1)"> {{ emoji2 }}
</button> -->
<!-- <v-btn class="hearts" text icon color="pink lighten-2" @click="incrementHearts(post);
post.hearts++" style="top: 20px; left:690px">
<v-badge bottom color="pink darken-1" :content="post.hearts" :value="post.hearts"
style="bottom: 9px; left:5px">
  <v-icon>mdi-heart</v-icon>
</v-badge>
  </v-btn> -->
                </div>
                </div>
            </div>
        </div>
        <a href="" class="btn-floating btn-large add">
          <router-link :to="{ name: 'AddPost',params: { alias: this.$route.params.alias } }">
            <i class="material-icons add">add</i>
          </router-link>
        </a>
    </div>
</template>

<script>
import db from '@/firebase/init';

export default {
  name: 'Blog',
  data() {
    return {
      // likes: 0,
      // dislikes: 0,
      // show: false,
      // emoji: 0,
      // emoji2: 0,
      posts: [
      ],
      searchTerm: '',
      items: [
        { title: 'Home', route: '/' },
        { title: 'My Posts', route: '/my-posts' },
      ],
    };
  },
  methods: {
    // // eslint-disable-next-line vue/no-dupe-keys
    // emoji(amount) {
    //   this.emoji += amount;
    // },
    // // eslint-disable-next-line vue/no-dupe-keys
    // emoji2(amount) {
    //   this.emoji2 += amount;
    // },
    deletePost(id) {
      // delete doc from firestore
      db.collection('posts').doc(id).delete()
        .then(() => {
          this.posts = this.posts.filter((post) => post.id !== id);
        });
    },
    formatTime(time24) {
      let ts = time24;
      const H = +ts.substr(0, 2);
      let h = (H % 12) || 12;
      h = (h < 10) ? (`0${h}`) : h; // leading 0 at the left for 1 digit hours
      const ampm = H < 12 ? ' AM' : ' PM';
      ts = h + ts.substr(2, 3) + ampm;
      return ts;
    },
    formatDate(date) {
      console.log('date', date);
      const splitDate = date.split('-');
      if (splitDate.count === 0) {
        return date;
      }
      const year = splitDate[0];
      const month = splitDate[1];
      const day = splitDate[2];

      return `${month}/${day}/${year}`;
    },
    incrementLikes(post) {
      db.collection('posts').doc(post.id).update({
        likes: post.likes + 1,
      });
    },
    incrementDislikes(post) {
      db.collection('posts').doc(post.id).update({
        dislikes: post.dislikes + 1,
      });
    },
    // incrementHearts(post) {
    //   db.collection('posts').doc(post.id).update({
    //     hearts: post.hearts + 1,
    //   });
    // },
  },
  computed: {
    filteredPosts() {
      console.log('search term: ', this.searchTerm);
      console.log('this: ', this);
      const newSearchTerm = (this.searchTerm) ? this.searchTerm.toLowerCase() : this.searchTerm;
      console.log('New Search Term:', newSearchTerm);
      return this.posts.filter((post) => post.message.toLowerCase().match(newSearchTerm)
        || this.formatDate(post.date).match(this.searchTerm)
        || post.subject.toLowerCase().match(newSearchTerm)
        || post.alias.toLowerCase().match(newSearchTerm)
        || this.formatTime(post.time).match(this.searchTerm));
    },
  },
  created() {
    // fetch data from firestore
    console.log('where is this:blog page', this.$route.params.alias);
    db.collection('posts').orderBy('date', 'desc').orderBy('time', 'desc').get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const post = doc.data();
          post.id = doc.id;
          console.log(post);
          this.posts.push(post);
        });
      });
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
/* i.v-icon.notranslate.mdi.mdi-heart.theme--light::before {
   position:absolute;
   bottom:-5px;
   left:-7px;
   font-size:25px;
}
button.heart.v-btn.v-btn--flat.v-btn--icon.v-btn--round.theme--light.v-size--default {
   position:absolute;
   top:20px;
   left:680px;
   font-size:25px;
}
span.v-badge_badge.pink.darken-1{
   position: absolute;
   font-family: 'Raleway', sans-serif;
   font-size:25px;
} */
i.v-icon.notranslate.mdi.mdi-thumb-up.theme--light::before {
   position:absolute;
   bottom:-2px;
   left:-7px;
   font-size:25px;
}
button.like.v-btn.v-btn--flat.v-btn--icon.v-btn--round.theme--light.v-size--default {
   position:absolute;
   top:20px;
   left:750px;
   /* right:100px; */
   /* bottom:20px;
   left:730px; */
   font-size:25px;
}
span.v-badge_badge.blue.darken-1{
   position: absolute;
   font-family: 'Raleway', sans-serif;
   font-size:25px;
}
i.v-icon.notranslate.mdi.mdi-thumb-down.theme--light::before {
  position:absolute;
   bottom:-3px;
   left:-7px;
   font-size:25px;
}
button.dislike.v-btn.v-btn--flat.v-btn--icon.v-btn--round.theme--light.v-size--default {
   position:absolute;
   top:20px;
   left:820px;
   font-size:25px;
}
span.v-badge_badge.red.darken-1{
   position: absolute;
   font-family: 'Raleway', sans-serif;
   font-size:25px;
}
/* .emoji{
   position:absolute;
   bottom:30px;
   right:55px;
   font-size:25px;
}
.emoji2{
  position:absolute;
  bottom:30px;
  right:10px;
  font-size:25px;
}
.reactionButton{
   position:absolute;
   bottom:10px;
   right:55px;
   font-size:20px;
   color:black;
}
.reactionButton2{
   position:absolute;
   bottom:10px;
   right:10px;
   font-size:20px;
   color:black;
} */
/* .emojiBackground{
background-color:#eeeeee;
font-weight:bold;
color:black;
border:thin Black;
border-style:dashed;
line-height:20px;
position:absolute;
} */
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
