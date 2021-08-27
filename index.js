const TelegramApi = require('node-telegram-bot-api')
var cag = require('./question.json')
const token = ''
const start = '/start';
const info = '/info';
const question = '/question';
const bot = new TelegramApi(token, {polling: true})


const chats = {}

const questionOptions = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
          [{text: 'Какие карты у Вас есть? ', callback_data:'1'}],
          [{text: 'Как заказать карту? ', callback_data:'2'}],
          [{text: 'Сколько стоит Ваша карта? ', callback_data:'3'}],
          [{text: 'Стоимость золотой карты? ', callback_data:'4'}],
          [{text: 'Приимущество золотой карты? ', callback_data:'5'}],
          [{text: 'Я заказал(а) карту, через сколько она будет готова?  ', callback_data:'6'}],
          [{text: 'Сколько дней доставляют карту? ', callback_data:'7'}],
          [{text: 'Я потерял(а) карту можно ли ее восстановить и где? ', callback_data:'8'}],
          [{text: 'Я Заказала карту, но мне сказали нет заявки? ', callback_data:'9'}],
          [{text: 'Как пройти идентификацию моей карты? ', callback_data:'10'}],
          [{text: 'Я оставил(а) заявку карты, но мне пришло отклонение? ', callback_data:'11'}],
          [{text: 'Как пройти идентификацию QIWI ', callback_data:'12'}],
          [{text: 'Я прошёл(а) идентификацию QIWI, но мне не пришла смс ', callback_data:'13'}],
          [{text: 'Я прошёл(а) идентификацию QIWI не понимаю, что мне дальше делать ', callback_data:'14'}],
          [{text: 'Сколько стоит проведения идентификации QIWI?', callback_data:'15'}],
          [{text: 'Можем ли через Инстаграм или фейсбук идентифицировать себя? QIWI? ЯНДЕКСА?  ', callback_data:'16'}],
          [{text: 'Я нахожусь в районе, но тут нет вашего офиса, где я могу идентифицировать QIWI? ЯНДЕКСА? ', callback_data:'17'}],
          [{text: 'Как получить PIN-код?', callback_data:'18'}],
          [{text: 'Я запрашиваю PIN-код, но мне не приходит. ', callback_data:'19'}],
          [{text: 'Я потеряла номер телефона ', callback_data:'20'}],
          [{text: 'Как пополнить свою банковскую карту? ', callback_data:'21'}],
          [{text: 'Как пополнить автобусную карту? ', callback_data:'22'}],
          [{text: 'Почему пополнил(а) свою карту с другого терминала взяли процент? ', callback_data:'23'}],
          [{text: 'Почему поставили процент в терминалах? ', callback_data:'24'}],
          [{text: 'Сколько раз могу пополнять по 500 сомони чтоб не взимался процент?', callback_data:'25'}],
          [{text: 'Почему в ваших банкоматах нет денег?', callback_data:'26'}],
          [{text: 'Почему ваши банкоматы не работают? ', callback_data:'27'}],
          [{text: 'С каких банкоматов можно снимать деньги? Берет ли процент?', callback_data:'28'}],
          [{text: 'Почему я не могу снять с другого банкомата? ', callback_data:'29'}],
          [{text: 'Сколько денег за раз выдает ваш банкомат?', callback_data:'30'}],
          [{text: 'Почему я не могу снять деньги? ', callback_data:'31'}],
          [{text: 'Я снял(а) деньги, но мне банкомат не выдал сумму, что мне делать? ', callback_data:'32'}],
          [{text: 'Я хочу установить около магазина банкомат (терминал).', callback_data:'33'}],
          [{text: 'Почему у меня с карты исчезают деньги?', callback_data:'34'}],
          [{text: 'У вас карта Визы нет? ', callback_data:'35'}],
          [{text: 'В дальнейшем будет ли виза карта? ', callback_data:'36'}],
          [{text: 'Могу ли я копить сумму в кошельке и до скольких сомон?', callback_data:'37'}],
          [{text: 'Сколько я могу пополнить мой кошелёк?', callback_data:'38'}],
          [{text: 'Я пополнила с терминала до сих пор деньги не поступили?', callback_data:'39'}],
          [{text: 'Как я могу перевести деньги с счета телефона на кошелек?', callback_data:'40'}],
          [{text: 'С какой системой могут нам отправит перевод с Европы? ', callback_data:'41'}],
          [{text: 'Как перевести деньги в Россию?', callback_data:'42'}],
          [{text: 'Как перевести деньги в Европу?', callback_data:'43'}],
          [{text: 'Как перевести деньги в Америку?', callback_data:'44'}],
          [{text: 'Где находится Ваш офис в определенном городе ?', callback_data:'45'}],
          [{text: 'Сколько могут мне отправить деньги через Сбербанк?', callback_data:'46'}],
          [{text: 'У вас есть вакансия?', callback_data:'47'}],
          [{text: 'Почему только 50.000 руб. лимит отправки через Сбербанк дс?  Нельзя ли повысить лимит?', callback_data:'48'}],
          [{text: 'Что такое авторизация? Мне просят авторизовать кошелёк?', callback_data:'49'}],
          [{text: 'Почему у меня в приложении не показывает историю платежей и выписку?', callback_data:'50'}],
          [{text: 'Я нахожусь в районе, далеко от Душанбе нет вашего офиса, мне нужна выписка карты.', callback_data:'51'}],
          [{text: 'Можете мне отправить выписку через иснтаграм  и фейсбук?', callback_data:'52'}],
          [{text: 'Почему я не могу пополнить 1 XBt?', callback_data:'53'}],
          [{text: 'Я оплачиваю картой, но в автобусе, но мою карту не принимают?', callback_data:'54'}],
          [{text: 'Где приобрести автобусную карту?', callback_data:'55'}],
          [{text: 'Как сделать мою карту студенческим?', callback_data:'56'}],
          [{text: 'Моя карта застряла в банкомате откуда взять?', callback_data:'57'}],
          [{text: 'Могу ли я взять карту если у меня нет паспорта?', callback_data:'58'}],
          [{text: 'Я не совершеннолетний, но имею паспорт могу ли я взять карту?', callback_data:'59'}],
          [{text: 'Я звонил(а) кол центру они отключили прям телефон?', callback_data:'60'}],
          [{text: 'Ваш оператор грубила мне ', callback_data:'61'}],
          [{text: 'У Вас очень плохое обслуживание! ', callback_data:'62'}],
          [{text: 'Мою проблему не решил кол центр. ', callback_data:'63'}],
          [{text: 'Кто то снял мои деньги с приложений что мне делать?', callback_data:'64'}],
          [{text: 'Мою карту Амонатбонк привязали к вашему приложению и сняли деньги.', callback_data:'65'}],
          [{text: 'Могу ли я поменять мои номера привязанной карты?', callback_data:'66'}],
          [{text: 'Номера моей карты стерлись ', callback_data:'67'}]
          
      ]  
    })
}


