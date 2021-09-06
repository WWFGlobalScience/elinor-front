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
                                select-label="Enter doesn’t work here!" 
                                :value="selectCountries.value" 
                                :options="selectCountries.options" 
                                :multiple="false" 
                                :searchable="true" 
                                :showLabels="false" 
                                :allow-empty="false" 
                                :hide-selected="true" 
                                @input="onselectCountriesChange" >
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
                            <multiselect placeholder="2020" 
                                select-label="Enter doesn’t work here!" 
                                :value="selectYear.value" 
                                :options="selectYear.options" 
                                :multiple="false" 
                                :searchable="true" 
                                :showLabels="false" 
                                :allow-empty="false" 
                                :hide-selected="true" 
                                @input="onselectYearChange" >
                                <span slot="noResult">{{ $t( 'default.noresults' ) }}</span>
                            </multiselect>
                            <div class="multiselect__caret">
                                <img src="~/assets/img/ico-select-turqy.svg">
                            </div>
                        </div>
                    </div>

                    <div class="input input--multiselect input--1-6">
                        <label class="label">by Score</label>
                        <div class="multiselect__wrap">
                            <multiselect placeholder="100" 
                                select-label="Enter doesn’t work here!" 
                                :value="selectScore.value" 
                                :options="selectScore.options" 
                                :multiple="false" 
                                :searchable="true" 
                                :showLabels="false" 
                                :allow-empty="false" 
                                :hide-selected="true" 
                                @input="onselectScoreChange" >
                                <span slot="noResult">{{ $t( 'default.noresults' ) }}</span>
                            </multiselect>
                            <div class="multiselect__caret">
                                <img src="~/assets/img/ico-select-turqy.svg">
                            </div>
                        </div>
                    </div>

                    <div class="input input--multiselect input--1-6">
                        <label class="label">by Completation</label>
                        <div class="multiselect__wrap">
                            <multiselect placeholder="50%" 
                                select-label="Enter doesn’t work here!" 
                                :value="selectCompletation.value" 
                                :options="selectCompletation.options" 
                                :multiple="false" 
                                :searchable="true" 
                                :showLabels="false" 
                                :allow-empty="false" 
                                :hide-selected="true" 
                                @input="onselectCompletationChange" >
                                <span slot="noResult">{{ $t( 'default.noresults' ) }}</span>
                            </multiselect>
                            <div class="multiselect__caret">
                                <img src="~/assets/img/ico-select-turqy.svg">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form__row">
                    <div class="input input--multiselect input--1-4">
                        <label class="label">by My Role</label>
                        <div class="multiselect__wrap">
                            <multiselect placeholder="Myrole" 
                                select-label="Enter doesn’t work here!" 
                                :value="selectMyrole.value" 
                                :options="selectMyrole.options" 
                                :multiple="false" 
                                :searchable="true" 
                                :showLabels="false" 
                                :allow-empty="false" 
                                :hide-selected="true" 
                                @input="onselectMyroleChange" >
                                <span slot="noResult">{{ $t( 'default.noresults' ) }}</span>
                            </multiselect>
                            <div class="multiselect__caret">
                                <img src="~/assets/img/ico-select-turqy.svg">
                            </div>
                        </div>
                    </div>

                    <div class="input input--multiselect input--1-4">
                        <label class="label">by Publication</label>
                        <div class="multiselect__wrap">
                            <multiselect placeholder="2020" 
                                select-label="Enter doesn’t work here!" 
                                :value="selectPublication.value" 
                                :options="selectPublication.options" 
                                :multiple="false" 
                                :searchable="true" 
                                :showLabels="false" 
                                :allow-empty="false" 
                                :hide-selected="true" 
                                @input="onselectPublicationChange" >
                                <span slot="noResult">{{ $t( 'default.noresults' ) }}</span>
                            </multiselect>
                            <div class="multiselect__caret">
                                <img src="~/assets/img/ico-select-turqy.svg">
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <section class="section section--tags">
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
            </section>
            <section class="mt-10">
                <button type="button" class="btn--border-turqy btn--opacity--child">
                    <span class="btn--opacity__target">{{ $t( 'default.filters.button' ) }}</span>
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
        data () {
        return {
            selectCountries: {               
                tocuhed: false,
                value: null,
                options: [ '' ]
            },
            selectYear: {               
                tocuhed: false,
                value: null,
                options: [ '' ]
            },
            selectScore: {               
                tocuhed: false,
                value: null,
                options: [ '' ]
            },
            selectCompletation: {               
                tocuhed: false,
                value: null,
                options: [ '' ]
            },
            selectMyrole: {               
                tocuhed: false,
                value: null,
                options: [ '' ]
            },
            selectPublication: {               
                tocuhed: false,
                value: null,
                options: [ '' ]
            }
        }
    }
}
</script>