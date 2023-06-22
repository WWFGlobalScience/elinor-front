<template>
    <form action="" class="map-filters absolute z-10 top-4 right-[60px] flex flex-row gap-4">
        <div class="w-[230px]">
            <div class="input input--multiselect">
                <div class="multiselect__wrap multiselect__wrap--map">
                    <!--<multiselect
                        :value="getCountryByCode(management_area_country)"
                        :placeholder="$t('pages.map.filters.form.placeholders.countries')"
                        track-by="code"
                        label="name"
                        :options="management_area_countries"
                        :multiple="false"
                        :showLabels="false"
                        :allow-empty="true"
                        open-direction="bottom"
                        @input="onFilterChanged('management_area_countries', $event.code)"
                    >
                    </multiselect>-->
                    <multiselect 
                        :value="getCountryByCode(management_area_country)"
                        :options="management_area_countries"
                        track-by="code"
                        :searchable="false"
                        :close-on-select="true"
                        :show-labels="false"
                        label="name"
                        :placeholder="$t('pages.map.filters.form.placeholders.countries')"
                        @input="onFilterChanged('management_area_countries', $event? $event.code : null)"
                    ></multiselect>
                    <div class="multiselect__caret">
                        <img src="~/assets/img/ico-select-turqy.svg" alt="" />
                    </div>
                </div>
            </div>
        </div>

        <div class="w-[230px]">
            <div class="input input--multiselect">
                <div class="multiselect__wrap multiselect__wrap--map">
                    <multiselect
                        :value="getAttributeById(attribute)"
                        :placeholder="$t('pages.map.filters.form.placeholders.attributes')"
                        track-by="id"
                        label="name"
                        :options="getAttributes()"
                        :multiple="false"
                        :showLabels="false"
                        :allow-empty="true"
                        open-direction="bottom"
                        @input="onFilterChanged('attributes', $event ? $event.id : null)"
                    >
                    </multiselect>
                    <div class="multiselect__caret">
                        <img src="~/assets/img/ico-select-turqy.svg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
import {mapState, mapActions} from "vuex";

export default {
    name: "map-form",
    mounted() {
        this.$store.dispatch('countries/fetchCountries');
    },
    computed: {
        ...mapState({
            attributes: state => state.attributes.list,
            attribute: state => state.reports.filters.attributes,
            management_area_countries: state => state.countries.management_area_countries,
            management_area_country: state => state.reports.filters.management_area_countries
        })
    },
    methods: {
        ...mapActions({
            resetFilters: 'reports/resetFilters',
            filter: 'reports/filter',
            removeFilter: 'reports/removeFilter'
        }),
        onFilterChanged(name, value) {
            if(value) {
                this.filter({name, value});
            } else {
                this.removeFilter(name);
            }
        },
        getCountryByCode() {
            return this.management_area_countries.filter(country => country.code === this.management_area_country)[0];
        },
        getAttributes(){
            var empty = {'id':0,'name':''}
            return [empty].concat(this.attributes)
        },
        getAttributeById(id) {
            if(id) {
                return this.attributes.filter(attribute => attribute.id === id)[0];
            }
        },
    }
};
</script>
