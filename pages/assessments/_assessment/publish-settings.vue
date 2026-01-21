<template>
  <section class="section section--assessment-edit-publish-settings">
    <div class="container">
      <div class="flex items-center">
        <h1 class="c-title--lg">
          {{ $t('pages.assessments.edit.tabs.publish-settings.title') }}
        </h1>
      </div>

      <template v-if="assessment.status === 90">
        <div class="publish__layout">
          <div class="publish__num">
            <div class="flex items-center">
              <span class="rounded-number">1</span>
              <h4>
                {{
                  $t(
                    'pages.assessments.edit.tabs.publish-settings.finalize.title',
                  )
                }}
              </h4>
            </div>
          </div>
          <div class="publish__content">
            <div class="font-semibold">
              {{
                $t(
                  'pages.assessments.edit.tabs.publish-settings.finalize.whatHappenTitle',
                )
              }}
            </div>
            <ul
              class="list-inside list-disc list--light"
              v-html="
                $t(
                  'pages.assessments.edit.tabs.publish-settings.finalize.whatHappenList1',
                ) +
                ' ' +
                $t(
                  'pages.assessments.edit.tabs.publish-settings.finalize.whatHappenList2',
                )
              "
            ></ul>
          </div>
          <div class="font-bold text-[#585858] text-base py-8">
            {{
              $t(
                'pages.assessments.edit.tabs.publish-settings.finalize.scoreTitle',
              )
            }}
          </div>
          <assessment-score-chart></assessment-score-chart>
          <p>
            <span class="text-turqy">{{
              $t(
                'pages.assessments.edit.tabs.publish-settings.finalize.warning',
              )
            }}</span>
            {{
              $t(
                'pages.assessments.edit.tabs.publish-settings.finalize.warningText',
              )
            }}
          </p>
          <div>
            <button
              type="button"
              class="btn btn--md"
              @click="
                popupState({
                  active: true,
                  type: 'confirmation',
                  component: 'popup-assessment-finalize',
                  title: $t(
                    'pages.assessments.edit.tabs.publish-settings.finalize.popup.title',
                  ),
                  onConfirm: submitFinalized,
                })
              "
            >
              <span class="btn--opacity__target">{{
                $t(
                  'pages.assessments.edit.tabs.publish-settings.finalize.button',
                )
              }}</span>
            </button>
          </div>
        </div>

        <div class="elinor__data-separator"></div>
      </template>
      <template else>
        <div class="publish__layout">
          <div class="publish__num">
            <div class="flex items-center">
              <img
                src="~/assets/img/check_circle.svg"
                class="w-8 h-8 mr-2"
                alt="finalized"
              />
              <h4>
                {{
                  $t(
                    'pages.assessments.edit.tabs.publish-settings.finalize.title',
                  )
                }}
              </h4>
            </div>
          </div>
        </div>
        <div class="elinor__data-separator"></div>
      </template>
      <template>
        <div class="publish__layout">
          <div
            class="publish__num"
            :class="{
              disabled: isNotFinalized(),
            }"
          >
            <div class="flex items-center">
              <span class="rounded-number rounded-number--xl">{{
                isUnpublished() ? 2 : isPublished() ? 3 : 2
              }}</span>
              <h4 v-if="isUnpublished()">
                {{
                  $t(
                    'pages.assessments.edit.tabs.publish-settings.publish.title',
                  )
                }}
              </h4>
              <h4 v-if="isPublished()">
                {{
                  $t(
                    'pages.assessments.edit.tabs.publish-settings.unpublish.title',
                  )
                }}
              </h4>
            </div>
          </div>
          <div
            v-if="isNotFinalized() || isUnpublished()"
            class="flex flex-col gap-8"
          >
            <div class="publish__content">
              <div class="font-semibold">
                {{
                  $t(
                    'pages.assessments.edit.tabs.publish-settings.publish.whatHappenTitle',
                  )
                }}
              </div>
              <ul
                class="list-inside list-disc list--light"
                v-html="
                  $t(
                    'pages.assessments.edit.tabs.publish-settings.publish.whatHappenList1',
                  ) +
                  ' ' +
                  $t(
                    'pages.assessments.edit.tabs.publish-settings.publish.whatHappenList2',
                  )
                "
              ></ul>
            </div>
            <div>
              <button
                type="button"
                class="btn btn--md"
                :class="{
                  disabled: assessment.status === 90,
                }"
                @click="submitPublish"
              >
                <span>{{
                  $t(
                    'pages.assessments.edit.tabs.publish-settings.publish.button',
                  )
                }}</span>
              </button>
            </div>
          </div>
          <div v-if="isPublished()" class="flex flex-col gap-8">
            <div class="publish__content">
              <div class="font-semibold">
                {{
                  $t(
                    'pages.assessments.edit.tabs.publish-settings.unpublish.whatHappenTitle',
                  )
                }}
              </div>
              <ul
                class="list-inside list-disc list--light"
                v-html="
                  $t(
                    'pages.assessments.edit.tabs.publish-settings.unpublish.whatHappenList1',
                  ) +
                  ' ' +
                  $t(
                    'pages.assessments.edit.tabs.publish-settings.unpublish.whatHappenList2',
                  )
                "
              ></ul>
            </div>
            <div>
              <button
                type="button"
                class="btn btn--md"
                @click="
                  popupState({
                    active: true,
                    type: 'confirmation',
                    component: 'popup-assessment-unpublish',
                    title: $t(
                      'pages.assessments.edit.tabs.publish-settings.unpublish.popup.title',
                    ),
                    onConfirm: submitUnpublish,
                  })
                "
              >
                <span>{{
                  $t(
                    'pages.assessments.edit.tabs.publish-settings.unpublish.button',
                  )
                }}</span>
              </button>
            </div>
          </div>
        </div>
        <div class="elinor__data-separator"></div>
      </template>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'assessment-edit-publish-settings',
  layout: 'assessment-edit',
  computed: {
    ...mapState({
      assessment: (state) => state.assessments.assessment,
    }),
  },
  methods: {
    ...mapActions({
      publish: 'assessments/publish',
      unpublish: 'assessments/unpublish',
      finalize: 'assessments/finalize',
      popupState: 'popup/popupState',
    }),
    submitFinalized() {
      this.finalize(this.assessment.id);
    },
    submitPublish() {
      if (this.assessment.status === 10) {
        const onConfirm = () => {
          this.publish(this.assessment.id);
        };
        this.popupState({
          active: true,
          type: 'confirmation',
          component: 'popup-assessment-publish',
          title: this.$t(
            'pages.assessments.edit.tabs.publish-settings.publish.popup.title',
          ),
          onConfirm,
        });
      } else {
        this.popupState({
          active: true,
          type: 'confirmation',
          component: 'popup-assessment-publish-alert',
          title: this.$t(
            'pages.assessments.edit.tabs.publish-settings.publish.alert.popup.title',
          ),
        });
      }
    },
    submitUnpublish() {
      this.unpublish(this.assessment.id);
    },
    isPublished() {
      return (
        this.assessment.status === 10 && this.assessment.data_policy === 90
      );
    },
    isUnpublished() {
      return (
        this.assessment.status === 10 && this.assessment.data_policy === 10
      );
    },
    isNotFinalized() {
      return this.assessment.status === 90;
    },
  },
};
</script>
