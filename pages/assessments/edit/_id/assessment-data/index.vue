<template>
    <section class="section section--assessment-edit-data">
        <div class="container">
            <header>
                <h2>{{ $t('pages.assessments.content.assessment-edit.tabs.data.tab') }}</h2>
            </header>
        </div>
        <form class="form form--assessment-data" ref="editAssessment" @submit="submit">
            <div class="form__group">
                <div class="container--sm">
                    <div class="form__row">
                        <div class="input input--multiselect">
                            <label class="label">{{
                                    $t('pages.assessments.content.assessment-edit.tabs.data.labels.year')
                                }}*</label>
                            <div class="multiselect__wrap">
                                <multiselect :value="assessment.year" :options="years" :multiple="false"
                                             :searchable="true" :showLabels="false" :allow-empty="false" open-direction="bottom"
                                             :hide-selected="true" @input="save('year', $event)">
                                    <span slot="noResult">{{ $t('default.noresults') }}</span>
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
                            <label class="label">{{
                                    $t('pages.assessments.content.assessment-edit.tabs.data.labels.name')
                                }}*</label>
                            <input type="text" name="name" :value="assessment.name"
                                   @change="save('name', $event.target.value)">
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="form__row form__row--separator form__row--separator--16"></div>
                </div>
                <div class="container--sm">
                    <div class="form__row form__row--mt-16">
                        <div class="input input--multiselect">
                            <label class="label">{{
                                    $t('pages.assessments.content.assessment-edit.tabs.data.labels.institution')
                                }}*</label>
                            <div class="multiselect__wrap">
                                <multiselect
                                    select-label="Enter doesn’t work here!"
                                    :value="assessment.organization"
                                    track-by="id"
                                    label="name"
                                    :options="organizations"
                                    :multiple="false" :searchable="true" :showLabels="false"
                                    :allow-empty="false" open-direction="bottom" :hide-selected="true"
                                    @input="onOrganizationSelected"
                                    @search-change="fetchOrganizations">
                                    <span slot="noResult" slot-scope="props" class="text-xxs text-grayy-lighter">{{ $t('default.noresults') }} ({{ props.search }}) <hr class="my-4"> <button @click="$event.preventDefault();$event.stopPropagation(); createOrganization(props.search)" role="button" class="btn btn--sm btn--border-turqy mt-2">{{ $t('default.create') }}</button></span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form__row">
                        <div class="input input--multiselect">
                            <label class="label">{{
                                    $t('pages.assessments.content.assessment-edit.tabs.data.labels.role')
                                }}*</label>
                            <div class="multiselect__wrap">
                                <multiselect :value="person_responsible_role" :options="roles" label="name"
                                             track-by="id" :multiple="false" :searchable="false" :showLabels="false"
                                             :allow-empty="false" open-direction="bottom" :hide-selected="false"
                                             @input="save('person_responsible_role', $event.id)">
                                    <template slot="singleLabel" slot-scope="{ option }">{{ option.name }}</template>
                                    <span slot="noResult">{{ $t('default.noresults') }}</span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                            <input type="hidden" name="person_responsible_role" class="input__dummy"
                                   :value="assessment.person_responsible_role">
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="form__row form__row--separator form__row--separator--16"></div>
                </div>
                <div class="container--sm">
                    <div class="form__row form__row--mt-16">
                        <div class="input input--multiselect">
                            <label class="label">Please choose which option best describes how information for this assessment was collected</label>
                            <div class="multiselect__wrap">
                                <multiselect :value="collection_method" :options="collection_methods" label="name"
                                             track-by="id" :multiple="false" :searchable="false" :showLabels="false"
                                             :allow-empty="false" open-direction="bottom" :hide-selected="false"
                                             @input="save('collection_method', $event.id)">
                                    <template slot="singleLabel" slot-scope="{ option }">{{ option.name }}</template>
                                    <span slot="noResult">{{ $t('default.noresults') }}</span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                            <input type="hidden" name="person_responsible_role" class="input__dummy"
                                   :value="assessment.collection_method">
                        </div>
                    </div>
                    <div class="form__row">
                        <div class="input input--pr">
                            <div class="label">Please elaborate on how the data were collected and the people/groups whose perspectives are represented in this assessment</div>
                            <textarea name="collection_method_text" placeholder="" @change="save('collection_method_text', $event.target.value)">{{ assessment.collection_method_text }}</textarea>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="form__row form__row--separator form__row--separator--16"></div>
                </div>
                <div class="container--sm">
                    <div class="form__row form__row--mt-16">
                        <div class="input">
                            <label class="label">{{
                                    $t('pages.assessments.content.assessment-edit.tabs.data.labels.people.title')
                                }}</label>
                        </div>
                    </div>
                    <div class="form__row ">
                        <div class="input input--multiselect input--1-2 input--flexy">
                            <div class="multiselect__wrap">
                                <input type="hidden" name="count_community" class="input__dummy"
                                       :value="assessment.count_community">
                                <multiselect placeholder="" :value="assessment.count_community" :options="counts"
                                             :multiple="false" :searchable="true" :showLabels="false"
                                             :allow-empty="false" open-direction="bottom"
                                             @input="save('count_community', $event)">
                                    <span slot="noResult">{{ $t('default.noresults') }}</span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                            <label class="label">{{
                                    $t('pages.assessments.content.assessment-edit.tabs.data.labels.people.community')
                                }}</label>
                        </div>

                        <div class="input input--multiselect input--1-2 input--flexy">
                            <div class="multiselect__wrap">
                                <input type="hidden" name="count_community" class="input__dummy"
                                       :value="assessment.count_ngo">
                                <multiselect placeholder="" :value="assessment.count_ngo" :options="counts"
                                             :multiple="false" :searchable="true" :showLabels="false"
                                             :allow-empty="false" open-direction="bottom"
                                             @input="save('count_ngo', $event)">
                                    <span slot="noResult">{{ $t('default.noresults') }}</span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                            <label class="label">{{
                                    $t('pages.assessments.content.assessment-edit.tabs.data.labels.people.ngo')
                                }}</label>
                        </div>
                    </div>
                    <div class="form__row ">
                        <div class="input input--multiselect input--1-2 input--flexy">
                            <div class="multiselect__wrap">
                                <input type="hidden" name="count_academic" class="input__dummy"
                                       :value="assessment.count_academic">
                                <multiselect placeholder="" :value="assessment.count_academic" :options="counts"
                                             :multiple="false" :searchable="true" :showLabels="false"
                                             :allow-empty="false" open-direction="bottom"
                                             @input="save('count_academic', $event)">
                                    <span slot="noResult">{{ $t('default.noresults') }}</span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                            <label class="label">{{
                                    $t('pages.assessments.content.assessment-edit.tabs.data.labels.people.academic')
                                }}</label>
                        </div>
                        <div class="input input--multiselect input--1-2 input--flexy">
                            <div class="multiselect__wrap">
                                <input type="hidden" name="count_government" class="input__dummy"
                                       :value="assessment.count_government">
                                <multiselect placeholder="" :value="assessment.count_government" :options="counts"
                                             :multiple="false" :searchable="true" :showLabels="false"
                                             :allow-empty="false" open-direction="bottom"
                                             @input="save('count_government', $event)">
                                    <span slot="noResult">{{ $t('default.noresults') }}</span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                            <label class="label">{{
                                    $t('pages.assessments.content.assessment-edit.tabs.data.labels.people.government')
                                }}</label>
                        </div>

                    </div>
                    <div class="form__row ">
                        <div class="input input--multiselect input--1-2 input--flexy">
                            <div class="multiselect__wrap">
                                <input type="hidden" name="count_indigenous" class="input__dummy"
                                       :value="assessment.count_indigenous">
                                <multiselect placeholder="" :value="assessment.count_indigenous" :options="counts"
                                             :multiple="false" :searchable="true" :showLabels="false"
                                             :allow-empty="false" open-direction="bottom"
                                             @input="save('count_indigenous', $event)">
                                    <span slot="noResult">{{ $t('default.noresults') }}</span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                            <label class="label">{{
                                    $t('pages.assessments.content.assessment-edit.tabs.data.labels.people.indigenous')
                                }}</label>
                        </div>
                        <div class="input input--multiselect input--1-2 input--flexy">
                            <div class="multiselect__wrap">
                                <input type="hidden" name="count_private" class="input__dummy"
                                       :value="assessment.count_private">
                                <multiselect placeholder="" :value="assessment.count_private" :options="counts"
                                             :multiple="false" :searchable="true" :showLabels="false"
                                             :allow-empty="false" open-direction="bottom"
                                             @input="save('count_private', $event)">
                                    <span slot="noResult">{{ $t('default.noresults') }}</span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                            <label class="label">{{
                                    $t('pages.assessments.content.assessment-edit.tabs.data.labels.people.private')
                                }}</label>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="form__row form__row--separator form__row--separator--16"></div>
                </div>
                <div class="container--sm">
                    <div class="form__row form__row--mt-16">
                        <div class="input input--radios">
                            <label class="label">{{
                                    $t('pages.assessments.content.assessment-edit.tabs.data.labels.authority')
                                }}</label>
                            <div class="radios__wrap">
                                <div class="radio__wrap">
                                    <div class="radio">
                                        <input type="radio" name="consent_given" id="authority-yes"
                                               @change="save('consent_given', true)"
                                               :checked="assessment.consent_given">
                                        <img src="~/assets/img/ico-ok.svg">
                                    </div>
                                    <label for="authority-yes" class="label">{{ $t('default.yes') }}</label>
                                </div>
                                <div class="radio__wrap">
                                    <div class="radio">
                                        <input type="radio" name="consent_given" id="authority-no"
                                               @change="save('consent_given', false)"
                                               :checked="!assessment.consent_given">
                                        <img src="~/assets/img/ico-ok.svg">
                                    </div>
                                    <label for="authority-no" class="label">{{ $t('default.no') }}</label>
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
                            <label class="label">{{
                                    $t('pages.assessments.content.assessment-edit.tabs.data.labels.ma-file')
                                }}</label>


                            <div v-if="assessment" class="file">
                                <dropzone id="management_plan"
                                          ref="managementPlan"
                                          :options="dropzone"
                                          :useStyling="false"
                                          :destroyDropzone="true"
                                          :useCustomSlot="true"
                                          @vdropzone-file-added="onManagementPlanAdded"
                                >
                                    <div class="file__drag">
                                        <img src="~/assets/img/ico-file-drag-turqy.svg">
                                        <span v-if="!assessment.management_plan_file">{{ $t('default.upload-file.placeholder') }}</span>
                                        <span v-else><a @click.stop :href="assessment.management_plan_file" target="_blank">{{ assessment.management_plan_file }}</a></span>
                                    </div>
                                </dropzone>
                                <div class="file__buttons">
                                    <button @click="managementUploadTrigger" type="button" class="btn--border-turqy btn--opacity--child">
                                        <img src="~/assets/img/ico-file-turqy.svg">
                                        <span class="btn--opacity__target">{{
                                                $t('default.upload-file.buttons.select')
                                            }}</span>
                                    </button>
                                    <button v-if="assessment.management_plan_file" @click="clearManagementPlan" type="button" class="btn--border-turqy btn--opacity--child">
                                        <img src="~/assets/img/ico-clear-turqy.svg">
                                        <span class="btn--opacity__target">{{
                                                $t('default.upload-file.buttons.clear')
                                            }}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="section__bottom">
                        <NuxtLink @click.prevent :to="`/assessments/edit/${id}/managed-area`" class="btn btn--opacity--child">
                            <span class="btn--opacity__target">Next step</span>
                            <img src="~/assets/img/ico-button-arrow.svg" alt="Next step" />
                        </NuxtLink>
                    </div>
                </div>

            </div>
        </form>
    </section>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import Dropzone from 'nuxt-dropzone'

