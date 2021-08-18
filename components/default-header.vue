<template>
  <header class="header--main">
    <nav class="header--main__wrapper">
      <!-- Mobile menu button -->
      <!-- <div class="hidden lg:block" id="mobile-menu">
          <img src="../assets/img/elinor-icon-turqy.svg">
      </div> -->
      
      <ul>
        <li>
          <NuxtLink to="/" class="btn--opacity--child">
            <span class="btn--opacity__target">About</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="`/faq/`" class="btn--opacity--child">
            <span class="btn--opacity__target">Faqs</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/" class="btn--opacity--child">
            <span class="btn--opacity__target">Methodology</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/" class="btn--opacity--child">
            <span class="btn--opacity__target">Create Account</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "default-header",
};
</script>