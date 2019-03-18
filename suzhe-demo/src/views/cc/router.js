import PureContainer from "../../components/PureContainer.vue";

const router = {
  routes: [
    {
      path: "place",
      component: PureContainer,
      children: [
        {
          path: "list",
          name: "place-list",
          component: () => import("../Welcome.vue")
        }
      ]
    }
  ]
};
