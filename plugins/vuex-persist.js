import VuexPersistence from 'vuex-persist';

export default ({ store }) => {
    new VuexPersistence({
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
