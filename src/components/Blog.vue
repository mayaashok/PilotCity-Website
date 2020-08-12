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
                    <h4>{{ post.time }}<br>{{ post.date }}</h4>
                    <p style="white-space: pre-wrap;">{{ post.message }}</p>
                    <!-- <a href="" class="btn-floating btn-small">
                      <router-link :to="{ name:'EditPost',params:{ post_slug: post.slug }}">
                        <i class="material-icons create">create</i>
                      </router-link>
                    </a> -->
                <!-- <i class="material-icons delete" @click="deletePost(post.id)">delete</i> -->
                <div id="blog">
  <v-btn class="like" text icon @click="updateLikes(post);">
<v-badge bottom color="blue darken-1" :content="post.likes" :value="post.likes">
  <v-icon class="likeIcon" :id="'likeButtonChange' + post.id" :color="getLikeColor(post)">
    mdi-thumb-up</v-icon>
</v-badge>
  </v-btn>
  <v-btn class="dislike" text icon @click="updateDislikes(post);">
<v-badge bottom color="red darken-1" :content="post.dislikes" :value="post.dislikes">
<v-icon :id="'dislikeButtonChange' + post.id" :color="getDislikeColor(post)">mdi-thumb-down</v-icon>
</v-badge>
  </v-btn>
<v-btn class="heart" text icon @click="updateHearts(post);">
<v-badge bottom color="pink darken-1" :content="post.hearts" :value="post.hearts">
  <v-icon :id="'heartButtonChange' + post.id" :color="getHeartColor(post)">mdi-heart</v-icon>
</v-badge>
  </v-btn>
<v-btn class="happyEmoji" text icon @click="updateHappyEmojis(post);">
<v-badge bottom color="yellow darken-2" :content="post.happyEmojis"
:value="post.happyEmojis">
  <v-icon :id="'happyButtonChange' + post.id" :color="getHappyColor(post)">mdi-emoticon</v-icon>
</v-badge>
  </v-btn>
<v-btn class="frownEmoji" text icon @click="updateFrownEmojis(post);">
<v-badge bottom color="yellow darken-2" :content="post.frownEmojis"
:value="post.frownEmojis">
<v-icon :id="'frownButtonChange' + post.id" :color="getFrownColor(post)">mdi-emoticon-frown</v-icon>
</v-badge>
  </v-btn>
<v-btn class="laughEmoji" text icon @click="updateLaughEmojis(post);">
<v-badge bottom color="yellow darken-2" :content="post.laughEmojis"
:value="post.laughEmojis">
  <v-icon :id="'laughButtonChange' + post.id" :color="getLaughColor(post)">mdi-emoticon-lol</v-icon>
</v-badge>
  </v-btn>
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
import firebase from 'firebase';

