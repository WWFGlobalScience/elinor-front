<template>
    <section class="section section--assessment-survey section--mt-0">
        <div class="container">
            <ul class="elinor__survey-navigator">
                <li v-for="(question, index) in assessment.survey">
                    <a href="#" class="btn--opacity" 
                    v-scroll-to="{
                        el: `#question-${index + 1}`,
                        offset: -70
                    }">
                    </a>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
export default {
    name: 'assessment-survey-navigator',
    props: [ 'assessment' ]
}
</script>