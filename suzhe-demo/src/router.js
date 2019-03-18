import Vue from "vue";
import Router from "vue-router";
import PureContainer from "./components/PureContainer.vue";
import "./views/cc/router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("./views/AuthCheck.vue"),
      children: [
        {
          path: "welcome",
          name: "welcome",
          component: () => import("./views/Welcome.vue")
        }
      ].concat(
        ["cc", "pf"].map(sys => ({
          path: `system-${sys}`,
          name: sys,
          component: PureContainer,
          children: [
            {
              path: `system-${sys}/home`,
              name: `${sys}-home`,
              component: () => import("./views/Welcome.vue")
            }
          ]
        }))
      )
    }
  ]
});
