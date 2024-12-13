import VuexPersistence from 'vuex-persist';
import { LOCAL_STORAGE_KEY } from '~/config/localStorageKey';

export default ({ store }) => {
    new VuexPersistence({
        key: LOCAL_STORAGE_KEY,
        reducer: (state) => {
            const stateCopy = { ...state };

            if (stateCopy.assessments) {
                // remove search property from state
                const { search, ...assessmentsPropertiesToPersist } =
                    stateCopy.assessments;
                stateCopy.assessments = assessmentsPropertiesToPersist;
            }

            return stateCopy;
        },
    }).plugin(store);
};
