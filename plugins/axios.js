export default function ({ $axios, app, store, $nuxt }) {
    $axios.onError((error) => {
        if (error.response.status === 401) {
            store.dispatch('loader/loaderState', { active: false });
            app.$auth.logout();
            app.$toast.info(
                app.i18n.t('statusMessaging.authentication.logoutError'),
            );
        }
        throw error;
    });
}
