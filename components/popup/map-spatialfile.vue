<template>
    <div class="popup__content popup--assessment-create">
        <div class="popup__grid">
            <div class="left">
                <form action="" class="form" v-if="stage == 'file-select'">
                    <div class="form__group">
                        <div class="form__row">
                            <div class="input input--file">
                                <div class="file">                                
                                    <div class="file__drag">
                                        <input type="file" name="spatialfile" ref="spatialFile" accept=".shp" @change="spatialFileChange" >
                                        <img src="~/assets/img/ico-file-drag-turqy.svg">
                                        <span v-if="!spatialFile">{{ $t( 'popups.spatialfile.labels.shapefile-placeholder' ) }}</span>
                                    </div>
                                    <div class="file__buttons">
                                        <button type="button" class="btn--border-turqy btn--opacity--child" @click="spatialFileTrigger">
                                            <img src="~/assets/img/ico-file-turqy.svg">
                                            <span class="btn--opacity__target">{{ $t( 'default.upload-file.buttons.select' ) }}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="right">
                <div class="description" 
                v-if="stage == 'file-select'"
                v-html="$t( 'popups.spatialfile.descriptions.file' )">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { mapActions } from 'vuex'
var shapefile = require("shapefile")

export default {
    name: 'popup-map-spatialfile',
    data () {
        return {
            stage: 'file-select',
            spatialFile: null
        }
    },
    methods: {
        spatialFileTrigger() {
            this.$refs.spatialFile.click()
        },
        spatialFileChange( event ) {
            let input = event.target
            let reader = new FileReader()

            reader.onload = () => {
                let dataURL = reader.result

                shapefile.open( reader.result )
  .then(source => source.read()
    .then(function log(result) {
      if (result.done) return;
      console.log(result.value);
      return source.read().then(log);
    }))
  .catch(error => console.error(error.stack));
                
            }
            reader.readAsDataURL( input.files[0])
            
            
  
            
        }
    }
}
</script>