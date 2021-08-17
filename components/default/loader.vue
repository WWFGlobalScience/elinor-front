<template>
    <transition name="fade">
        <div class="elinor__loader" v-if="loader.active">
            <div class="loader__group">
                <svg class="animate-spin mb-2 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="#359E98" stroke-width="4"></circle>
                    <path class="opacity-75" fill="#359E98" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <div class="loader__txt">{{ loader.text }}</div>
            </div>
            <div class="loader__bg"></div>
        </div>
    </transition>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'default-loader',
    computed: {
        ...mapState({
            loader: state => state.loader.loader
        })
    }
}
</script>