<template>
  <article class="page page--flushed">
    <section class="section section--main">
      <img src="~/assets/img/methodology-section.jpg" />
    </section>
    <section class="section">
      <div class="container">
        <h1 class="c-title--main">Methodology</h1>
        <div class="g-grid--5 flex items-center">
          <div class="g-colspan--3-full-md">
            <div class="info-block">
              <h4 class="c-title--md">What is the main purpose of the tool?</h4>
              <p>
                Here, we’ve listed the background information collected and the
                32 questions found in Elinor organized under nine attributes .
                All questions answered by a score 0-4 and an associated
                qualitative statement.
              </p>
              <p>
                There is no required cadence on which data can be inputted into
                Elinor: We hope that users of the tool will complete assessments
                on time frames suitable for their own projects and needs, but
                expect that assessments could be completed either annually or
                bi-annually.
              </p>
            </div>
          </div>
          <div class="g-colspan--4-full-md">
            <div class="elinor-card__icons">
              <h4 class="elinor-card__icons-title">
                <span class="elinor-card__icons-title-info">Assessment</span>
              </h4>
              <div class="g-grid--3-1-sm flex items-stretch">
                <div class="elinor-card__icons__item">
                  <p class="elinor-card__icons__item-title">
                    Background information
                  </p>
                  <img
                    src="~/assets/img/background-information.svg"
                    alt="background-information"
                  />
                </div>
                <div class="elinor-card__icons__item">
                  <p class="elinor-card__icons__item-title">32 questions</p>
                  <img src="~/assets/img/questions.svg" alt="questions" />
                </div>
                <div class="elinor-card__icons__item">
                  <p class="elinor-card__icons__item-title">
                    Annually or bi-annually
                  </p>
                  <img src="~/assets/img/calendar.svg" alt="calendar" />
                </div>
              </div>
            </div>
          </div>
          <div class="g-colspan--3-full-md">
            <div class="info-block">
              <h4 class="c-title--md">Background information collected</h4>
              <ul class="list-disc list-inside list--small">
                <li>Year of assessment</li>
                <li>
                  Number of people consulted during the assessment and their
                  affiliation
                </li>
                <li>Name of MA</li>
                <li>
                  Jurisdiction(s) where MA is located (e.g., country,
                  states/provinces)
                </li>
                <li>Date of formal establishment (if applicable)</li>
                <li>Size of MA (ha)</li>
                <li>Map or spatial file of MA</li>
                <li>Management zones of MA</li>
                <li>MA governance type</li>
                <li>MA objectives</li>
                <li>Name of management authority</li>
                <li>Key stakeholder groups</li>
                <li>
                  Focal area within MA (if focusing on MA within a broader
                  PA/CA)
                </li>
              </ul>
            </div>
          </div>
          <div class="col-span-full">
            <div class="info-block">
              <h4 class="c-title--md">Survey questions</h4>
              <ul class="elinor__survey-navigator elinor__survey-navigator--no-border">
                <li v-for="item in items" v-bind:key="item.id">
                  <a href="#" class="btn--opacity"> </a>
                </li>
              </ul>
              <div class="elinor__navigator-category">
                <NuxtLink to="" class="elinor__navigator-category__link btn--opacity--child">
                  <span class="elinor__navigator-category__text btn--opacity__target">Go to category</span>
                  <img src="~/assets/img/ico-arrow-bottom-turqy.svg" alt="ico-arrow-bottom-turqy">
                </NuxtLink>
              </div>
              <div class="elinor__survey-list elinor__survey-list--row">
                <div class="elinor__survey-question ui-rounded-border">
                  <div class="left">
                    <div class="txt">4</div>
                    <div class="left__item">
                      <div class="question">
                        Clearly defined rights and decision making
                      </div>
                      <p>
                        Explanation lorem iosum dolor sid amet adipiscin et
                        ipsum
                      </p>
                    </div>
                  </div>
                  <div class="right">
                    <div class="right__item">
                      <div class="txt">Q1</div>
                      <div class="answer">
                        Do local stakeholders have clearly defined rights to the
                        natural resources found inside the MA?
                      </div>
                    </div>
                    <div class="right__item">
                      <div class="txt">Q3</div>
                      <div class="answer">
                        Is there legislation in place to enable resource
                        management by local communities?
                      </div>
                    </div>
                    <div class="right__item">
                      <div class="txt">Q4</div>
                      <div class="answer">
                        Are local stakeholders able to exercise their rights to
                        natural resources?
                      </div>
                    </div>
                    <div class="right__item">
                      <div class="txt">Q6</div>
                      <div class="answer">
                        Are local stakeholders affected by the rules able to
                        play a role in making changes to the rules?
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="elinor__survey-list elinor__survey-list--row">
                <div class="elinor__survey-question ui-rounded-border">
                  <div class="left">
                    <div class="txt">5</div>
                    <div class="left__item">
                      <div class="question">
                        Clearly defined rights and decision making
                      </div>
                      <p>
                        Explanation lorem iosum dolor sid amet adipiscin et
                        ipsum
                      </p>
                    </div>
                  </div>
                  <div class="right">
                    <div class="right__item">
                      <div class="txt">Q1</div>
                      <div class="answer">
                        Do local stakeholders have clearly defined rights to the
                        natural resources found inside the MA?
                      </div>
                    </div>
                    <div class="right__item">
                      <div class="txt">Q3</div>
                      <div class="answer">
                        Is there legislation in place to enable resource
                        management by local communities?
                      </div>
                    </div>
                    <div class="right__item">
                      <div class="txt">Q4</div>
                      <div class="answer">
                        Are local stakeholders able to exercise their rights to
                        natural resources?
                      </div>
                    </div>
                    <div class="right__item">
                      <div class="txt">Q6</div>
                      <div class="answer">
                        Are local stakeholders affected by the rules able to
                        play a role in making changes to the rules?
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="elinor__survey-list elinor__survey-list--row">
                <div class="elinor__survey-question ui-rounded-border">
                  <div class="left">
                    <div class="txt">6</div>
                    <div class="left__item">
                      <div class="question">
                        Clearly defined rights and decision making
                      </div>
                      <p>
                        Explanation lorem iosum dolor sid amet adipiscin et
                        ipsum
                      </p>
                    </div>
                  </div>
                  <div class="right">
                    <div class="right__item">
                      <div class="txt">Q1</div>
                      <div class="answer">
                        Do local stakeholders have clearly defined rights to the
                        natural resources found inside the MA?
                      </div>
                    </div>
                    <div class="right__item">
                      <div class="txt">Q3</div>
                      <div class="answer">
                        Is there legislation in place to enable resource
                        management by local communities?
                      </div>
                    </div>
                    <div class="right__item">
                      <div class="txt">Q4</div>
                      <div class="answer">
                        Are local stakeholders able to exercise their rights to
                        natural resources?
                      </div>
                    </div>
                    <div class="right__item">
                      <div class="txt">Q6</div>
                      <div class="answer">
                        Are local stakeholders affected by the rules able to
                        play a role in making changes to the rules?
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