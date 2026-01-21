const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const process = require('process');

const inputFilePath = process.argv[2] || 'locales/translationsource.csv';
const outputDir = process.argv[3] || 'locales/';

const unflattenJson = (flatData) => {
  const out = {};
  Object.entries(flatData).forEach(([key, value]) => {
    const parts = key.split('.');
    let d = out;
    parts.slice(0, -1).forEach((part) => {
      if (!d[part]) d[part] = {};
      d = d[part];
    });
    d[parts[parts.length - 1]] = value;
  });
  return out;
};

const processCSV = async () => {
  const langDicts = {};
  let headers = [];

  fs.createReadStream(inputFilePath)
    .pipe(csv())
    .on('headers', (h) => {
      headers = h;
      //   headers.shift(); // Remove "Key" column
      headers.forEach((lang) => (langDicts[lang] = {}));
    })
    .on('data', (row) => {
      const key = row['\ufeffKey'] || row['Key'];
      headers.forEach((lang) => {
        langDicts[lang][key] = row[lang] || row['en']; // Fallback to English
      });
    })
    .on('end', () => {
      Object.entries(langDicts).forEach(([lang, flatDict]) => {
        if (lang !== '\ufeffKey' && lang !== 'Key') {
          const nested = unflattenJson(flatDict);
          const langPath = path.join(outputDir, lang);
          if (!fs.existsSync(langPath))
            fs.mkdirSync(langPath, { recursive: true });
          fs.writeFileSync(
            path.join(langPath, 'translations.json'),
            JSON.stringify(nested, null, 2),
          );
          console.log(`Created ${lang}/translations.json`);
        }
      });
    });
};

processCSV();
