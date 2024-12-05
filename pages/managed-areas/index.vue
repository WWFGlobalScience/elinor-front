<template>
    <article class="page page--managed-areas-list">
        <header class="header--page">
            <div class="container">
                <h1 class="mb-0">
                    <img src="~/assets/img/ico-managed-areas-turqy.svg" />
                    <span>{{
                        $t('pages.managed-areas.content.header.title')
                    }}</span>
                </h1>
            </div>
        </header>
        <section class="section section--mt-0 section--button">
            <div class="container">
                <button type="button" class="btn btn--opacity--child">
                    <span class="btn--opacity__target">{{
                        $t('pages.managed-areas.content.create')
                    }}</span>
                    <img src="~/assets/img/ico-button-arrow.svg" />
                </button>
            </div>
        </section>
        <section class="section section--filters">
            <div class="container">
                <ul>
                    <li>
                        <form id="form--search" action="" class="form">
                            <div class="form__group">
                                <div class="form__row">
                                    <div class="input input--ico">
                                        <input
                                            type="text"
                                            :placeholder="$t('default.search')"
                                        />
                                        <div class="input__ico">
                                            <span></span>
                                            <button
                                                type="submit"
                                                form="form--search"
                                            >
                                                <img
                                                    src="~/assets/img/ico-search-turqy.svg"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </li>
                    <li>
                        <button
                            type="button"
                            class="btn--border-turqy btn--opacity--child"
                        >
                            <span class="btn--opacity__target">{{
                                $t('default.filters.button')
                            }}</span>
                            <img src="~/assets/img/ico-filters-turqy.svg" />
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            class="btn--border-turqy btn--opacity--child"
                        >
                            <span class="btn--opacity__target">{{
                                $t('default.order.button')
                            }}</span>
                            <img src="~/assets/img/ico-order-turqy.svg" />
                        </button>
                    </li>
                </ul>
            </div>
        </section>
        <section class="section section--mt-medium section--ma-results">
            <div class="container">
                <div class="search__results">
                    <span>{{ $t('default.showing') }}</span> -
                    <span>{{ mas.length }}</span>
                    <span v-if="mas.length > 1 || mas.length == 0">{{
                        $t('pages.managed-areas.content.showing.plural')
                    }}</span>
                    <span v-if="mas.length == 1">{{
                        $t('pages.managed-areas.content.showing.singular')
                    }}</span>
                </div>
                <ul class="ma__results" v-if="mas.length >= 1">
                    <li
                        v-for="(ma, index) in mas"
                        class="elinor__badge ui-rounded-border"
                    >
                        <header class="header">
                            <div class="left">
                                <span class="title">{{ ma.owner }}</span>
                                <span class="subtitle">{{ ma.name }}</span>
                            </div>
                        </header>
                        <ul class="sublist">
                            <li class="avatar">
                                <div class="elinor__avatar elinor__avatar--red">
                                    <span>X</span>
                                </div>
                            </li>
                            <li class="role">
                                <span class="label">{{
                                    $t(
                                        'pages.managed-areas.content.ma.labels.role',
                                    )
                                }}</span>
                                <span class="data">Admin</span>
                            </li>
                            <li class="ha">
                                <span class="label">{{
                                    $t(
                                        'pages.managed-areas.content.ma.labels.ha',
                                    )
                                }}</span>
                                <span class="data">{{ ma.size }}</span>
                            </li>
                            <li class="assessments">
                                <span class="label">{{
                                    $t(
                                        'pages.managed-areas.content.ma.labels.assessments',
                                    )
                                }}</span>
                                <span class="data">{{
                                    ma.assessments.length
                                }}</span>
                            </li>

                            <li class="view">
                                <nuxt-link
                                    :to="`/managed-areas/${ma.id}/info`"
                                    class="btn--border-turqy btn--opacity--child"
                                >
                                    <span class="btn--opacity__target">{{
                                        $t('default.view')
                                    }}</span>
                                    <img
                                        src="~/assets/img/ico-button-arrow-turqy.svg"
                                    />
                                </nuxt-link>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul class="ma__results" v-else>
                    <li
                        class="elinor__badge ui-rounded-border elinor__badge--empty"
                    >
                        <header class="header">
                            <div class="left">
                                <span class="title">{{
                                    $t(
                                        'pages.managed-areas.content.showing.empty',
                                    )
                                }}</span>
                            </div>
                        </header>
                    </li>
                </ul>
            </div>
        </section>
    </article>
</template>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
export default {
    name: 'ManagedAreas',
    auth: false,
    computed: {
        mas() {
            return this.$store.state.ma.mas;
        },
    },
    methods: {
        ...mapActions({
            get: 'ma/getMas',
        }),
    },
    mounted() {
        this.get();
    },
};
</script>
