<template>
    <article class="page page--flushed">
        <section class="section section--main">
            <img src="~/assets/img/contact-section.jpg" alt=""/>
        </section>
        <section class="p-8">
            <div class="container">
                <h1 class="c-title--main">{{ $t('pages.contact.header.title') }}</h1>
                <div class="g-grid--4-1-lg flex items-center">
                    <div class="g-colspan--3-full-lg">
                        <form v-if="sent === true" class="form">
                            <fieldset class="form__group px-0">
                                <legend class="form__legend mb-10">
                                    <strong>{{ $t('pages.contact.form.confirmation') }}</strong>
                                </legend>
                            </fieldset>
                        </form>
                        <form v-if="sent === false" class="form">
                            <fieldset class="form__group px-0">
                                <legend class="form__legend mb-10">
                                    <strong>{{ $t('pages.contact.form.legend.strong') }}</strong><br>
                                    {{ $t('pages.contact.form.legend.default') }}
                                </legend>

                                <div class="form__row">
                                    <div class="input">
                                        <label for="name" class="label">{{ $t('pages.contact.form.name') }}</label>
                                        <input type="text" id="name" :class="{'input--error': errors.name}" :placeholder="$t('pages.contact.form.namePlaceholder')" v-model="name">
                                        <template v-if="errors.name">
                                            <p class="msg msg--error" v-for="error in errors.name">
                                                {{ error }}
                                            </p>
                                        </template>
                                    </div>
                                </div>

                                <div class="form__row">
                                    <div class="input">
                                        <label for="subject" class="label">{{
                                                $t('pages.contact.form.subject')
                                            }}</label>
                                        <input type="text" id="subject" :class="{'input--error': errors.subject}" :placeholder="$t('pages.contact.form.subjectPlaceholder')" v-model="subject">
                                        <template v-if="errors.subject">
                                            <p class="msg msg--error" v-for="error in errors.subject">
                                                {{ error }}
                                            </p>
                                        </template>
                                    </div>
                                </div>

                                <div class="form__row">
                                    <div class="input">
                                        <label for="mail" class="label">{{ $t('pages.contact.form.mail') }}</label>
                                        <input type="mail" id="mail" :class="{'input--error': errors.email}" :placeholder="$t('pages.contact.form.mailPlaceholder')" v-model="email">
                                        <template v-if="errors.email">
                                            <p class="msg msg--error" v-for="error in errors.email">
                                                {{ error }}
                                            </p>
                                        </template>
                                    </div>
                                </div>

                                <div class="form__row">
                                    <div class="input">
                                        <label for="message" class="label">{{
                                                $t('pages.contact.form.message')
                                            }}</label>
                                        <textarea type="text" id="message" :class="{'input--error': errors.message}" :placeholder="$t('pages.contact.form.messagePlaceholder')"
                                                  rows="4" v-model="message"></textarea>
                                        <template v-if="errors.message">
                                            <p class="msg msg--error" v-for="error in errors.message">
                                                {{ error }}
                                            </p>
                                        </template>
                                    </div>
                                </div>

                                <div class="row-btn justify-end">
                                    <template v-if="errors.recaptcha">
                                        <p class="msg msg--error" v-for="error in errors.recaptcha">
                                            {{ error }}
                                        </p>
                                    </template>
                                    <button type="submit" class="btn btn--opacity--child" @click="onSubmit"  >
                                        <span class="btn--opacity__target">{{ $t('pages.contact.form.submit') }}</span>
                                        <img src="~/assets/img/ico-button-arrow.svg" alt=""/>
                                    </button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </article>
</template>
<script>
import {mapActions, mapState} from "vuex";

export default {
    name: "contact",
    auth: false,
    data() {
        return {
            name: null,
            subject: null,
            email: null,
            message: null
        }
    },
    async mounted() {
        try {
            await this.$recaptcha.init()
        } catch (e) {
            console.error(e);
        }
    },
    computed: {
        ...mapState({
            errors: state => state.contact.errors,
            sent: state => state.contact.sent
        })
    },
    methods: {
        ...mapActions({
            contact: 'contact/contact'
        }),
        async onSubmit(event) {
            event.preventDefault();
            try {
                const recaptcha = await this.$recaptcha.execute('contact_elinor_admins')
                await this.contact({name: this.name, subject: this.subject, email: this.email, message: this.message, recaptcha})
            } catch (error) {

            }
        }
    }
};
</script>
