import UiAlert from './UiAlert.vue';

const Keen = {
    UiAlert,

    install(Vue) {
        Vue.component('ui-alert', UiAlert);
    }
};

// Automatically install Keen UI if Vue is available globally
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Keen);
}

export default Keen;

export { UiAlert };