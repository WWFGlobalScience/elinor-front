<template>
    <article class="page page--flushed">
        <section class="section section--main">
            <img src="~/assets/img/methodology-section.jpg" alt="" />
        </section>
        <section class="section">
            <div class="container">
                <h1 class="c-title--main">
                    {{ $t('pages.methodologyPage.title') }}
                </h1>
                <div class="g-grid--4-1-lg">
                    <div class="g-colspan--3-full-lg">
                        <div class="info-block">
                            <p>{{ $t('pages.methodologyPage.paragraph1') }}</p>
                        </div>
                        <div class="info-block d-flex">
                            <h2 class="c-title--md">
                                {{ $t('pages.methodologyPage.subtitle1') }}
                            </h2>
                            <p>{{ $t('pages.methodologyPage.paragraph2') }}</p>
                            <p>{{ $t('pages.methodologyPage.paragraph3') }}</p>
                            <div class="flex">
                                <a
                                    target="_blank"
                                    href="https://elinor-user-files.s3.amazonaws.com/dev/Document/2/Elinor_assessment_tool_protocol_v2022.1.pdf"
                                    class="btn btn--opacity--child"
                                >
                                    <span class="btn--opacity__target">{{
                                        $t('pages.methodologyPage.cta1')
                                    }}</span>
                                    <img
                                        src="~/assets/img/ico-download-white.svg"
                                        alt=""
                                    />
                                </a>
                            </div>
                        </div>
                        <div class="info-block">
                            <h2 class="c-title--md">
                                {{ $t('pages.methodologyPage.subtitle2') }}
                            </h2>
                            <p>{{ $t('pages.methodologyPage.paragraph4') }}</p>
                        </div>
                        <div class="info-block">
                            <h2 class="c-title--md">
                                {{ $t('pages.methodologyPage.subtitle3') }}
                            </h2>
                            <p>{{ $t('pages.methodologyPage.paragraph5') }}</p>
                        </div>
                        <score-table />
                    </div>
                </div>
            </div>
        </section>
    </article>
</template>

<script>
import scoreTable from '~/components/methodology/score-table.vue';
export default {
    components: { scoreTable },
    name: 'methodology',
    auth: false,
};
</script>
