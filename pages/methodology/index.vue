<template>
  <article class="page page--flushed">
    <section class="section section--main">
      <img src="~/assets/img/methodology-section.jpg" />
    </section>
    <section class="section">
      <div class="container">
        <h1 class="c-title--main">{{ $t('pages.methodology.title') }}</h1>
        <div class="g-grid--5 flex items-center">
          <div class="g-colspan--3-full-md">
            <div class="info-block">
              <h4 class="c-title--md">{{ $t('pages.methodology.mainPurposeTitle') }}</h4>
                <template v-html="$t('pages.methodology.mainPurposeContent')" />
            </div>
          </div>
          <div class="g-colspan--4-full-md">
            <div class="elinor-card__icons">
              <h4 class="elinor-card__icons-title">
                <span class="elinor-card__icons-title-info">{{ $t('pages.methodology.assessment') }}</span>
              </h4>
              <div class="g-grid--3-1-sm flex items-stretch">
                <div class="elinor-card__icons__item">
                  <p class="elinor-card__icons__item-title">
                      {{ $t('pages.methodology.backgroundInformation') }}
                  </p>
                  <img
                    src="~/assets/img/background-information.svg"
                    alt="background-information"
                  />
                </div>
                <div class="elinor-card__icons__item">
                  <p class="elinor-card__icons__item-title">{{ $t('pages.methodology.numberQuestions') }}</p>
                  <img src="~/assets/img/questions.svg" alt="questions" />
                </div>
                <div class="elinor-card__icons__item">
                  <p class="elinor-card__icons__item-title">
                      {{ $t('pages.methodology.timeframe') }}
                  </p>
                  <img src="~/assets/img/calendar.svg" alt="calendar" />
                </div>
              </div>
            </div>
          </div>
          <div class="g-colspan--3-full-md">
            <div class="info-block">
              <h4 class="c-title--md">{{ $t('pages.methodology.backgroundInformationCollected') }}</h4>
              <ul class="list-disc list-inside list--small" v-html="$t('pages.methodology.backgroundInformationCollectedContent') " />
            </div>
          </div>
          <div class="col-span-full">
            <div class="info-block">
              <h4 class="c-title--md">{{ $t('pages.methodology.surveyQuestions') }}</h4>
              <ul class="elinor__survey-navigator elinor__survey-navigator--no-border">
                <li v-for="item in items" v-bind:key="item.id">
                  <a href="#" class="btn--opacity"> </a>
                </li>
              </ul>
              <div class="elinor__navigator-category">
                <NuxtLink to="" class="elinor__navigator-category__link btn--opacity--child">
                  <span class="elinor__navigator-category__text btn--opacity__target">{{ $t('pages.methodology.goToCategory') }}</span>
                  <img src="~/assets/img/ico-arrow-bottom-turqy.svg" alt="ico-arrow-bottom-turqy">
                </NuxtLink>
              </div>
              <div v-for="question in Object.keys($t('pages.methodology.questions'))" class="elinor__survey-list elinor__survey-list--row">
                <div class="elinor__survey-question ui-rounded-border">
                  <div class="left">
                    <div class="txt">{{ question }}</div>
                    <div class="left__item">
                      <div class="question">{{ $t('pages.methodology.questions.' + question + '.title') }}</div>
                      <p>{{ $t('pages.methodology.questions.' + question + '.explanation') }}</p>
                    </div>
                  </div>
                  <div class="right">
                    <div v-for="answer in Object.keys($t('pages.methodology.questions.' + question + '.answers'))" class="right__item">
                      <div class="txt">Q{{ answer }}</div>
                      <div class="answer">
                          {{ $t('pages.methodology.questions.' + question + '.answers.' + answer) }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
export default {
  name: "methodology",
  auth: false,
  data: function () {
    return {
      items: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
        { id: 10 },
        { id: 11 },
        { id: 12 },
        { id: 13 },
        { id: 14 },
        { id: 15 },
        { id: 16 },
        { id: 17 },
        { id: 18 },
        { id: 19 },
        { id: 20 },
        { id: 21 },
        { id: 22 },
        { id: 23 },
        { id: 24 },
        { id: 25 },
        { id: 26 },
        { id: 27 },
        { id: 28 },
        { id: 29 },
        { id: 30 },
        { id: 31 },
        { id: 32 },
      ],
    };
  },
};
</script>