export default {
    name: 'assessment-edit-data',
    layout: 'assessment-edit',
    components: {
        Dropzone
    },
    data() {
        return {
            id: this.$route.params.id,
            years: [new Date().getFullYear() - 2, new Date().getFullYear() - 1, new Date().getFullYear()],
            roles: [
                {id: 10, name: 'Non-profit staff'},
                {id: 20, name: 'Management area manager'},
                {id: 30, name: 'Management area personnel'},
                {id: 40, name: 'Government personnel'},
                {id: 50, name: 'Members of local community or indigenous committees'},
                {id: 60, name: 'Community leaders or representatives'}
            ],
            collection_methods: [
                {id: 10, name: 'Through knowledge of the person(s) responsible for filling out assessment'},
                {id: 20, name: 'Through knowledge of the person(s) responsible for filling our assessment and acquired external input from informal conversations and secondary documents'},
                {id: 30, name: 'Through semi-structured interviews and focus group'},
            ],
            counts: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            dropzone: {
                url: 'none',
                previewTemplate: this.template(),
                uploadMultiple: false,
                acceptedFiles: '.pdf',
                autoQueue: false
            }
        }
    },
    mounted() {
        this.$store.dispatch('organizations/fetchOrganizations', '');
        /*if(this.assessment && this.assessment.management_plan_file) {
            console.log('mounted')
            const path = this.assessment.management_plan_file.split('/');
            const name = path[path.length - 1];
            const url = this.assessment.management_plan_file;
            const file = { name, type: 'application/pdf', size: 12345 };
            console.log(file);
            this.$refs.managementPlan.removeAllFiles();
            this.$refs.managementPlan.manuallyAddFile(file, url);
        }*/
    },
    computed: {
        assessment() {
            return this.$store.state.assessments.assessment;
        },
        person_responsible_role() {
            return this.roles.filter(role => role.id === this.assessment.person_responsible_role);
        },
        collection_method() {
            return this.collection_methods.filter(collectionMethod => collectionMethod.id === this.assessment.collection_method);
        },
        managementPlanFile() {
            if(this.assessment.management_plan_file) {
                const path = this.assessment.management_plan_file.split('/');
                return path[path.length - 1];
            }
        },
        ...mapState({
            organizations: state => state.organizations.list
        })
    },
    methods: {
        ...mapActions({
            editAssessment: 'assessments/editAssessment',
            editAssessmentField: 'assessments/editAssessmentField',
            updateAssessmentProgress: 'assessments/updateAssessmentProgress',
            editAssessmentFileField: 'assessments/editAssessmentFileField',
            fetchOrganizations: 'organizations/fetchOrganizations',
            createOrganization: 'organizations/createOrganization'
        }),
        managementUploadTrigger() {
           this.$refs.managementPlan.$el.click();
        },
        async clearManagementPlan() {
            this.$refs.managementPlan.removeAllFiles();
            await this.editAssessmentField({field: 'management_plan_file', value: null, id: this.id});
            this.$refs.managementPlan.$el.childNodes[0].innerHTML = '<div class="file__drag"><img src="/_nuxt/assets/img/ico-file-drag-turqy.svg"><span>' + this.$t('default.upload-file.placeholder') + '</span></div>';
        },
        save(field, value) {
            this.editAssessmentField({field, value, id: this.id});
        },
        submit() {
            event.preventDefault()
            this.editAssessment({
                form: this.$refs.editAssessment,
                id: this.id
            });
        },
        onOrganizationSelected(organization) {
            this.editAssessmentField({field: 'organization', value: organization, id: this.id});
        },
        async onManagementPlanAdded(file) {
            await this.editAssessmentFileField({field: 'management_plan_file', file, id: this.id});
            this.$refs.managementPlan.$el.childNodes[0].innerHTML = '<div class="file__drag"><img src="/_nuxt/assets/img/ico-file-drag-turqy.svg"><span><a onclick="event.stopPropagation()" href="' + this.assessment.management_plan_file + '" target="_blank">' + this.assessment.management_plan_file + '</a></span></div>';
        },
        template() {
            return `<div></div>`;
        }
    }
}
</script>
