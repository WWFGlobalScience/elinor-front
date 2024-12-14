<template>
    <transition name="fade">
        <div class="elinor__notifications">
            <div class="container">
                {{ $t(notifications.text) }}
                <button
                    type="button"
                    class="btn btn--opacity--child mt-4"
                    @click="reloadPage"
                >
                    <span class="btn--opacity__target">{{
                        $t(notifications.button)
                    }}</span>
                    <img src="~/assets/img/ico-button-arrow.svg" />
                </button>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'default-notifications',
    computed: {
        notifications() {
            return this.$store.state.notifications.notifications;
        },
    },
    methods: {
        reloadPage() {
            window.location.reload();
        },
    },
};
</script>
