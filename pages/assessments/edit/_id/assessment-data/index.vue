<template>
  <section class="section section--assessment-edit-data">
    <!-- Mobile-only desktop access popup -->
    <!-- <transition name="elinor-fade">
      <div v-if="showMobilePopup" class="elinor__popup mobile-desktop-popup">
        <div class="popup__overlay" @click="closeMobilePopup"></div>
        <div class="popup__box popup__box--min">
          <header class="popup__header">
            <h3 class="text-turqy">Editing limited to desktop access</h3>
            <button
              type="button"
              class="btn--opacity"
              @click="closeMobilePopup"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <mask
                  id="mask0_mobile_popup"
                  style="mask-type: alpha"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="32"
                  height="32"
                >
                  <rect width="32" height="32" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_mobile_popup)">
                  <path
                    d="M8.53268 25.3333L6.66602 23.4666L14.1327 16L6.66602 8.53329L8.53268 6.66663L15.9993 14.1333L23.466 6.66663L25.3327 8.53329L17.866 16L25.3327 23.4666L23.466 25.3333L15.9993 17.8666L8.53268 25.3333Z"
                    fill="#43A0BD"
                  />
                </g>
              </svg>
            </button>
          </header>
          <div class="popup__content">
            <p>
              This feature is optimized for desktop use. You may view your form
              on mobile, but editing requires logging in from a desktop device.
            </p>
          </div>
        </div>
      </div>
    </transition> -->

    <div class="container flex justify-between">
      <form
        class="form form--assessment-data"
        id="formAssessmentData"
        ref="editAssessment"
        @submit="submit"
      >
        <div class="form__group">
          <div class="form__row">
            <div class="input input--multiselect">
              <label class="label"
                >{{
                  $t('pages.assessments.edit.tabs.data.labels.year')
                }}*</label
              >
              <div class="multiselect__wrap year-select">
                <multiselect
                  :value="assessment.year"
                  :options="years"
                  :multiple="false"
                  :searchable="true"
                  :showLabels="false"
                  :allow-empty="false"
                  open-direction="bottom"
                  :hide-selected="false"
                  @input="save('year', $event)"
                >
                  <span slot="noResult">{{ $t('default.noresults') }}</span>
                </multiselect>
                <div class="multiselect__caret">
                  <img src="~/assets/img/ico-select-turqy.svg" />
                </div>
              </div>
              <input
                type="hidden"
                name="year"
                class="input__dummy"
                :value="assessment.year"
              />
            </div>
          </div>
          <div class="form__row">
            <div class="input">
              <label class="label"
                >{{
                  $t('pages.assessments.edit.tabs.data.labels.name')
                }}*</label
              >
              <input
                type="text"
                name="name"
                :value="assessment.name"
                @change="save('name', $event.target.value)"
              />
            </div>
          </div>
          <div class="form__row">
            <div class="input input--multiselect">
              <label class="label"
                >{{
                  $t('pages.assessments.edit.tabs.data.labels.organization')
                }}*
              </label>
              <div class="multiselect__wrap">
                <multiselect
                  :value="assessment.organization"
                  track-by="id"
                  label="name"
                  :options="organizations"
                  :multiple="false"
                  :searchable="true"
                  :showLabels="false"
                  :allow-empty="false"
                  open-direction="bottom"
                  :hide-selected="true"
                  @input="onOrganizationSelected"
                  @search-change="fetchOrganizations"
                >
                  <span
                    slot="noResult"
                    slot-scope="props"
                    class="text-xxs text-grayy-lighter"
                    >{{ $t('default.noresults') }} ({{ props.search }})
                    <hr class="my-4" />
                    <button
                      @click="
                        $event.preventDefault();
                        $event.stopPropagation();
                        createOrganization(props.search);
                      "
                      role="button"
                      class="btn btn--sm btn--border-turqy mt-2"
                    >
                      {{ $t('default.create') }}
                    </button>
                  </span>
                </multiselect>
                <div class="multiselect__caret">
                  <img src="~/assets/img/ico-select-turqy.svg" />
                </div>
              </div>
            </div>
          </div>
          <div class="form__row">
            <div class="input input--multiselect">
              <label class="label"
                >{{
                  $t(
                    'pages.assessments.edit.tabs.data.labels.personResponsibleRole',
                  )
                }}*
              </label>
              <div class="multiselect__wrap">
                <multiselect
                  :value="person_responsible_role"
                  :options="roles"
                  label="name"
                  track-by="id"
                  :multiple="false"
                  :searchable="false"
                  :showLabels="false"
                  :allow-empty="false"
                  open-direction="bottom"
                  :hide-selected="false"
                  @input="save('person_responsible_role', $event.id)"
                >
                  <template slot="singleLabel" slot-scope="{ option }">{{
                    option.name
                  }}</template>
                  <span slot="noResult">{{ $t('default.noresults') }}</span>
                </multiselect>
                <div class="multiselect__caret">
                  <img src="~/assets/img/ico-select-turqy.svg" />
                </div>
              </div>
              <input
                type="hidden"
                name="person_responsible_role"
                class="input__dummy"
                :value="assessment.person_responsible_role"
              />
            </div>
          </div>
          <div class="form__row">
            <div class="input input--multiselect">
              <label class="label"
                >{{
                  $t(
                    'pages.assessments.edit.tabs.data.labels.collectionMethods',
                  )
                }}*</label
              >
              <div class="multiselect__wrap">
                <multiselect
                  :value="collection_method"
                  :options="collection_methods"
                  label="name"
                  track-by="id"
                  :multiple="false"
                  :searchable="false"
                  :showLabels="false"
                  :allow-empty="false"
                  open-direction="bottom"
                  :hide-selected="false"
                  @input="
                    //save('collection_method', $event.id);
                    onCollectionMethodChanged($event)
                  "
                >
                  <template slot="singleLabel" slot-scope="{ option }">{{
                    option.name
                  }}</template>
                  <span slot="noResult">{{ $t('default.noresults') }}</span>
                </multiselect>
                <div class="multiselect__caret">
                  <img src="~/assets/img/ico-select-turqy.svg" />
                </div>
              </div>
              <input
                type="hidden"
                name="person_responsible_role"
                class="input__dummy"
                :value="assessment.collection_method"
              />
            </div>
          </div>
          <div class="form__row">
            <div class="input input--pr">
              <div class="label">
                {{
                  $t(
                    'pages.assessments.edit.tabs.data.labels.collectionMethodsText',
                  )
                }}*
              </div>
              <textarea
                name="collection_method_text"
                placeholder=""
                @change="save('collection_method_text', $event.target.value)"
                >{{ assessment.collection_method_text }}</textarea
              >
            </div>
          </div>
          <div
            class="flex flex-col gap-4"
            v-if="assessment.collection_method === 30"
          >
            <div class="form__row">
              <div class="input">
                <label class="label">{{
                  $t('pages.assessments.edit.tabs.data.people.title')
                }}</label>
                <div class="notes">
                  {{ $t('pages.assessments.edit.tabs.data.people.notes') }}
                </div>
              </div>
            </div>
            <div class="form__row__number-counter">
              <div class="input input--number-counter">
                <div class="number-counter__wrap">
                  <input
                    type="hidden"
                    name="count_community"
                    class="input__dummy"
                    :value="assessment.count_community"
                  />
                  <number-counter
                    :value="assessment.count_community"
                    :min="0"
                    :max="10"
                    :step="1"
                    @input="save('count_community', $event)"
                  />
                </div>
                <label class="label">{{
                  $t('pages.assessments.edit.tabs.data.people.community')
                }}</label>
              </div>

              <div class="input input--number-counter">
                <div class="number-counter__wrap">
                  <input
                    type="hidden"
                    name="count_ngo"
                    class="input__dummy"
                    :value="assessment.count_ngo"
                  />
                  <number-counter
                    :value="assessment.count_ngo"
                    :min="0"
                    :max="10"
                    :step="1"
                    @input="save('count_ngo', $event)"
                  />
                </div>
                <label class="label">{{
                  $t('pages.assessments.edit.tabs.data.people.ngo')
                }}</label>
              </div>
              <div class="input input--number-counter">
                <div class="number-counter__wrap">
                  <input
                    type="hidden"
                    name="count_academic"
                    class="input__dummy"
                    :value="assessment.count_academic"
                  />
                  <number-counter
                    :value="assessment.count_academic"
                    :min="0"
                    :max="10"
                    :step="1"
                    @input="save('count_academic', $event)"
                  />
                </div>
                <label class="label">{{
                  $t('pages.assessments.edit.tabs.data.people.academic')
                }}</label>
              </div>
              <div class="input input--number-counter">
                <div class="number-counter__wrap">
                  <input
                    type="hidden"
                    name="count_government"
                    class="input__dummy"
                    :value="assessment.count_government"
                  />
                  <number-counter
                    :value="assessment.count_government"
                    :min="0"
                    :max="10"
                    :step="1"
                    @input="save('count_government', $event)"
                  />
                </div>
                <label class="label">{{
                  $t('pages.assessments.edit.tabs.data.people.government')
                }}</label>
              </div>
              <div class="input input--number-counter">
                <div class="number-counter__wrap">
                  <input
                    type="hidden"
                    name="count_indigenous"
                    class="input__dummy"
                    :value="assessment.count_indigenous"
                  />
                  <number-counter
                    :value="assessment.count_indigenous"
                    :min="0"
                    :max="10"
                    :step="1"
                    @input="save('count_indigenous', $event)"
                  />
                </div>
                <label class="label">{{
                  $t('pages.assessments.edit.tabs.data.people.indigenous')
                }}</label>
              </div>
              <div class="input input--number-counter">
                <div class="number-counter__wrap">
                  <input
                    type="hidden"
                    name="count_private"
                    class="input__dummy"
                    :value="assessment.count_private"
                  />
                  <number-counter
                    :value="assessment.count_private"
                    :min="0"
                    :max="10"
                    :step="1"
                    @input="save('count_private', $event)"
                  />
                </div>
                <label class="label">{{
                  $t('pages.assessments.edit.tabs.data.people.private')
                }}</label>
              </div>
            </div>
          </div>
          <div
            class="flex flex-col gap-4"
            v-if="assessment.collection_method === 30"
          >
            <div class="form__row">
              <div class="input">
                <label class="label"
                  >{{
                    $t('pages.assessments.edit.tabs.data.gender.title')
                  }}*</label
                >
                <div class="notes">
                  {{ $t('pages.assessments.edit.tabs.data.people.notes') }}
                </div>
              </div>
            </div>
            <div class="form__row__number-counter">
              <div class="input input--number-counter">
                <div class="number-counter__wrap">
                  <input
                    type="hidden"
                    name="count_gender_female"
                    class="input__dummy"
                    :value="assessment.count_gender_female"
                  />
                  <number-counter
                    :value="assessment.count_gender_female"
                    :min="0"
                    :max="10"
                    :step="1"
                    @input="save('count_gender_female', $event)"
                  />
                </div>
                <label class="label">{{
                  $t('pages.assessments.edit.tabs.data.gender.female')
                }}</label>
              </div>
              <div class="input input--number-counter">
                <div class="number-counter__wrap">
                  <input
                    type="hidden"
                    name="count_gender_male"
                    class="input__dummy"
                    :value="assessment.count_gender_male"
                  />
                  <number-counter
                    :value="assessment.count_gender_male"
                    :min="0"
                    :max="10"
                    :step="1"
                    @input="save('count_gender_male', $event)"
                  />
                </div>
                <label class="label">{{
                  $t('pages.assessments.edit.tabs.data.gender.male')
                }}</label>
              </div>
              <div class="input input--number-counter">
                <div class="number-counter__wrap">
                  <input
                    type="hidden"
                    name="count_gender_nonbinary"
                    class="input__dummy"
                    :value="assessment.count_gender_nonbinary"
                  />
                  <number-counter
                    :value="assessment.count_gender_nonbinary"
                    :min="0"
                    :max="10"
                    :step="1"
                    @input="save('count_gender_nonbinary', $event)"
                  />
                </div>
                <label class="label">{{
                  $t('pages.assessments.edit.tabs.data.gender.nonBinary')
                }}</label>
              </div>
              <div class="input input--number-counter">
                <div class="number-counter__wrap">
                  <input
                    type="hidden"
                    name="count_gender_prefer_not_say"
                    class="input__dummy"
                    :value="assessment.count_gender_prefer_not_say"
                  />
                  <number-counter
                    :value="assessment.count_gender_prefer_not_say"
                    :min="0"
                    :max="10"
                    :step="1"
                    @input="save('count_gender_prefer_not_say', $event)"
                  />
                </div>
                <label class="label">{{
                  $t('pages.assessments.edit.tabs.data.gender.preferNotToSay')
                }}</label>
              </div>
            </div>
          </div>
          <div class="form__row">
            <div class="input input--radios">
              <label class="label"
                >{{
                  $t('pages.assessments.edit.tabs.data.labels.consentGiven')
                }}*</label
              >
              <div class="radios__wrap">
                <label class="custom-radio">
                  <input
                    type="radio"
                    name="consent_given"
                    id="consentGiven-yes"
                    @change="save('consent_given', true)"
                    :checked="assessment.consent_given"
                  />
                  <span class="custom-radio__label">{{
                    $t('default.yes')
                  }}</span>
                </label>
                <label class="custom-radio">
                  <input
                    type="radio"
                    name="consent_given"
                    id="consentGiven-no"
                    @change="save('consent_given', false)"
                    :checked="!assessment.consent_given"
                  />
                  <span class="custom-radio__label">{{
                    $t('default.no')
                  }}</span>
                </label>
              </div>
            </div>
          </div>
          <div class="form__row">
            <div class="input input--radios">
              <label class="label"
                >{{
                  $t(
                    'pages.assessments.edit.tabs.data.labels.consentGivenWritten',
                  )
                }}*</label
              >
              <div class="radios__wrap">
                <label class="custom-radio">
                  <input
                    type="radio"
                    name="consent_given_written"
                    id="consentGivenWritten-yes"
                    @change="save('consent_given_written', true)"
                    :checked="assessment.consent_given_written"
                  />
                  <span class="custom-radio__label">{{
                    $t('default.yes')
                  }}</span>
                </label>
                <label class="custom-radio">
                  <input
                    type="radio"
                    name="consent_given_written"
                    id="consentGivenWritten-no"
                    @change="save('consent_given_written', false)"
                    :checked="assessment.consent_given_written"
                  />
                  <span class="custom-radio__label">{{
                    $t('default.no')
                  }}</span>
                </label>
              </div>
            </div>
          </div>
          <div class="form__row">
            <div class="input input--file">
              <label class="label">{{
                $t(
                  'pages.assessments.edit.tabs.data.labels.managementPlan.title',
                )
              }}</label>
              <div class="notes">
                {{ $t('pages.assessments.edit.tabs.data.dropzone.notes') }}
              </div>
              <div v-if="assessment" class="file">
                <dropzone
                  id="management_plan"
                  ref="managementPlan"
                  :options="dropzone"
                  :useStyling="false"
                  :destroyDropzone="true"
                  :useCustomSlot="true"
                  @vdropzone-file-added="onManagementPlanAdded"
                >
                  <div class="file__drag">
                    <img src="~/assets/img/upload.svg" />
                    <div>
                      <span v-if="!assessment.management_plan_file">{{
                        $t(
                          'pages.assessments.edit.tabs.data.dropzone.placeholder',
                        )
                      }}</span>
                      <span v-else
                        ><a
                          @click.stop
                          :href="assessment.management_plan_file"
                          target="_blank"
                          >{{ assessment.management_plan_file }}</a
                        ></span
                      >
                    </div>
                  </div>
                </dropzone>
              </div>
            </div>
          </div>
          <div class="section__bottom">
            <NuxtLink
              @click.prevent
              :to="`/assessments/edit/${id}/managed-area`"
              class="btn btn--md"
            >
              <span class="btn--opacity__target">Next: Managed Area</span>
              <img
                src="~/assets/img/arrow_right_alt.svg"
                :alt="$t('pages.assessments.edit.tabs.nextStep')"
              />
            </NuxtLink>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Dropzone from 'nuxt-dropzone';

