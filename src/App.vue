<template>
  <div id="app">
    <div class="hero-head">
      <b-navbar>
        <template slot="start" v-if="!isMenuVisible">
          <b-navbar-item>
            <a @click="navigateTo('/')">Inicio</a>
          </b-navbar-item>
        </template>
      </b-navbar>
    </div>

    <section class="section" v-if="isMenuVisible">
      <div class="container has-text-centered is-fluid">
        <div class="columns is-multiline">
          <div
            class="column is-full-mobile is-half-tablet is-one-quarter-desktop"
            v-for="app in values"
            :key="app.alias"
          >
            <div class="card">
              <div class="card-content">
                <p class="title2">{{app.name}}</p>
                <p>
                  <b-icon icon="search-web"></b-icon>
                </p>
                <b-button @click="navigateTo(`#/${app.alias}`)">Acceder</b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { init } from "./portal";
export default {
  name: "app",
  data() {
    return {
      message: "Hello Vue.js!",
      isMenuVisible: true,
      values: [
        {
          name: "React Appplication",
          alias: "app1",
          url: "/app1/singleSpaEntry.js",
          target: "http://localhost:9001",
          pathRewrite: { "^/app1": "" }
        },
        {
          name: "Angular Appplication",
          alias: "app2",
          url: "/app2/singleSpaEntry.js",
          target: "http://localhost:9002",
          pathRewrite: { "^/app2": "" }
        },
        {
          name: "Angular 1.6 Appplication",
          alias: "app3",
          url: "/app3/singleSpaEntry.js",
          target: "http://localhost:9003",
          pathRewrite: { "^/app3": "" }
        },
        {
          name: "Vue Appplication",
          alias: "app4",
          url: "/app4/singleSpaEntry.js",
          target: "http://localhost:8004",
          pathRewrite: { "^/app4": "" }
        },
        {
          name: "Angular Appplication",
          alias: "app5",
          url: "/app5/singleSpaEntry.js",
          target: "http://localhost:9005",
          pathRewrite: { "^/app5": "" }
        }
      ]
    };
  },
  created() {
    window.addEventListener("popstate", this.evaluateMenuVisibility);
  },
  mounted() {
    this.registerApps();
    this.evaluateMenuVisibility();
  },
  methods: {
    registerApps() {
      init(this.values);
    },
    navigateTo(url) {
      window.history.pushState(null, null, url);
      this.isMenuVisible = window.location.hash === "";
    },

    evaluateMenuVisibility() {
      this.isMenuVisible = window.location.hash === "";
      console.log("this.isMenuVisible :", this.isMenuVisible);
    }
  }
};
</script>