<template>
    <div class="popup__content">
        <form class="form form--mt-0">
            <div v-if="!fileAdded" class="popup__grid">
                <div class="left">
                    <div class="form__group">
                        <div class="form__row">
                            <div class="input input--file">
                                <div class="file">
                                    <dropzone
                                        id="map_image"
                                        ref="mapImage"
                                        :options="dropzone"
                                        :useStyling="false"
                                        :destroyDropzone="true"
                                        :useCustomSlot="true"
                                        @vdropzone-file-added="onMapImageAdded"
                                    >
                                        <div class="file__drag">
                                            <img src="~/assets/img/ico-file-drag-turqy.svg"/>
                                            <span v-if="!managementArea.map_image">{{ $t("default.upload-mapimage.placeholder") }}</span>
                                            <span v-if="managementArea.map_image"><img :src="managementArea.map_image" style="width: 100%; height: auto" /></span>
                                        </div>
                                    </dropzone>
                                </div>
                                <div class="file__buttons">
                                    <button
                                        @click="mapImageTrigger"
                                        type="button"
                                        class="btn--border-turqy btn--opacity--child"
                                    >
                      <span class="btn--opacity__target">{{
                              $t("default.upload-mapimage.buttons.select")
                          }}</span>
                                        <img src="~/assets/img/ico-file-turqy.svg"/>
                                    </button>
                                    <button
                                        v-if="managementArea.map_image"
                                        @click="clearMapImage"
                                        type="button"
                                        class="btn--border-turqy btn--opacity--child"
                                    >
                      <span class="btn--opacity__target">{{
                              $t("default.upload-mapimage.buttons.clear")
                          }}</span>
                                        <img src="~/assets/img/ico-clear-turqy.svg"/>
                                    </button>
                                    <p v-if="dropzoneAccepted === false" class="msg msg--error">{{ $t('pages.assessments.edit.tabs.managementArea.popups.imageFile.formatNotSupported') }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div
                        class="description"
                        v-html="$t('pages.assessments.edit.tabs.managementArea.popups.imageFile.help')"
                    ></div>
                </div>
            </div>
            <div v-if="fileAdded" class="popup__map image">
                <img :src="preview || managementArea.map_image" />
                <div class="header--map header--map--flexy">
                    <div class="left">
                        <div class="form__group">
                            <div class="form__row">
                                <div class="input input--1-2">
                                    <label class="label">{{ $t('pages.assessments.edit.tabs.managementArea.popups.imageFile.gpsCoordinatesTitle') }}</label>
                                    <input :value="coordinates" :disabled="true" type="text" name="name" placeholder="lat,lng"/>
                                </div>
                                <p v-html="$t('pages.assessments.edit.tabs.managementArea.popups.imageFile.gpsCoordinatesExample')" />
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <p>{{ $t('pages.assessments.edit.tabs.managementArea.popups.imageFile.dragMapIcon') }}</p>
                    </div>
                </div>
                <div id="map" class="elinor__map" style="padding: 0"></div>
            </div>
            <div v-if="fileAdded" class="popup__footer">
                <button
                    @click="cancel"
                    type="button"
                    class="btn--border-turqy btn--opacity--child"
                >
                    <span class="btn--opacity__target">{{ $t('default.cancel') }}</span>
                    <img src="~/assets/img/ico-close-turqy.svg"/>
                </button>
                <button
                    @click="accept"
                    type="button"
                    class="btn btn--opacity--child"
                >
                    <span class="btn--opacity__target">{{ $t('default.accept') }}</span>
                    <img src="~/assets/img/ico-ok-white.svg"/>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import Dropzone from "nuxt-dropzone";
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoiYWRyaWFhbG9zIiwiYSI6ImNrNXoybGpqdTBweGszbG5qNmEwNzJ1dzAifQ.6mtLHsiBciOXdPVRMY3fuQ'

export default {
    name: "popup-map-spatialfile",
    components: {
        Dropzone,
    },
    data() {
        return {
            fileAdded: false,
            progress: 0,
            map: null,
            preview: null,
            lngLat: null,
            dropzoneAccepted: null,
            dropzone: {
                url: "none",
                previewTemplate: this.template(),
                uploadMultiple: false,
                acceptedFiles: "image/jpeg,image/png,image/gif",
                autoQueue: false,
            },
        };
    },
    computed: {
        ...mapState({
            managementArea: (state) => state.managementareas.instance,
        }),
        coordinates() {
            return this.lngLat && (this.lngLat.lat.toFixed(6) + ',' + this.lngLat.lng.toFixed(6))
        }
    },
    methods: {
        ...mapActions({
            editManagementAreaField: "managementareas/editManagementAreaField",
            editManagementAreaFileField: "managementareas/editManagementAreaFileField",
        }),
        mapImageTrigger() {
            this.$refs.mapImage.$el.click();
        },
        clearMapImage() {
            this.fileAdded = false;
            this.progress = 0;
            this.$refs.mapImage.removeAllFiles();
            this.dropzoneAccepted = null;
        },
        onMapImageAdded(file) {
            this.$nextTick(() => {
                if(file.status !== "error") {
                    this.dropzoneAccepted = false;
                    this.editManagementAreaFileField({
                         field: "map_image",
                         file,
                         id: this.managementArea.id,
                         onUploadProgress: this.onMapImageProgress
                     });
                    this.fileAdded = true;
                    this.preview = URL.createObjectURL(file);

                    this.$nextTick(() => {
                        this.mapCreate();
                    });
                } else {
                    this.dropzoneAccepted = false;
                }
            })
        },
        onMapImageProgress(progressEvent) {
            this.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        },
        template() {
            return "<div></div>";
        },
        mapCreate() {
            this.map != null ? this.map.remove() : null
            this.map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                zoom: 5
            })
            this.mapAddControls()
            this.mapDisableScroll()
            this.mapMarker()
        },
        mapAddControls() {
            this.map.addControl( new mapboxgl.NavigationControl() )
            this.map.addControl( new mapboxgl.FullscreenControl({
                    container: document.documentElement
                })
            )
        },
        mapDisableScroll() {
            this.map.scrollZoom.disable();
        },
        mapMarker() {
            const marker = new mapboxgl.Marker({
                draggable: true
            }).setLngLat([0, 0]).addTo(this.map);

            const onDragEnd = () => {
                const lngLat = marker.getLngLat();
                this.lngLat = lngLat;
                this.map.flyTo({
                    center: [
                        lngLat.lng,
                        lngLat.lat
                    ],
                    essential: false
                });
            }

            marker.on('dragend', onDragEnd);
        },
        accept() {
            const point = {
                type: "Point",
                coordinates: [this.lngLat.lng, this.lngLat.lat]
            }

            this.editManagementAreaField({
                field: "point",
                value: point,
                id: this.managementArea.id
            });

            this.$store.dispatch('popup/popupState', {active: false});
        },
        cancel() {
            this.$store.dispatch('popup/popupState', {active: false});
        }
    },
};
</script>
