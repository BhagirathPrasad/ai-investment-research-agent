import yahooFinanceDefault from 'yahoo-finance2';
const yahooFinance = new yahooFinanceDefault();

async function run() {
  try {
    const res = await yahooFinance.search('AAPL');
    console.log('News items:', res.news ? res.news.length : 0);
    if (res.news && res.news.length > 0) {
      console.log(res.news[0]);
    }
  } catch (e) {
    console.error(e);
  }
}
run();
