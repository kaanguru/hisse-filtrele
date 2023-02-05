<script lang="ts" setup>
import {ref, reactive} from 'vue';
import * as semboller from '../data/semboller';
import * as kontroller from './kontroller';
interface Semboller {
  [key: string]: string[];
}
const sembollerTyped = semboller as Semboller;
// const apiKey = import.meta.env.VITE_VANTAGE_KEY;
const borsalar = [
  'Ispanya',
  'Norvec',
  'Yunanistan',
  'NasdaqMega',
  'Almanya',
  'Turkiye',
  'NasdaqLarge',
  'XU050',
  'XU030',
  'XKTUM',
  'XK100',
  'XK050',
];
const periyodlar = ['1y', '2y', '5y', '10y', '15y', 'ytd', 'max'];
const mumlar = ['60m', '90m', '1h', '1d', '5d', '1wk', '1mo', '3mo'];
const seviyeler = ['236', '382', '5', '618', '786'];
let uyumluHisseler: string[] = reactive([]);
const filtreler = ref({
  borsa: 'XU050',
  aralik: '1y',
  mum: '1d',
  seviye: '618',
});
let secilenBorsa = 'Borsa';
let secilenPeriyod = 'Zaman Aralığı';
let secilenMum = 'Mum';
let secilenSeviye = 'Fibo. Seviyesi';
function ara() {
  if (filtreleriEsitle()) {
    uyumluHisseler.length > 0 ? uyumluHisseler.splice(0, uyumluHisseler.length) : true;
    const borsadakiTumSemboller = aranilanSemboller();
    for (const hisse in borsadakiTumSemboller) {
      const hisseSembol: string = borsadakiTumSemboller[hisse];
      if (kontroller.fibSeviyeAltinda(hisseSembol, filtreler.value)) {
        uyumluHisseler.push(hisseSembol);
      }
    }
    console.log('uyumluHisseler :>> ', uyumluHisseler);
    console.log('hisseAdeti', aranilanSemboller().length);
    console.log('filtreler.value :>> ', filtreler.value);
  }
}
function filtreleriEsitle(): boolean {
  filtreler.value.borsa = secilenBorsa;
  filtreler.value.aralik = secilenPeriyod;
  filtreler.value.mum = secilenMum;
  filtreler.value.seviye = secilenSeviye;

  if (
    filtreler.value.borsa == 'Borsa' ||
    filtreler.value.aralik == 'Zaman Aralığı' ||
    filtreler.value.mum == 'Mum' ||
    filtreler.value.seviye == 'Fibo. Seviyesi'
  ) {
    alert('Tüm alanları doldurur musunuz?');
    return false;
  } else {
    return true;
  }
}
function aranilanSemboller() {
  return sembollerTyped[secilenBorsa];
}

/* const prices = ref<Array<{date: string; open: string; high: string; low: string; close: string}>>(
  [],
);

onMounted(async () => {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${apiKey}`,
  );
  const data = await response.json();
  prices.value = Object.keys(data['Time Series (Daily)']).map(date => {
    return {
      date,
      open: data['Time Series (Daily)'][date]['1. open'],
      high: data['Time Series (Daily)'][date]['2. high'],
      low: data['Time Series (Daily)'][date]['3. low'],
      close: data['Time Series (Daily)'][date]['4. close'],
    };
  });
}); */
</script>

<template>
  <div id="app">
    <div
      v-if="uyumluHisseler.length == 0"
      class="card w-full bg-base-100 shadow-xl my-5"
    >
      <figure>
        <img
          src="/assets/fibo.png"
          alt="Fibonachi"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">
          Fibonachi Geri Çekilmesi seviyleri altında kalan hisseleri bulur.
          <div class="badge badge-secondary">Yeni</div>
        </h2>
        <p>Aşağıdaki bölümden sadece borsa seçerek arama başlatabilirsiniz</p>
      </div>
    </div>
    <ul v-else>
      <li
        v-for="hisse in uyumluHisseler"
        :key="hisse"
      >
        {{ hisse }}
      </li>
    </ul>
    <div id="form">
      <select
        v-model="secilenBorsa"
        class="select select-bordered select-primary"
      >
        <option
          disabled
          selected
        >
          Borsa
        </option>
        <option
          v-for="borsa in borsalar"
          :key="borsa"
        >
          {{ borsa }}
        </option>
      </select>
      <select
        v-model="secilenPeriyod"
        class="select select-bordered select-primary"
      >
        <option
          disabled
          selected
        >
          Zaman Aralığı
        </option>
        <option
          v-for="periyod in periyodlar"
          :key="periyod"
        >
          {{ periyod }}
        </option>
      </select>
      <select
        v-model="secilenMum"
        class="select select-bordered select-primary"
      >
        <option
          disabled
          selected
        >
          Mum
        </option>
        <option
          v-for="mum in mumlar"
          :key="mum"
        >
          {{ mum }}
        </option>
      </select>
      <select
        v-model="secilenSeviye"
        class="select select-bordered select-primary"
      >
        <option
          disabled
          selected
        >
          Fibo. Seviyesi
        </option>
        <option
          v-for="seviye in seviyeler"
          :key="seviye"
        >
          {{ seviye }}
        </option>
      </select>
      <button
        class="btn btn-primary"
        @click="ara()"
      >
        Ara
      </button>
      <button class="btn btn-ghost">İptal</button>
    </div>
  </div>
</template>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  @apply text-center mx-auto my-auto max-w-2xl flex flex-row;
}
#form {
  @apply mt-auto pl-2;
}
select {
  @apply w-full max-w-xs my-5;
}
option {
  @apply m-5;
}
button {
  @apply mx-5;
}
ul{

  @apply max-w-sm p-5;
}
li {
  font-size: small;
  display: inline-block;
  margin-left: 0.2rem;
}
</style>
