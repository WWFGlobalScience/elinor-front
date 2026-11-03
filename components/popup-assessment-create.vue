<template>
  <div class="popup__content popup--assessment-create">
    <form
      id="form--assessment-create"
      class="form form--assessment-create form--mt-0"
      @submit="submit"
    >
      <div class="form__group">
        <div class="form__row">
          <div class="input input--multiselect input--1-4">
            <label class="label"
              >{{
                $t('pages.assessments.list.create.popup.labels.year')
              }}*</label
            >
            <div class="multiselect__wrap">
              <multiselect
                :placeholder="$t('pages.assessments.list.create.popup.labels.year')"
                :value="selectYear.value"
                :options="selectYear.options"
                :multiple="false"
                :searchable="true"
                :showLabels="false"
                :allow-empty="false"
                open-direction="bottom"
                :hide-selected="false"
                @input="onSelectYearChange"
              >
                <span slot="noResult">{{ $t('default.noresults') }}</span>
              </multiselect>
              <div class="multiselect__caret">
                <img src="~/assets/img/ico-select-turqy.svg" />
              </div>
            </div>
            <input
              type="number"
              name="year"
              :value="selectYear.value"
              style="display: none"
            />
          </div>
        </div>
        <div class="form__row">
          <div class="input">
            <label class="label"
              >{{
                $t('pages.assessments.list.create.popup.labels.name')
              }}*</label
            >
            <div class="note">
              {{ $t('pages.assessments.list.create.popup.nameCriteria') }}
            </div>
            <input
              type="text"
              name="name"
              :placeholder="
                $t('pages.assessments.list.create.popup.placeholders.name')
              "
              v-model="form.name"
              :minlength="minNameLength"
              :class="{ 'input--error': showNameError }"
              required
            />
            <div class="flex justify-between items-center gap-3">
              <div
                class="note mb-0"
                :class="{ 'text-[#D63C3C]': showNameError }"
              >
                {{
                  $t(
                    'pages.assessments.list.create.popup.nameMinLength',
                    { min: minNameLength },
                  )
                }}
              </div>
              <div
                class="character-counter mt-0"
                :class="{ 'is-invalid': showNameError }"
              >
                {{ nameLength }} / {{ minNameLength }}
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="form__row -mt-3">
                    <div class="input">
                        <div class="legend">
                            {{
                                $t(
                                    'pages.assessments.list.create.popup.nameCriteria',
                                )
                            }}
                        </div>
                    </div>
                </div> -->
        <!-- <div
                    class="form__row form__row--separator form__row--separator--20"
                ></div> -->
        <div class="form__row flex justify-start mt-6">
          <button
            type="submit"
            form="form--assessment-create"
            class="btn btn--md btn--new-sm"
            :class="{ 'btn--disabled': !isFormValid }"
            :disabled="!isFormValid"
          >
            <span class="btn--opacity__target">{{
              $t('pages.assessments.list.create.popup.submit')
            }}</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { mapActions } from 'vuex';
export default {
  name: 'popup-assessment-create',
  data() {
    return {
      selectYear: {
        tocuhed: false,
        value: null,
        options: [new Date().getFullYear() - 1, new Date().getFullYear()],
      },
      form: {
        name: null,
      },
      minNameLength: 20,
    };
  },
  methods: {
    ...mapActions({
      createAssessment: 'assessments/createAssessment',
    }),
    onSelectYearChange(value) {
      this.selectYear.value = value;
    },
    submit(event) {
      event.preventDefault();
      if (!this.isFormValid) return;
      this.createAssessment(event.target);
    },
  },
  computed: {
    nameLength() {
      return (this.form.name || '').length;
    },
    isNameValid() {
      return this.nameLength >= this.minNameLength;
    },
    showNameError() {
      return this.nameLength > 0 && !this.isNameValid;
    },
    isFormValid() {
      if (this.selectYear.value === false || this.selectYear.value === null) {
        return false;
      }

      return this.isNameValid;
    },
  },
};
</script>
