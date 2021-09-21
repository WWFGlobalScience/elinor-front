<template>
    <div class="popup__content">
        <div class="popup__grid">
            <div class="left">
                <form class="form">
                    <div class="form__group">
                        <div class="form__row">
                            <div class="input input--file">
                                <div class="file">
                                    <dropzone id="map_image"
                                              ref="mapImage"
                                              :options="dropzone"
                                              :useStyling="false"
                                              :destroyDropzone="true"
                                              :useCustomSlot="true"
                                              @vdropzone-file-added="onMapImageAdded"
                                    >
                                        <div class="file__drag">
                                            <img src="~/assets/img/ico-file-drag-turqy.svg">
                                            <span v-if="!managementArea.map_image">{{ $t('default.upload-file.placeholder') }}</span>
                                            <span v-else><a @click.stop :href="managementArea.map_image" target="_blank">{{ managementArea.map_image }}</a></span>
                                        </div>
                                    </dropzone>
                                    <div class="file__buttons">
                                        <button @click="mapImageTrigger" type="button" class="btn--border-turqy btn--opacity--child">
                                            <img src="~/assets/img/ico-file-turqy.svg">
                                            <span class="btn--opacity__target">{{
                                                    $t('default.upload-file.buttons.select')
                                                }}</span>
                                        </button>
                                        <button v-if="managementArea.map_image" @click="clearMapImage" type="button" class="btn--border-turqy btn--opacity--child">
                                            <img src="~/assets/img/ico-clear-turqy.svg">
                                            <span class="btn--opacity__target">{{
                                                    $t('default.upload-file.buttons.clear')
                                                }}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="right">
                <div class="description" v-html="$t( 'popups.spatialfile.descriptions.file' )"></div>
            </div>
        </div>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import {mapActions, mapState} from 'vuex'
import Dropzone from "nuxt-dropzone";

var shapefile = require("shapefile")

export default {
    name: 'popup-map-spatialfile',
    components: {
        Dropzone
    },
    data() {
        return {
            dropzone: {
                url: 'none',
                previewTemplate: this.template(),
                uploadMultiple: false,
                acceptedFiles: '.pdf',
                autoQueue: false
            }
        }
    },
    computed: {
        ...mapState({
            managementArea: state => state.managementareas.instance
        })
    },
    methods: {
        ...mapActions({
            editManagementAreaField: 'managementareas/editManagementAreaField',
            editManagementAreaFileField: 'managementareas/editManagementAreaFileField',
        }),
        mapImageTrigger() {
            this.$refs.mapImage.$el.click();
        },
        clearMapImage() {
            this.$refs.mapImage.removeAllFiles();
            this.editManagementAreaField({field: 'map_image', value: null, id: this.managementArea.id});
        },
        onMapImageAdded(file) {
            this.editManagementAreaFileField({field: 'map_image', file, id: this.managementArea.id});
        },
        template() {
            return '<div></div>';
        }
    }
}
</script>