export default {
  name: 'Blog',
  data() {
    return {
      userId: '',
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
    deletePost(id) {
      // delete doc from firestore
      db.collection('posts').doc(id).delete()
        .then(() => {
          this.posts = this.posts.filter((post) => post.id !== id);
        });
    },
    updateLikes(post) {
      const boolLike = post.like_reactions.includes(this.userId);
      if (boolLike) {
        const index = post.like_reactions.indexOf(this.userId);
        post.like_reactions.splice(index, 1);
        // eslint-disable-next-line no-param-reassign
        post.likes -= 1;
        db.collection('posts').doc(post.id).update({
          likes: post.likes,
          like_reactions: post.like_reactions,
        });
        document.getElementById(`likeButtonChange${post.id}`).style.color = '#64B5F6';
      } else {
        post.like_reactions.push(this.userId);
        // eslint-disable-next-line no-param-reassign
        post.likes += 1;
        db.collection('posts').doc(post.id).update({
          likes: post.likes,
          like_reactions: post.like_reactions,
        });
        document.getElementById(`likeButtonChange${post.id}`).style.color = '#BBDEFB';
      }
    },
    getLikeColor(post) {
      const boolLike = post.like_reactions.includes(this.userId);
      if (boolLike) {
        return '#BBDEFB';
      }
      return '#64B5F6';
    },
    updateDislikes(post) {
      const boolDislike = post.dislike_reactions.includes(this.userId);
      if (boolDislike) {
        const index = post.dislike_reactions.indexOf(this.userId);
        post.dislike_reactions.splice(index, 1);
        // eslint-disable-next-line no-param-reassign
        post.dislikes -= 1;
        db.collection('posts').doc(post.id).update({
          dislikes: post.dislikes,
          dislike_reactions: post.dislike_reactions,
        });
        document.getElementById(`dislikeButtonChange${post.id}`).style.color = '#E57373';
      } else {
        post.dislike_reactions.push(this.userId);
        // eslint-disable-next-line no-param-reassign
        post.dislikes += 1;
        db.collection('posts').doc(post.id).update({
          dislikes: post.dislikes,
          dislike_reactions: post.dislike_reactions,
        });
        document.getElementById(`dislikeButtonChange${post.id}`).style.color = '#f7adad';
      }
    },
    getDislikeColor(post) {
      const boolDislike = post.dislike_reactions.includes(this.userId);
      if (boolDislike) {
        return '#f7adad';
      }
      return '#E57373';
    },
    updateHearts(post) {
      const boolHeart = post.heart_reactions.includes(this.userId);
      if (boolHeart) {
        const index = post.heart_reactions.indexOf(this.userId);
        post.heart_reactions.splice(index, 1);
        // eslint-disable-next-line no-param-reassign
        post.hearts -= 1;
        db.collection('posts').doc(post.id).update({
          hearts: post.hearts,
          heart_reactions: post.heart_reactions,
        });
        document.getElementById(`heartButtonChange${post.id}`).style.color = '#F06292';
      } else {
        post.heart_reactions.push(this.userId);
        // eslint-disable-next-line no-param-reassign
        post.hearts += 1;
        db.collection('posts').doc(post.id).update({
          hearts: post.hearts,
          heart_reactions: post.heart_reactions,
        });
        document.getElementById(`heartButtonChange${post.id}`).style.color = '#F8BBD0';
      }
    },
    getHeartColor(post) {
      const boolHeart = post.heart_reactions.includes(this.userId);
      if (boolHeart) {
        return '#F8BBD0';
      }
      return '#F06292';
    },
    updateHappyEmojis(post) {
      const boolHappyEmoji = post.happyEmoji_reactions.includes(this.userId);
      if (boolHappyEmoji) {
        const index = post.happyEmoji_reactions.indexOf(this.userId);
        post.happyEmoji_reactions.splice(index, 1);
        // eslint-disable-next-line no-param-reassign
        post.happyEmojis -= 1;
        db.collection('posts').doc(post.id).update({
          happyEmojis: post.happyEmojis,
          happyEmoji_reactions: post.happyEmoji_reactions,
        });
        document.getElementById(`happyButtonChange${post.id}`).style.color = '#FDD835';
      } else {
        post.happyEmoji_reactions.push(this.userId);
        // eslint-disable-next-line no-param-reassign
        post.happyEmojis += 1;
        db.collection('posts').doc(post.id).update({
          happyEmojis: post.happyEmojis,
          happyEmoji_reactions: post.happyEmoji_reactions,
        });
        document.getElementById(`happyButtonChange${post.id}`).style.color = '#FFECB3';
      }
    },
    getHappyColor(post) {
      const boolHappyEmoji = post.happyEmoji_reactions.includes(this.userId);
      if (boolHappyEmoji) {
        return '#FFECB3';
      }
      return '#FDD835';
    },
    updateFrownEmojis(post) {
      const boolFrownEmoji = post.frownEmoji_reactions.includes(this.userId);
      if (boolFrownEmoji) {
        const index = post.frownEmoji_reactions.indexOf(this.userId);
        post.frownEmoji_reactions.splice(index, 1);
        // eslint-disable-next-line no-param-reassign
        post.frownEmojis -= 1;
        db.collection('posts').doc(post.id).update({
          frownEmojis: post.frownEmojis,
          frownEmoji_reactions: post.frownEmoji_reactions,
        });
        document.getElementById(`frownButtonChange${post.id}`).style.color = '#FDD835';
      } else {
        post.frownEmoji_reactions.push(this.userId);
        // eslint-disable-next-line no-param-reassign
        post.frownEmojis += 1;
        db.collection('posts').doc(post.id).update({
          frownEmojis: post.frownEmojis,
          frownEmoji_reactions: post.frownEmoji_reactions,
        });
        document.getElementById(`frownButtonChange${post.id}`).style.color = '#FFECB3';
      }
    },
    getFrownColor(post) {
      const boolFrownEmoji = post.frownEmoji_reactions.includes(this.userId);
      if (boolFrownEmoji) {
        return '#FFECB3';
      }
      return '#FDD835';
    },
    updateLaughEmojis(post) {
      const boolLaughEmoji = post.laughEmoji_reactions.includes(this.userId);
      if (boolLaughEmoji) {
        const index = post.laughEmoji_reactions.indexOf(this.userId);
        post.laughEmoji_reactions.splice(index, 1);
        // eslint-disable-next-line no-param-reassign
        post.laughEmojis -= 1;
        db.collection('posts').doc(post.id).update({
          laughEmojis: post.laughEmojis,
          laughEmoji_reactions: post.laughEmoji_reactions,
        });
        document.getElementById(`laughButtonChange${post.id}`).style.color = '#FDD835';
      } else {
        post.laughEmoji_reactions.push(this.userId);
        // eslint-disable-next-line no-param-reassign
        post.laughEmojis += 1;
        db.collection('posts').doc(post.id).update({
          laughEmojis: post.laughEmojis,
          laughEmoji_reactions: post.laughEmoji_reactions,
        });
        document.getElementById(`laughButtonChange${post.id}`).style.color = '#FFECB3';
      }
    },
    getLaughColor(post) {
      const boolLaughEmoji = post.laughEmoji_reactions.includes(this.userId);
      if (boolLaughEmoji) {
        return '#FFECB3';
      }
      return '#FDD835';
    },
    // disableLike(post) {
    //   const boolLike = post.like_reactions.includes(this.userId);
    //   return boolLike;
    // },
    // disableDislike(post) {
    //   const boolDislike = post.dislike_reactions.includes(this.userId);
    //   return boolDislike;
    // },
    // disableHeart(post) {
    //   const boolHeart = post.heart_reactions.includes(this.userId);
    //   return boolHeart;
    // },
    // disableHappyEmoji(post) {
    //   const boolHappyEmoji = post.happyEmoji_reactions.includes(this.userId);
    //   return boolHappyEmoji;
    // },
    // disableFrownEmoji(post) {
    //   const boolFrownEmoji = post.frownEmoji_reactions.includes(this.userId);
    //   return boolFrownEmoji;
    // },
    // disableLaughEmoji(post) {
    //   const boolLaughEmoji = post.laughEmoji_reactions.includes(this.userId);
    //   return boolLaughEmoji;
    // },
  },
  computed: {
    filteredPosts() {
      const newSearchTerm = (this.searchTerm) ? this.searchTerm.toLowerCase() : this.searchTerm;
      return this.posts.filter((post) => post.message.toLowerCase().match(newSearchTerm)
        || post.date.match(this.searchTerm)
        || post.subject.toLowerCase().match(newSearchTerm)
        || post.alias.toLowerCase().match(newSearchTerm)
        || post.time.match(this.searchTerm));
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
          this.posts.push(post);
          this.userId = firebase.auth().currentUser.uid;
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
.btn-small {
  background-color: #C4C4C4;
  position: absolute;
  top: 15px;
  right: 20px;
  cursor: pointer;
}
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
i.v-icon.notranslate.mdi.mdi-emoticon-lol.theme--light::before {
  bottom: 5px !important;
  left: -3px !important;
}
i.v-icon.notranslate.mdi.mdi-emoticon-frown.theme--light::before {
  bottom: 5px !important;
  left: -3px !important;
}
i.v-icon.notranslate.mdi.mdi-emoticon.theme--light::before {
  bottom: 5px !important;
  left: -3px !important;
}
i.v-icon.notranslate.mdi.mdi-heart.theme--light::before {
  bottom: 20px !important;
  left: -5px !important;
}
i.v-icon.notranslate.mdi.mdi-thumb-down.theme--light::before {
  bottom: 0px !important;
  left: -1px !important;
}
i.v-icon.notranslate.mdi.mdi-thumb-up.theme--light::before {
  bottom: 0px !important;
  left: -1px !important;
}
.v-badge__wrapper {
  height: 70% !important;
  width: 109% !important;
}
button.laughEmoji.v-btn.v-btn--flat.v-btn--icon.v-btn--round.theme--light.v-size--default {
  top: 45px;
  left: 810px;
}
button.frownEmoji.v-btn.v-btn--flat.v-btn--icon.v-btn--round.theme--light.v-size--default {
  top: 45px;
  left: 750px;
}
button.happyEmoji.v-btn.v-btn--flat.v-btn--icon.v-btn--round.theme--light.v-size--default {
  top: 45px;
  left: 690px;
}
button.heart.v-btn.v-btn--flat.v-btn--icon.v-btn--round.theme--light.v-size--default {
  top:  15px;
  left: 688px;
}
button.dislike.v-btn.v-btn--flat.v-btn--icon.v-btn--round.theme--light.v-size--default {
  top:  15px !important;
  left: 810px !important;
}
button.like.v-btn.v-btn--flat.v-btn--icon.v-btn--round.theme--light.v-size--default  {
  top:  15px !important;
  left: 750px;
}
</style>
