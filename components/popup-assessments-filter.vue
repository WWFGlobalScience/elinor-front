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
                options: ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"],
            },
            selectYear: {               
                tocuhed: false,
                value: null,
                options: [ '2021', '2020' ]
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
                options: [ 'Admin', 'Collaborator', 'Observer' ]
            },
            selectPublication: {               
                tocuhed: false,
                value: null,
                options: [ '2021', '2020' ]
            }
        }
    }
}
</script>