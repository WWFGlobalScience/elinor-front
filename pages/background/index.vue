<template>
  <article class="page page--flushed">
    <section class="section section--main">
      <img src="~/assets/img/methodology-section.jpg" alt="" />
    </section>
    <section class="section" v-html="content" />
    <section class="section" style="margin-top: 0">
      <div class="container">
        <div class="info-block">
          <h2 class="c-title--md">
            {{ $t('pages.background.attribute_title.heading') }}
          </h2>
          <div class="table-scroll-wrapper">
            <table class="table-background">
              <thead>
                <tr>
                  <th>No</th>
                  <th>{{ $t('pages.background.attribute_title.name') }}</th>
                  <th>
                    {{ $t('pages.background.attribute_title.description') }}
                  </th>
                  <th>{{ $t('pages.background.attribute_title.useIf') }}</th>
                  <th class="!text-center">
                    <div
                      class="flex justify-center cursor-pointer"
                      @click="toggleExpandAll"
                    >
                      {{ $t('pages.background.questions') }}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        v-if="!expandAll"
                      >
                        <mask
                          id="mask0_7699_7511"
                          style="mask-type: alpha"
                          maskUnits="userSpaceOnUse"
                          x="0"
                          y="0"
                          width="24"
                          height="24"
                        >
                          <rect width="24" height="24" fill="white" />
                        </mask>
                        <g mask="url(#mask0_7699_7511)">
                          <path
                            d="M11.9999 19.4962L16.0576 15.4577C16.2063 15.3091 16.3803 15.2331 16.5796 15.2297C16.779 15.2266 16.9562 15.3026 17.1114 15.4577C17.2665 15.6129 17.3441 15.7911 17.3441 15.9922C17.3441 16.1936 17.2665 16.3718 17.1114 16.527L13.0786 20.575C12.7851 20.8685 12.4255 21.0152 11.9999 21.0152C11.5742 21.0152 11.2146 20.8685 10.9211 20.575L6.87287 16.527C6.72421 16.3782 6.65087 16.2015 6.65287 15.997C6.65471 15.7927 6.73321 15.6129 6.88837 15.4577C7.04354 15.3026 7.22171 15.2266 7.42287 15.2297C7.62421 15.2331 7.80246 15.3091 7.95762 15.4577L11.9999 19.4962ZM11.9999 4.50374L7.95762 8.52699C7.80879 8.67566 7.63471 8.74899 7.43537 8.74699C7.23604 8.74516 7.05879 8.67183 6.90362 8.52699C6.74862 8.37183 6.66854 8.19357 6.66337 7.99224C6.65821 7.79107 6.73321 7.61291 6.88837 7.45774L10.9211 3.42499C11.2146 3.13149 11.5742 2.98474 11.9999 2.98474C12.4255 2.98474 12.7851 3.13149 13.0786 3.42499L17.1114 7.45774C17.26 7.60641 17.3335 7.78299 17.3316 7.98749C17.3296 8.19199 17.2511 8.37183 17.0961 8.52699C16.941 8.67183 16.7653 8.74516 16.5691 8.74699C16.373 8.74899 16.1973 8.67566 16.0421 8.52699L11.9999 4.50374Z"
                            fill="white"
                          />
                        </g>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        v-else
                      >
                        <mask
                          id="mask0_7699_7515"
                          style="mask-type: alpha"
                          maskUnits="userSpaceOnUse"
                          x="0"
                          y="0"
                          width="24"
                          height="24"
                        >
                          <rect width="24" height="24" fill="white" />
                        </mask>
                        <g mask="url(#mask0_7699_7515)">
                          <path
                            d="M12 17.0538L7.92701 21.127C7.78851 21.2653 7.61443 21.3362 7.40476 21.3395C7.19526 21.3427 7.01801 21.2718 6.87301 21.127C6.72818 20.982 6.65576 20.8063 6.65576 20.6C6.65576 20.3937 6.72818 20.218 6.87301 20.073L10.9213 16.025C11.2148 15.7315 11.5743 15.5848 12 15.5848C12.4257 15.5848 12.7853 15.7315 13.0788 16.025L17.127 20.073C17.2653 20.2115 17.3362 20.3856 17.3395 20.5953C17.3427 20.8048 17.2718 20.982 17.127 21.127C16.982 21.2718 16.8063 21.3443 16.6 21.3443C16.3937 21.3443 16.218 21.2718 16.073 21.127L12 17.0538ZM12 6.94626L16.073 2.87301C16.2115 2.73468 16.3856 2.66385 16.5953 2.66051C16.8048 2.65735 16.982 2.72818 17.127 2.87301C17.2718 3.01801 17.3443 3.19368 17.3443 3.40001C17.3443 3.60635 17.2718 3.78201 17.127 3.92701L13.0788 7.97501C12.7853 8.26851 12.4257 8.41526 12 8.41526C11.5743 8.41526 11.2148 8.26851 10.9213 7.97501L6.87301 3.92701C6.73468 3.78851 6.66385 3.61443 6.66051 3.40476C6.65735 3.19526 6.72818 3.01801 6.87301 2.87301C7.01801 2.72818 7.19368 2.65576 7.40001 2.65576C7.60634 2.65576 7.78201 2.72818 7.92701 2.87301L12 6.94626Z"
                            fill="white"
                          />
                        </g>
                      </svg>
                    </div>
                  </th>
                </tr>
              </thead>
              <template v-for="(attribute, index) in attributes">
                <attribute-list
                  :attribute="attribute"
                  :index="index"
                  :expand-all="expandAll"
                  @update-expand-state="updateExpandState"
                />
              </template>
            </table>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
import locales from '../../locales';
import { mapState } from 'vuex';

export default {
  name: 'background',
  auth: false,
  computed: {
    ...mapState({
      attributes: (state) => state.attributes.list,
      questions: (state) => state.surveyquestions.list,
    }),
    content() {
      const currentLanguage = this.$i18n.locales.find(
        (lang) => lang.code === this.$i18n.locale,
      );
      // console.log(this.attributes);
      // console.log(this.questions);
      return locales[currentLanguage.code].background;
    },
  },
  methods: {
    getAttributeQuestions(attribute) {
      return this.questions.filter(
        (question) => question.attribute === attribute.id,
      );
    },
  },
};
</script>
