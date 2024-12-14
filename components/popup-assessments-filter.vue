<template>
    <div class="popup__content popup--filters">
        <h4 class="c-title--modal mb-6">Select filters</h4>
        <form class="form form--ma-selector form--mt-0">
            <div class="form__group">
                <div class="form__row">
                    <div class="input input--multiselect input--1-2">
                        <label class="label">{{
                            $t(
                                'pages.assessments.list.filters.popup.labels.countries',
                            )
                        }}</label>
                        <div class="multiselect__wrap">
                            <multiselect
                                :placeholder="
                                    $t(
                                        'pages.assessments.list.filters.popup.placeholders.countries',
                                    )
                                "
                                :value="
                                    getCountryByCode(management_area_country)
                                "
                                track-by="code"
                                label="name"
                                :options="management_area_countries"
                                :multiple="false"
                                :searchable="false"
                                :showLabels="false"
                                :allow-empty="false"
                                open-direction="bottom"
                                @input="
                                    onFilterChanged(
                                        'management_area_countries',
                                        $event.code,
                                    )
                                "
                            >
                            </multiselect>
                            <div class="multiselect__caret">
                                <img src="~/assets/img/ico-select-turqy.svg" />
                            </div>
                        </div>
                    </div>

                    <div class="input input--multiselect input--1-6">
                        <label class="label">{{
                            $t(
                                'pages.assessments.list.filters.popup.labels.year',
                            )
                        }}</label>
                        <div class="multiselect__wrap">
                            <multiselect
                                :placeholder="
                                    $t(
                                        'pages.assessments.list.filters.popup.placeholders.year',
                                    )
                                "
                                :value="filters['year']"
                                :options="years"
                                :multiple="false"
                                :searchable="false"
                                :showLabels="false"
                                :allow-empty="true"
                                open-direction="bottom"
                                @input="onFilterChanged('year', $event)"
                            >
                            </multiselect>
                            <div class="multiselect__caret">
                                <img src="~/assets/img/ico-select-turqy.svg" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form__row">
                    <div class="input input--multiselect input--1-4">
                        <label class="label">{{
                            $t(
                                'pages.assessments.list.filters.popup.labels.status',
                            )
                        }}</label>
                        <div class="multiselect__wrap">
                            <multiselect
                                :value="getStatusById(filters.status)"
                                :placeholder="
                                    $t(
                                        'pages.assessments.list.filters.popup.placeholders.status',
                                    )
                                "
                                track-by="id"
                                label="name"
                                :options="statuses"
                                :multiple="false"
                                :showLabels="false"
                                :allow-empty="true"
                                open-direction="bottom"
                                @input="onFilterChanged('status', $event.id)"
                            >
                            </multiselect>
                            <div class="multiselect__caret">
                                <img src="~/assets/img/ico-select-turqy.svg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section class="mt-10">
                <button
                    type="button"
                    @click="resetFilters"
                    class="btn--border-turqy btn--opacity--child mr-5"
                    style="float: left"
                >
                    <span class="btn--opacity__target">{{
                        $t('pages.assessments.list.filters.popup.reset')
                    }}</span>
                </button>
                <button
                    type="button"
                    @click="popupState({ active: false })"
                    class="btn--border-turqy btn--opacity--child"
                    style="float: left"
                >
                    <span class="btn--opacity__target">{{
                        $t('pages.assessments.list.filters.popup.apply')
                    }}</span>
                    <img src="~/assets/img/ico-filters-turqy.svg" />
                </button>
                <div style="clear: both"></div>
            </section>
        </form>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'popup-assessments-filter',
    data() {
        return {
            years: [new Date().getFullYear() - 1, new Date().getFullYear()],
            statuses: [
                { id: 90, name: this.$t('pages.assessments.statuses.90') },
                { id: 80, name: this.$t('pages.assessments.statuses.80') },
                { id: 10, name: this.$t('pages.assessments.statuses.10') },
            ],
        };
    },
    mounted() {
        this.$store.dispatch('countries/fetchCountries');
    },
    computed: {
        ...mapState({
            filters: (state) => state.assessments.filters,
            management_area_countries: (state) =>
                state.countries.management_area_countries,
            management_area_country: (state) =>
                state.assessments.filters.management_area_countries,
        }),
    },
    methods: {
        ...mapActions({
            popupState: 'popup/popupState',
            resetFilters: 'assessments/resetFilters',
            filter: 'assessments/filter',
            removeFilter: 'assessments/removeFilter',
        }),
        onFilterChanged(name, value) {
            if (value) {
                this.filter({ name, value });
            } else {
                this.removeFilter(name);
            }
        },
        getCountryByCode(code) {
            if (code) {
                return this.management_area_countries.filter(
                    (country) => country.code === code,
                )[0];
            }
        },
        getStatusById(id) {
            if (id) {
                return this.statuses.filter((status) => status.id === id)[0];
            }
        },
    },
};
</script>
