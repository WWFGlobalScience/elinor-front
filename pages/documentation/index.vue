<template>
    <article class="page page--documentation">

        <div class="page--assessments__top">
            <img src="~/assets/img/assessment-bg.svg" alt="assessment top bg" class="page--assessments__top-img">
            <documentation-header></documentation-header>
        </div>

        <div class="container">
            <documentation-intro/>
            <documentation-title/>
        </div>

        <section class="section section--mt-medium section--documentation">
            <div class="container">
                <documentation-card v-for="(document, index) in documents" :document="document" :key="index"/>
                <div class="row-btn row-btn--center">
                    <documentation-btn-more v-if="nextPage !== null" :load-more="load" />
                </div>
            </div>
        </section>
    </article>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
    name: 'documentation',
    auth: false,
    data() {
        return {
            sortBy: 'publication_date',
            sortOrder: 'desc'
        }
    },
    computed: {
        ...mapState({
            documents: state => state.documents.list,
            nextPage: state => state.documents.pagination.next
        })
    },
    methods: {
        ...mapActions({
            fetchDocuments: "documents/fetchDocuments"
        }),
        load() {
            this.fetchDocuments({page: this.nextPage, sortBy: this.sortBy, sortOrder: this.sortOrder});
        }
    },
    mounted() {
        this.load();
    }
}
</script>
