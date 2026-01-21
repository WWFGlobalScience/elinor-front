<template>
    <div class="elinor-card__document ui-rounded-border">
        <div class="header">
            <div class="title-group">
                <div class="ico">
                    <img src="~/assets/img/ico-book.svg" alt="" />
                </div>
                <div class="text-group">
                    <h3 class="title">Name</h3>
                    <p class="text">{{ document.name }}</p>
                </div>
            </div>
            <div class="info-group">
                <div class="date">{{ document.publication_date }}</div>
                <a
                    @click="downloadDocument(document)"
                    role="button"
                    title="download"
                    class="ico ico-download"
                >
                    <div class="ico-wrap">
                        <img
                            src="~/assets/img/ico-download.svg"
                            alt="download"
                        />
                    </div>
                    <span>pdf</span>
                </a>
            </div>
        </div>
        <div class="body">
            <div class="text-group">
                <h4 class="title">{{ $t('default.version') }}</h4>
                <p class="text">{{ document.version }}</p>
            </div>
            <div class="text-group">
                <h4 class="title">{{ $t('default.description') }}</h4>
                <p class="text">{{ document.description }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'documentation-card',
    props: ['document'],
    methods: {
        ...mapActions({
            downloadDocument: 'documents/downloadDocument',
        }),
    },
};
</script>
