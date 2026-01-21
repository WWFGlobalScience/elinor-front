<template>
  <section class="section section--mt-medium section--ma-results">
    <div class="container">
      <div class="search__results flex md:flex-col-reverse gap-y-4 items-center justify-between">
        <div
          :class="
            filters && filters.management_area_countries
              ? 'col-span-1'
              : 'col-span-2'
          "
          v-if="assessments.length > 0"
        >
          <span>{{ $t('pages.assessments.list.total') }}</span>
          {{ (currentPage - 1) * perPage + 1 }} -
          {{
            currentPage * perPage > assessments.length
              ? assessments.length
              : currentPage * perPage
          }}
          of
          <span>{{ assessments.length }}</span>
          <span v-if="assessments.length > 1 || assessments.length == 0">
            {{ $t('pages.assessments.list.totalPlural') }}
          </span>
          <span v-if="assessments.length == 1">
            {{ $t('pages.assessments.list.totalSingular') }}
          </span>
        </div>
        <div v-else></div>
        <div class="form form--mt-0" v-if="$auth.loggedIn">
          <label class="custom-radio">
            <input
              type="radio"
              name="assessmentType"
              value="all"
              id="all"
              @change="filterAssessmentsBy($event.target.value)"
              :checked="listType === 'all'"
            />
            <span class="custom-radio__label">{{
              $t('pages.assessments.list.type.all')
            }}</span>
          </label>
          <label class="custom-radio">
            <input
              type="radio"
              name="assessmentType"
              value="own"
              id="own"
              @change="filterAssessmentsBy($event.target.value)"
              :checked="listType === 'own'"
            />
            <span class="custom-radio__label">{{
              $t('pages.assessments.list.type.own')
            }}</span>
          </label>
        </div>
        <!-- <div
                    class="form form--mt-0 flex-grow"
                    v-if="$auth.loggedIn"
                >
                    <div class="form__group">
                        <div class="form__row">
                            <div
                                class="input input--radios input--radios-question"
                            >
                                <div class="radios__wrap">
                                    <div class="radio__wrap">
                                        <div class="radio">
                                            <input
                                                type="radio"
                                                name="assessmentType"
                                                value="own"
                                                id="own"
                                                @change="
                                                    filterAssessmentsBy(
                                                        $event.target.value,
                                                    )
                                                "
                                                :checked="listType === 'own'"
                                            />
                                            <img
                                                src="~/assets/img/ico-ok.svg"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <label for="own" class="label">
                                    <span>{{
                                        $t('pages.assessments.list.type.own')
                                    }}</span>
                                </label>
                            </div>
                            <div
                                class="input input--radios input--radios-question"
                            >
                                <div class="radios__wrap">
                                    <div class="radio__wrap">
                                        <div class="radio">
                                            <input
                                                type="radio"
                                                name="assessmentType"
                                                value="all"
                                                id="all"
                                                @change="
                                                    filterAssessmentsBy(
                                                        $event.target.value,
                                                    )
                                                "
                                                :checked="listType === 'all'"
                                            />
                                            <img
                                                src="~/assets/img/ico-ok.svg"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <label for="all" class="label">
                                    <span>{{
                                        $t('pages.assessments.list.type.all')
                                    }}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div> -->
      </div>
      <div class="ma__results">
        <div v-for="(assessment, index) in paginatedItems" :key="assessment.id">
          <!-- Desktop/Tablet view -->
          <NuxtLink
            :to="linkTo(assessment)"
            class="assessment-card assessment-card--desktop"
            @click.native="scrollToTop"
          >
            <div class="top-content">
              <div class="scores-area">
                <div class="badge-area">
                  <div
                    v-if="assessment.status == 10"
                    class="badge"
                    :class="'bg-' + getAssessmentColor(assessment.score)"
                  >
                    {{ assessment.score || '-' }}
                  </div>
                  <div v-else class="badge">-</div>
                  <div class="badge-label uppercase">
                    {{ $t('pages.assessments.outOf100') }}
                  </div>
                </div>
                <div class="status">
                  <div
                    v-if="
                      assessment.data_policy === 90 && assessment.status === 10
                    "
                    class="assessment-status status--published"
                  >
                    <span class="text">{{
                      $t('pages.assessments.published')
                    }}</span>
                  </div>
                  <div
                    v-if="
                      assessment.data_policy === 10 && assessment.status === 10
                    "
                    class="assessment-status status--ready"
                  >
                    <span class="text">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <mask
                          id="mask0_7700_7245"
                          style="mask-type: alpha"
                          maskUnits="userSpaceOnUse"
                          x="0"
                          y="0"
                          width="16"
                          height="16"
                        >
                          <rect width="16" height="16" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_7700_7245)">
                          <path
                            d="M6.36713 10.1L12.0171 4.45C12.1505 4.31667 12.306 4.25 12.4838 4.25C12.6616 4.25 12.8171 4.31667 12.9505 4.45C13.0838 4.58333 13.1505 4.74167 13.1505 4.925C13.1505 5.10833 13.0838 5.26667 12.9505 5.4L6.8338 11.5333C6.70046 11.6667 6.54491 11.7333 6.36713 11.7333C6.18935 11.7333 6.0338 11.6667 5.90046 11.5333L3.0338 8.66667C2.90046 8.53333 2.83657 8.375 2.84213 8.19167C2.84769 8.00833 2.91713 7.85 3.05046 7.71667C3.1838 7.58333 3.34213 7.51667 3.52546 7.51667C3.7088 7.51667 3.86713 7.58333 4.00046 7.71667L6.36713 10.1Z"
                            fill="#144651"
                          />
                        </g>
                      </svg>
                      {{ $t('pages.assessments.finalized') }}</span
                    >
                  </div>
                  <div
                    v-if="
                      assessment.status === 90 &&
                      getCompletionPercentage(assessment) === 100
                    "
                    class="assessment-status status--ready"
                  >
                    <span class="text"
                      >100% {{ $t('pages.assessments.readyToPublish') }}</span
                    >
                  </div>
                  <div
                    v-if="
                      assessment.status === 90 &&
                      getCompletionPercentage(assessment) < 100
                    "
                    class="assessment-status status--pending"
                  >
                    <div class="edit">
                      <img src="~/assets/img/edit.svg" alt="edit" />
                      <span>Edit</span>
                    </div>
                    <span class="text">
                      {{ getCompletionPercentage(assessment) }}%
                      {{ $t('pages.assessments.toCompleted') }}
                    </span>
                  </div>
                </div>
              </div>
              <h4>{{ assessment.name || '-' }}</h4>
            </div>
            <div class="bottom-content">
              <div class="flex items-center gap-2">
                <div class="year">
                  {{ assessment.year }}
                </div>
                <span class="separator text-[#9C9C9C]">|</span>
                <div class="name">
                  {{ assessment.person_responsible.first_name }}
                  {{ assessment.person_responsible.last_name }}
                </div>
              </div>
              <div class="management-area">
                {{
                  (assessment.management_area_countries &&
                    assessment.management_area_countries.name) ||
                  '-'
                }}
              </div>
            </div>
          </NuxtLink>
          <!-- Mobile view -->
          <assessment-card-mobile
            :assessment="assessment"
            class="assessment-card--mobile"
          />
        </div>
      </div>
      <Paginate
        v-if="pageCount() > 1"
        :click-handler="onPageChanged"
        :total-rows="totalRows"
        :per-page="perPage"
        :page-count="pageCount()"
        v-model="currentPage"
        class="elinor__pagination"
      />
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import {
  isAssessmentObserver,
  getMyRoleName,
  isAssessmentCollaborator,
} from '~/config/assessment-roles';
import { calculateProgress } from '~/config/assessment-progress';
import Paginate from 'vuejs-paginate';
export default {
  name: 'assessments-results',
  components: {
    Paginate,
    'assessment-card-mobile': () => import('./assessment-card-mobile.vue'),
  },
  computed: {
    ...mapState({
      assessments: (state) => state.assessments.list,
      filters: (state) => state.assessments.filters,
      users: (state) => state.users.users,
      listType: (state) => state.assessments.listType,
      pagination: (state) => state.assessments.pagination,
    }),
  },
  data() {
    return {
      items: [],
      paginatedItems: [],
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
      id: 0,
    };
  },
  watch: {
    '$store.state.assessments.list': {
      handler() {
        this.getItems();
      },
    },
    '$route.query.myAssessments'() {
      this.checkMyAssessmentsQuery();
    },
  },
  mounted() {
    this.paginate(this.perPage, 1);
    this.checkMyAssessmentsQuery();
  },
  created() {
    this.getItems();
  },
  methods: {
    isAssessmentCollaborator: isAssessmentCollaborator,
    isAssessmentObserver: isAssessmentObserver,
    getMyRoleName,
    checkMyAssessmentsQuery() {
      if (this.$route.query.myAssessments) {
        this.filterAssessmentsBy('own');
      } else {
        this.filterAssessmentsBy('all');
      }
      // this.$router.replace({ query: { ...this.$route.query, myAssessments: undefined } });
    },
    isOpenAssessment(assessment) {
      return (
        this.$auth.loggedIn &&
        assessment.status !== 10 &&
        !isAssessmentObserver(this.$auth, assessment)
      );
    },
    ...mapActions({
      filterAssessmentsBy: 'assessments/filterAssessmentsBy',
      popupState: 'popup/popupState',
      download: 'assessments/downloadAssessments',
    }),
    getCompletionPercentage(assessment) {
      return parseFloat(
        calculateProgress(assessment).overall_percentage.toFixed(0),
      );
    },
    linkTo(assessment) {
      if (
        !this.$auth.loggedIn ||
        assessment.status === 10 ||
        isAssessmentObserver(this.$auth, assessment)
      ) {
        return `/assessments/${assessment.id}/info`;
      } else if (
        this.$auth.loggedIn ||
        assessment.status !== 10 ||
        !isAssessmentObserver(this.$auth, assessment)
      ) {
        return `/assessments/edit/${assessment.id}/assessment-data`;
      }

      return `#`;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    onPageChanged(page) {
      this.paginate(this.perPage, page);
      // console.log(page);
    },
    onChangeCurrent(current) {
      this.currentPage = current;
    },
    getItems() {
      this.page = 1;

      let respond = this.$store.state.assessments.list;
      // console.log(respond);
      if (respond) {
        this.items = respond;
        this.totalRows = this.items.length;
        this.pageCount();
        this.paginate(this.perPage, 1);
      }
    },
    paginate(page_size, page_number) {
      let itemsToParse = this.items;
      this.paginatedItems = itemsToParse.slice(
        (page_number - 1) * page_size,
        page_number * page_size,
      );
    },
    pageCount() {
      let l = this.totalRows,
        s = this.perPage;
      return Math.ceil(l / s);
    },
    getAssessmentColor(score) {
      if (score >= 80) return 'excellent';
      if (score >= 60) return 'good';
      if (score >= 40) return 'average';
      return 'poor';
    },
  },
  filters: {
    capitalizeFirstLetter: (value) => {
      if (!value) {
        return '';
      }
      return value.charAt(0).toUpperCase();
    },
  },
};
</script>
