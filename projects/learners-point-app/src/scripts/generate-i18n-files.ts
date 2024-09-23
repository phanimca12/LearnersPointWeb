import { writeFileSync, readFileSync } from 'fs';

const masterData = JSON.parse(readFileSync(__dirname + '/../assets/i18n/_master.json', { encoding: 'utf8', flag: 'r' }));

writeI18nFile('in-hindi', buildLangData(masterData, 'in-hindi'));
writeI18nFile('in-telugu', buildLangData(masterData, 'in-telugu'));
writeI18nFile('in-tamil', buildLangData(masterData, 'in-tamil'));
writeI18nFile('thai', buildLangData(masterData, 'thai'));
writeI18nFile('en-us', buildLangData(masterData, 'en'));
writeI18nFile('en', buildLangData(masterData, 'en'));
writeI18nFile('zh', buildLangData(masterData, 'zh'));
writeI18nFile('zh-cn', buildLangData(masterData, 'zh'));
writeI18nFile('ja', buildLangData(masterData, 'ja'));


function writeI18nFile(i18nCode, data) {
  const filePath = `${__dirname}/../assets/i18n/${i18nCode}.json`;
  writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function buildLangData(source, langCode) {
  if (typeof source[langCode] === 'string') {
    return source[langCode];
  } else if (typeof source === 'object') {
    const langDataObj = {};
    Object.keys(source).forEach(key => {
      langDataObj[key] = buildLangData(source[key], langCode);
    });
    return langDataObj;
  }
}
