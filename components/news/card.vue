<template>
    <div class="elinor-card__news ui-rounded-border">
        <div class="header">
            <div class="title-group">
                <p class="date">{{ instance.date }}</p>
                <h3 class="title">{{ instance.title }}</h3>
            </div>
        </div>
        <div class="body">
            <div class="text-group">
                <p class="text">
                    {{ text }}
                </p>
            </div>
            <a v-if="instance.text.length > maxCharacters" @click="toggleExpanded"  role="button" class="btn-collapse">
                <span v-if="!expanded">{{ $t( 'buttons.seeMore' ) }}</span>
                <span v-if="expanded">{{ $t( 'buttons.seeLess' ) }}</span>
                <img src="~/assets/img/ico-arrow-down.svg" alt="" class="ico">
            </a>
        </div>

    </div>

</template>
<script>
const maxCharacters = 300;

export default {
    name: 'news-card',
    props: ['instance'],
    data() {
        return {
            expanded: false,
            text: this.instance.text.length > maxCharacters ? this.instance.text.substring(0,maxCharacters) + '...' : this.instance.text,
            maxCharacters
        }
    },
    methods: {
        toggleExpanded() {
            this.expanded = !this.expanded;
            if(this.expanded) {
                this.text = this.instance.text;
            } else {
                this.text = this.instance.text.substring(0,maxCharacters)  + '...'
            }
        }
    }
}
</script>

