<template>
    <ul class="elinor__people ui-rounded-border">
        <li class="elinor__people-header">
            {{ $t( 'pages.assessments.content.assessment.tabs.info.data.people-consulted.title' ) }}
        </li>
        <li class="elinor__people-data">
            <span>{{ assessment[ 'people-manager' ] }}</span> {{ $t( 'pages.assessments.content.assessment.tabs.info.data.people-consulted.labels.manager' ) }} 
        </li>
        <li class="elinor__people-data">
            <span>{{ assessment[ 'people-personnel' ] }}</span> {{ $t( 'pages.assessments.content.assessment.tabs.info.data.people-consulted.labels.ma-personnel' ) }}
        </li>
        <li class="elinor__people-data">
            <span>{{ assessment[ 'people-government-personnel' ] }}</span> {{ $t( 'pages.assessments.content.assessment.tabs.info.data.people-consulted.labels.government-personnel' ) }}
        </li>
        <li class="elinor__people-data">
            <span>{{ assessment[ 'people-community-members' ] }}</span> {{ $t( 'pages.assessments.content.assessment.tabs.info.data.people-consulted.labels.local-members' ) }}
        </li>
        <li class="elinor__people-data">
            <span>{{ assessment[ 'people-community-leaders' ] }}</span> {{ $t( 'pages.assessments.content.assessment.tabs.info.data.people-consulted.labels.leaders' ) }}
        </li>
        <li class="elinor__people-data">
            <span>{{ people }}</span> {{ $t( 'pages.assessments.content.assessment.tabs.info.data.people-consulted.labels.total' ) }}
        </li>
    </ul>
</template>

<script>
export default {
    name: 'assessment-people',
    computed: {
        assessment() {
            return this.$store.state.assessments.assessment
        },
        people() {
            return this.assessment[ 'people-manager' ] + this.assessment[ 'people-personnel' ] + this.assessment[ 'people-government-personnel' ] + this.assessment[ 'people-community-members' ] + this.assessment[ 'people-community-leaders' ]
        }
    }
}
</script>