export default {
  name: 'assessment-edit-data',
  layout: 'assessment-edit',
  components: {
    Dropzone,
  },
  data() {
    return {
      id: this.$route.params.id,
      showMobilePopup: false,
      years: [new Date().getFullYear() - 1, new Date().getFullYear()],
      roles: [
        {
          id: 10,
          name: this.$t('pages.assessments.personResponsibleRoles.10'),
        },
        {
          id: 20,
          name: this.$t('pages.assessments.personResponsibleRoles.20'),
        },
        {
          id: 30,
          name: this.$t('pages.assessments.personResponsibleRoles.30'),
        },
        {
          id: 40,
          name: this.$t('pages.assessments.personResponsibleRoles.40'),
        },
        {
          id: 50,
          name: this.$t('pages.assessments.personResponsibleRoles.50'),
        },
        {
          id: 60,
          name: this.$t('pages.assessments.personResponsibleRoles.60'),
        },
      ],
      collection_methods: [
        {
          id: 10,
          name: this.$t('pages.assessments.collectionMethods.10'),
        },
        {
          id: 30,
          name: this.$t('pages.assessments.collectionMethods.30'),
        },
      ],
      counts: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      dropzone: {
        url: 'none',
        previewTemplate: this.template(),
        uploadMultiple: false,
        acceptedFiles: '.pdf',
        autoQueue: false,
      },
    };
  },
  mounted() {
    this.$store.dispatch('assessments/fetchAssessment', this.id);
    this.$store.dispatch('organizations/fetchOrganizations', '');
    // console.log(this.assessment);
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
    /*if(this.assessment && this.assessment.management_plan_file) {
            console.log('mounted')
            const path = this.assessment.management_plan_file.split('/');
            const name = path[path.length - 1];
            const url = this.assessment.management_plan_file;
            const file = { name, type: 'application/pdf', size: 12345 };
            console.log(file);
            this.$refs.managementPlan.removeAllFiles();
            this.$refs.managementPlan.manuallyAddFile(file, url);
        }*/
  },
  computed: {
    assessment() {
      return this.$store.state.assessments.assessment;
    },
    person_responsible_role() {
      return this.roles.filter(
        (role) => role.id === this.assessment.person_responsible_role,
      );
    },
    collection_method() {
      return this.collection_methods.filter(
        (collectionMethod) =>
          collectionMethod.id === this.assessment.collection_method,
      );
    },
    managementPlanFile() {
      if (this.assessment.management_plan_file) {
        const path = this.assessment.management_plan_file.split('/');
        return path[path.length - 1];
      }
    },
    ...mapState({
      organizations: (state) => state.organizations.list,
    }),
  },
  methods: {
    ...mapActions({
      editAssessment: 'assessments/editAssessment',
      editAssessmentField: 'assessments/editAssessmentField',
      editAssessmentFields: 'assessments/editAssessmentFields',
      updateAssessmentProgress: 'assessments/updateAssessmentProgress',
      editAssessmentFileField: 'assessments/editAssessmentFileField',
      fetchOrganizations: 'organizations/fetchOrganizations',
      createOrganization: 'organizations/createOrganization',
    }),
    managementUploadTrigger() {
      this.$refs.managementPlan.$el.click();
    },
    async clearManagementPlan() {
      this.$refs.managementPlan.removeAllFiles();
      await this.editAssessmentField({
        field: 'management_plan_file',
        value: null,
        id: this.id,
      });
      this.$refs.managementPlan.$el.childNodes[0].childNodes[0].childNodes[1].innerHTML =
        '<span>' + this.$t('default.upload-file.placeholder') + '</span>';
    },
    save(field, value) {
      this.editAssessmentField({ field, value, id: this.id });
    },
    submit() {
      event.preventDefault();
      this.editAssessment({
        form: this.$refs.editAssessment,
        id: this.id,
      });
    },
    onOrganizationSelected(organization) {
      this.editAssessmentField({
        field: 'organization',
        value: organization,
        id: this.id,
      });
    },
    async onManagementPlanAdded(file) {
      await this.editAssessmentFileField({
        field: 'management_plan_file',
        file,
        id: this.id,
      });
      this.$refs.managementPlan.$el.childNodes[0].childNodes[0].childNodes[1].innerHTML =
        '<span><a onclick="event.stopPropagation()" href="' +
        this.assessment.management_plan_file +
        '" target="_blank">' +
        this.assessment.management_plan_file +
        '</a></span>';
    },
    onCollectionMethodChanged(event) {
      this.editAssessmentFields({
        fields: [
          { field: 'collection_method', value: event.id },
          { field: 'count_community', value: 0 },
          { field: 'count_academic', value: 0 },
          { field: 'count_government', value: 0 },
          { field: 'count_community', value: 0 },
          { field: 'count_ngo', value: 0 },
          { field: 'count_academic', value: 0 },
          { field: 'count_government', value: 0 },
          { field: 'count_indigenous', value: 0 },
          { field: 'count_private', value: 0 },
          { field: 'count_gender_female', value: 0 },
          { field: 'count_gender_male', value: 0 },
          { field: 'count_gender_nonbinary', value: 0 },
          { field: 'count_gender_prefer_not_say', value: 0 },
        ],
        id: this.id,
      });
    },
    template() {
      return `<div></div>`;
    },
    checkScreenSize() {
      // Show popup only on screens smaller than tablet breakpoint (768px)
      if (window.innerWidth < 768) {
        this.showMobilePopup = true;
      } else {
        this.showMobilePopup = false;
      }
    },
    closeMobilePopup() {
      this.showMobilePopup = false;
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize);
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/core/variables';

// Reuse existing popup styles and ensure it's on top
.elinor__popup.mobile-desktop-popup {
  // Ensure z-index is higher than tabs (z-[10000]) and all other elements
  // Tabs use z-index: 10000, so we need to be higher
  // Override the default z-40 from .elinor__popup
  z-index: 10001 !important;
  position: fixed !important;

  // Only show on mobile/tablet (smaller than tablet breakpoint)
  @media (min-width: $tablet-breakpoint-min) {
    display: none !important;
  }

  // Ensure overlay is also above everything
  .popup__overlay {
    z-index: 10001 !important;
  }

  // Ensure popup box is above overlay
  .popup__box {
    z-index: 10002 !important;
    position: relative;
  }

  // Make text smaller for mobile
  .popup__header {
    h3.text-turqy {
      @apply text-base font-semibold leading-6;
      font-size: 16px !important;
      line-height: 24px !important;
    }
  }

  .popup__content {
    p {
      @apply text-sm leading-5;
      font-size: 14px !important;
      line-height: 20px !important;
      color: #2e2e2e;
      margin: 0;
    }
  }
}
</style>
