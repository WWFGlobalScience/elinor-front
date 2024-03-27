import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

export function overrideSW(generator) {
    // read _nuxt folder file and generate manifestEntries.
    const fileRegex = /^[a-z0-9]{7}.js$/;
    const files = fs.readdirSync(generator.distNuxtPath);
    const manifestEntries = files
        .filter((f) => fileRegex.test(f))
        .map((f) => {
            return {
                url: `/_nuxt/${f}`,
                revision: generateHash(f),
            };
        });

    // replace manifestEntries to swFileContents
    var swPath = path.join(generator.distPath, 'sw.js');
    let swFileContents = fs.readFileSync(swPath, 'utf8');
    const entriesString = JSON.stringify(manifestEntries, null, 2);
    swFileContents = swFileContents.replace(
        /"VALUE"/g,
        `${entriesString}`
    );

    // write swFileContents to sw.js
    var swPath = path.join(generator.distPath, 'sw.js');
    fs.writeFileSync(swPath, swFileContents);
}

function generateHash(value) {
    var md5 = crypto.createHash('md5');
    md5.update(value);
    return md5.digest('hex');
}
