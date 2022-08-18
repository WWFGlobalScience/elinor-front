<template>
    <div class="popup__content">
        <template v-if="!sent">

            <h4 class="c-title--modal mb-2">
                Fill this form to contact with the administrator
            </h4>
            <h5 class="c-title--modal mb-6" style="font-size: 1em; font-weight: normal">
                We will send a message to the administrator of this assessment
            </h5>
            <form @submit="onSubmit" class="form form--ma-selector form--mt-0">
                <div class="form__group">
                    <div class="form__row">
                        <div class="input">
                            <input type="text" value="" placeholder="Your name" v-model="form.name">
                            <template v-if="errors.name">
                                <p class="msg msg--error" v-for="error in errors.name">
                                    {{ error }}
                                </p>
                            </template>
                        </div>
                    </div>
                    <div class="form__row">
                        <div class="input">
                            <input type="text" value="" placeholder="Subject" v-model="form.subject">
                            <template v-if="errors.subject">
                                <p class="msg msg--error" v-for="error in errors.subject">
                                    {{ error }}
                                </p>
                            </template>
                        </div>
                    </div>
                    <div class="form__row">
                        <div class="input">
                            <input type="text" value="" placeholder="Your Email" v-model="form.email">
                            <template v-if="errors.email">
                                <p class="msg msg--error" v-for="error in errors.email">
                                    {{ error }}
                                </p>
                            </template>
                        </div>
                    </div>
                    <div class="form__row">
                        <div class="input">
                            <label class="label">Message</label>
                            <textarea v-model="form.message"></textarea>
                            <template v-if="errors.message">
                                <p class="msg msg--error" v-for="error in errors.message">
                                    {{ error }}
                                </p>
                            </template>
                        </div>
                    </div>
                </div>
            </form>
        </template>
        <template v-if="sent">
            <h4 class="c-title--modal mb-2">
                Thank you for the contact!
            </h4>
        </template>
        <section class="mt-10">
            <button type="button" @click="close" class="btn--border-turqy btn--opacity--child mr-5" style="float: left">
                <span class="btn--opacity__target">Close</span>
            </button>
            <button v-if="!sent" @click="onSubmit" class="btn--border-turqy btn--opacity--child"  style="float: left">
                <span class="btn--opacity__target">Submit</span>
            </button>
            <template v-if="errors.recaptcha">
                <p class="msg msg--error" v-for="error in errors.recaptcha">
                    {{ error }}
                </p>
            </template>
            <div style="clear: both"></div>
        </section>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: 'popup-assessment-contact',
    data() {
        return {
            form: {
                name: null,
                subject: null,
                email: null,
                message: null,
            }
        }
    },
    computed: {
        ...mapState({
            popup: state => state.popup.popup,
            assessment: state => state.assessments.assessment,
            errors: state => state.assessments.contact.errors,
            sent: state => state.assessments.contact.sent,
        })
    },
    async mounted() {
        try {
            await this.$recaptcha.init()
        } catch (e) {
            console.error(e);
        }
    },
    methods: {
        ...mapActions({
            popupState: 'popup/popupState',
            contactAssessmentAdmin: 'assessments/contactAssessmentAdmin'
        }),
        close() {
            this.popupState( { active: false });
            this.$store.commit('assessments/setContactErrors', {});
            this.$store.commit('assessments/setContactSent', false);
        },
        async onSubmit(event) {
            event.preventDefault();
            try {
                const recaptcha = await this.$recaptcha.execute('contact_elinor_admins')
                await this.contactAssessmentAdmin({assessmentId: this.assessment.id, ...this.form, recaptcha});
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>
