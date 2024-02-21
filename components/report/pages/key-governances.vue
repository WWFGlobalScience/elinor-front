<template>
    <div id="key-governances" class="page-report page-report--map relative">
        <report-aside-map />
        <div class="content-report">
            <report-header />
            <div v-if="keys" class="h-full pt-8 static">
                <div class="flex flex-col gap-10">
                    <div class="keys-card ui-rounded-border">
                        <h4 class="title uppercase font-montserratSemiBoldPdf">
                            {{ $t('pages.assessments.actions.generateReport.strengths.title') }}
                        </h4>
                        <ul class="list-keys list-keys--xl key-ok">
                            <li v-for="key in keys.slice(0, 3)" class="text-medium">
                                {{ key.name }}
                            </li>
                        </ul>
                        <p class="break-words font-montserratMediumPdf mt-4 text-grayy-lighter max-w-{720px}">
                            {{ form.strengths }}
                        </p>
                    </div>

                    <div class="keys-card ui-rounded-border">
                        <h4 class="title uppercase font-montserratSemiBoldPdf">
                            {{ $t('pages.assessments.actions.generateReport.needs.title') }}
                        </h4>
                        <ul class="list-keys list-keys--xl key-ko">
                            <li v-for="key in keys.length > 3 ? keys.slice(3).slice(-3) : []" class="text-medium">
                                {{ key.name }}
                            </li>
                        </ul>
                        <p class="break-words font-montserratMediumPdf mt-4 text-grayy-lighter max-w-{720px}">
                            {{ form.needs }}
                        </p>
                    </div>

                    <div class="keys-card ui-rounded-border">
                        <h4 class="title uppercase font-montserratSemiBoldPdf">
                            {{ $t('pages.assessments.actions.generateReport.context.title') }}
                        </h4>
                        <p class="font-montserratMediumPdf text-grayy-lighter max-w-{720px}">
                            {{ form.context }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'report-pages-key-governances',
    props: ['keys', 'form']
};
</script>
