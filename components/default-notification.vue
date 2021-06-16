<template>
    <transition name="elinor-slide-up">
        <div class="elinor__notifications" v-show="notifications.active" :style="[ {'background-color': '#359E98' ? notifications.success : null }]">
            <div class="container">
                Hola qué tal
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'default-notifications',
    computed: {
        notifications() {
            return this.$store.state.notifications.notifications
        }
    }
}
</script>