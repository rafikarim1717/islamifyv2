import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("@/views/Home.vue");
const About = () => import("@/views/About.vue");
const Manage = () => import("@/views/Manage.vue");
const Blog = () => import("@/views/Blog.vue");
const Song = () => import("@/views/Song.vue");
const Auth = () => import("@/components/Auth.vue");
const Forum = () => import("@/views/Forum.vue");
const GeneralPosts = () => import("@/views/GeneralPosts.vue");
const ShalatPosts = () => import("@/views/ShalatPosts.vue");
const DoaPosts = () => import("@/views/DoaPosts.vue");
const AlquranPosts = () => import("@/views/AlquranPosts.vue");
const HadistPosts = () => import("@/views/HadistPosts.vue");
const Posts = () => import("@/views/Posts.vue");
const NotFound = () => import("@/views/NotFound.vue");

const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "auth",
    path: "/auth",
    component: Auth,
  },
  {
    name: "about",
    path: "/about",
    component: About,
  },
  {
    name: "blog",
    path: "/blog",
    component: Blog,
  },
  {
    name: "home-forum",
    path: "/forum",
    component: Forum,
  },
  {
    name: "general-posts",
    path: "/forum/generalPosts",
    component: GeneralPosts,
  },
  {
    name: "shalat-posts",
    path: "/forum/shalatPosts",
    component: ShalatPosts,
  },
  {
    name: "doa-posts",
    path: "/forum/doaPosts",
    component: DoaPosts,
  },
  {
    name: "alquran-posts",
    path: "/forum/alquranPosts",
    component: AlquranPosts,
  },
  {
    name: "hadist-posts",
    path: "/forum/hadistPosts",
    component: HadistPosts,
  },
  {
    name: "posts",
    path: "/forum/posts",
    component: Posts,
  },
  {
    name: "manage",
    // alias: "/manage",
    path: "/manage-music",
    component: Manage,
    beforeEnter(to, from, next) {
      console.log("Manage Route Guard");
      next();
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/manage",
    redirect: { name: "manage" },
  },
  {
    name: "song",
    path: "/song/:id",
    component: Song,
  },
  {
    name: "not-found",
    path: "/not-found",
    component: NotFound,
  },
  {
    path: "/:catchAll(.*)*",
    redirect: { name: "not-found" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        selector: to.hash,
        offset: { x: 0, y: 150 },
        behavior: "smooth",
      };
    }
  },
});

// router.beforeEach((to, from, next) => {
//   // console.log("Global Guard");

//   if (!to.meta.requiresAuth) {
//     next();
//     return;
//   }

//   const store = useUserStore();

//   if (store.userLoggedIn) {
//     next();
//   } else {
//     next({ name: "auth" });
//   }
// });

export default router;
