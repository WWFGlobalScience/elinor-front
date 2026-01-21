<template>
  <div class="title-border mt-12">
    <h3 class="title">Protocols</h3>

    <div class="input input--multiselect input--order">
      <div class="multiselect__wrap">
        <div tabindex="-1" class="multiselect">
          <div class="multiselect__select"></div>
          <div class="multiselect__tags">
            <input
              name=""
              type="text"
              autocomplete="nope"
              placeholder="Select option"
              tabindex="0"
              class="multiselect__input"
              style="width: 0px; position: absolute; padding: 0px"
            />
            <span class="multiselect__single">Order by</span>
          </div>
          <div
            tabindex="-1"
            class="multiselect__content-wrapper"
            style="max-height: 300px; display: none"
          >
            <ul class="multiselect__content" style="display: inline-block">
              <li class="multiselect__element">
                <span
                  data-select=""
                  data-selected=""
                  data-deselect=""
                  class="multiselect__option multiselect__option--highlight"
                  ><span>2020</span></span
                >
              </li>
              <li class="multiselect__element">
                <span
                  data-select=""
                  data-selected=""
                  data-deselect=""
                  class="multiselect__option"
                  ><span>2021</span></span
                >
              </li>
              <li class="multiselect__element">
                <span
                  data-select=""
                  data-selected=""
                  data-deselect=""
                  class="multiselect__option"
                  ><span>2022</span></span
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="multiselect__caret">
          <img src="~/assets/img/ico-select-turqy.svg" alt="caret" />
        </div>
      </div>
      <input type="hidden" name="year" class="input__dummy" value="2019" />
    </div>
  </div>
</template>
