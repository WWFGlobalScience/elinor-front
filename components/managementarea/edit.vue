<template>
    <section class="section section--ma-edit-selector">
        <div class="container">
            <header>
                <h2>{{ $t( 'managementarea.headers.edit' ) }}</h2>
            </header>
        </div>
        <form class="form form--ma-selector">
            <div class="form__group">
                <div class="container--sm">
                    <div class="form__row">
                        <div class="input input--multiselect">
                            <label class="label">{{ $t( 'managementarea.labels.parent' ) }}</label>
                            <div class="multiselect__wrap">
                                <multiselect v-model="selRelatedMas.value" :options="selRelatedMas.options" :multiple="false" :searchable="true" :showLabels="false" 
                                :custom-label="customLabel" :allow-empty="true" :hide-selected="true" @input="selRelatedMasChange">
                                    <template slot="singleLabel" slot-scope="props">
                                        <span class="option__desc">
                                            <span class="option__title">{{ props.option.name }}</span>
                                        </span>
                                    </template>
                                    <template slot="option" slot-scope="props">
                                        <div class="option__desc">
                                            <span class="option__title">{{ props.option.name }}</span>
                                        </div>
                                    </template>
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
                            <label class="label">{{ $t( 'managementarea.labels.date_established' ) }}</label>
                            <div class="date__wrap">
                                <date-picker :use-utc="false" placeholder="YYYY-MM-DD" format="yyyy-MM-dd" v-model="selDateEstablishment" @input="selDateEstablishmentChange" />
                                <div class="date__caret">
                                    <img src="~/assets/img/ico-date-turqy.svg">
                                </div>
                            </div>
                        </div>
                        <div class="input input-1-2">
                            <label class="label">{{ $t( 'managementarea.labels.reported_size' ) }}</label>
                            <input type="text" name="ha" placeholder="0000 Ha" v-model="selReportedSize" @change="selReportedSizeChange">
                        </div>
                    </div>
                    
                    <div class="form__row">
                        <div class="input input--multiselect">
                            <label class="label">Name of managment authority</label>
                            <input type="text" name="ha" placeholder="0000 Ha" v-model="selMaAuthorities" @change="selMaAuthoritiesChange">
                        </div>
                    </div>
                    <div class="form__row">
                        <div class="input input--multiselect">
                            <label class="label">MA Governance type</label>
                            <div class="multiselect__wrap">
                                <div class="multiselect__wrap">
                                    <multiselect v-model="selGtypes.value" :options="selGtypes.options" :multiple="false" :searchable="true" :allow-empty="true" :hide-selected="true" track-by="name" :custom-label="customLabel" :show-labels="false" :placeholder="$t( 'default.select-single' )" @input="selGtypesChange">
                                        <template slot="singleLabel" slot-scope="props">
                                            <span class="option__desc">
                                                <span class="option__title">{{ props.option.name }}</span>
                                            </span>
                                        </template>
                                        <template slot="option" slot-scope="props">
                                            <div class="option__desc">
                                                <span class="option__title">{{ props.option.name }}</span>
                                            </div>
                                        </template>
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
                <div class="container">
                    <div class="form__row form__row--separator form__row--separator--16"></div>
                </div>
                
                <div class="container--sm"> 
                    
                    <div class="form__row form__row--mt-16">
                        <div class="input input--multiselect">
                            <label class="label">Are the rights of the MA formally recognized at the ...</label>
                            <div class="multiselect__wrap">
                                <multiselect v-model="selRecognition.value" :options="selRecognition.options" :multiple="false" :searchable="true" :showLabels="false" :allow-empty="true" :hide-selected="true" @input="selRecognitionChange">
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
                                <multiselect v-model="selStakeholders.value" :options="selStakeholders.options" :multiple="true" :searchable="true" :showLabels="false" :allow-empty="true" :hide-selected="true" track-by="name" :custom-label="customLabel" :show-labels="false" :placeholder="$t('default.select-multiple')" @input="selStakeholdersChange" >
                                    <template slot="singleLabel" slot-scope="props">
                                        <span class="option__desc">
                                            <span class="option__title">{{ props.option.name }}</span>
                                        </span>
                                    </template>
                                    <template slot="option" slot-scope="props">
                                        <div class="option__desc">
                                            <span class="option__title">{{ props.option.name }}</span>
                                        </div>
                                    </template>
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
                                <multiselect v-model="selSs.value" :options="selSs.options" :multiple="true" :searchable="true" :showLabels="false" :allow-empty="true" :hide-selected="true" track-by="name" :custom-label="customLabel" :show-labels="false" :placeholder="$t('default.select-multiple')" @input="selSsChange" >
                                    <template slot="singleLabel" slot-scope="props">
                                        <span class="option__desc">
                                            <span class="option__title">{{ props.option.name }}</span>
                                        </span>
                                    </template>
                                    <template slot="option" slot-scope="props">
                                        <div class="option__desc">
                                            <span class="option__title">{{ props.option.name }}</span>
                                        </div>
                                    </template>
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
                            <input type="text" name="id" placeholder="00000 Id" v-model="selWDPA" @change="submit">
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
                                <multiselect v-model="selCountries.value" :options="selCountries.options" :multiple="true" :searchable="true" :showLabels="false" :allow-empty="true" :hide-selected="true" :show-labels="false" :placeholder="$t('default.select-multiple')" @input="submit" >
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
                                <multiselect v-model="selProvinces.value" :options="selProvinces.options" :multiple="true" :searchable="true" :showLabels="false" :allow-empty="true" :hide-selected="true" :show-labels="false" :placeholder="$t('default.select-multiple')" @input="submit" >
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
        <!--
        <transition name="fade">
            <default-loader :loaderText="loader.loaderText" v-if="loader.active"></default-loader>
        </transition>
        <transition name="fade">
            <default-notification v-if="error" ></default-notification>
        </transition>
        -->
    </section>
