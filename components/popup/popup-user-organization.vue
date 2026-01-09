<template>
  <div class="popup__content popup--assessment-delete popup--organization">
    <form class="form form--organization">
      <h5 class="mb-2">
        {{ $t('popup.organization.title') }}
      </h5>
      <div class="form__group">
        <div class="form__row">
          <div class="input input--pr input--multiselect">
            <div class="multiselect__wrap">
              <multiselect
                :placeholder="$t('popup.organization.placeholder')"
                track-by="id"
                label="name"
                :options="organizations"
                :multiple="false"
                :searchable="true"
                :showLabels="false"
                :allow-empty="false"
                open-direction="bottom"
                :hide-selected="true"
                @input="onOrganizationSelected"
                @search-change="fetchOrganizations"
              >
                <span
                  slot="noResult"
                  slot-scope="props"
                  class="text-xxs text-grayy-lighter"
                  >{{ $t('default.noresults') }} ({{ props.search }})
                  <hr class="my-4" />
                  <button
                    @click="
                      $event.preventDefault();
                      $event.stopPropagation();
                      createOrganizationAndAssociate(props.search);
                    "
                    role="button"
                    class="btn btn--sm btn--tertiary"
                  >
                    {{ $t('default.create') }}
                  </button></span
                >
              </multiselect>
              <div class="multiselect__caret">
                <img src="~/assets/img/ico-select-turqy.svg" />
              </div>
            </div>
            <!-- <div
                            class="input__tooltip"
                            :content="$t('popup.organization.tooltip')"
                            v-tippy="{ placement: 'top-start' }"
                        >
                            ?
                        </div> -->
          </div>
        </div>
      </div>
      <div
        class="form__row form__row--separator form__row--separator--20"
      ></div>
      <div class="form__row flex justify-end mt-10">
        <button
          @click="popupState({ active: false })"
          type="button"
          class="btn btn--opacity--child"
        >
          <span class="btn--opacity__target">{{ $t('default.cancel') }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'popup-user-organization',
  computed: {
    ...mapState({
      organizations: (state) => state.organizations.list,
    }),
  },
  methods: {
    ...mapActions({
      popupState: 'popup/popupState',
      fetchOrganizations: 'organizations/fetchOrganizations',
      createOrganization: 'organizations/createOrganization',
      setUserOrganization: 'authentication/setUserOrganization',
    }),
    async createOrganizationAndAssociate(name) {
      const organization = await this.createOrganization(name);
      await this.setUserOrganization(organization.id);
    },
    onOrganizationSelected(organization) {
      this.setUserOrganization(organization.id);
    },
  },
};
</script>
