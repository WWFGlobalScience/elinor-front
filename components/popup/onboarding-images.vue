<template>
    <div class="onboarding-images">
        <div v-if="activeAsset" class="onboarding-images__item">
            <img v-if="activeAsset.type === 'image'" :src="activeAsset.src" :alt="$t(activeAsset.alt)" />
            <video v-if="activeAsset.type === 'video'" :src="activeAsset.src" autoplay muted loop playsinline>
                {{ activeAsset.alt }}
            </video>
        </div>
    </div>
</template>

<script>
export default {
    name: 'popup-onboarding-images',
    props: {
        activeIndex: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            assets: [
                {
                    src: require('~/assets/img/onboarding/cover.jpg'),
                    alt: 'popup.onboarding.imageAlt.cover',
                    type: 'image',
                },
                {
                    src: require('~/assets/img/onboarding/onboard-1.mp4'),
                    alt: 'popup.onboarding.imageAlt.step1',
                    type: 'video',
                },
                {
                    src: require('~/assets/img/onboarding/onboard-2.mp4'),
                    alt: 'popup.onboarding.imageAlt.step2',
                    type: 'video',
                },
                {
                    src: require('~/assets/img/onboarding/onboard-3.mp4'),
                    alt: 'popup.onboarding.imageAlt.step3',
                    type: 'video',
                },
                {
                    src: require('~/assets/img/onboarding/onboard-4.mp4'),
                    alt: 'popup.onboarding.imageAlt.step4',
                    type: 'video',
                },
                {
                    src: require('~/assets/img/onboarding/onboard-5.mp4'),
                    alt: 'popup.onboarding.imageAlt.step5',
                    type: 'video',
                },
                {
                    src: require('~/assets/img/onboarding/onboard-6.mp4'),
                    alt: 'popup.onboarding.imageAlt.step6',
                    type: 'video',
                },
            ],
        };
    },
    computed: {
        activeAsset() {
            return this.assets[this.activeIndex - 1];
        },
    },
};
</script>