<template>
    <section class="section section--assessment-edit-data">
        <div class="container">
            <header>
                <h2>{{ $t( 'pages.assessments.content.assessment-edit.tabs.data.tab' ) }}</h2>
            </header>
        </div>
        <form class="form form--assessment-data" ref="editAssessment" @submit="submit">
            <div class="form__group">
                <div class="container--sm">
                    <div class="form__row">
                        <div class="input input--multiselect">
                            <label class="label">{{ $t( 'pages.assessments.content.assessment-edit.tabs.data.labels.year' ) }}*</label>
                            <div class="multiselect__wrap">
                                <multiselect :value="assessment.year != '' ? assessment.year : selectYear.value" :options="selectYear.options" :multiple="false" :searchable="true" :showLabels="false" :allow-empty="false" :hide-selected="true" @input="selectYearChange">
                                    <span slot="noResult">{{ $t( 'default.noresults' ) }}</span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                            <input type="hidden" name="year" class="input__dummy" :value="selectYear.value">
                        </div>
                    </div>
                    <div class="form__row">
                        <div class="input">
                            <label class="label">{{ $t( 'pages.assessments.content.assessment-edit.tabs.data.labels.name' ) }}*</label>
                            <input type="text" name="name" :value="assessment.name" @change="submit">
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="form__row form__row--separator form__row--separator--16"></div>
                </div>
                <div class="container--sm">
                    <div class="form__row form__row--mt-16">
                        <div class="input input--multiselect">
                            <label class="label">{{ $t( 'pages.assessments.content.assessment-edit.tabs.data.labels.institution' ) }}*</label>
                            <input type="text" name="institution" :value="assessment.institution" @change="submit">
                        </div>
                    </div>                   
                    <div class="form__row">
                        <div class="input input--multiselect">
                            <label class="label">{{ $t( 'pages.assessments.content.assessment-edit.tabs.data.labels.role' ) }}*</label>
                            <div class="multiselect__wrap">
                                <multiselect :value="assessment.role != '' ? assessment.role : selectRole.value" :options="selectRole.options" :multiple="false" :searchable="true" :showLabels="false" :allow-empty="false" :hide-selected="true" @input="selectRoleChange">
                                    <span slot="noResult">{{ $t( 'default.noresults' ) }}</span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                            <input type="hidden" name="role" class="input__dummy" :value="selectRole.value">
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="form__row form__row--separator form__row--separator--16"></div>
                </div>
                <div class="container--sm"> 
                    <div class="form__row form__row--mt-16">
                        <div class="input">
                             <label class="label">{{ $t( 'pages.assessments.content.assessment-edit.tabs.data.labels.people.title' ) }}</label>
                        </div>
                    </div>              
                    <div class="form__row ">
                        <div class="input input--multiselect input--1-2 input--flexy">
                            <div class="multiselect__wrap">
                                <input type="hidden" name="people-manager" class="input__dummy" :value="selectPeopleManager.value">
                                <multiselect placeholder="00" :value="assessment[ 'people-manager' ] != '' ? assessment[ 'people-manager' ] : selectPeopleManager.value" :options="selectPeopleManager.options" :multiple="false" :searchable="true" :showLabels="false" :allow-empty="false" :hide-selected="true" @input="selectPeopleManagerChange">
                                    <span slot="noResult">{{ $t( 'default.noresults' ) }}</span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                            <label class="label">{{ $t( 'pages.assessments.content.assessment-edit.tabs.data.labels.people.manager' ) }}</label>
                        </div>
                        <div class="input input--multiselect input--1-2 input--flexy">
                            <div class="multiselect__wrap">
                                <input type="hidden" name="people-personnel" class="input__dummy" :value="selectPeoplePersonnel.value">
                                <multiselect placeholder="00" :value="assessment[ 'people-personnel' ] != '' ? assessment[ 'people-personnel' ] : selectPeoplePersonnel.value" :options="selectPeoplePersonnel.options" :multiple="false" :searchable="true" :showLabels="false" :allow-empty="false" :hide-selected="true" @input="selectPeoplePersonnelChange">
                                    <span slot="noResult">{{ $t( 'default.noresults' ) }}</span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                            <label class="label">{{ $t( 'pages.assessments.content.assessment-edit.tabs.data.labels.people.personnel' ) }}</label>
                        </div>
                    </div>
                    <div class="form__row ">
                        <div class="input input--multiselect input--1-2 input--flexy">
                            <div class="multiselect__wrap">
                                <input type="hidden" name="people-government-personnel" class="input__dummy" :value="selectPeopleGovPersonnel.value">
                                <multiselect placeholder="00" :value="assessment[ 'people-government-personnel' ] != '' ? assessment[ 'people-government-personnel' ] : selectPeopleGovPersonnel.value" :options="selectPeopleGovPersonnel.options" :multiple="false" :searchable="true" :showLabels="false" :allow-empty="false" :hide-selected="true" @input="selectPeopleGovPersonnelChange">
                                    <span slot="noResult">{{ $t( 'default.noresults' ) }}</span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                            <label class="label">{{ $t( 'pages.assessments.content.assessment-edit.tabs.data.labels.people.government-personnel' ) }}</label>
                        </div>
                        <div class="input input--multiselect input--1-2 input--flexy">
                            <div class="multiselect__wrap">
                                <input type="hidden" name="people-community-members" class="input__dummy" :value="selectPeopleCommunityMembers.value">
                                <multiselect placeholder="00" :value="assessment[ 'people-community-members' ] != '' ? assessment[ 'people-community-members' ] : selectPeopleCommunityMembers.value" :options="selectPeopleCommunityMembers.options" :multiple="false" :searchable="true" :showLabels="false" :allow-empty="false" :hide-selected="true" @input="selectPeopleCommunityMembersChange">
                                    <span slot="noResult">{{ $t( 'default.noresults' ) }}</span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                            <label class="label">{{ $t( 'pages.assessments.content.assessment-edit.tabs.data.labels.people.community-members' ) }}</label>
                        </div>
                    </div>
                    <div class="form__row ">
                        <div class="input input--multiselect input--1-2 input--flexy">
                            <div class="multiselect__wrap">
                                <input type="hidden" name="people-community-leaders" class="input__dummy" :value="selectPeopleComLeaders.value">
                                <multiselect placeholder="00" :value="assessment[ 'people-community-leaders' ] != '' ? assessment[ 'people-community-leaders' ] : selectPeopleComLeaders.value" :options="selectPeopleComLeaders.options" :multiple="false" :searchable="true" :showLabels="false" :allow-empty="false" :hide-selected="true" @input="selectPeopleComLeadersChange">
                                    <span slot="noResult">{{ $t( 'default.noresults' ) }}</span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                            <label class="label">{{ $t( 'pages.assessments.content.assessment-edit.tabs.data.labels.people.community-leaders' ) }}</label>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="form__row form__row--separator form__row--separator--16"></div>
                </div>
                <div class="container--sm">
                    <div class="form__row form__row--mt-16">
                        <div class="input input--radios">
                            <label class="label">{{ $t( 'pages.assessments.content.assessment-edit.tabs.data.labels.authority' ) }}</label>
                            <div class="radios__wrap">
                                <div class="radio__wrap">
                                    <div class="radio">
                                        <input type="radio" name="authority" id="authority-yes" @change="submit" value="true" :checked="authority">
                                        <img src="~/assets/img/ico-ok.svg">
                                    </div>
                                    <label for="authority-yes" class="label">{{ $t( 'default.yes' ) }}</label>
                                </div>
                                <div class="radio__wrap">
                                    <div class="radio">
                                        <input type="radio" name="authority" id="authority-no" @change="submit" value="false" :checked="!authority">
                                        <img src="~/assets/img/ico-ok.svg">
                                    </div>
                                    <label for="authority-no" class="label">{{ $t( 'default.no' ) }}</label>
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
                        <div class="input input--file">
                            <label class="label">{{ $t( 'pages.assessments.content.assessment-edit.tabs.data.labels.ma-file' ) }}</label>
                            <div class="file">                                
                                <div class="file__drag">
                                    <input type="hidden" name="management-plan">
                                    <input type="file" name="management-plan-file" ref="managementFile">
                                    <img src="~/assets/img/ico-file-drag-turqy.svg">
                                    <span>{{ $t( 'default.upload-file.placeholder' ) }}</span>
                                </div>
                                <div class="file__buttons">
                                    <button type="button" class="btn--border-turqy btn--opacity--child" @click="managementUploadTrigger">
                                        <img src="~/assets/img/ico-file-turqy.svg">
                                        <span class="btn--opacity__target">{{ $t( 'default.upload-file.buttons.select' ) }}</span>
                                    </button>
                                    <button type="button" class="btn--border-turqy btn--opacity--child">
                                        <img src="~/assets/img/ico-clear-turqy.svg">
                                        <span class="btn--opacity__target">{{ $t( 'default.upload-file.buttons.clear' ) }}</span>
                                    </button>
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
import Multiselect from 'vue-multiselect'
import { mapActions } from 'vuex'
export default {
    name: 'assessment-edit-data',
    layout: 'assessment-edit',
    data () {
        return {
            id: this.$route.params.id,
            selectYear: {
                value: null,
                options: [ "2020", "2021", "2030" ]
            },
            selectRole: {
                value: null,
                options: [ "Admin", "Contributor", "Observer" ]
            },
            selectPeopleManager: {
                value: null,
                options: [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10" ]
            },
            selectPeoplePersonnel: {
                value: null,
                options: [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10" ]
            },
            selectPeopleGovPersonnel: {
                value: null,
                options: [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10" ]
            },
            selectPeopleCommunityMembers: {
                value: null,
                options: [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10" ]
            },
            selectPeopleComLeaders: {
                value: null,
                options: [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10" ]
            },
            authority: null
        }
    },
    computed: {
        assessment() {
            return this.$store.state.assessments.assessment
        }
    },
    watch: {
        'assessment'() {
            this.selectYear.value = this.assessment.year
            this.selectRole.value = this.assessment.role
            this.selectPeopleManager.value = this.assessment[ 'people-manager' ]
            this.selectPeoplePersonnel.value = this.assessment[ 'people-personnel' ]
            this.selectPeopleGovPersonnel.value = this.assessment[ 'people-government-personnel' ]
            this.selectPeopleCommunityMembers.value = this.assessment[ 'people-community-members' ]
            this.selectPeopleComLeaders.value = this.assessment[ 'people-community-leaders' ]
            this.authority = this.assessment[ 'authoriy' ]
        }
    },
    methods: {
        ...mapActions({
            editAssessment: 'assessments/editAssessment'
        }),
        selectYearChange( value ) {
            this.selectYear.value = parseInt( value )
             this.submit()
        },
        selectRoleChange( value ) {
            this.selectRole.value = value
            this.submit()
        },
        selectPeopleManagerChange( value ) {
            this.selectPeopleManager.value = value
            this.submit()
        },
        selectPeoplePersonnelChange( value ) {
            this.selectPeoplePersonnel.value = value
            this.submit()
        },
        selectPeopleGovPersonnelChange( value ) {
            this.selectPeopleGovPersonnel.value = value
            this.submit()
        },
        selectPeopleCommunityMembersChange( value ) {
            this.selectPeopleCommunityMembers.value = value
            this.submit()
        },
        selectPeopleComLeadersChange( value ) {
            this.selectPeopleComLeaders.value = value
            this.submit()
        },
        managementUploadTrigger() {
            this.$refs.managementFile.click()
        },
        submit() {
            event.preventDefault()
            setTimeout( function() {
                this.editAssessment( {
                form: this.$refs.editAssessment,
                id: this.id
                })
            }.bind( this ), 300)
        }
    }
}
</script>