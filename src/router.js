import Vue from "vue";
import Router from "vue-router";
import Movies from "./views/Movies.vue";


Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: Movies
    },
    {
      path: "/movies",
      name: "movies",
      component: Movies
    },
    {
      path: "/people",
      name: "people",
      component: () =>
        import("./views/People.vue")
    },
    {
      path: "/users",
      name: "users",
      component: () =>
        import("./views/Users/list.vue")
    },
    {
      path: "/cinemas",
      name: "cinemas",
      component: () =>
        import("./views/Cinemas.vue")
    },
    {
      path: "/users/create",
      name: "users create",
      component: () =>
        import("./views/Users/create.vue")
    },
    {
      path: "/movie/:id",
      name: "movie",
      component: () =>
        import("./views/Movie.vue"),
      props: route => ({ id: route.params.id })
    },
    {
      path: "/people/:id",
      name: "person",
      component: () =>
        import("./views/Person.vue"),
      props: route => ({ id: route.params.id })
    },
    {
      path: "/cinema/:id",
      name: "cinema",
      component: () =>
        import("./views/Cinema.vue"),
      props: route => ({ id: route.params.id })
    },
    {
      path: "/user/:id",
      name: "user",
      component: () =>
        import("./views/Users/user.vue"),
      props: route => ({ id: route.params.id })
    },
    {
      path: "/user/:id/edit",
      name: "user edit",
      component: () =>
        import("./views/Users/edit.vue"),
      props: route => ({ id: route.params.id })
    },
  ]
});