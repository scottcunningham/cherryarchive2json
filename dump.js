const sheetID = '1G-LZLjPp25AtXDylIo6_WooRnF7c6wTSCkUafsFmb2U'

const { GoogleSpreadsheet } = require('google-spreadsheet')

const credentials = require('./credentials.json')
const doc = new GoogleSpreadsheet(sheetID)

async function dumpArchive () {
  // Initialize Auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
  // Set up a service account as per the docs, download the generated JSON file and
  // move it to ./credentials.json
  await doc.useServiceAccountAuth(credentials)

  await doc.loadInfo() // loads document properties and worksheets

  const sheet = doc.sheetsByTitle.Master

  const rows = await sheet.getRows()

  const keyboards = []
  for (const [index, row] of rows.entries()) {
    const keyboard = parseKeyboardRow(row)
    // NOTE: you can just use the array index instead of storing this here
    keyboard.Index = index
    keyboards.push(keyboard)
  };

  console.log(JSON.stringify(keyboards))
}

function parseKeyboardRow (row) {
  return {
    // NOTE: some JSON fields are slightly different to the sheet, it might be
    // easier if they lined up 1:1 - doesn't make a huge difference though
    Series: row.kbSeries,
    Model: row.kbModel,
    Article: row.kbExtension,
    kbSwitch: row.kbSwitch,
    kbInterface: row.kbInterface,
    kbBrand: row.kbBrand,
    caseStyle: row.caseStyle,
    languagePrimary: row.languagePrimary,
    layoutSub: row.languageSecondary,
    layoutType: row.layoutType,
    keycapMaterial: row.keycapMaterial,
    keycapThickness: row.keycapThickness,
    keycapPrimary: row.keycapPrimary,
    keycapSub: row.keycapSub,
    keycapScheme: row.keycapScheme,
    kbKRO: row.kbKRO,
    kbFeature: row.kbFeature,
    kbFeature2: row.kbFeature2,
    switchPlate: row.switchPlate,
    switchSuper: row.switchSuper,
    switchLock: row.switchLock,
    caseColour: row.caseColour,
    keycapNonstandard: row.keycapNonstandard,
    keycapSide: row.keycapSide,
    keycapSecColour: row.keycapSecColour,
    keycapColour: row.keycapColour,
    keycapWindow: row.keycapWindow,
    keycapCaps: row.keycapCaps,
    keycapMX: row.keycapMX,
    keycapSpace: row.keycapSpace,
    // NOTE: some fields have text "No", you can save space/make this faster
    // by using a bool
    layoutWin: row.layoutWin
  }
}

dumpArchive()
