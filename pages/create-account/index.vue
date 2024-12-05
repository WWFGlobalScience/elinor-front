<template>
    <article class="page page--create-account">
        <header class="header--page">
            <div class="container--sm">
                <h1 class="c-title--sm">
                    {{ $t('pages.auth.registration.title') }}
                </h1>
                <p v-html="$t('pages.auth.registration.subtitle')"></p>
            </div>
        </header>
        <section class="section--signin-form">
            <form id="form--signin" class="form form--signin" @submit="submit">
                <div class="container--sm">
                    <div id="error" class="form__group" v-if="error">
                        <div
                            class="mb-10 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                            role="alert"
                        >
                            <strong class="font-bold">{{
                                $t(
                                    'pages.auth.registration.validationErrorTitle',
                                )
                            }}</strong>
                        </div>
                    </div>
                    <div class="form__group">
                        <div class="form__row">
                            <div id="email" class="input">
                                <input
                                    :class="{
                                        'input--error': hasError('email'),
                                    }"
                                    v-model="form.email"
                                    type="email"
                                    name="email"
                                    :placeholder="
                                        $t(
                                            'pages.auth.registration.inputs.email',
                                        )
                                    "
                                />
                                <p
                                    v-if="hasError('email')"
                                    class="msg msg--error"
                                >
                                    {{ getError('email') }}
                                </p>
                            </div>
                        </div>
                        <div id="password1" class="form__row">
                            <div class="input">
                                <input
                                    :class="{
                                        'input--error': hasError('password1'),
                                    }"
                                    v-model="form.password1"
                                    type="password"
                                    name="password1"
                                    :placeholder="
                                        $t(
                                            'pages.auth.registration.inputs.password1',
                                        )
                                    "
                                />
                                <p
                                    v-if="hasError('password1')"
                                    class="msg msg--error"
                                >
                                    {{ getError('password1') }}
                                </p>
                            </div>
                        </div>
                        <div id="password2" class="form__row">
                            <div class="input">
                                <input
                                    :class="{
                                        'input--error': hasError('password2'),
                                    }"
                                    v-model="form.password2"
                                    type="password"
                                    name="password2"
                                    :placeholder="
                                        $t(
                                            'pages.auth.registration.inputs.password2',
                                        )
                                    "
                                />
                                <p
                                    v-if="hasError('password2')"
                                    class="msg msg--error"
                                >
                                    {{ getError('password2') }}
                                </p>
                            </div>
                        </div>
                        <div id="first_name" class="form__row">
                            <div class="input">
                                <input
                                    :class="{
                                        'input--error': hasError('first_name'),
                                    }"
                                    v-model="form.first_name"
                                    type="text"
                                    name="first_name"
                                    :placeholder="
                                        $t(
                                            'pages.auth.registration.inputs.firstname',
                                        )
                                    "
                                />
                                <p
                                    v-if="hasError('first_name')"
                                    class="msg msg--error"
                                >
                                    {{ getError('first_name') }}
                                </p>
                            </div>
                        </div>
                        <div id="last_name" class="form__row">
                            <div class="input">
                                <input
                                    :class="{
                                        'input--error': hasError('last_name'),
                                    }"
                                    v-model="form.last_name"
                                    type="text"
                                    name="last_name"
                                    :placeholder="
                                        $t(
                                            'pages.auth.registration.inputs.lastname',
                                        )
                                    "
                                />
                                <p
                                    v-if="hasError('last_name')"
                                    class="msg msg--error"
                                >
                                    {{ getError('last_name') }}
                                </p>
                            </div>
                        </div>
                        <div id="username" class="form__row">
                            <div class="input">
                                <input
                                    :class="{
                                        'input--error': hasError('username'),
                                    }"
                                    v-model="form.username"
                                    type="text"
                                    name="username"
                                    :placeholder="
                                        $t(
                                            'pages.auth.registration.inputs.username',
                                        )
                                    "
                                />
                                <p
                                    v-if="hasError('username')"
                                    class="msg msg--error"
                                >
                                    {{ getError('username') }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container--full container--turqy-lighter mt-14">
                    <div class="container--sm py-14">
                        <div class="form__group">
                            <!--<div class="form__row">
                                <div class="input input--pr input--multiselect">
                                    <div class="multiselect__wrap">
                                        <multiselect
                                            :placeholder="$t( 'pages.sign-up.content.form.inputs.affiliation' )" select-label="Enter doesn’t work here!"
                                            :value="form.affiliation"
                                            track-by="id"
                                            label="name"
                                            :options="organizations"
                                            :multiple="false" :searchable="true" :showLabels="false"
                                            :allow-empty="false" open-direction="bottom" :hide-selected="true"
                                            @input="onOrganizationSelected"
                                            @search-change="fetchOrganizations">
                                            <span slot="noResult" slot-scope="props" class="text-xxs text-grayy-lighter">{{ $t('default.noresults') }} ({{ props.search }}) <hr class="my-4"> <button @click="$event.preventDefault();$event.stopPropagation(); createOrganization(props.search)" role="button" class="btn btn--sm btn--border-turqy mt-2">{{ $t('default.create') }}</button></span>
                                        </multiselect>
                                        <div class="multiselect__caret">
                                            <img src="~/assets/img/ico-select-turqy.svg">
                                        </div>
                                    </div>
                                    <div class="input__tooltip"
                                         :content="$t( 'pages.sign-up.content.form.tooltips.affiliation' )"
                                         v-tippy='{ placement : "top-start" }'>?
                                    </div>
                                </div>
                            </div>-->
                            <!--<div class="form__row">
                              <div class="input input--pr">
                                <textarea name="contact-details"
                                          :placeholder="$t( 'pages.sign-up.content.form.inputs.contact-details' )"
                                          required></textarea>
                                <div class="input__tooltip" :content="$t( 'pages.sign-up.content.form.tooltips.contact-details' )"
                                     v-tippy='{ placement : "top-start" }'>?
                                </div>
                              </div>
                            </div>-->
                            <div class="form__row">
                                <div class="input input--checkbox">
                                    <div class="checkbox">
                                        <input
                                            v-model="form.accept_tor"
                                            type="checkbox"
                                            id="terms-of-service"
                                            name="terms-of-service"
                                        />
                                        <img
                                            src="~/assets/img/ico-checkbox.svg"
                                        />
                                    </div>
                                    <label for="terms-of-service">{{
                                        $t(
                                            'pages.auth.registration.termsOfServiceCheckbox',
                                        )
                                    }}</label>
                                </div>
                            </div>
                            <div class="form__row form__row--separator"></div>
                            <div class="form__row flex justify-end mt-10">
                                <button
                                    type="submit"
                                    form="form--signin"
                                    class="btn btn--opacity--child"
                                >
                                    <span class="btn--opacity__target">{{
                                        $t(
                                            'pages.auth.registration.createAccountButton',
                                        )
                                    }}</span>
                                    <img
                                        src="~/assets/img/ico-button-arrow.svg"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    </article>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'create-account',
    auth: 'guest',
    data() {
        return {
            form: {
                username: null,
                email: null,
                password1: null,
                password2: null,
                first_name: null,
                last_name: null,
                affiliation: null,
                accept_tor: false,
            },
        };
    },
    computed: {
        ...mapState({
            error: (state) => state.authentication.error,
        }),
    },
    mounted() {
        this.$store.commit('authentication/clearError');
    },
    methods: {
        ...mapActions({
            signUp: 'authentication/signUp',
        }),
        submit(event) {
            event.preventDefault();
            this.signUp(this.form);
        },
        hasError(field) {
            return this.error && this.error[field];
        },
        getError(field) {
            return this.error[field][0];
        },
    },
};
</script>
