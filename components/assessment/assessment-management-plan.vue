<template>
    <section v-if="assessment.management_plan_file" class="section section--ma-data">
        <div class="container">
            <header class="header--ma-data">
                <h3>{{ $t('pages.assessments.view.tabs.info.managementPlanFileTitle') }}</h3>
            </header>

            <div class="elinor__data-wrap">
                <div class="elinor__data-list">
                    <ul class="elinor__data-grid elinor__data-grid--3-5">
                        <li class="elinor__data elinor__data--full">
                            <span class="title">{{ $t('pages.assessments.view.tabs.info.labels.managementPlanFile') }}</span>
                            <span class="data"><a target="_blank" :href="assessment.management_plan_file">{{ assessment.management_plan_file }}</a></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'assessment-management-plan',
    computed: {
        ...mapState({
            assessment: state => state.assessments.assessment,
        })
    }
}
</script>
