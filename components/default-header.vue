<template>
  <header class="header--main">
    <nav class="header--main__wrapper">
      <ul>
        <li>
          <NuxtLink to="/" class="btn--opacity--child">
            <span class="btn--opacity__target">About</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/" class="btn--opacity--child">
            <span class="btn--opacity__target">Faqs</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/" class="btn--opacity--child">
            <span class="btn--opacity__target">About</span>
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