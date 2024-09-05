<template>
    <ul class="elinor__people ui-rounded-border">
        <li class="elinor__people-header">
            {{ $t('pages.assessments.view.tabs.info.people.title') }}
        </li>
        <li class="elinor__people-data">
            <span>{{ assessment.count_community }}</span> {{ $t('pages.assessments.view.tabs.info.people.community') }}
        </li>
        <li class="elinor__people-data">
            <span>{{ assessment.count_ngo }}</span> {{ $t('pages.assessments.view.tabs.info.people.ngo') }}
        </li>
        <li class="elinor__people-data">
            <span>{{ assessment.count_academic }}</span> {{ $t('pages.assessments.view.tabs.info.people.academic') }}
        </li>
        <li class="elinor__people-data">
            <span>{{ assessment.count_government }}</span> {{ $t('pages.assessments.view.tabs.info.people.government') }}
        </li>
        <li class="elinor__people-data">
            <span>{{ assessment.count_private }}</span> {{ $t('pages.assessments.view.tabs.info.people.private') }}
        </li>
        <li class="elinor__people-data">
            <span>{{ assessment.count_indigenous }}</span> {{ $t('pages.assessments.view.tabs.info.people.indigenous') }}
        </li>
        <li class="elinor__people-data">
            <span>{{ total }}</span> {{ $t('pages.assessments.view.tabs.info.people.total') }}
        </li>
        <li class="elinor__people-data"> </li>
        <li class="elinor__people-data"> </li>
        <li class="elinor__people-header">
            {{ $t('pages.assessments.view.tabs.info.gender.title') }}
        </li>
        <li class="elinor__people-data">
            <span>{{ assessment.count_gender_female }}</span> {{ $t('pages.assessments.view.tabs.info.gender.female') }}
        </li>
        <li class="elinor__people-data">
            <span>{{ assessment.count_gender_male }}</span> {{ $t('pages.assessments.view.tabs.info.gender.male') }}
        </li>
        <li class="elinor__people-data">
            <span>{{ assessment.count_gender_nonbinary }}</span> {{ $t('pages.assessments.view.tabs.info.gender.nonbinary') }}
        </li>
        <li class="elinor__people-data">
            <span>{{ assessment.count_gender_prefer_not_say }}</span> {{ $t('pages.assessments.view.tabs.info.gender.prefer_not_to_say') }}
        </li>
        <li class="elinor__people-data">
            <span>{{ totalGender }}</span> {{ $t('pages.assessments.view.tabs.info.gender.total') }}
        </li>
    </ul>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'assessment-people',
    computed: {
        ...mapState({
            assessment: state => state.assessments.assessment
        }),
        total() {
            return this.assessment.count_community + this.assessment.count_academic + this.assessment.count_government + this.assessment.count_private + this.assessment.count_indigenous;
        },
        totalGender() {
            return this.assessment.count_gender_female + this.assessment.count_gender_male + this.assessment.count_gender_nonbinary + this.assessment.count_gender_prefer_not_say;
        }
    }
}
</script>
