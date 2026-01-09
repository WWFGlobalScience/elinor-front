<template>
  <article class="page page--flushed page--collaboration">
    <section class="section section--banner">
      <img src="~/assets/img/collaboration-section.jpg" alt="" />
      <div class="container">
        <h1>Collaboration</h1>
      </div>
    </section>
    <div class="page--collaboration__content">
      <section class="section section--collaboration">
        <div class="container">
          <div class="collaboration-content">
            <div v-html="$t('pages.collaboration.content1')"></div>
            <div v-html="$t('pages.collaboration.content2')"></div>
            <blockquote>
              {{ $t('pages.collaboration.intro.blockquote') }}
            </blockquote>
            <div class="guidelines-content">
              <h3 class="text-turqy">
                {{ $t('pages.collaboration.guidelines1.title') }}
              </h3>
              <h4>
                {{ $t('pages.collaboration.guidelines1.subtitle') }}
              </h4>
              <div class="guidelines-content__accordion">
                <accordion
                  :index="1"
                  :title="$t('pages.collaboration.guidelines1.question1')"
                  :content="$t('pages.collaboration.guidelines1.answer1')"
                />
                <accordion
                  :index="2"
                  :title="$t('pages.collaboration.guidelines1.question2')"
                  :content="$t('pages.collaboration.guidelines1.answer2')"
                />
              </div>
              <h4>
                {{ $t('pages.collaboration.guidelines2.subtitle') }}
              </h4>
              <p>
                {{ $t('pages.collaboration.guidelines2.text') }}
              </p>
              <div class="guidelines-content__accordion">
                <accordion
                  :index="1"
                  :title="$t('pages.collaboration.guidelines2.question1')"
                  :content="$t('pages.collaboration.guidelines2.answer1')"
                />
                <accordion
                  :index="2"
                  :title="$t('pages.collaboration.guidelines2.question2')"
                  :content="$t('pages.collaboration.guidelines2.answer2')"
                />
                <accordion
                  :index="3"
                  :title="$t('pages.collaboration.guidelines2.question3')"
                  :content="$t('pages.collaboration.guidelines2.answer3')"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </article>
</template>
<script>
import Accordion from '~/components/accordion';

export default {
  name: 'collaboration',
  components: {
    Accordion,
  },
  auth: false,
};
</script>
