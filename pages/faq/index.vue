<template>
  <article class="page page--flushed">
    <section class="section section--main">
      <img src="~/assets/img/faq-section.jpg" />
    </section>
    <section class="section section--text">
      <div class="container">
        <h1 class="c-title--main">{{ $t( 'pages.faq.content.header.title' ) }}</h1>

        <div class="g-grid--5 flex items-center">
          <div class="g-colspan--4-full-md">
            <div class="elinor-card--question">
              <span class="elinor-card--question__number"> 1 </span>
              <div class="elinor-card--question__info">
                <h4 class="c-title--md">
                  {{ $t( 'pages.faq.content.survey.data.questions.items.main_purpose.question' ) }}
                </h4>
                <div
                v-html="$t( 'pages.faq.content.survey.data.questions.items.main_purpose.information' )">
                </div>
              </div>
            </div>
          </div>
          <div class="g-colspan--1-full-md"></div>
        </div>

        <div class="g-grid--5 flex items-center">
          <div class="g-colspan--4-full-md">
            <div class="elinor-card--question">
              <span class="elinor-card--question__number"> 2 </span>
              <div class="elinor-card--question__info">
                <h4 class="c-title--md">
                  {{ $t( 'pages.faq.content.survey.data.questions.items.decisions.question' ) }}
                </h4>

                <div
                v-html="$t( 'pages.faq.content.survey.data.questions.items.decisions.information' )">
                </div>
              </div>
            </div>
          </div>
          <div class="g-colspan--1-full-md"></div>
        </div>
        <!--atention: here the grid changes-->
        <div class="g-grid--5 flex items-center">
          <div class="g-colspan--3-full-md">
            <div class="elinor-card--question">
              <span class="elinor-card--question__number"> 3 </span>
              <div class="elinor-card--question__info">
                <h4 class="c-title--md">{{ $t( 'pages.faq.content.survey.data.questions.items.fill_out.question' ) }}</h4>
                <div
                v-html="$t( 'pages.faq.content.survey.data.questions.items.fill_out.information' )">
                </div>
              </div>
            </div>
          </div>
          <div class="g-colspan--2-full-md">
            <div class="elinor-card__detail">
              <p>
                {{ $t( 'pages.faq.content.survey.data.questions.items.fill_out.detail' ) }}
              </p>
            </div>
          </div>
        </div>

        <div class="g-grid--5 flex items-center">
          <div class="g-colspan--4-full-md">
            <div class="elinor-card--question">
              <span class="elinor-card--question__number"> 4 </span>
              <div class="elinor-card--question__info">
                <h4 class="c-title--md">
                  {{ $t( 'pages.faq.content.survey.data.questions.items.mett.question' ) }}
                </h4>
                <div
                v-html="$t( 'pages.faq.content.survey.data.questions.items.mett.information' )">
                </div>
              </div>
            </div>
          </div>
          <div class="g-colspan--1-full-md"></div>
        </div>

        <div class="g-grid--5 flex items-center">
          <div class="g-colspan--4-full-md">
            <div class="elinor-card--question">
              <span class="elinor-card--question__number"> 5 </span>
              <div class="elinor-card--question__info">
                <h4 class="c-title--md">
                  {{ $t( 'pages.faq.content.survey.data.questions.items.data.question' ) }}
                </h4>
                <div
                v-html="$t( 'pages.faq.content.survey.data.questions.items.data.information' )">
                </div>
              </div>
            </div>
          </div>
          <div class="g-colspan--1-full-md"></div>
        </div>

        <div class="g-grid--5 flex items-center">
          <div class="g-colspan--4-full-md">
            <div class="elinor-card--question">
              <span class="elinor-card--question__number"> 6 </span>
              <div class="elinor-card--question__info">
                <h4 class="c-title--md">
                  {{ $t( 'pages.faq.content.survey.data.questions.items.collect_data.question' ) }}
                </h4>
                <div
                v-html="$t( 'pages.faq.content.survey.data.questions.items.collect_data.information' )">
                </div>
              </div>
            </div>
          </div>
          <div class="g-colspan--1-full-md"></div>
        </div>

        <div class="g-grid--5 flex items-center">
          <div class="g-colspan--4-full-md">
            <div class="elinor-card--question">
              <span class="elinor-card--question__number"> 7 </span>
              <div class="elinor-card--question__info">
                <h4 class="c-title--md">
                  {{ $t( 'pages.faq.content.survey.data.questions.items.things_elinor.question' ) }}
                </h4>
                <div
                v-html="$t( 'pages.faq.content.survey.data.questions.items.things_elinor.information' )">
                </div>
              </div>
            </div>
          </div>
          <div class="g-colspan--1-full-md"></div>
        </div>

        <div class="g-grid--5 flex items-center">
          <div class="g-colspan--4-full-md">
            <div class="elinor-card--question">
              <span class="elinor-card--question__number"> 8 </span>
              <div class="elinor-card--question__info">
                <h4 class="c-title--md">
                 {{ $t( 'pages.faq.content.survey.data.questions.items.counts.question' ) }}
                </h4>
                <div
                v-html="$t( 'pages.faq.content.survey.data.questions.items.counts.information' )">
                </div>
              </div>
            </div>
          </div>
          <div class="g-colspan--1-full-md"></div>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
export default {
  name: "faq",
  auth: false
};
</script>
