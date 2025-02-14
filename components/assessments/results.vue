<template>
    <section class="section section--mt-medium section--ma-results">
        <div class="container">
            <div class="search__results g-grid--4-1-sm">
                <div
                    :class="
                        filters && filters.management_area_countries
                            ? 'col-span-1'
                            : 'col-span-2'
                    "
                >
                    <span>{{ $t('pages.assessments.list.total') }}</span>  {{ paginatedItems.length }} of
                    <span>{{ assessments.length }}</span>
                    <span
                        v-if="assessments.length > 1 || assessments.length == 0"
                    >
                        {{ $t('pages.assessments.list.totalPlural') }}
                    </span>
                    <span v-if="assessments.length == 1">
                        {{ $t('pages.assessments.list.totalSingular') }}
                    </span>
                </div>
                <div
                    class="form form--mt-0 ml-auto w-full"
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
                </div>
                <button
                    type="button"
                    class="btn btn--border-turqy btn--sm ml-auto"
                    @click="download()"
                >
                    <img
                        src="~/assets/img/ico-download.svg"
                        alt="Download Data"
                    />
                    <span class="btn--opacity__target">{{
                        $t('pages.assessments.list.downloadButton')
                    }}</span>
                </button>
            </div>
            <ul class="ma__results">
                <li
                    v-for="(assessment, index) in paginatedItems"
                    class="elinor__badge ui-rounded-border"
                >
                    <header class="header">
                        <div
                            v-if="assessment.status == 10"
                            class="flex gap-2 flex-col items-center"
                        >
                            <div
                                class="flex justify-center items-center w-[56px] h-[56px] rounded-full"
                                :class="
                                    'bg-' + getAssessmentColor(assessment.score)
                                "
                            >
                                <span
                                    class="text-white text-[24px] font-semibold"
                                    >{{ assessment.score }}</span
                                >
                            </div>
                            <span
                                class="uppercase text-grayy-lighter font-bold text-[8px]"
                                >{{ $t('pages.assessments.outOf100') }}</span
                            >
                        </div>
                        <div class="left">
                            <span class="title">{{
                                assessment.person_responsible.username
                            }}</span>
                            <NuxtLink
                                class="subtitle"
                                :to="
                                    isOpenAssessment(assessment)
                                        ? `/assessments/edit/${assessment.id}/assessment-data/`
                                        : `/assessments/${assessment.id}/info/`
                                "
                                >{{ assessment.name }}</NuxtLink
                            >
                            <div
                                class="search-criteria"
                                v-if="assessment.management_area_countries"
                            >
                                <span class="area">{{
                                    $t('pages.assessments.managedArea')
                                }}</span>
                                <span class="criteria">{{
                                    assessment.management_area_countries.name
                                }}</span>
                            </div>
                        </div>
                        <div class="right">
                            <div
                                v-if="
                                    assessment.data_policy === 90 &&
                                    assessment.status === 10
                                "
                                class="assessment-status status--ready"
                            >
                                <span class="status-circle">
                                    <img src="~assets/img/ico-megaphone.svg" />
                                </span>
                                <span class="text">{{
                                    $t('pages.assessments.published')
                                }}</span>
                            </div>
                            <div
                                v-if="
                                    assessment.data_policy === 10 &&
                                    assessment.status === 10
                                "
                                class="assessment-status status--ready"
                            >
                                <span class="status-circle">
                                    <img
                                        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjMiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAyMyAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik03Ljc5MzI2IDEyLjY4OThMMjAuNDgzMSAwTDIyLjQxNDIgMS45MzExNkw3Ljc5MzI2IDE2LjU1MjFMMCA4Ljc1ODg1TDEuOTMxMTYgNi44Mjc2OEw3Ljc5MzI2IDEyLjY4OThaIiBmaWxsPSIjNDNBMEJEIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNy43OTMyNiAxMi42ODk4TDIwLjQ4MzEgMEwyMi40MTQyIDEuOTMxMTZMNy43OTMyNiAxNi41NTIxTDAgOC43NTg4NUwxLjkzMTE2IDYuODI3NjhMNy43OTMyNiAxMi42ODk4WiIgZmlsbD0iIzQzQTBCRCIvPgo8L3N2Zz4K"
                                    />
                                </span>
                                <span class="text">{{
                                    $t('pages.assessments.finalized')
                                }}</span>
                            </div>
                            <div
                                v-if="
                                    assessment.status === 90 &&
                                    getCompletionPercentage(assessment) === 100
                                "
                                class="assessment-status status--ready"
                            >
                                <span class="status-circle"
                                    ><span>100%</span></span
                                >
                                <span class="text">{{
                                    $t('pages.assessments.readyToPublish')
                                }}</span>
                            </div>
                            <div
                                v-if="
                                    assessment.status === 90 &&
                                    getCompletionPercentage(assessment) < 100
                                "
                                class="assessment-status status--pending"
                            >
                                <span class="status-circle"
                                    ><span
                                        >{{
                                            getCompletionPercentage(assessment)
                                        }}%</span
                                    ></span
                                >
                                <span class="text">{{
                                    $t('pages.assessments.preparingToPublish')
                                }}</span>
                            </div>
                        </div>
                    </header>
                    <ul class="sublist">
                        <li class="avatar">
                            <div class="elinor__avatar elinor__avatar--red">
                                <span>{{
                                    assessment.person_responsible.username
                                        | capitalizeFirstLetter
                                }}</span>
                            </div>
                        </li>
                        <li
                            v-if="isAssessmentCollaborator($auth, assessment)"
                            class="role"
                        >
                            <span class="label">{{
                                $t('pages.assessments.list.myRole')
                            }}</span>
                            <span class="data">{{
                                $t(
                                    'pages.assessments.roles.' +
                                        getMyRoleName($auth, assessment),
                                )
                            }}</span>
                        </li>
                        <li class="ha">
                            <span class="label">{{
                                $t('pages.assessments.list.year')
                            }}</span>
                            <span class="data">{{ assessment.year }}</span>
                        </li>
                        <li
                            class="countries"
                            v-if="
                                assessment.management_area_countries &&
                                assessment.management_area_countries.countries
                            "
                        >
                            <span class="label">
                                {{ $t('pages.assessments.list.countries') }}
                            </span>
                            <span
                                class="data"
                                v-html="
                                    assessment.management_area_countries.countries.join(
                                        ', ',
                                    )
                                "
                            ></span>
                        </li>
                        <li
                            class="view"
                            v-if="
                                !$auth.loggedIn ||
                                assessment.status === 10 ||
                                isAssessmentObserver($auth, assessment)
                            "
                        >
                            <nuxt-link
                                :to="`/assessments/${assessment.id}/info/`"
                                class="btn--border-turqy btn--opacity--child"
                            >
                                <span class="btn--opacity__target">{{
                                    $t('pages.assessments.list.viewButton')
                                }}</span>
                                <img
                                    src="~/assets/img/ico-button-arrow-turqy.svg"
                                />
                            </nuxt-link>
                        </li>
                        <li
                            class="view"
                            v-if="
                                $auth.loggedIn &&
                                assessment.status !== 10 &&
                                !isAssessmentObserver($auth, assessment)
                            "
                        >
                            <nuxt-link
                                :to="`/assessments/edit/${assessment.id}/assessment-data/`"
                                class="btn--border-turqy btn--opacity--child"
                            >
                                <span class="btn--opacity__target">{{
                                    $t('pages.assessments.list.editButton')
                                }}</span>
                                <img
                                    src="~/assets/img/ico-button-arrow-turqy.svg"
                                />
                            </nuxt-link>
                        </li>
                    </ul>
                </li>
            </ul>
            <Paginate v-if="pageCount() > 1" :click-handler="onPageChanged" :total-rows="totalRows" :per-page="perPage" :page-count="pageCount()" v-model="currentPage" class="elinor__pagination" />
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
        Paginate
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
                perPage: 30,
                totalRows: 0,
                id: 0
            }
    },
    watch: {
        '$store.state.assessments.list' : {
            handler() {
                this.getItems();
            }
        }
    },
    mounted(){
        this.paginate(this.perPage, 1);
    },
    created() {
        this.getItems();
    },
    methods: {
        isAssessmentCollaborator: isAssessmentCollaborator,
        isAssessmentObserver: isAssessmentObserver,
        getMyRoleName,
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
        onPageChanged(page){
            this.paginate(this.perPage, page);
            console.log(page);
        },
        onChangeCurrent(current) {
            this.currentPage = current;
        },
        getItems() {
            this.page = 1;

            let respond = this.$store.state.assessments.list;
            console.log(respond);
            if (respond){
                this.items = respond
                this.totalRows = this.items.length;
                this.pageCount();
                this.paginate(this.perPage, 1);
            }
        },
        paginate (page_size, page_number) {
            let itemsToParse = this.items;
            this.paginatedItems = itemsToParse.slice((page_number -1) * page_size, page_number * page_size);
        },
        pageCount() {
            let l = this.totalRows,
                s = this.perPage;
            return Math.ceil(l / s);
        }
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
