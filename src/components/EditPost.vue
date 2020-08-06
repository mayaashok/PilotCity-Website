<template>
    <div v-if="post" class="edit-post container">
        <h2>Edit {{ post.author }}'s {{ post.subject }} Post</h2>
        <form @submit.prevent="EditPost">
                <div class="field subject">
                    <label for="subject">Subject:</label>
                    <input type="text" name="subject" v-model="post.subject">
                </div>
                <!-- <div class="field author">
                    <label for="author">Author:</label>
                    <input type="text" name="author" v-model="post.author">
                </div> -->
                <!-- <div class="field date">
                    <label for="date">Date:</label>
                    <input type="date" name="date" v-model="post.date">
                </div>
                <div class="field time">
                    <label for="time">Time:</label>
                    <input type="time" name="time" v-model="post.time">
                </div> -->
                <div class="field message">
                    <label for="message">Message:</label>
                    <v-textarea type="text" name="message" v-model="post.message" color="teal"
                    auto-grow style="white-space: pre-wrap;">
                      </v-textarea>
                </div>
                <br/>
            <div class="field center">
              <button class="btn-large">Save</button>
            </div>
            <router-link :to="{ name: 'MyPosts' }">
              <i class="material-icons close">close</i>
            </router-link>
        <br/>
        <br/>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init';
import slugify from 'slugify';

export default {
  name: 'EditPost',
  data() {
    return {
      post: null,
    };
  },
  methods: {
    EditPost() {
      if (this.post.subject) {
        this.feedback = null;
        const today = new Date();
        this.post.date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        this.post.time = `${today.getHours()}:${today.getMinutes()}`;
        // create a slug
        this.post.slug = slugify(this.post.subject, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true,
        });
        db.collection('posts').doc(this.post.id).update({
          subject: this.post.subject,
          // author: this.post.author,
          date: this.post.date,
          time: this.post.time,
          message: this.post.message,
          slug: this.post.slug,
          alias: this.post.alias,
        }).then(() => {
          this.$router.push({ name: 'Blog' });
        })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.feedback = 'You must enter a blog subject.';
      }
    },
  },
  created() {
    const ref = db.collection('posts').where('slug', '==', this.$route.params.post_slug);
    ref.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        this.post = doc.data();
        this.post.id = doc.id;
      });
    });
  },
};
</script>

<style>
.edit-post h2 {
  text-align: center;
  font-family: 'Raleway', sans-serif;
  font-size: 30px;
  color: rgba(79, 79, 79, 0.86);
  font-weight: 800;
}
/* .theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background-color: #C4C4C4;
}
span.v-btn_content {
  text-align: center;
  font-family: 'Raleway', sans-serif;
}
.theme--light.v-btn {
  color: #FFFF;
} */
/* .btn-large{
  text-align: center;
  background-color: #C4C4C4;
  font-family: 'Raleway', sans-serif;
} */
button.btn-large{
  text-align: center;
  position: center;
  background-color: #C4C4C4;
  font-family: 'Raleway', sans-serif;
}
button.center {
    background-color: #C4C4C4;
}
.btn-large {
  left:50px;
  right:50px;
}
label {
    font-size: 16px;
    font-weight: 300;
    font-family: 'Raleway', sans-serif;
    color: rgba(79, 79, 79, 0.86);
}
input {
    font-family: 'Raleway', sans-serif;
    color: rgba(0, 0, 0, 0.87);
}
textarea#input-20 {
  color: rgba(79, 79, 79, 0.86);
}
.theme--light.v-input textarea {
    font-family: 'Raleway', sans-serif;
    color: rgba(0, 0, 0, 0.87);
}
div.edit-post.container{
    padding: 20px;
    max-width: 500px;
}
textarea {
    font-family: 'Raleway', sans-serif;
    color: rgba(79, 79, 79, 0.86);
    width: 100%;
}
.container{
  width: 60%;
  margin: auto;
}
i.material-icons.close {
  position: absolute;
  left: 1050px;
  top: 125px;
  font-size: 2.4em;
  color: #7e7e7e;
  cursor: pointer;
}
</style>
