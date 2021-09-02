<template>
    <article class="page page--create-account">
        <header class="header--page">
            <div class="container--sm">
                <h1 class="c-title--sm">{{ $t('pages.sign-up.content.header.title') }}</h1>
                <p v-html="$t( 'pages.sign-up.content.header.subtitle' )"></p>
            </div>
        </header>
        <section class="section--signin-form">
            <form id="form--signin" class="form form--signin" @submit="submit">
                <div class="container--sm">
                    <div class="form__group" v-if="error">
                        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                             role="alert">
                            <strong class="font-bold">Error</strong>
                            <span class="block sm:inline">Bad request</span>
                            <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 20 20"><title>Close</title><path
                    d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
              </span>
                        </div>
                    </div>
                    <div class="form__group">
                        <div class="form__row">
                            <div class="input">
                                <input v-model="form.email" type="email" name="email"
                                       :placeholder="$t( 'pages.sign-up.content.form.inputs.email' )" required>
                            </div>
                        </div>
                        <div class="form__row">
                            <div class="input">
                                <input v-model="form.password1" type="password" name="password1"
                                       :placeholder="$t( 'pages.sign-up.content.form.inputs.password1' )" required>
                            </div>
                        </div>
                        <div class="form__row">
                            <div class="input">
                                <input v-model="form.password2" type="password" name="password2"
                                       :placeholder="$t( 'pages.sign-up.content.form.inputs.password2' )" required>
                            </div>
                        </div>
                        <div class="form__row">
                            <div class="input">
                                <input v-model="form.first_name" type="text" name="first_name"
                                       :placeholder="$t( 'pages.sign-up.content.form.inputs.first_name' )" required>
                            </div>
                        </div>
                        <div class="form__row">
                            <div class="input">
                                <input v-model="form.last_name" type="text" name="last_name"
                                       :placeholder="$t( 'pages.sign-up.content.form.inputs.last_name' )" required>
                            </div>
                        </div>
                        <div class="form__row">
                            <div class="input">
                                <input v-model="form.username" type="text" name="username"
                                       :placeholder="$t( 'pages.sign-up.content.form.inputs.username' )" required>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container--full container--turqy-lighter mt-14">
                    <div class="container--sm py-14">
                        <div class="form__group">
                            <div class="form__row">
                                <div class="input input--pr input--multiselect">
                                    <div class="multiselect__wrap">
                                        <multiselect
                                            :placeholder="$t( 'pages.sign-up.content.form.inputs.affiliation' )" select-label="Enter doesn’t work here!"
                                            :value="form.affiliation"
                                            track-by="id"
                                            label="name"
                                            :options="organizations"
                                            :multiple="false" :searchable="true" :showLabels="false"
                                            :allow-empty="false" :hide-selected="true"
                                            @input="onOrganizationSelected"
                                            @search-change="fetchOrganizations">
                                            <span slot="noResult" slot-scope="props">{{ $t('default.noresults') }} ({{ props.search }}) <button @click="$event.preventDefault();$event.stopPropagation(); createOrganization(props.search)" role="button" class="btn btn--border-turqy">{{ $t('default.create') }}</button></span>
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
                            </div>
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
                                        <input v-model="form.accept_tor" type="checkbox" id="terms-of-service"
                                               name="terms-of-service" required>
                                        <img src="~/assets/img/ico-checkbox.svg">
                                    </div>
                                    <label for="terms-of-service">{{
                                            $t('pages.sign-up.content.form.inputs.terms-of-service')
                                        }}</label>
                                </div>
                            </div>
                            <div class="form__row form__row--separator"></div>
                            <div class="form__row flex justify-end mt-10">
                                <button type="submit" form="form--signin" class="btn btn--opacity--child">
                                    <span class="btn--opacity__target">{{
                                            $t('pages.sign-up.content.form.inputs.submit')
                                        }}</span>
                                    <img src="~/assets/img/ico-button-arrow.svg">
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
import {mapActions, mapState} from "vuex";

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
                affiliation: 1,
                accept_tor: false,
            }
        }
    },
    computed: {
        ...mapState({
            error: state => state.authentication.error,
            organizations: state => state.organizations.list
        })
    },
    methods: {
        ...mapActions({
            signUp: 'authentication/signUp',
            fetchOrganizations: 'organizations/fetchOrganizations',
            createOrganization: 'organizations/createOrganization'
        }),
        onOrganizationSelected(organization) {
           this.form.affiliation = organization.id;
        },
        submit(event) {
            event.preventDefault();
            this.signUp(this.form);
        }
    }
}
</script>
