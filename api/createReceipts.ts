const fs = require("fs");
const path = require('path');
const appRoot = path.resolve(__dirname);

const apply = () => {
  const newReceipts = []
  let receiptNumber = 420049479511690;
  const year = 2019;
  let month = 1; 
  let day = 1;
  let loopCount = 0;
  names.forEach( name => {
    loopCount++;
    if (loopCount % 16 === 0) month++;
    if (loopCount % 14 === 0) day++;
    newReceipts.push({
      ...template,
      Receipt: receiptNumber++,
      EAN: name.ean,
      IngredientTypeName: name.finnish,
      TransactionDate: `${year}-0${month}-0${day}`
    })
  })
  fs.writeFileSync(appRoot + '/newReceipts.json', JSON.stringify(newReceipts, null, 2))
}

const template = {
    AreaId: 1,
    Receipt: 420049479511690,
    TransactionDate: "2019-01-30",
    BeginHour: 18,
    EAN: 6410405183637,
    Quantity: "1\t000000",
    PersonAgeGrp: "25-34",
    KCustomer: 6712,
    QualClass: "Q_4-7",
    EasyClass: "E_4-7"
  };

const names = [
   { "ean": "6417700050725", "finnish": "makaroni" },
   { "ean": "6412000017003", "finnish": "marmeladi" },
   { "ean": "6416597113919", "finnish": "kaurahiutale" },
   { "ean": "6408641077308", "finnish": "ananas" },
   { "ean": "7311311020599", "finnish": "tortilla" },
   { "ean": "8850987128561", "finnish": "nuudeli" },
   { "ean": "6411200103172", "finnish": "kaurahiutale" },
   { "ean": "6412000017201", "finnish": "marmeladi" },
   { "ean": "6410405073068", "finnish": "tomaattimurska" },
   { "ean": "8410184010191", "finnish": "riisi" },
   { "ean": "6409100050306", "finnish": "makkara" },
   { "ean": "6410405205483", "finnish": "jauheliha" },
   { "ean": "6410405040817", "finnish": "sokeri" },
   { "ean": "6410405197641", "finnish": "hunaja" },
   { "ean": "6410405169532", "finnish": "lihaliemikuutio" },
   { "ean": "6410405084224", "finnish": "vehnäjauho" },
   { "ean": "8076804215058", "finnish": "spaghetti" },
   { "ean": "6410405046789", "finnish": "pasta" },
   { "ean": "6410402010318", "finnish": "tonnikala" },
   { "ean": "6408790008581", "finnish": "kylmäsavulohi" }
 ]
 
apply();