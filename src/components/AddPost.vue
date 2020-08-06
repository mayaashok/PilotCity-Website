<template>
    <div class="add-post container">
        <h2>Add New Blog Post:</h2>
        <form @submit.prevent="AddPost">
                <div class="field subject">
                    <label for="subject">Subject:</label>
                    <input type="text" name="subject" v-model="subject">
                </div>
                <!-- <div class="field author">
                    <label for="author">Author:</label>
                    <input type="text" name="author" v-model="author">
                </div> -->
                <!-- <div class="field date">
                    <label for="date">Date:</label>
                    <input type="date" name="date" v-model="date">
                </div>
                <div class="field time">
                    <label for="time">Time:</label>
                    <input type="time" name="time" v-model="time">
                </div> -->
                <div class="field message">
                    <label for="message">Message:</label>
                      <v-textarea type="text" name="message" v-model="message"
                      color="teal" auto-grow style="white-space: pre-wrap;">
                      </v-textarea>
                </div>
                <br/>
            <div class="field center">
              <button class="btn-large">Post</button>
            </div>
            <router-link :to="{ name: 'Blog' }">
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
import firebase from 'firebase';

export default {
  name: 'AddPost',
  data() {
    return {
      subject: null,
      // author: null,
      date: null,
      time: null,
      message: null,
      feedback: null,
      slug: null,
      user_id: null,
      alias: null,
    };
  },
  methods: {
    AddPost() {
      console.log('where is this: addpost page', this.$route.params.alias);
      if (this.subject) {
        this.feedback = null;
        const today = new Date();
        this.date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        this.time = `${today.getHours()}:${today.getMinutes()}`;
        // create a slug
        this.slug = slugify(this.subject, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true,
        });
        console.log('setting post field: ', this.$route.params.alias);
        db.collection('posts').add({
          subject: this.subject,
          // author: this.author,
          date: this.date,
          time: this.time,
          message: this.message,
          slug: this.slug,
          user_id: firebase.auth().currentUser.uid,
          alias: this.$route.params.alias,
          likes: 0,
          dislikes: 0,
          // hearts: 0,
        }).then(() => {
          this.$router.push({ name: 'Blog' });
        }).catch((err) => {
          console.log(err);
        });
      } else {
        this.feedback = 'You must enter a blog subject.';
      }
    },
  },
};
</script>

<style>
.add-post h2 {
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
button.btn-large.center{
  text-align: center;
  position: center;
  background-color: #C4C4C4;
  font-family: 'Raleway', sans-serif;
}
button {
    background-color: #C4C4C4;
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
div.add-post.container{
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
