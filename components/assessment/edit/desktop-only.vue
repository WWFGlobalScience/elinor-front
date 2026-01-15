<template>
    <div class="assessment-edit-desktop-only">
        <div class="overlay"></div>
        <div class="content">
            <h5 class="mb-2">{{ $t('pages.assessments.edit.desktopOnly.title') }}</h5>
            <p>{{ $t('pages.assessments.edit.desktopOnly.description') }}</p>
            <nuxt-link to="/assessments" class="btn btn--primary uppercase justify-center mt-6">ok</nuxt-link>
        </div>
    </div>
</template>