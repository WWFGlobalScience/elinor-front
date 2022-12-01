<template>
    <section class="page">
        <div class="container--md">
            <div class="grid-profile">
                <div class="avatar">
                    <div class="elinor__avatar elinor__avatar--xl bg-turqy"><span>X</span></div>
                </div>
                <div class="name">
                    <h1 class="c-title--lg uppercase mb-2"><strong>{{ $t('pages.profile.header.title') }}</strong></h1>
                    <p>{{ $t('pages.profile.header.subtitle') }}</p>
                </div>
                <div class="content">

                    <div v-if="alerts.profileUpdatedSuccessfully"
                         class="bg-green-100 mt-5 border border-green-400 text-white-700 px-4 py-3 rounded relative" role="alert">
                        <strong class="font-bold">{{ $t('pages.home.public.alerts.profileUpdatedSuccessfully.title') }}</strong>
                        <span class="block sm:inline">{{ $t('pages.home.public.alerts.profileUpdatedSuccessfully.subtitle') }}</span>
                    </div>
                    <form @submit="onSubmit" class="form">
                        <fieldset class="form__group px-0">
                            <legend class="form__legend w-full mb-4">
                                <div class="title-border">
                                    <h3 class="title">{{ $t('pages.profile.form.legend') }}</h3>
                                </div>
                            </legend>

                            <div class="form__row">
                                <div class="input">
                                    <label for="email" class="label">{{ $t('pages.profile.form.email') }}</label>
                                    <input type="text" id="email" :placeholder="$t('pages.profile.form.email')" v-model="form.email" required>
                                </div>
                            </div>



                            <div class="form__row">
                                <div class="input">
                                    <label for="username" class="label">{{ $t('pages.profile.form.username') }}*</label>
                                    <input type="text" id="username" :placeholder="$t('pages.profile.form.username')" v-model="form.username" required>
                                </div>
                            </div>

                            <div class="form__row">
                                <div class="input">
                                    <label for="password" class="label">{{ $t('pages.profile.form.password') }}</label>
                                    <input type="password" id="password" name="password" v-model="form.password">
                                </div>
                            </div>

                            <div class="form__row">
                                <div class="input">
                                    <label for="first_name" class="label">{{ $t('pages.profile.form.first_name') }}*</label>
                                    <input type="text" id="first_name" :placeholder="$t('pages.profile.form.first_name')" v-model="form.first_name" required>
                                </div>
                            </div>

                            <div class="form__row">
                                <div class="input">
                                    <label for="last_name" class="label">{{ $t('pages.profile.form.last_name') }}*</label>
                                    <input type="text" id="last_name" :placeholder="$t('pages.profile.form.last_name')" v-model="form.last_name" required>
                                </div>
                            </div>

                            <div class="row-btn justify-end">
                                <button type="submit" class="btn btn--opacity--child">
                                    <span class="btn--opacity__target">{{ $t('pages.profile.form.submit') }}</span>
                                    <img src="~/assets/img/ico-button-arrow.svg" alt=""/>
                                </button>
                            </div>
                        </fieldset>
                    </form>
                </div>

                <div v-if="false" class="content mt-20">
                    <div class="title-border">
                        <h3 class="title">{{ $t('pages.profile.delete.title') }}</h3>
                    </div>
                    <h4 class="c-title--base font-semibold mb-4">{{ $t('pages.profile.delete.subtitle') }}</h4>
                    <ul class="list-inside list-disc list-delete">
                        <li class="list-item">{{ $t('pages.profile.delete.list.1') }}</li>
                        <li class="list-item">{{ $t('pages.profile.delete.list.2') }}</li>
                        <li class="list-item">{{ $t('pages.profile.delete.list.3') }}</li>
                        <li class="list-item">{{ $t('pages.profile.delete.list.4') }}</li>
                    </ul>

                    <div class="row-btn">
                        <button
                            type="button"
                            class="btn btn--opacity--child"
                            @click="
                                popupState(
                                    {
                                        active: true,
                                        type:'xs',
                                        component: 'popup-delete-account',
                                        title: 'pages.profile.popup.title'
                                    }
                                )
                            ">
                            <span class="btn--opacity__target">{{ $t('pages.profile.delete.confirm.title') }}</span>
                            <img src="~/assets/img/ico-button-arrow.svg" alt=""/>
                        </button>
                        <p>
                            <strong class="c-text--warning c-text--base">{{ $t('pages.profile.delete.confirm.message.strong') }}</strong>
                            {{ $t('pages.profile.delete.confirm.message.text') }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import {mapActions, mapState} from "vuex";

    export default {
        data() {
            return {
                form: {
                    email: this.$auth.user.email,
                    password: null,
                    username: this.$auth.user.username,
                    first_name: this.$auth.user.first_name,
                    last_name: this.$auth.user.last_name
                }
            }
        },
        computed: {
            ...mapState({
                alerts: state => state.authentication.alerts
            })
        },
        methods: {
            ...mapActions({
                popupState: 'popup/popupState'
            }),
            onSubmit(event) {
                event.preventDefault();
                this.$store.dispatch('authentication/updateProfile', this.form);
            }
        }
    };
</script>


