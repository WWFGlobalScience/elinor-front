<template>
  <article class="page page--flushed page--faq">
    <section class="section section--banner">
      <img src="~/assets/img/faq-section.jpg" alt="" />
      <div class="container">
        <h1>
          {{ $t('pages.faqs.header.title') }}
        </h1>
      </div>
    </section>
    <section class="section section--text section--faq">
      <div class="container">
        <template v-for="(faq, index) in faqs">
          <accordion
            :index="index + 1"
            :title="faq.title"
            :content="faq.text"
          />
          <!-- <div
                        v-if="faq.type === 'default'"
                        class="g-grid--5 flex items-center"
                    >
                        <div class="g-colspan--4-full-md">
                            <div class="elinor-card--question">
                                <span class="elinor-card--question__number">{{
                                    index + 1
                                }}</span>
                                <div class="elinor-card--question__info">
                                    <h4 class="c-title--md">
                                        {{ faq.title }}
                                    </h4>
                                    <div v-html="faq.text"></div>
                                </div>
                            </div>
                        </div>
                        <div class="g-colspan--1-full-md"></div>
                    </div>
                    <div
                        v-if="faq.type === 'box'"
                        class="g-grid--5 flex items-center"
                    >
                        <div class="g-colspan--3-full-md">
                            <div class="elinor-card--question">
                                <span class="elinor-card--question__number">{{
                                    index + 1
                                }}</span>
                                <div class="elinor-card--question__info">
                                    <h4 class="c-title--md">{{ faq.title }}</h4>
                                    <div v-html="faq.text"></div>
                                </div>
                            </div>
                        </div>
                        <div class="g-colspan--2-full-md">
                            <div class="elinor-card__detail">
                                <p>
                                    {{ faq.text_box }}
                                </p>
                            </div>
                        </div>
                    </div> -->
        </template>
      </div>
    </section>
  </article>
</template>

<script>
import locales from '../../locales';
import Accordion from '~/components/accordion';
export default {
  name: 'faq',
  components: {
    Accordion,
  },
  auth: false,
  computed: {
    faqs() {
      const currentLanguage = this.$i18n.locales.find(
        (lang) => lang.code === this.$i18n.locale,
      );
      return locales[currentLanguage.code].faqs;
    },
  },
};
</script>
