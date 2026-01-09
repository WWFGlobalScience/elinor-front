<template>
  <div class="popup__content popup__content--form">
    <template v-if="!sent">
      <div class="text-subtitle mb-6">
        {{ $t('pages.assessments.actions.contact.text') }}
      </div>
      <form @submit="onSubmit" class="form form--ma-selector form--mt-0">
        <div class="form__group">
          <div class="form__row">
            <div class="input">
              <label class="label">{{
                $t('pages.assessments.actions.contact.namePlaceholder')
              }}</label>
              <input
                type="text"
                value=""
                :placeholder="`Type here`"
                v-model="form.name"
              />
              <template v-if="errors.name">
                <p class="msg msg--error" v-for="error in errors.name">
                  {{ error }}
                </p>
              </template>
            </div>
          </div>
          <div class="form__row">
            <div class="input">
              <label class="label">{{
                $t('pages.assessments.actions.contact.subjectPlaceholder')
              }}</label>
              <input
                type="text"
                value=""
                :placeholder="`Type here`"
                v-model="form.subject"
              />
              <template v-if="errors.subject">
                <p class="msg msg--error" v-for="error in errors.subject">
                  {{ error }}
                </p>
              </template>
            </div>
          </div>
          <div class="form__row">
            <div class="input">
              <label class="label">{{
                $t('pages.assessments.actions.contact.emailPlaceholder')
              }}</label>
              <input
                type="text"
                value=""
                :placeholder="`Type here`"
                v-model="form.email"
              />
              <template v-if="errors.email">
                <p class="msg msg--error" v-for="error in errors.email">
                  {{ error }}
                </p>
              </template>
            </div>
          </div>
          <div class="form__row">
            <div class="input">
              <label class="label">{{
                $t('pages.assessments.actions.contact.labelTextarea')
              }}</label>
              <textarea
                class="!h-[100px]"
                v-model="form.message"
                :placeholder="`Type here`"
              ></textarea>
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
        {{ $t('pages.assessments.actions.contact.okMessage') }}
      </h4>
    </template>
    <section class="btn-row">
      <!-- <button
                type="button"
                @click="close"
                class="btn--border-turqy btn--opacity--child"
            >
                <span class="btn--opacity__target">{{
                    $t('default.close')
                }}</span>
            </button> -->
      <button
        v-if="!sent"
        @click="onSubmit"
        :disabled="!isFormValid"
        class="btn btn--md btn--new-sm"
        :class="{ 'btn--disabled': !isFormValid }"
      >
        <span class="btn--opacity__target">{{ $t('default.submit') }}</span>
      </button>
    </section>
    <template v-if="errors.recaptcha">
      <p class="msg msg--error" v-for="error in errors.recaptcha">
        {{ error }}
      </p>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'popup-assessment-contact',
  data() {
    return {
      form: {
        name: null,
        subject: null,
        email: null,
        message: null,
      },
    };
  },
  computed: {
    ...mapState({
      popup: (state) => state.popup.popup,
      assessment: (state) => state.assessments.assessment,
      errors: (state) => state.assessments.contact.errors,
      sent: (state) => state.assessments.contact.sent,
    }),
    isFormValid() {
      return (
        this.form.name &&
        this.form.name.trim() !== '' &&
        this.form.subject &&
        this.form.subject.trim() !== '' &&
        this.form.email &&
        this.form.email.trim() !== '' &&
        this.form.message &&
        this.form.message.trim() !== ''
      );
    },
  },
  async mounted() {
    // Clear any existing errors when popup is opened
    this.$store.commit('assessments/setContactErrors', {});
    this.$store.commit('assessments/setContactSent', false);

    try {
      await this.$recaptcha.init();
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    ...mapActions({
      popupState: 'popup/popupState',
      contactAssessmentAdmin: 'assessments/contactAssessmentAdmin',
    }),
    close() {
      this.popupState({ active: false });
      this.$store.commit('assessments/setContactErrors', {});
      this.$store.commit('assessments/setContactSent', false);
      // Clear form data
      this.form = {
        name: null,
        subject: null,
        email: null,
        message: null,
      };
    },
    async onSubmit(event) {
      event.preventDefault();
      try {
        const recaptcha = await this.$recaptcha.execute(
          'contact_elinor_admins',
        );
        await this.contactAssessmentAdmin({
          assessmentId: this.assessment.id,
          ...this.form,
          recaptcha,
        });
      } catch (error) {
        // console.log(error);
      }
    },
  },
};
</script>
