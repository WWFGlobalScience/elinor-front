<template>
  <div class="popup__content">
    <template v-if="!sent">
      <div class="text-subtitle mb-6">
        {{ $t('pages.assessments.actions.flag.text') }}
      </div>
      <form @submit="onSubmit" class="form form--ma-selector form--mt-0">
        <div class="form__group">
          <div class="form__row">
            <div class="input input--multiselect input--1-4">
              <label class="label block">{{
                $t('pages.assessments.actions.flag.placeholder')
              }}</label>
              <div class="multiselect__wrap">
                <multiselect
                  :placeholder="
                    $t('pages.assessments.actions.flag.placeholder')
                  "
                  track-by="id"
                  label="name"
                  :options="flagTypes"
                  :multiple="false"
                  :searchable="false"
                  :showLabels="false"
                  :allow-empty="false"
                  open-direction="bottom"
                  :hide-selected="false"
                  @input="onFlagTypeChange($event)"
                  :value="getFlagTypeOption(form.flag_type)"
                >
                </multiselect>
                <div class="multiselect__caret">
                  <img src="~/assets/img/ico-select-turqy.svg" />
                </div>
              </div>
            </div>
          </div>
          <div class="form__row" v-if="form.flag_type === null">
            <div class="input">
              <input
                type="text"
                value=""
                placeholder="Other flag type"
                v-model="form.flag_type_other"
              />
              <template v-if="errors.flag_type_other">
                <p
                  class="msg msg--error"
                  v-for="error in errors.flag_type_other"
                >
                  {{ error }}
                </p>
              </template>
            </div>
          </div>
          <div class="form__row">
            <div class="input">
              <label class="label">{{
                $t('pages.assessments.actions.flag.labelTextarea')
              }}</label>
              <textarea
                v-model="form.explanation"
                class="!h-[155px]"
              ></textarea>
              <template v-if="errors.explanation">
                <p class="msg msg--error" v-for="error in errors.explanation">
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
        {{ $t('pages.assessments.actions.flag.okMessage') }}
      </h4>
    </template>
    <section class="mt-10">
      <!-- <button
                type="button"
                @click="close"
                class="btn--border-turqy btn--opacity--child mr-5"
                style="float: left"
            >
                <span class="btn--opacity__target">{{
                    $t('default.close')
                }}</span>
            </button> -->
      <button
        v-if="!sent"
        @click="onSubmit"
        class="btn btn--md btn--new-sm"
        :class="{ 'btn--disabled': !isFormValid }"
        :disabled="!isFormValid"
        style="float: left"
      >
        <span class="btn--opacity__target">{{ $t('default.submit') }}</span>
      </button>
      <div style="clear: both"></div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'popup-assessment-contact',
  data() {
    return {
      flagTypes: [
        {
          id: 'inappropriate',
          name: this.$t('pages.assessments.actions.flag.types.inappropriate'),
        },
        {
          id: 'personal',
          name: this.$t('pages.assessments.actions.flag.types.personal'),
        },
        {
          id: 'inaccurate',
          name: this.$t('pages.assessments.actions.flag.types.inaccurate'),
        },
        {
          id: null,
          name: this.$t('pages.assessments.actions.flag.types.other'),
        },
      ],
      form: {
        flag_type: false,
        flag_type_other: null,
        explanation: null,
      },
    };
  },
  computed: {
    ...mapState({
      popup: (state) => state.popup.popup,
      assessment: (state) => state.assessments.assessment,
      errors: (state) => state.assessments.flag.errors,
      sent: (state) => state.assessments.flag.sent,
    }),
    isFormValid() {
      // Check if flag_type is selected
      if (this.form.flag_type === false || this.form.flag_type === null) {
        return false;
      }

      // If flag_type is null (other), check if flag_type_other is filled
      if (
        this.form.flag_type === null &&
        (!this.form.flag_type_other || this.form.flag_type_other.trim() === '')
      ) {
        return false;
      }

      // Check if explanation is filled
      if (!this.form.explanation || this.form.explanation.trim() === '') {
        return false;
      }

      return true;
    },
  },
  methods: {
    ...mapActions({
      popupState: 'popup/popupState',
      flagAssessment: 'assessments/flagAssessment',
    }),
    close() {
      this.popupState({ active: false });
      this.$store.commit('assessments/setFlagErrors', {});
      this.$store.commit('assessments/setFlagSent', false);
    },
    async onSubmit(event) {
      event.preventDefault();
      const data = { ...this.form };
      Object.keys(data).forEach((key) => {
        if (data[key] === null) data[key] = undefined;
      });
      await this.flagAssessment({
        assessmentId: this.assessment.id,
        reporter: this.$auth.user.id,
        ...data,
      });
    },
    onFlagTypeChange(flagType) {
      this.form.flag_type = flagType.id;
      if (flagType.id !== null) {
        this.form.flag_type_other = null;
      }
    },
    getFlagTypeOption(id) {
      const filtered = this.flagTypes.filter((flagType) => flagType.id === id);
      if (filtered.length) {
        return filtered[0];
      }
      return null;
    },
  },
};
</script>
