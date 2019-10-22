// import 'zone.js';
import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import * as singleSpa from 'single-spa';
import { GlobalEventDistributor } from './globalEventDistributor'
import { loadApp } from './helper'


Vue.use(Buefy)

window.onload = function () {
    new Vue({
        el: '#app',
        render: h => h(App)
    })
}

export async function init(values) {
    const globalEventDistributor = new GlobalEventDistributor();
    const loadingPromises = [];

    values.forEach(app => {
        loadingPromises.push(loadApp(app.alias, `/${app.alias}`, `/${app.alias}/singleSpaEntry.js`, null, globalEventDistributor));
    });

    // app4: The URL "/app4/..." is being redirected to "http://localhost:9004/..." this is done by the webpack proxy (webpack.config.js)
    // loadingPromises.push(loadApp('app4', '/app4', '/app4/singleSpaEntry.js', null, globalEventDistributor)); // does not have a store, so we pass null

    // wait until all stores are loaded and all apps are registered with singleSpa
    await Promise.all(loadingPromises);

    singleSpa.start();
}

