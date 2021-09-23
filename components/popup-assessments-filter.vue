<template>
    <div class="popup__content popup--filters">
        <h4 class="c-title--modal mb-6">
            Select filters
        </h4>
        <form class="form form--ma-selector form--mt-0">

            <div class="form__group">
                <div class="form__row">
                    <div class="input input--multiselect input--1-2">
                        <label class="label">by Countries</label>
                        <div class="multiselect__wrap">
                            <multiselect placeholder="Countries"
                                :value="getCountryByCode(filters.country)"
                                track-by="code"
                                label="name"
                                :options="countries"
                                :multiple="false"
                                :searchable="false"
                                :showLabels="false"
                                :allow-empty="false" open-direction="bottom"
                                @input="onFilterChanged('country', $event.code)" >
                                <span slot="noResult">{{ $t( 'default.noresults' ) }}</span>
                            </multiselect>
                            <div class="multiselect__caret">
                                <img src="~/assets/img/ico-select-turqy.svg">
                            </div>
                        </div>
                    </div>

                    <div class="input input--multiselect input--1-6">
                        <label class="label">by Year</label>
                        <div class="multiselect__wrap">
                            <multiselect
                                :value="filters['year']"
                                :options="years"
                                :multiple="false"
                                :searchable="false"
                                :showLabels="false"
                                :allow-empty="true" open-direction="bottom"
                                @input="onFilterChanged('year', $event)" >
                                <span slot="noResult">{{ $t( 'default.noresults' ) }}</span>
                            </multiselect>
                            <div class="multiselect__caret">
                                <img src="~/assets/img/ico-select-turqy.svg">
                            </div>
                        </div>
                    </div>

                    <!--<div class="input input--multiselect input--1-6">
                        <label class="label">by Score</label>
                        <div class="multiselect__wrap">
                            <multiselect placeholder="100"
                                select-label="Enter doesn’t work here!"
                                :value="selectScore.value"
                                :options="selectScore.options"
                                :multiple="false"
                                :searchable="true"
                                :showLabels="false"
                                :allow-empty="false" open-direction="bottom"
                                :hide-selected="true"
                                @input="onselectScoreChange" >
                                <span slot="noResult">{{ $t( 'default.noresults' ) }}</span>
                            </multiselect>
                            <div class="multiselect__caret">
                                <img src="~/assets/img/ico-select-turqy.svg">
                            </div>
                        </div>
                    </div>-->

                    <!--<div class="input input--multiselect input--1-6">
                        <label class="label">by Completation</label>
                        <div class="multiselect__wrap">
                            <multiselect placeholder="50%"
                                select-label="Enter doesn’t work here!"
                                :value="selectCompletation.value"
                                :options="selectCompletation.options"
                                :multiple="false"
                                :searchable="true"
                                :showLabels="false"
                                :allow-empty="false" open-direction="bottom"
                                :hide-selected="true"
                                @input="onselectCompletationChange" >
                                <span slot="noResult">{{ $t( 'default.noresults' ) }}</span>
                            </multiselect>
                            <div class="multiselect__caret">
                                <img src="~/assets/img/ico-select-turqy.svg">
                            </div>
                        </div>
                    </div>-->
                </div>
                <div class="form__row">
                    <!--<div class="input input--multiselect input--1-4">
                        <label class="label">by My Role</label>
                        <div class="multiselect__wrap">
                            <multiselect placeholder="Myrole"
                                select-label="Enter doesn’t work here!"
                                :value="selectMyrole.value"
                                :options="selectMyrole.options"
                                :multiple="false"
                                :searchable="true"
                                :showLabels="false"
                                :allow-empty="false" open-direction="bottom"
                                :hide-selected="true"
                                @input="onselectMyroleChange" >
                                <span slot="noResult">{{ $t( 'default.noresults' ) }}</span>
                            </multiselect>
                            <div class="multiselect__caret">
                                <img src="~/assets/img/ico-select-turqy.svg">
                            </div>
                        </div>
                    </div>-->

                    <div class="input input--multiselect input--1-4">
                        <label class="label">by Publication</label>
                        <div class="multiselect__wrap">
                            <multiselect
                                :value="getStatusById(filters.status)"
                                 track-by="id"
                                 label="name"
                                :options="statuses"
                                :multiple="false"
                                :showLabels="false"
                                :allow-empty="true" open-direction="bottom"
                                @input="onFilterChanged('status', $event.id)" >
                                <span slot="noResult">{{ $t( 'default.noresults' ) }}</span>
                            </multiselect>
                            <div class="multiselect__caret">
                                <img src="~/assets/img/ico-select-turqy.svg">
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <!--<section class="section section--tags">
                <h4 class="c-title--modal mb-6">
                    Filters
                </h4>
                <ul>
                    <li>
                        <div class="tag__item">Lorem</div>
                        <a href="" class="tag__close">
                            <img src="~/assets/img/ico-close-popup.svg">
                        </a>
                    </li>
                    <li>
                        <div class="tag__item">Ipsum</div>
                        <a href="" class="tag__close">
                            <img src="~/assets/img/ico-close-popup.svg">
                        </a>
                    </li>
                    <li>
                        <div class="tag__item">Dolor sit</div>
                        <a href="" class="tag__close">
                            <img src="~/assets/img/ico-close-popup.svg">
                        </a>
                    </li>
                </ul>
            </section>-->
            <section class="mt-10">
                <button type="button" @click="resetFilters" class="btn--border-turqy btn--opacity--child">
                    <span class="btn--opacity__target">{{ $t( 'default.filters.reset' ) }}</span>
                </button>
                <button type="button" @click="popupState({active: false})" class="btn--border-turqy btn--opacity--child">
                    <span class="btn--opacity__target">{{ $t( 'default.filters.apply' ) }}</span>
                    <img src="~/assets/img/ico-filters-turqy.svg">
                </button>
            </section>

        </form>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: 'popup-assessments-filter',
    data() {
        return {
            years: ['2020', '2021'],
            statuses: [
                {id: 90, name: this.$t('assessments.statuses.90')},
                {id: 80, name: this.$t('assessments.statuses.80')},
                {id: 10, name: this.$t('assessments.statuses.10')}
            ]
        }
    },
    computed: {
        ...mapState({
            filters: state => state.assessments.filters,
            countries: state => state.countries.list,
        })
    },
    methods: {
        ...mapActions({
            popupState: 'popup/popupState',
            resetFilters: 'assessments/resetFilters',
            filter: 'assessments/filter',
            removeFilter: 'assessments/removeFilter'
        }),
        onFilterChanged(name, value) {
            if(value) {
                this.filter({name, value});
            } else {
                this.removeFilter(name);
            }
        },
        getCountryByCode(code) {
            return this.countries.filter(country => country.code === code)[0];
        },
        getStatusById(id) {
            if(id) {
                return this.statuses.filter(status => status.id === id)[0]
            }
        }
    }
}
</script>
