<template>
    <section class="section section--ma-edit-selector">
        <div class="container">
            <header>
                <h2>Create New Managed Area</h2>
            </header>
        </div>
        <form class="form form--ma-selector">
            <div class="form__group">
                <div class="container--sm">
                    <div class="form__row">
                        <div class="input">
                            <label class="label">Name of new managed area*</label>
                            <input type="text" name="name" placeholder="Name here">
                        </div>
                    </div>
                    <div class="form__row">
                        <div class="input">
                            <label class="label">What is the name of the larger PA/CA this MA is contained within?*</label>
                            <input type="text" name="name" placeholder="Protected Area">
                        </div>
                    </div>
                    <div class="form__row">
                        <div class="input input--multiselect">
                            <label class="label">Are there there other Managment Areas related to this?</label>
                            <div class="multiselect__wrap">
                                <multiselect :value="selectRelatedMas.value" :options="selectRelatedMas.options" :multiple="true" :searchable="true" :showLabels="false" :allow-empty="true" :hide-selected="true" @input="selectRelatedMasChange">
                                    <span slot="noResult">{{ $t( 'default.noresults' ) }}</span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form__row">
                        <div class="input input-1-2 input--date">
                            <label class="label">Date of formal establishment</label>
                            <div class="date__wrap">
                                <date-picker placeholder="MM/DD/YYYY" format="MM/dd/yyyy" v-model="dateEstablishment" />
                                <div class="date__caret">
                                    <img src="~/assets/img/ico-date-turqy.svg">
                                </div>
                            </div>
                        </div>
                        <div class="input input-1-2">
                            <label class="label">Size of Managed Area</label>
                            <input type="text" name="ha" placeholder="0000 Ha">
                        </div>
                    </div>
                    <div class="form__row">
                        <div class="input">
                            <label class="label">Name of managment authority</label>
                            <input type="text" name="name" placeholder="Protected Area">
                        </div>
                    </div>
                    <div class="form__row">
                        <div class="input input--multiselect">
                            <label class="label">MA Governance type</label>
                            <div class="multiselect__wrap">
                                <multiselect :value="governanceType.value" :options="governanceType.options" :multiple="false" :searchable="true" :showLabels="false" :allow-empty="true" :hide-selected="true" @input="governanceTypeChange">
                                    <span slot="noResult">{{ $t( 'default.noresults' ) }}</span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="form__row form__row--separator form__row--separator--16"></div>
                </div>
                <div class="container--sm"> 
                    <div class="form__row form__row--mt-16">
                        <div class="input input--multiselect">
                            <label class="label">Are the rights of the MA formally recognized at the ...</label>
                            <div class="multiselect__wrap">
                                <multiselect :value="maRights.value" :options="maRights.options" :multiple="true" :searchable="true" :showLabels="false" :allow-empty="true" :hide-selected="true" @input="maRightsChange">
                                    <span slot="noResult">{{ $t( 'default.noresults' ) }}</span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div class="form__row">
                        <div class="input input--multiselect">
                            <label class="label">Key stakeholder groups</label>
                            <div class="multiselect__wrap">
                                <multiselect :value="stakeholderGroups.value" :options="stakeholderGroups.options" :multiple="true" :searchable="true" :showLabels="false" :allow-empty="true" :hide-selected="true" @input="stakeholderGroupsChange">
                                    <span slot="noResult">{{ $t( 'default.noresults' ) }}</span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div class="form__row">
                        <div class="input input--multiselect">
                            <label class="label">Does the MA management authority receive technical, financial or other types of support from any of the following groups or organizations?</label>
                            <div class="multiselect__wrap">
                                <multiselect :value="authoritySupport.value" :options="authoritySupport.options" :multiple="true" :searchable="true" :showLabels="false" :allow-empty="true" :hide-selected="true" @input="authoritySupportChange">
                                    <span slot="noResult">{{ $t( 'default.noresults' ) }}</span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div class="form__row">
                        <div class="input input--1-2">
                            <label class="label">If this managed area is associated with an id in the World Database on Protected Areas (WDPA), please enter that id?</label>
                            <input type="text" name="id" placeholder="00000 Id">
                        </div>
                    </div> 
                </div>
                <div class="container">
                    <div class="form__row form__row--separator form__row--separator--16"></div>
                </div>
                <div class="container--sm"> 
                    <div class="form__row form__row--mt-16">
                        <div class="input input--multiselect">
                            <label class="label">MA Countries</label>
                            <div class="multiselect__wrap">
                                <multiselect :value="maCountries.value" :options="maCountries.options" :multiple="true" :searchable="true" :showLabels="false" :allow-empty="true" :hide-selected="true" @input="maCountriesChange">
                                    <span slot="noResult">{{ $t( 'default.noresults' ) }}</span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div class="form__row">
                        <div class="input input--multiselect">
                            <label class="label">MA States / Provinces</label>
                            <div class="multiselect__wrap">
                                <multiselect :value="maProvinces.value" :options="maProvinces.options" :multiple="true" :searchable="true" :showLabels="false" :allow-empty="true" :hide-selected="true" @input="maProvincesChange">
                                    <span slot="noResult">{{ $t( 'default.noresults' ) }}</span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </form>
        <ma-map-edit></ma-map-edit>
    </section>
</template>

<script>
export default {
    name: 'ma-edit-new',
    data() {
        return {
            selectRelatedMas: {
                value: null,
                options: [ 'Management Area 1', 'Management Area 2', 'Management Area 3', 'Management Area 4', 'Management Area 5']
            },
            governanceType: {
                value: null,
                options: [ 'Governance Lorem', 'Governance Lorem', 'Governance Lorem', 'Governance Lorem', 'Governance Lorem']
            },
            maRights: {
                value: null,
                options: [ 'Local level', 'National Level']
            },
            stakeholderGroups: {
                value: null,
                options: [ 'Local community', 'NGO']
            },
            authoritySupport: {
                value: null,
                options: [ 'Private sector', 'NGO']
            },
            maCountries: {
                value: null,
                options: [ 'Country here', 'Country here']
            },
            maProvinces: {
                value: null,
                options: [ 'Region here', 'Region here']
            },
            dateEstablishment: null
        }
    },
    methods: {
        selectRelatedMasChange( value ) {
            this.selectRelatedMas.value = value
        },
        governanceTypeChange( value ) {
            this.governanceType.value = value
        },
        maRightsChange( value ) {
            this.maRights.value = value
        },
        stakeholderGroupsChange( value ) {
            this.stakeholderGroups.value = value
        },
        authoritySupportChange( value ) {
            this.authoritySupport.value = value
        },
        maCountriesChange( value ) {
            this.maCountries.value = value
        },
        maProvincesChange( value ) {
            this.maProvinces.value = value
        }
    }
}
</script>