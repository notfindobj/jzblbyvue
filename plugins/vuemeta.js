import Vue from 'vue';
import VueMeta from 'vue-meta';
Vue.use(VueMeta, {
    keyName: 'head', // the component option name that vue-meta looks for meta info on.
    attribute: 'data-n-head', // the attribute name vue-meta adds to the tags it observes
    ssrAttribute: 'data-n-head-ssr', // the attribute name that lets vue-meta know that meta info has already been server-rendered
    tagIDKeyName: 'hid' // the property name that vue-meta uses to determine whether to overwrite or append a tag
})