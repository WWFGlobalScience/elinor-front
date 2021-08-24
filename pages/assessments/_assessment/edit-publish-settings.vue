<template>
  <section class="section section--assessment-edit-publish-settings">
    <div class="container">
      <div class="flex items-center">
        <span class="rounded-number">100%</span>
        <h1 class="c-title--lg">Publish</h1>
      </div>

      <div class="container-lg--responsive py-12">
        <h2 class="c-title--base mb-6">What happen when you publish</h2>
        <ul class="list-inside list-disc list--light">
          <li>You mark your Assessment as Finished</li>
          <li>You will not be able to edit the Survey Data</li>
          <li>You will not be able to edit the Assessment Data</li>
          <li>You could still edit or change the MAnaged Area</li>
          <li>You could still add collaborators</li>
          <li>You could still unpublish the Assessment</li>
        </ul>
      </div>

      <div class="elinor__data-separator"></div>

      <div class="container-lg--responsive py-12">
        <form action="" class="form form--mt-0">
          <div class="form__group grid grid-cols-3 md:grid-cols-1 gap-14">
            <div class="form__row">
              <div class="input input--radios input--radios-question">
                <div class="radios__wrap">
                  <div class="radio__wrap">
                    <div class="radio">
                      <input
                        type="radio"
                        name="answer"
                        id="answer-1"
                        value="1"
                      />
                      <img src="~/assets/img/ico-ok.svg" />
                    </div>
                  </div>
                </div>
                <label for="answer-1" class="c-title--base">
                  <span>Public</span>
                  <ul class="list-inside list-disc list--light">
                    <li>You make available your Assessment to public users</li>
                    <li>Will appear as Aggregated data in Insights and maps</li>
                  </ul>
                </label>
              </div>
            </div>

            <div class="form__row">
              <div class="input input--radios input--radios-question">
                <div class="radios__wrap">
                  <div class="radio__wrap">
                    <div class="radio">
                      <input
                        type="radio"
                        name="answer"
                        id="answer-2"
                        value="2"
                      />
                      <img src="~/assets/img/ico-ok.svg" />
                    </div>
                  </div>
                </div>
                <label for="answer-2" class="c-title--base">
                  <span>Private</span>
                  <ul class="list-inside list-disc list--light">
                    <li>
                      The Assessment will only be vsible to you and to your
                      Collaborators
                    </li>
                    <li>Will appear as Aggregated data in insights and maps</li>
                  </ul>
                </label>
              </div>
            </div>

            <div class="form__row">
              <div class="input input--radios input--radios-question">
                <div class="radios__wrap">
                  <div class="radio__wrap">
                    <div class="radio">
                      <input
                        type="radio"
                        name="answer"
                        id="answer-3"
                        value="3"
                      />
                      <img src="~/assets/img/ico-ok.svg" />
                    </div>
                  </div>
                </div>
                <label for="answer-3" class="c-title--base">
                  <span>Test</span>
                  <ul class="list-inside list-disc list--light">
                    <li>Option only available to the superuser</li>
                    <li>
                      Will not appear as Aggregated data in insights and maps
                    </li>
                  </ul>
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div class="elinor__data-separator"></div>
      <div class="container-lg--responsive">
        <div class="grid grid-cols-4 sm:grid-cols-1 gap-14 items-center">
          <div class="col-span-1">
            <button
              type="button"
              class="btn btn--opacity--child"
              @click="
                popupState({
                  active: true,
                  component: 'popup-assessment-publish',
                  title: 'Publish Assessment',
                })
              "
            >
              <span class="btn--opacity__target">Publish Assessment</span>
              <img src="~/assets/img/ico-button-arrow.svg" />
            </button>
          </div>
          <div class="col-span-2">
            <p>
              <span class="c-color-warning c-text--base">Warning!!</span> Once
              publicated you can not edit the Survey or Assessment Data, so
              publish only when you finish your Assessment
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex"
export default {
  name: "assessment-edit-publish-settings",
  layout: "assessment",
  methods: {
        ...mapActions({
            popupState: 'popup/popupState'
        }),
    },
};
</script>