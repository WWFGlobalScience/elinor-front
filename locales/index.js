export const locales = ['en', 'es', 'id', 'pt', 'sw', 'fr', 'mg'];

let content = {};

for (const locale of locales) {
    import('./' + locale + '/content').then(
        (module) => (content[locale] = module.default),
    );
}

export default content;
