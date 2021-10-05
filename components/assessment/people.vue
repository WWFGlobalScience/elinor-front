<template>
    <ul class="elinor__people ui-rounded-border">
        <li class="elinor__people-header">
            {{ $t( 'pages.assessments.content.assessment.tabs.info.data.people-consulted.title' ) }}
        </li>
        <li class="elinor__people-data">
            <span>{{ assessment.count_community }}</span> {{ $t( 'pages.assessments.content.assessment.tabs.info.data.people-consulted.labels.community' ) }}
        </li>
        <li class="elinor__people-data">
            <span>{{ assessment.count_ngo }}</span> {{ $t( 'pages.assessments.content.assessment.tabs.info.data.people-consulted.labels.ngo' ) }}
        </li>
        <li class="elinor__people-data">
            <span>{{ assessment.count_academic }}</span> {{ $t( 'pages.assessments.content.assessment.tabs.info.data.people-consulted.labels.academic' ) }}
        </li>
        <li class="elinor__people-data">
            <span>{{ assessment.count_government }}</span> {{ $t( 'pages.assessments.content.assessment.tabs.info.data.people-consulted.labels.government' ) }}
        </li>
        <li class="elinor__people-data">
            <span>{{ assessment.count_private }}</span> {{ $t( 'pages.assessments.content.assessment.tabs.info.data.people-consulted.labels.private' ) }}
        </li>
        <li class="elinor__people-data">
            <span>{{ assessment.count_indigenous }}</span> {{ $t( 'pages.assessments.content.assessment.tabs.info.data.people-consulted.labels.indigenous' ) }}
        </li>
        <li class="elinor__people-data">
            <span>{{ total }}</span> {{ $t( 'pages.assessments.content.assessment.tabs.info.data.people-consulted.labels.total' ) }}
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
        }
    }
}
</script>
