const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const zeev = require("zeev-gempa");

const Token = "Your_Token"; //Kamu bisa mendapatkannya dari botfather
const bot = new Telegraf(Token);

bot.start((ctx) => {
  console.log(ctx.from);
  ctx.reply(`Hai selamat datang ${ctx.from.first_name}.\nKetik /menu untuk melihat menu.`);
});

bot.command("menu", (ctx) => {
  console.log(ctx.from);
  let mess = "Menu Bot \n Fitur-fitur bot ini masih di kerjakan oleh owner jadi mohon nikmati fitur yang tersedia saat ini.Terimakasih telah menggunakan bot ini.";
  bot.telegram.sendMessage(ctx.chat.id, mess, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text : "Info Gempa",
            callback_data: "gempa"
          }
        ]
      ]
    }
  });
});

bot.action("gempa", (ctx) => {
  zeev.gempa().then(result => {
    console.log(result);
    var mess = `INFO GEMPA TERKINI\n\nTanggal : ${result.Tanggal}\nJam : ${result.Jam}\nLintang : ${result.Lintang}\nBujur : ${result.Bujur}\nMagnitudo : ${result.Magnitude}\nKedalaman : ${result.Kedalaman}\nWilayah : ${result.Wilayah}`;
    bot.telegram.sendMessage(ctx.chat.id, mess, {});
  });
});

bot.on("message", async (ctx) => {
  console.log(`${ctx.from.first_name} : ${ctx.message.text}`);
});

bot.launch();