<template>
    <section class="section section--ma-edit-selector">
        <div class="container">
            <header>
                <h2>Edit Managed Areaaaa</h2>
            </header>
        </div>
        <form class="form form--ma-selector">
            <div class="form__group">
                <div class="container--sm">
                    <div class="form__row">
                        <div class="input">
                            <label class="label">Name of new managed area*</label>
                            <input type="text" name="name" placeholder="Name here" :value="managementArea.name" @change="save('name', $event.target.value)">
                        </div>
                    </div>
                    <div class="form__row">
                        <div class="input input--multiselect">
                            <label class="label">What is the name of the larger PA/CA this MA is contained within?*</label>
                            <div class="multiselect__wrap">
                                <multiselect
                                    :value="managementArea.protected_area"
                                    track-by="id"
                                    label="name"
                                    :options="protectedAreas"
                                    :multiple="false" :searchable="true" :showLabels="false"
                                    :allow-empty="false" :hide-selected="true"
                                    @input="onSelectChanged('protected_area', $event)"
                                    @search-change="onSelectSearch('protectedareas/fetchProtectedAreas', $event)">
                                    <span slot="noResult" slot-scope="props">{{ $t('default.noresults') }} </span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--<div class="form__row">
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
                    </div>-->
                    <div class="form__row">
                        <div class="input input-1-2 input--date">
                            <label class="label">Date of formal establishment</label>
                            <div class="date__wrap">
                                <date-picker placeholder="MM/DD/YYYY" format="MM/dd/yyyy" :value="managementArea.date_established" @selected="onDateEstablishmentSelected" />
                                <div class="date__caret">
                                    <img src="~/assets/img/ico-date-turqy.svg">
                                </div>
                            </div>
                        </div>
                        <div class="input input-1-2">
                            <label class="label">Size of Managed Area</label>
                            <input type="number" name="ha" placeholder="0000 Ha" :value="managementArea.reported_size" @change="save('reported_size', $event.target.value)">
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
                                <multiselect
                                    :value="managementArea.governance_type"
                                    track-by="id"
                                    label="name"
                                    :options="governanceTypes"
                                    :multiple="false" :searchable="true" :showLabels="false"
                                    :allow-empty="false" :hide-selected="true"
                                    @input="onSelectChanged('governance_type', $event)"
                                    @search-change="onSelectSearch('governancetypes/fetchGovernanceTypes', $event)">
                                    <span slot="noResult" slot-scope="props">{{ $t('default.noresults') }} </span>
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
                                <multiselect class="multiselect--num"
                                    :value="managementArea.management_authority"
                                    track-by="id"
                                    label="name"
                                    :options="authorities"
                                    :multiple="false" :searchable="true" :showLabels="false"
                                    :allow-empty="false" :hide-selected="true"
                                    @input="onSelectChanged('management_authority', $event)"
                                    @search-change="onSelectSearch('managementareas/fetchAuthorities', $event)">
                                    <span slot="noResult" slot-scope="props">{{ $t('default.noresults') }} </span>
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
                                <multiselect
                                    :value="managementArea.stakeholder_groups"
                                    track-by="id"
                                    label="name"
                                    :options="stakeholderGroups"
                                    :multiple="true" :searchable="true" :showLabels="false"
                                    :allow-empty="false" :hide-selected="true"
                                    @input="onSelectChanged('stakeholder_groups', $event)"
                                    @search-change="onSelectSearch('countries/fetchCountries', $event)">
                                    <span slot="noResult" slot-scope="props">{{ $t('default.noresults') }} </span>
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
                                <multiselect
                                    :value="managementArea.support_sources"
                                    track-by="id"
                                    label="name"
                                    :options="supportSources"
                                    :multiple="true" :searchable="true" :showLabels="false"
                                    :allow-empty="false" :hide-selected="true"
                                    @input="onSelectChanged('support_sources', $event)"
                                    @search-change="onSelectSearch('supportsources/fetchSupportSources', $event)">
                                    <span slot="noResult" slot-scope="props">{{ $t('default.noresults') }} </span>
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
                                <multiselect
                                    :value="managementArea.countries"
                                    track-by="id"
                                    label="name"
                                    :options="countries"
                                    :multiple="true" :searchable="true" :showLabels="false"
                                    :allow-empty="false" :hide-selected="true"
                                    @input="onSelectChanged('countries', $event)"
                                    @search-change="onSelectSearch('countries/fetchCountries', $event)">
                                    <span slot="noResult" slot-scope="props">{{ $t('default.noresults') }} </span>
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
                                <multiselect
                                    :value="managementArea.regions"
                                    track-by="id"
                                    label="name"
                                    :options="regions"
                                    :multiple="true" :searchable="true" :showLabels="false"
                                    :allow-empty="false" :hide-selected="true"
                                    @input="onSelectChanged('regions', $event)"
                                    @search-change="onSelectSearch('regions/fetchRegions', $event)">
                                    <span slot="noResult" slot-scope="props">{{ $t('default.noresults') }} </span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ma-map-edit></ma-map-edit>

            <div class="form__group">
                <div class="container--sm">
                    <div class="form__row form__row--mt-24">
                        <div class="input input--radios">
                            <label class="label">Does this MA have zones?</label>
                            <div class="radios__wrap">
                                <div class="radio__wrap">
                                    <div class="radio">
                                        <input type="radio" name="consent_given" id="zone-yes" checked>
                                        <img src="~/assets/img/ico-ok.svg">
                                    </div>
                                    <label for="zone-yes" class="label">Yes</label>
                                </div>
                                <div class="radio__wrap">
                                    <div class="radio">
                                        <input type="radio" name="consent_given" id="zone-no">
                                        <img src="~/assets/img/ico-ok.svg">
                                    </div>
                                    <label for="zone-no" class="label">No</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form__row form__row--mt-16">
                        <div class="input input--multiselect">
                            <label class="label">How many zones does the MA have?</label>
                            <div class="multiselect__wrap multiselect__wrap--1-3">
                                <multiselect
                                    :value="managementArea.countries"
                                    track-by="id"
                                    label="name"
                                    :options="countries"
                                    :multiple="true" :searchable="true" :showLabels="false"
                                    :allow-empty="false" :hide-selected="true"
                                    @input="onSelectChanged('countries', $event)"
                                    @search-change="onSelectSearch('countries/fetchCountries', $event)">
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                            
                            <div class="multiselect__extra">

                                <div class="multiselect__form"><!-- Aquest div es repeteix en cas de seleccionar mes d'una zona -->
                                    <div class="form__row form__row--mt-8">
                                        <div class="input">
                                            <label class="label">Name of the zone 1</label>
                                            <input type="text" name="name" placeholder="Zone name 1">
                                        </div>
                                    </div>
                                    <div class="form__row form__row--mt-8">
                                        <div class="input input--multiselect">
                                            <label class="label">Select the level of access the best describes this zone?</label>
                                            <div class="multiselect__wrap">
                                                <multiselect
                                                    :value="managementArea.countries"
                                                    track-by="id"
                                                    label="name"
                                                    :options="countries"
                                                    :multiple="true" :searchable="true" :showLabels="false"
                                                    :allow-empty="false" :hide-selected="true"
                                                    @input="onSelectChanged('countries', $event)"
                                                    @search-change="onSelectSearch('countries/fetchCountries', $event)">
                                                </multiselect>
                                                <div class="multiselect__caret">
                                                    <img src="~/assets/img/ico-select-turqy.svg">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form__row form__row--mt-8">
                                        <div class="input input--pr">
                                            <div class="label">Describe this zone and it's attributes, including allowable or restricted uses, seasonality, and who can and can't access it?</div>
                                            <textarea name="explanation" placeholder="Text here"></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div class="multiselect__form"><!-- Aquest div es repeteix en cas de seleccionar mes d'una zona -->
                                    <div class="form__row form__row--mt-8">
                                        <div class="input">
                                            <label class="label">Name of the zone 2</label>
                                            <input type="text" name="name" placeholder="Zone name 2">
                                        </div>
                                    </div>
                                    <div class="form__row form__row--mt-8">
                                        <div class="input input--multiselect">
                                            <label class="label">Select the level of access the best describes this zone?</label>
                                            <div class="multiselect__wrap">
                                                <multiselect
                                                    :value="managementArea.countries"
                                                    track-by="id"
                                                    label="name"
                                                    :options="countries"
                                                    :multiple="true" :searchable="true" :showLabels="false"
                                                    :allow-empty="false" :hide-selected="true"
                                                    @input="onSelectChanged('countries', $event)"
                                                    @search-change="onSelectSearch('countries/fetchCountries', $event)">
                                                </multiselect>
                                                <div class="multiselect__caret">
                                                    <img src="~/assets/img/ico-select-turqy.svg">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form__row form__row--mt-8">
                                        <div class="input input--pr">
                                            <div class="label">Describe this zone and it's attributes, including allowable or restricted uses, seasonality, and who can and can't access it?</div>
                                            <textarea name="explanation" placeholder="Text here"></textarea>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </form>
        
    </section>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: 'ma-edit-new',
    computed: {
        ...mapState({
            managementArea: state => state.managementareas.instance,
            governanceTypes: state => state.governancetypes.list,
            authorities: state => state.managementareas.authorities,
            stakeholderGroups: state => state.stakeholdergroups.list,
            supportSources: state => state.supportsources.list,
            countries: state => state.countries.list,
            regions: state => state.regions.list,
            protectedAreas: state => state.protectedareas.list,
        })
    },
    methods: {
        save(field, value) {
            this.editManagementAreaField( {field, value, id: this.managementArea.id});
        },
        onSelectSearch(action, search) {
            this.$store.dispatch(action, search)
        },
        onSelectChanged(field, value) {
            this.editManagementAreaField({field, value, id: this.managementArea.id});
        },
        onDateEstablishmentSelected(value) {
            const date = this.$moment(value);
            this.editManagementAreaField({field: 'date_established', value: date.format('YYYY-MM-DD'), id: this.managementArea.id});
        },
        ...mapActions({
            editManagementAreaField: 'managementareas/editManagementAreaField',
        })
    }
}
</script>
