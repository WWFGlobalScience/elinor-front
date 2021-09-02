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
                                <multiselect :value="assessment.year" :options="years" :multiple="false" :searchable="true" :showLabels="false" :allow-empty="false" :hide-selected="true" @input="save('year', $event)">
                                    <span slot="noResult">{{ $t( 'default.noresults' ) }}</span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                            <input type="hidden" name="year" class="input__dummy" :value="assessment.year">
                        </div>
                    </div>
                    <div class="form__row">
                        <div class="input">
                            <label class="label">{{ $t( 'pages.assessments.content.assessment-edit.tabs.data.labels.name' ) }}*</label>
                            <input type="text" name="name" :value="assessment.name" @change="save('name', $event.target.value)">
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
                                <multiselect :value="parseInt(assessment.person_responsible_role)" :options="roles" label="name" track-by="id" :multiple="false" :searchable="false" :showLabels="false" :allow-empty="false" :hide-selected="false" @input="save('person_responsible_role', $event.id)">
                                    <template slot="singleLabel" slot-scope="{ option }">{{ option.name }}</template>
                                    <span slot="noResult">{{ $t( 'default.noresults' ) }}</span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                            <input type="hidden" name="person_responsible_role" class="input__dummy" :value="assessment.person_responsible_role">
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
                                <input type="hidden" name="count_manager" class="input__dummy" :value="assessment.count_manager">
                                <multiselect placeholder="00" :value="assessment.count_manager" :options="counts" :multiple="false" :searchable="true" :showLabels="false" :allow-empty="false" :hide-selected="true" @input="save('count_manager', $event)">
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
                                <input type="hidden" name="count_personnel" class="input__dummy" :value="assessment.count_personnel">
                                <multiselect placeholder="00" :value="assessment.count_personnel" :options="counts" :multiple="false" :searchable="true" :showLabels="false" :allow-empty="false" :hide-selected="true" @input="save('count_personnel', $event)">
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
                                <input type="hidden" name="count_government" class="input__dummy" :value="assessment.count_government">
                                <multiselect placeholder="00" :value="assessment.count_government" :options="counts" :multiple="false" :searchable="true" :showLabels="false" :allow-empty="false" :hide-selected="true" @input="save('count_government', $event)">
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
                                <input type="hidden" name="count_community" class="input__dummy" :value="assessment.count_community">
                                <multiselect placeholder="00" :value="assessment.count_community" :options="counts" :multiple="false" :searchable="true" :showLabels="false" :allow-empty="false" :hide-selected="true" @input="save('count_community', $event)">
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
                                <input type="hidden" name="count_committee" class="input__dummy" :value="assessment.count_committee">
                                <multiselect placeholder="00" :value="assessment.count_committee" :options="counts" :multiple="false" :searchable="true" :showLabels="false" :allow-empty="false" :hide-selected="true" @input="save('count_committee', $event)">
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
                                        <input type="radio" name="consent_given" id="authority-yes" @change="save('consent_given', true)" :checked="assessment.consent_given">
                                        <img src="~/assets/img/ico-ok.svg">
                                    </div>
                                    <label for="authority-yes" class="label">{{ $t( 'default.yes' ) }}</label>
                                </div>
                                <div class="radio__wrap">
                                    <div class="radio">
                                        <input type="radio" name="consent_given" id="authority-no" @change="save('consent_given', false)" :checked="!assessment.consent_given">
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
import { mapActions } from 'vuex'
export default {
    name: 'assessment-edit-data',
    layout: 'assessment-edit',
    data () {
        return {
            id: this.$route.params.id,
            years: ['2020', '2021', '2030'],
            roles: [
                {id: 10, name: 'Non profit'},
                {id: 20, name: 'Manager'},
                {id: 30, name: 'Personnel'},
                {id: 40, name: 'Government'},
                {id: 50, name: 'Committee'},
                {id: 60, name: 'Community'}
            ],
            counts: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        }
    },
    computed: {
        assessment() {
            return this.$store.state.assessments.assessment
        }
    },
    methods: {
        ...mapActions({
            editAssessment: 'assessments/editAssessment',
            editAssessmentField: 'assessments/editAssessmentField'
        }),
        managementUploadTrigger() {
            this.$refs.managementFile.click()
        },
        save(field, value) {
            this.editAssessmentField( {field, value, id: this.id});
        },
        submit() {
            event.preventDefault()
            this.editAssessment( {
                    form: this.$refs.editAssessment,
                    id: this.id
            });
        }
    }
}
</script>
