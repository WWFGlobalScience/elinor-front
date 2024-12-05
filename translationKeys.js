const { exec } = require('child_process');
const json = require('./locales/en/translations.json');
const keys = [];
const iterate = (object, prefix = '') => {
    for (const key in object) {
        if (typeof object[key] === 'object') {
            iterate(object[key], (prefix !== '' ? prefix + '.' : '') + key);
        } else {
            keys.push((prefix !== '' ? prefix + '.' : '') + key);
        }
    }
};

iterate(json);

const unusedKeys = [];

for (const key of keys) {
    exec(`grep -rnw "${key}" ./components ./pages ./store`, (error) => {
        if (error) {
            console.log(key);
        }
    });
}
