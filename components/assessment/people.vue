<template>
    <ul class="elinor__people ui-rounded-border">
        <li class="elinor__people-header">
            {{ $t( 'pages.assessments.content.assessment.tabs.info.data.people-consulted.title' ) }}
        </li>
        <li class="elinor__people-data">
            <span>{{ assessment.count_manager }}</span> {{ $t( 'pages.assessments.content.assessment.tabs.info.data.people-consulted.labels.manager' ) }}
        </li>
        <li class="elinor__people-data">
            <span>{{ assessment.count_personnel }}</span> {{ $t( 'pages.assessments.content.assessment.tabs.info.data.people-consulted.labels.ma-personnel' ) }}
        </li>
        <li class="elinor__people-data">
            <span>{{ assessment.count_government }}</span> {{ $t( 'pages.assessments.content.assessment.tabs.info.data.people-consulted.labels.government-personnel' ) }}
        </li>
        <li class="elinor__people-data">
            <span>{{ assessment.count_committee }}</span> {{ $t( 'pages.assessments.content.assessment.tabs.info.data.people-consulted.labels.local-members' ) }}
        </li>
        <li class="elinor__people-data">
            <span>{{ assessment.count_community }}</span> {{ $t( 'pages.assessments.content.assessment.tabs.info.data.people-consulted.labels.leaders' ) }}
        </li>
        <li class="elinor__people-data">
            <span>{{ assessmentPeople }}</span> {{ $t( 'pages.assessments.content.assessment.tabs.info.data.people-consulted.labels.total' ) }}
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
            return assessment.count_manager + assessment.count_personnel + assessment.count_government + assessment.count_committee + assessment.count_community;
        }
    }
}
</script>
