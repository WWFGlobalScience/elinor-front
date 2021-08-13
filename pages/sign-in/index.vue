<template>
  <section class="section section--mt-0 section--sign-in">
    <div class="section__full-background">
      <img src="~/assets/img/signin-background.jpg" />
    </div>
    <div class="card card--sign-in">
      <NuxtLink to="/" class="flex justify-center">
        <img src="~/assets/img/elinor-logo.svg" />
      </NuxtLink>
      <hr class="card--sign-in__separator" />
      <div class="card--sign-in__info">
        <div>
          <p class="text-xl mb-1.5">SIGN IN</p>
        </div>
        <div>
          <p class="mb-0 text-grayy-lighter">
            or
            <NuxtLink to="/" class="text-turqy text-sm"
              >create an account</NuxtLink
            >
          </p>
        </div>
      </div>
      <p class="text-base">Lorem ipsum dolor sit amet.</p>

      <form id="form--signin" action="" class="form form--sign-in">
        <div class="form__group">
          <div class="form__row">
            <div class="input">
              <input type="email" :placeholder="'E-mail'" />
            </div>
          </div>
          <div class="form__row">
            <div class="input">
              <input type="password" :placeholder="'Password'" />
            </div>
          </div>
        </div>

        <div class="card--sign-in__info mt-9">
          <div>
            <div class="input input--radios input--radios-question">
              <div class="radios__wrap">
                <div class="radio__wrap">
                  <div class="radio">
                    <input
                      type="radio"
                      name="answer"
                      id="answer-1"
                      value="1"
                      @change="submit"
                    />
                    <img src="~/assets/img/ico-ok.svg" />
                  </div>
                </div>
              </div>
              <label for="answer-1" class="label">
                <span>Remember me</span>
              </label>
            </div>
          </div>
          <div>
            <button type="submit" class="btn--border-turqy btn--opacity--child">
              <span class="btn--opacity__target"> Sign in </span>
              <img src="~/assets/img/ico-signin-turqy.svg" />
            </button>
          </div>
        </div>
      </form>
      <NuxtLink to="/" class="text-turqy mt-3 text-sm">
        Forgot password?
      </NuxtLink>
    </div>
  </section>
</template>

<script>
export default {
  name: "sign-in",
};
</script>