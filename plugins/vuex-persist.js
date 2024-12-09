import VuexPersistence from 'vuex-persist';

export default ({ store }) => {
    new VuexPersistence({
        filter: (mutation) => {
            mutation.type !== 'setSearch'; // do not persist assessments page search text
        },
    }).plugin(store);
};
