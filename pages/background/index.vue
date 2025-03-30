<template>
    <article class="page page--flushed">
        <section class="section section--main">
            <img src="~/assets/img/methodology-section.jpg" alt="" />
        </section>
        <section class="section" v-html="content" />
        <section class="section" style="margin-top: 0;">
            <div class="container">
                <div class="info-block">
                    <h2 class="c-title--md">{{ $t('pages.background.attribute_title.heading') }}</h2>
                    <table class="table-background">
                        <tbody>
                            <tr>
                                <th>{{ $t('pages.background.attribute_title.name') }}</th>
                                <th>{{ $t('pages.background.attribute_title.description') }}</th>
                                <th>{{ $t('pages.background.attribute_title.useIf') }}</th>
                            </tr>
                            <template v-for="(attribute, index) in attributes">
                                <tr>
                                    <td>
                                        <p>{{ index+1 }}. {{ attribute.name }}</p>
                                    </td>
                                    <td>
                                        <p>{{ attribute.description }}</p>
                                    </td>
                                    <td>
                                        <p>{{ $t('pages.background.attribute_use.' + (index+1)) }}</p>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
                <div class="info-block">
                    <table class="table-background">
                        <tbody>
                            <tr>
                                <th>{{ $t('pages.background.attribute') }}</th>
                                <th>{{ $t('pages.background.questions') }}</th>
                            </tr>
                            <template v-for="(attribute, index) in attributes">
                                <tr>
                                    <td>
                                        <p>{{ index+1 }}. {{ attribute.name }}</p>
                                    </td>
                                    <td>
                                        <template v-for="(question, index) in getAttributeQuestions(attribute)">
                                            <p>(Q{{ question.number }}) {{ question.text }}</p>
                                        </template>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </article>
</template>

<script>
import locales from '../../locales';
import { mapState } from 'vuex';

export default {
    name: 'background',
    auth: false,
    computed: {
        ...mapState({
            attributes: (state) => state.attributes.list,
            questions: (state) => state.surveyquestions.list,
        }),
        content() {
            const currentLanguage = this.$i18n.locales.find(
                (lang) => lang.code === this.$i18n.locale,
            );
            console.log(this.attributes);
            console.log(this.questions);
            return locales[currentLanguage.code].background;
        },
    },
    methods: {
        getAttributeQuestions(attribute) {
            return this.questions.filter(
                (question) => question.attribute === attribute.id,
            );
        },
    },
};
</script>
