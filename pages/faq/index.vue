<template>
    <article class="page page--flushed">
        <section class="section section--main">
            <img src="~/assets/img/faq-section.jpg"/>
        </section>
        <section class="section section--text">
            <div class="container">
                <h1 class="c-title--main">{{ $t('pages.faqs.header.title') }}</h1>
                <template v-for="(faq, index) in faqs">
                    <div v-if="faq.type === 'default'" class="g-grid--5 flex items-center">
                        <div class="g-colspan--4-full-md">
                            <div class="elinor-card--question">
                                <span class="elinor-card--question__number">{{ index + 1}}</span>
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
                    <div v-if="faq.type === 'box'" class="g-grid--5 flex items-center">
                        <div class="g-colspan--3-full-md">
                            <div class="elinor-card--question">
                                <span class="elinor-card--question__number">{{ index + 1 }}</span>
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
                    </div>
                </template>
            </div>
        </section>
    </article>
</template>

<script>
import faqs from '../../content/faqs.js';

export default {
    name: "faq",
    auth: false,
    data() {
        return {
            faqs
        }
    }
};
</script>
