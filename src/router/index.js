import Vue from 'vue';
import Router from 'vue-router';
import Blog from '@/components/Blog.vue';
import AddPost from '@/components/AddPost.vue';
import EditPost from '@/components/EditPost.vue';
import Signup from '@/components/Signup.vue';
import Login from '@/components/Login.vue';
import MyPosts from '@/components/MyPosts.vue';
import firebase from 'firebase';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Blog',
      component: Blog,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/add-post',
      name: 'AddPost',
      component: AddPost,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/edit-post/:post_slug',
      name: 'EditPost',
      component: EditPost,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/my-posts',
      name: 'MyPosts',
      component: MyPosts,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  // check to see if route requires auth
  if (to.matched.some((rec) => rec.meta.requiresAuth)) {
    // check auth state of user
    const user = firebase.auth().currentUser;
    if (user) {
      // user signed in, proceed to route
      next();
    } else {
      // no user signed in, redirect to login
      next({ name: 'Login' });
    }
  } else {
    next();
  }
});

export default router;
