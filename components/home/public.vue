<template>
    <article class="page page--flushed">
        <section
            :class="{ 'section--sign-in--logged-in': $auth.loggedIn }"
            class="section section--sign-in"
        >
            <picture class="section__full-background">
                <img src="~/assets/img/signin-background.jpg" />
            </picture>
            <div
                v-if="!$auth.loggedIn"
                class="elinor__card elinor__card--sign-in"
            >
                <NuxtLink to="/" class="flex justify-center">
                    <img
                        src="~/assets/img/elinor-sign-up-circle.svg"
                        class="elinor__card--sign-in__logo"
                    />
                </NuxtLink>
                <div class="elinor__card--sign-in__info">
                    <div>
                        <p class="text-xl mb-1.5">
                            {{ $t('pages.home.public.signInTitle') }}
                        </p>
                    </div>
                    <div>
                        <p
                            class="mb-0 text-grayy-lighter"
                            v-if="
                                !alerts.emailVerificationRequired &&
                                !alerts.emailVerificationSent
                            "
                        >
                            {{
                                $t(
                                    'pages.home.public.signInTitleAndCreateAccountSeparator',
                                )
                            }}
                            <NuxtLink
                                to="/create-account"
                                class="text-turqy text-sm"
                                >{{
                                    $t('pages.home.public.createAccountLink')
                                }}</NuxtLink
                            >
                        </p>
                        <p
                            class="mb-0 text-grayy-lighter"
                            v-if="
                                alerts.emailVerificationRequired ||
                                alerts.emailVerificationSent
                            "
                        >
                            {{
                                $t(
                                    'pages.home.public.signInTitleAndCreateAccountSeparator',
                                )
                            }}
                            <NuxtLink
                                to="/resend-verification-email"
                                class="text-turqy text-sm"
                                >{{
                                    $t(
                                        'pages.home.public.resendVerificationLink',
                                    )
                                }}</NuxtLink
                            >
                        </p>
                    </div>
                </div>

                <p class="text-base">
                    {{ $t('pages.home.public.signInSubtitle') }}
                </p>

                <div
                    v-if="error"
                    class="bg-red-100 mt-5 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                >
                    <strong class="font-bold">Error!</strong>
                    <span class="block sm:inline">{{ error }}</span>
                </div>

                <div
                    v-if="alerts.emailVerificationRequired"
                    class="bg-red-100 mt-5 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                >
                    <strong class="font-bold">{{
                        $t(
                            'pages.home.public.alerts.emailVerificationRequired.title',
                        )
                    }}</strong>
                    <span class="block sm:inline">{{
                        $t(
                            'pages.home.public.alerts.emailVerificationRequired.subtitle',
                        )
                    }}</span>
                </div>

                <div
                    v-if="alerts.emailVerificationSent"
                    class="bg-green-100 mt-5 border border-green-400 text-white-700 px-4 py-3 rounded relative"
                    role="alert"
                >
                    <strong class="font-bold">{{
                        $t(
                            'pages.home.public.alerts.emailVerificationSent.title',
                        )
                    }}</strong>
                    <span class="block sm:inline">{{
                        $t(
                            'pages.home.public.alerts.emailVerificationSent.subtitle',
                        )
                    }}</span>
                </div>

                <div
                    v-if="alerts.passwordChangedSuccessfully"
                    class="bg-green-100 mt-5 border border-green-400 text-white-700 px-4 py-3 rounded relative"
                    role="alert"
                >
                    <strong class="font-bold">{{
                        $t(
                            'pages.home.public.alerts.passwordChangedSuccessfully.title',
                        )
                    }}</strong>
                    <span class="block sm:inline">{{
                        $t(
                            'pages.home.public.alerts.passwordChangedSuccessfully.subtitle',
                        )
                    }}</span>
                </div>

                <div
                    v-if="alerts.emailVerifiedSuccessfully"
                    class="bg-green-100 mt-5 border border-green-400 text-white-700 px-4 py-3 rounded relative"
                    role="alert"
                >
                    <strong class="font-bold">{{
                        $t(
                            'pages.home.public.alerts.emailVerifiedSuccessfully.title',
                        )
                    }}</strong>
                    <span class="block sm:inline">{{
                        $t(
                            'pages.home.public.alerts.emailVerifiedSuccessfully.subtitle',
                        )
                    }}</span>
                </div>

                <div
                    v-if="alerts.accountDeletedSuccessfully"
                    class="bg-green-100 mt-5 border border-green-400 text-white-700 px-4 py-3 rounded relative"
                    role="alert"
                >
                    <strong class="font-bold">{{
                        $t(
                            'pages.home.public.alerts.accountDeletedSuccessfully.title',
                        )
                    }}</strong>
                    <span class="block sm:inline">{{
                        $t(
                            'pages.home.public.alerts.accountDeletedSuccessfully.subtitle',
                        )
                    }}</span>
                </div>

                <form
                    id="form--signin"
                    @submit="submit"
                    class="form form--sign-in"
                >
                    <div class="form__group">
                        <div class="form__row">
                            <div class="input">
                                <input
                                    type="text"
                                    :placeholder="
                                        $t('pages.home.public.usernameInput')
                                    "
                                    v-model="username"
                                    required
                                />
                            </div>
                        </div>
                        <div class="form__row">
                            <div class="input">
                                <input
                                    type="password"
                                    :placeholder="
                                        $t('pages.home.public.passwordInput')
                                    "
                                    v-model="password"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div class="elinor__card--sign-in__info info-start mt-9">
                        <div class="form__group">
                            <div class="form__row">
                                <div
                                    class="input input--radios input--radios-question"
                                >
                                    <div class="radios__wrap">
                                        <div class="radio__wrap">
                                            <div class="radio">
                                                <input
                                                    type="checkbox"
                                                    name="answer"
                                                    id="answer-1"
                                                    v-model="remember"
                                                />
                                                <img
                                                    src="~/assets/img/ico-ok.svg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <label for="answer-1" class="label">
                                        <span>{{
                                            $t(
                                                'pages.home.public.rememberMeCheckbox',
                                            )
                                        }}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                class="btn--border-turqy btn--opacity--child"
                            >
                                <span class="btn--opacity__target">{{
                                    $t('pages.home.public.signInButton')
                                }}</span>
                                <img src="~/assets/img/ico-signin-turqy.svg" />
                            </button>
                        </div>
                    </div>
                </form>
                <NuxtLink to="/forgot-password" class="text-turqy mt-3 text-sm">
                    {{ $t('pages.home.public.forgotPasswordLink') }}
                </NuxtLink>
            </div>
        </section>

        <section
            id="create-account"
            class="section section--intro section--turqy-light"
        >
            <div class="container">
                <img
                    src="~/assets/img/elinor-illustration.svg"
                    alt="ellinor illustration"
                />
                <p class="section--intro__info">
                    {{ $t('pages.home.public.content.introduction.text') }}
                </p>
                <NuxtLink
                    v-if="!$auth.loggedIn"
                    to="/create-account"
                    class="btn btn--opacity--child"
                >
                    <span class="btn--opacity__target">{{
                        $t(
                            'pages.home.public.content.introduction.createAccountLink',
                        )
                    }}</span>
                    <img src="~/assets/img/ico-button-arrow.svg" />
                </NuxtLink>
            </div>
        </section>

        <section
            class="section section--text section--intro-carousel section--img-text"
        >
            <div class="container">
                <div class="section--img-text__block-text">
                    <h1 class="c-title text-turqy mt-2">
                        How to use this tool
                    </h1>
                    <p>
                        See below how Elinor works and hot to use it
                    </p>
                </div>
            </div>
            <div class="carousel-container">
                <carousel
                    ref="carousel"
                    :center-mode="true"
                    :perPage="itemsPerView"
                    :perPageCustom="[
                        [0, 1],
                        [768, 2],
                        [1200, 3],
                        [2000, 4],
                    ]"
                    :navigationEnabled="true"
                    :paginationEnabled="true"
                    @dragging="handleDragging"
                >
                    <slide v-for="(item, index) in items" :key="index">
                        <button
                            @click="
                                popupState({
                                    active: true,
                                    component: 'popup-show-video',
                                    title: item.title,
                                    videoId: item.id,
                                })
                            "
                            class="card-carousel"
                        >
                            <img
                                :id="`thumb-${item.id}`"
                                :alt="`Contenido del video ${item.title}`"
                                class="carousel-thumb"
                                :src="`https://img.youtube.com/vi/${item.id}/hqdefault.jpg`"
                            />
                            <h4 class="c-title--md text-turqy mt-2">
                                {{ item.title }}
                            </h4>
                        </button>
                    </slide>
                </carousel>
            </div>
        </section>

        <section id="about" class="section section--text section--img-text">
            <div class="container">
                <div class="section--img-text__block">
                    <div class="section--img-text__block-text">
                        <h2 class="c-title">
                            {{
                                $t(
                                    'pages.home.public.content.explanation.title',
                                )
                            }}
                        </h2>
                        <p>
                            {{
                                $t(
                                    'pages.home.public.content.explanation.paragraph1',
                                )
                            }}
                        </p>
                        <p>
                            {{
                                $t(
                                    'pages.home.public.content.explanation.paragraph2',
                                )
                            }}
                        </p>
                    </div>
                    <div class="flex justify-end items-center">
                        <img
                            class="h-64"
                            src="~/assets/img/elinor-hand-icon.svg"
                        />
                    </div>
                </div>
            </div>
            <div class="section--img-text__block is-flushed">
                <div>
                    <img class="w-full" src="~/assets/img/tracking.jpg" />
                </div>
                <div class="container">
                    <div class="section--img-text__block-text">
                        <h4 class="c-title--block">
                            {{
                                $t(
                                    'pages.home.public.content.explanation.trackingChange.title',
                                )
                            }}
                        </h4>
                        <p
                            v-html="
                                $t(
                                    'pages.home.public.content.explanation.trackingChange.text',
                                )
                            "
                        ></p>
                        <ul
                            class="list-disc list-inside"
                            v-html="
                                $t(
                                    'pages.home.public.content.explanation.trackingChange.list',
                                )
                            "
                        ></ul>
                    </div>
                </div>
            </div>
        </section>

        <section class="section section--text section--turqy-light">
            <div class="container">
                <div class="grid grid-cols-2 gap-4 items-center lg:grid-cols-1">
                    <div class="text-center lg:order-2">
                        <img
                            class="w-10/12"
                            src="~/assets/img/elinor-pic.svg"
                        />
                        <blockquote class="elinor__sentence mx-auto">
                            "{{
                                $t(
                                    'pages.home.public.content.elinor.quote.text',
                                )
                            }}"
                            <span class="elinor__sentence__name">
                                {{
                                    $t(
                                        'pages.home.public.content.elinor.quote.author',
                                    )
                                }}
                            </span>
                        </blockquote>
                    </div>
                    <div class="lg:order-1">
                        <h3 class="c-epi">
                            {{ $t('pages.home.public.content.elinor.title') }}
                        </h3>
                        <h4 class="c-title">
                            {{
                                $t('pages.home.public.content.elinor.subtitle')
                            }}
                        </h4>
                        <p>
                            {{
                                $t(
                                    'pages.home.public.content.elinor.paragraph1',
                                )
                            }}
                        </p>
                        <p>
                            {{
                                $t(
                                    'pages.home.public.content.elinor.paragraph2',
                                )
                            }}
                        </p>
                        <p>
                            {{
                                $t(
                                    'pages.home.public.content.elinor.paragraph3',
                                )
                            }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section
            id="faqs"
            class="section section--text section--img-text"
            style="padding-top: 1rem; padding-bottom: 1rem"
        ></section>
        <default-footer></default-footer>
    </article>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';

import { mapActions, mapState } from 'vuex';
import locales from '../../locales';
const numNews = 3;
const maxCharacters = 300;

export default {
    name: 'home-public',
    components: {
        Carousel,
        Slide,
    },
    data() {
        return {
            username: null,
            password: null,
            remember: false,
            maxCharacters,

            isDragging: false,
            itemsPerView: 4,
            items: [
                {
                    id: '9bxrsgW82L4',
                    title: 'Introduction to Elinor',
                },
                {
                    id: 'nA5LNNuqpKQ',
                    title: 'How to create a new assessment',
                },
                {
                    id: 'CX8LucMtgdg',
                    title: 'How to generate a report',
                },
                {
                    id: '1AJ-g-2y8pQ',
                    title: 'How to change assestment privacy',
                },
                {
                    id: 'z1T6DnDNVIg',
                    title: 'How to add a Collaborator',
                },
            ],
        };
    },

    computed: {
        ...mapState({
            alerts: (state) => state.authentication.alerts,
            error: (state) => state.authentication.error,
        }),
    },

    activated() {
        this.$store.commit('authentication/clearError');
    },

    methods: {
        ...mapActions({
            popupState: 'popup/popupState',
            signIn: 'authentication/signIn',
        }),
        submit(event) {
            event.preventDefault();
            this.signIn({ username: this.username, password: this.password });
        },
        handleDragging(isDragging) {
            this.isDragging = isDragging;
            console.log('status:', this.isDragging);
        },
    },
};
</script>
