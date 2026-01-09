<template>
    <div class="popup__content popup--selected-ma">
        <div class="popup__header">
            <div class="flex items-center gap-4">
                <h3 class="text-turqy">Managed Area Preview</h3>
                <div class="flex items-center gap-2">
                    <button type="button" class="btn btn--primary btn--new-sm" @click="useManagementArea">
                        Use this Managed Area
                    </button>
                    <button type="button" class="btn btn--border-turqy btn--new-sm" @click="addNewManagementArea">
                        Create New
                    </button>
                </div>
            </div>
            <button type="button" class="btn--opacity" @click="close">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <mask
                  id="mask0_7699_10747"
                  style="mask-type: alpha"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="32"
                  height="32"
                >
                  <rect width="32" height="32" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_7699_10747)">
                  <path
                    d="M8.53268 25.3333L6.66602 23.4666L14.1327 16L6.66602 8.53329L8.53268 6.66663L15.9993 14.1333L23.466 6.66663L25.3327 8.53329L17.866 16L25.3327 23.4666L23.466 25.3333L15.9993 17.8666L8.53268 25.3333Z"
                    fill="#43A0BD"
                  />
                </g>
              </svg>
            </button>
          </div>
        <div class="selected-ma-content">
            <div class="elinor__data-list">
              <ul class="elinor__data-grid">
                <li class="elinor__data elinor__data--full">
                  <span class="title">{{
                    $t('pages.assessments.view.tabs.info.labels.managementAreaName')
                  }}</span>
                  <span class="data">{{ managementArea.name }}</span>
                </li>
    
                <li class="elinor__data elinor__data--full">
                  <span class="title">{{
                    $t('pages.assessments.view.tabs.info.labels.protectedArea')
                  }}</span>
                  <span class="data">{{
                    managementArea.protected_area
                      ? managementArea.protected_area.name
                      : 'N/A'
                  }}</span>
                </li>
    
                <li class="elinor__data elinor__data--full">
                  <span class="title">{{
                    $t('pages.assessments.view.tabs.info.labels.dateEstablished')
                  }}</span>
                  <span class="data">{{ formatDate(managementArea.date_established) }}</span>
                </li>
    
                <li class="elinor__data elinor__data--full">
                  <span class="title">{{
                    $t('pages.assessments.view.tabs.info.labels.reportedSize')
                  }}</span>
                  <span class="data">{{ managementArea.reported_size }} h</span>
                </li>
    
                <li class="elinor__data elinor__data--full">
                  <span class="title">{{
                    $t('pages.assessments.view.tabs.info.labels.containedBy')
                  }}</span>
                  <span class="data">{{
                    managementArea.containedby
                      ? managementArea.containedby.name
                      : 'N/A'
                  }}</span>
                </li>
    
                <li class="elinor__data elinor__data--full">
                  <span class="title">{{
                    $t('pages.assessments.view.tabs.info.labels.governanceType')
                  }}</span>
                  <span class="data">{{
                    managementArea.governance_type &&
                    managementArea.governance_type.name
                  }}</span>
                </li>
    
                <li class="elinor__data elinor__data--full">
                  <span class="title">{{
                    $t(
                      'pages.assessments.view.tabs.info.labels.managementAuthority',
                    )
                  }}</span>
                  <span class="data">{{
                    managementArea.management_authority &&
                    managementArea.management_authority.name
                  }}</span>
                </li>
              </ul>
              <div class="elinor__data-separator"></div>
              <ul class="elinor__data-grid">
                <li class="elinor__data elinor__data--full">
                  <span class="title">{{
                    $t('pages.assessments.view.tabs.info.labels.recognitionLevel')
                  }}</span>
                  <span class="data">{{
                    managementArea.recognition_level &&
                    managementArea.recognition_level.join(', ')
                  }}</span>
                </li>
                <li class="elinor__data elinor__data--full">
                  <span class="title">{{
                    $t('pages.assessments.view.tabs.info.labels.supportSources')
                  }}</span>
                  <span class="data">
                    {{
                      managementArea.support_sources.length > 0
                        ? managementArea.support_sources
                            .map((supportSource) => supportSource.name)
                            .join(', ')
                        : 'N/A'
                    }}
                  </span>
                </li>
              </ul>
              <div class="elinor__data-separator"></div>
              <ul class="elinor__data-grid">
                <li class="elinor__data elinor__data--full">
                  <span class="title">{{
                    $t('pages.assessments.view.tabs.info.labels.countries')
                  }}</span>
                  <span class="data">
                    {{
                      managementArea.countries.length > 0
                        ? managementArea.countries.map((country) => country.name).join(', ')
                        : 'N/A'
                    }}
                  </span>
                </li>
              </ul>
            </div>
        </div>
    </div>
</template>
  
  <script>
  import { mapActions } from 'vuex';
  export default {
    name: 'popup-selected-ma',
    props: {
      props: {
        type: Object,
        required: true,
      }
    },
    computed: {
        managementArea() {
            return this.props?.managementArea || {};
        },
        user() {
            return this.$store.state.auth.user;
        },
        assessment() {
            return this.$store.state.assessments.assessment;
        },
    },
    // watch: {
    //   managementArea: {
    //     handler(newVal) {
    //       console.log(newVal);
    //     },
    //     immediate: true,
    //   }
    // },
    methods: {
      ...mapActions({
        popupState: 'popup/popupState',
        onManagementAreaNew: 'managementareas/onManagementAreaNew',
        onManagementAreaSelected: 'managementareas/onManagementAreaSelected',
      }),
      formatDate(date) {
        if (!date) return '';
        return this.$moment(date).format('DD MMM YYYY');
      },
      close() {
        this.popupState({ active: false });
      },
      addNewManagementArea() {
        this.onManagementAreaNew(this.assessment);
        this.close();
      },
      useManagementArea() {
        const newManagementArea = {
          ...this.managementArea,
          name: this.managementArea.name + ' - ' + this.user.username + ' - ' + new Date().toISOString(),
          name_en: this.managementArea.name_en + ' - ' + this.user.username + ' - ' + new Date().toISOString(),
          name_pt: this.managementArea.name_pt + ' - ' + this.user.username + ' - ' + new Date().toISOString(),
          name_es: this.managementArea.name_es + ' - ' + this.user.username + ' - ' + new Date().toISOString(),
          name_fr: this.managementArea.name_fr + ' - ' + this.user.username + ' - ' + new Date().toISOString(),
          name_de: this.managementArea.name_de + ' - ' + this.user.username + ' - ' + new Date().toISOString(),
          name_it: this.managementArea.name_it + ' - ' + this.user.username + ' - ' + new Date().toISOString(),
          name_nl: this.managementArea.name_nl + ' - ' + this.user.username + ' - ' + new Date().toISOString(),
          name_sv: this.managementArea.name_sv + ' - ' + this.user.username + ' - ' + new Date().toISOString(),
        };
        // console.log(this.user);
        // console.log(newManagementArea);
        this.onManagementAreaSelected({ managementArea: newManagementArea, assessmentId: this.assessment.id });
        this.close();
      },
    },
  };
  </script>
  