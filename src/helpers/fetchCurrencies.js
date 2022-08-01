const END_POINT = 'https://economia.awesomeapi.com.br/json/all';

export default async function fecthCurrencies() {
  try {
    const fecthData = await fetch(END_POINT);
    const currenciesInfo = await fecthData.json();
    return currenciesInfo;
  } catch (error) {
    console.log(error.message);
  }
}
