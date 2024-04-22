<script lang="ts">
  let baseAmount = 1;
  let targetAmount = 1;
  let baseCurrency = 'USD';
  let targetCurrency = 'EUR';
  let exchangeRate = 0;
  
  // Массив с кодами валют
  let currencies = []; 
  
  // Функция для загрузки текущего обменного курса
  async function loadExchangeRate() {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/8d993b99688058466634fe6a/latest/${baseCurrency}`);
    const data = await response.json();
    currencies = Object.keys(data.conversion_rates)
    exchangeRate = data.conversion_rates[targetCurrency];
    convert(baseAmount, 'base');
  }
  
  // Функция конвертации
  function convert(amount, type) {
    if (type === 'base') {
      targetAmount = (amount * exchangeRate).toFixed(2);
    } else {
      baseAmount = (amount / exchangeRate).toFixed(2);
    }
  }

  // Реактивное обновление, когда меняются валюты
  $: loadExchangeRate(), [baseCurrency, targetCurrency];
  
  // Реактивное обновление сумм
  $: if (baseCurrency && targetCurrency) { loadExchangeRate(); }
</script>

<h1>Конвертор валют</h1>
<main>
  <div class="currency-converter">
    <div class="currency-input">
      <input type="number" bind:value={baseAmount} on:input="{() => convert(baseAmount, 'base')}">
      <select bind:value={baseCurrency}>
        {#each currencies as currency}
          <option value={currency}>{currency}</option>
        {/each}
      </select>
    </div>

    <div class="currency-input">
      <input type="number" bind:value={targetAmount} on:input="{() => convert(targetAmount, 'target')}">
      <select bind:value={targetCurrency}>
        {#each currencies as currency}
          <option value={currency}>{currency}</option>
        {/each}
      </select>
    </div>
  </div>
</main>

<style>
  main {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #333;
    max-width: 500px;
    margin: 50px auto;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    background: #fff;
    text-align: center;
  }
  
  .currency-converter {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: #fff;
  }
  
  .currency-input {
    display: flex;
    justify-content: space-between;
  }
  
  select,
  input[type='number'] {
    padding: 10px;
    margin: 10px 0;
    border: 2px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 18px;
    transition: border-color 0.3s;
  }

  select {
    width: 30%;
  }

  input[type='number']{
    width: 60%;
  }
  
  select:focus,
  input[type='number']:focus {
    outline: none;
    border-color: #007BFF;
  }
</style>