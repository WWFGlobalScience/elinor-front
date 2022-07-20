<template>
  <article class="page page--flushed">
    <section class="section section--main">
      <img src="~/assets/img/methodology-section.jpg" alt="" />
    </section>
    <section class="section">
      <div class="container">
        <h1 class="c-title--main">{{ $t('pages.methodologyPage.title') }}</h1>
        <div class="g-grid--3-1-lg">
          <div class="g-colspan--2-full-lg">
            <div class="info-block">
              <p>{{ $t('pages.methodologyPage.paragraph1') }}</p>
            </div>
            <div class="info-block d-flex">
              <h2 class="c-title--md">{{ $t('pages.methodologyPage.subtitle1') }}</h2>
              <p>{{ $t('pages.methodologyPage.paragraph2') }}</p>
              <p>{{ $t('pages.methodologyPage.paragraph3') }}</p>
              <div class="flex">
              <a href="/methodology" class="btn btn--opacity--child">
                <span class="btn--opacity__target">{{ $t('pages.methodologyPage.cta1') }}</span> 
                <img src="~/assets/img/ico-download-white.svg" alt="" />
              </a>
              </div>
            </div>
            <div class="info-block">
              <h2 class="c-title--md">{{ $t('pages.methodologyPage.subtitle2') }}</h2>
              <p>{{ $t('pages.methodologyPage.paragraph4') }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>