</template>

<script>
import { mapState } from 'vuex'
import qs from 'qs'
import moment from 'moment'
export default {
    name: 'managementarea-edit',
    data() {
        return {
            loader: {
                loaderText: this.$t( 'loading.updating' ),
                active: false
            },
            error: false,
            selRelatedMas: null,
            selDateEstablishment: null,
            selReportedSize: null,
            selMaAuthorities: null,
            selGtypes: null,
            selRecognition: null,
            selStakeholders: null,
            selSs: null,
            selWDPA: null,
            selCountries: null,
            selProvinces: null
        }
    },
    computed: {
        ...mapState({
            mas: state => state.managementareas.mas,
            ma: state => state.managementareas.ma
        })
    },
    created() { 
        this.selRelatedMas = {
            value: this.mas.versions.filter( version => version.id == this.ma.root.parent ),
            options: this.mas.versions.filter( version => version.id != this.ma.version.id )
        }
        this.selDateEstablishment = moment( this.ma.version.date_established ).toDate()
        this.selReportedSize = this.ma.version.reported_size
        this.selMaAuthorities = this.mas.authorities.find( authority => authority.id == this.ma.version.management_authority).name
        this.selGtypes = {
            value: this.ma.gtype,
            options: this.mas.gtypes
        }
        this.selRecognition = {
            value: this.ma.version.recognition_level,
            options: [ this.$t( 'managementarea.data.recognition_level_local' ), this.$t( 'managementarea.data.recognition_level_national' )]
        }
        this.selStakeholders = {
            value: this.ma.stakeholdergroups,
            options: this.mas.stakeholdergroups
        }
        this.selSs = {
            value: this.ma.ss,
            options: this.mas.ss
        }
        this.selWDPA = this.ma.pa.wdpa_id,
        this.selCountries = {
            value: this.ma.version.countries,
            options: [ 'Country here', 'Country here']
        }
        this.selProvinces = {
            value: null,
            options: [ 'Region here', 'Region here']
        }
    },
    methods: {
        customLabel ({ name }) {
            return `${name}`
        },
        selRelatedMasChange() {
            this.$store.dispatch( 'managementareas/updateRoot', this.selRelatedMas.value )
            this.submit()
        },
        selDateEstablishmentChange() {
            this.$store.dispatch( 
                'managementareas/updateVersionDateEstablishment', 
                moment( this.selDateEstablishment ).format( 'YYYY-MM-DD' )
            )
            this.submit()
        },
        selReportedSizeChange() {
            this.$store.dispatch( 'managementareas/updateVersionReportedSize', parseFloat( this.selReportedSize ) )
            this.submit()
        },
        selMaAuthoritiesChange() {
            this.$store.dispatch( 'managementareas/updateVersionAuthority', this.selMaAuthorities )
            this.submit()
        },
        selGtypesChange() {
            this.$store.dispatch( 'managementareas/updateVersionGtype', this.selGtypes.value )
            this.submit()
        },
        selRecognitionChange() {
            this.$store.dispatch( 'managementareas/updateVersionRecognition', this.selRecognition.value )
            this.submit()
        },
        selStakeholdersChange() {
            this.$store.dispatch( 'managementareas/updateVersionStakeholdergroups', this.selStakeholders.value )
            this.submit()
        },
        selSsChange() {
            this.$store.dispatch( 'managementareas/updateVersionSs', this.selSs.value )
            this.submit()
        },
        submit( ) {
            event.preventDefault()
            this.$store.dispatch( 'managementareas/updateMa' )
            /*
            this.loader.active = true
            this.$axios({
                method: 'put',
                url: `https://60c19fea4f7e880017dbfed8.mockapi.io/api/v1/managementareas/${this.ma.root.id}`,
                data: {
                    parent: this.selRelatedMas.value.id
                }
            }).then( (response )=> {
                console.log( response )
                this.$axios({
                    method: 'put',
                    url: `https://60c19fea4f7e880017dbfed8.mockapi.io/api/v1/managementareaversions/${this.ma.version.id}`,
                    data: {
                        reported_size: this.reportedSize,
                        management_authority: this.selMaAuthorities.value,
                        recognition_level: this.selRecognition.value,
                        stakeholder_groups: this.selStakeholders.value.map(({ id }) => parseInt(id)),
                        support_sources: this.selSs.value.map(({ id }) => parseInt(id))
                    }
                    
                }).then( ( response ) => {
                    console.log( response )
                    this.$axios({
                        method: 'put',
                        url: `https://60c19fea4f7e880017dbfed8.mockapi.io/api/v1/protectedareas/${this.ma.pa.id}`,
                        data: {
                            wdpa_id: this.wdpaId
                        }
                    
                    }).then( ( response ) => {
                        console.log( response )
                        this.loader.active = false
                    }).catch( ( error ) => {
                        this.error = true
                        console.log( error )
                    })
                }).catch( ( error ) => {
                    this.error = true
                    console.log( error )
                }).then( () => {
                    this.loader.active = false
                })
            }).catch( ( error ) => {
                this.error = true
                console.log( error )
            })
            */
            
            
        }
    }
}
</script>