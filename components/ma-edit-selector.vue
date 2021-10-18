<template>
    <section class="section section--ma-edit-selector">
        <div class="container">
            <header>
                <h2>{{ $t('pages.assessments.edit.tabs.managementArea.selector.title') }}</h2>
            </header>
        </div>
        <form class="form form--ma-selector">
            <div class="form__group">
                <div class="container--sm">
                    <div class="form__row">
                        <div class="input input--multiselect">
                            <label class="label">{{ $t('pages.assessments.edit.tabs.managementArea.selector.existing') }}</label>
                            <div class="multiselect__wrap">
                                <multiselect
                                    :value="instance.parent"
                                    track-by="id"
                                    label="name"
                                    :options="managementAreas"
                                    :multiple="false" :searchable="true" :showLabels="false"
                                    :allow-empty="false" open-direction="bottom" :hide-selected="true"
                                    @input="onManagementAreaSelect"
                                    @search-change="fetchManagementAreas">
                                    <span slot="noResult" slot-scope="props">{{ $t('default.noresults') }} </span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                            <div class="legend mt-2">{{ $t('pages.assessments.edit.tabs.managementArea.selector.existingGuide') }}</div>
                        </div>
                    </div>
                    <div class="form__row">
                        <div class="input input--button">
                            <label class="label label--stripped"><span>{{ $t('pages.assessments.edit.tabs.managementArea.selector.orNew') }}</span></label>
                            <button type="button" class="btn--border-turqy btn--opacity--child btn--arrow-down" @click="onManagementAreaNew(assessment)">
                                <span>{{ $t('pages.assessments.edit.tabs.managementArea.selector.newButton') }}</span>
                                <img src="~/assets/img/ico-arrow-bottom-turqy.svg">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
import {mapActions, mapState} from "vuex"
export default {
    name: 'management-area-edit-selector',
    computed: {
        ...mapState({
            assessment: state => state.assessments.assessment,
            managementAreas: state => state.managementareas.list,
            instance: state => state.managementareas.instance,
        })
    },
    methods: {
        ...mapActions({
            fetchManagementAreas: 'managementareas/fetchManagementAreas',
            onManagementAreaNew: 'managementareas/onManagementAreaNew',
            onManagementAreaSelected: 'managementareas/onManagementAreaSelected'
        }),
        onManagementAreaSelect(managementArea) {
            this.onManagementAreaSelected({managementArea, assessmentId: this.assessment.id})
        }
    }

}
</script>
