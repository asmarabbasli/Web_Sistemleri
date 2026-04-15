const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const TIERS = [
  { max: 100,      rate: 5,  label: "< 100 ₼"      },
  { max: 1000,     rate: 8,  label: "100 – 1000 ₼"  },
  { max: Infinity, rate: 10, label: "> 1000 ₼"      },
];

const fmt = (n) => n.toFixed(2);
const line = (char = "─", len = 36) => char.repeat(len);

function printResult(amount) {
  const tier = TIERS.find((t) => amount < t.max) ?? TIERS.at(-1);
  const discount = amount * (tier.rate / 100);
  const final    = amount - discount;

  console.log();
  console.log(line());
  console.log(" ENDİRİM HESABLAMASI");
  console.log(line());
  console.log(` Aktiv tier     : ${tier.label}  →  ${tier.rate}%`);
  console.log(` Əsas məbləğ   : ${fmt(amount)} ₼`);
  console.log(` Endirim        : −${fmt(discount)} ₼  (${tier.rate}%)`);
  console.log(line());
  console.log(` Ödəniləcək     : ${fmt(final)} ₼`);
  console.log(line());
  console.log();
}

rl.question("Alışveriş məbləğini daxil edin (₼): ", (input) => {
  const amount = parseFloat(input);

  if (isNaN(amount) || amount < 0) {
    console.error("Xəta: düzgün məbləğ daxil edin.");
    process.exit(1);
  }

  printResult(amount);
  rl.close();
});