const starts =  () => {
// Commands
    bot.setMyCommands([
        // {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Что ты можешь?'},
        {command: '/question', description: 'Часто задаваемые вопросы'},
        {command: '/adres', description: 'Где находиться ваш офис?'},
        {command: '/call', description: 'Номера колл центра'},
        {command: '/report', description: 'Хочу написать Вам'}
    ])
    //get info about chat
    bot.on('message', msg => {
        const text = msg.text;
        const name = msg.from.first_name;
        const chatId = msg.chat.id;
    // start
    if(text === start){
         bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/c73/4f5/c734f51d-c1e0-4f08-8f88-d30fa20f23a1/11.webp')
         return bot.sendMessage(chatId, `Здравствуйте ${name}, Вас приветствует DC Tamos. Чем я могу Вам помочь?`);
    }
    // info
    if(text === info){
        return bot.sendMessage(chatId, `Я могу ответить на Ваши вопросы`);
    }

    if(text === '/adres'){
        return bot.sendMessage(chatId, `${name}, наши адреса – г. Душанбе, ул. Сохили 5 и г. Худжанд, ул. Сырдарьинская 5.`);
    }

    if(text === '/call'){
        return bot.sendMessage(chatId, `${name} Вы можете обратиться в наш колл-центр по номеру 446309999 `);
    }

    if(text === '/report'){
        return bot.sendMessage(chatId, `${name} Вы можете оставить свои пожелание тут tamos.dc.tj `);
    }
    //question
    if(text === question){
        bot.sendMessage(chatId, ` Выберите интересующий вопрос я Вам отвечу. `,questionOptions );
        const user = "";
        chats[chatId] =user;
        return bot.sendSticker(chatId,'https://tlgrm.ru/_/stickers/c73/4f5/c734f51d-c1e0-4f08-8f88-d30fa20f23a1/5.webp');
    }

    return bot.sendMessage(chatId, 'Я Вас не понимаю, попробуйте еще раз! ');

    
    })

    
    //giving data from message
    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        bot.sendMessage(chatId,cag[data])

        //  console.log(chatId, cag[data])
       
        
    })

    // function SortQuestion(value){
    //     bot.sendMessage(chatId, cag.value)
    // }

}

starts()
