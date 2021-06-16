<template>
    <section class="section section--tab section--mt-10">
        <div class="container">
            <ul class="elinor__tabs">
                <li>
                    <nuxt-link :to="`/managed-areas/${id}/info`" class="btn--tab">
                        <span class="txt">{{ $t( 'pages.managed-areas.content.ma.tabs.info.tab' ) }}</span>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="`/managed-areas/${id}/edit-management-area`" class="btn--tab">
                        <span class="txt">{{ $t( 'pages.managed-areas.content.ma.tabs.edit' ) }}</span>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="`/managed-areas/${id}/collaborators`" class="btn--tab">
                        <span class="bullet">3</span>
                        <span class="txt">{{ $t( 'pages.managed-areas.content.ma.tabs.collaborators' ) }}</span>
                    </nuxt-link>
                </li>
            </ul>
        </div> 
    </section>
</template>

<script>
export default {
    name: 'ma-tab',
    props: [ 'id' ]
}
</script>