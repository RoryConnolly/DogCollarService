// const r = Math.random().toString(36).substring(7);
// console.log('random', r);
// const bark = 'BARK';

// function createSortKey(activityType) {
//   let randomNum = '';
//   // const aType = activityType;
//   const characters = '0123456789';
//   // const charactersLength = characters.length;
//   for (let i = 0; i < 13; i += 1) {
//     randomNum += characters.charAt(Math.floor(Math.random() * 10));
//   }
//   // console.log(randomNum);
//   // const lick = '_';
//   const sortKey = randomNum.concat('_', activityType);
//   // console.log('sortKey', sortKey);
//   return sortKey;
// }

// console.log(createSortKey(bark));
const currentDate = new Date().toISOString();
// console.log(currentDate.toISOString());

console.log(currentDate);

// const currentDate2 = new Date().toString();
// const currentDate = new Date().JSON.stringify();

// console.log(currentDate2);
