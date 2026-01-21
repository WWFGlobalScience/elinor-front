<template>
  <section class="section section--tab">
      <div class="container">
          <ul class="elinor__tabs">
              <li>
                  <nuxt-link
                      :to="`/assessments/${id}/info/`"
                      class="btn--tab"
                  >
                      <span class="txt">{{
                          $t('pages.assessments.view.tabs.info.ManagementArea')
                      }}</span>
                  </nuxt-link>
              </li>
              <li>
                  <nuxt-link
                      :to="`/assessments/${id}/the-survey`"
                      class="btn--tab"
                  >
                      <span class="txt">{{
                          $t('pages.assessments.view.tabs.survey.tabButton')
                      }}</span>
                  </nuxt-link>
              </li>
              <li>
                <nuxt-link
                    :to="`/assessments/${id}/report-text`"
                    class="btn--tab"
                >
                    <span class="txt">{{
                        $t('pages.assessments.edit.tabs.context.tabButton')
                    }}</span>
                </nuxt-link>
            </li>
              <li>
                  <nuxt-link
                      :to="`/assessments/${id}/collaborators`"
                      class="btn--tab"
                  >
                      <span class="bullet">3</span>
                      <span class="txt">{{
                          $t(
                              'pages.assessments.view.tabs.collaborators.tabButton',
                          )
                      }}</span>
                  </nuxt-link>
              </li>
              <li
                  v-if="isAssessmentCollaborator($auth, assessment)"
              >
                  <nuxt-link
                      :to="`/assessments/${id}/publish-settings`"
                      :class="['btn--tab btn--tab-percent']"
                  >
                      <!-- <span class="bullet">100%</span> -->
                      <span class="txt">{{
                          $t(
                              'pages.assessments.edit.tabs.publish-settings.tabButton.edit',
                          )
                      }}</span>
                  </nuxt-link>
              </li>
          </ul>
      </div>
  </section>
</template>

<script>
import { isAssessmentCollaborator } from '~/config/assessment-roles';

export default {
  name: 'assessment-tabs',
  props: {
      id: null,
  },
  computed: {
      assessment() {
          return this.$store.state.assessments.assessment;
      },
  },
  methods: {
      isAssessmentCollaborator,
  },
};
</script>
