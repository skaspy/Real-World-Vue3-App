import { createRouter, createWebHistory } from "vue-router";
import EventList from "../views/EventList.vue";
import EventLayout from "../views/event/Layout.vue";
import EventDetails from "../views/event/Details.vue";
import EventRegister from "../views/event/Register.vue";
import EventEdit from "../views/event/Edit.vue";
import About from "../views/About.vue";

const routes = [
  {
    path: "/",
    name: "EventList",
    component: EventList,
    props: route => ({ page: parseInt(route.query.page) || 1})
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/event/:id",  //:id ist der Platzhalter
    name: "EventLayout",
    props: true,
    component: EventLayout,
    children: [
      {
        path: "",  //loads the root-path of the parent
        name: "EventDetails",
        component: EventDetails
      },
      {
        path: "register",  //:id ist der Platzhalter
        name: "EventRegister",
        component: EventRegister
      },
      {
        path: "edit",  //:id ist der Platzhalter
        name: "EventEdit",
        component: EventEdit
      }
    ]
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
