<script lang="ts" setup></script>

<template>
  <div id="app">
    <div class="card w-full bg-base-100 shadow-xl my-5">
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
    <div id="form">
      <select class="select select-bordered select-primary">
        <option
          disabled
          selected
        >
          Borsa
        </option>
        <option>Norveç</option>
        <option>İspanya</option>
      </select>
      <select class="select select-bordered select-primary">
        <option
          disabled
          selected
        >
          Zaman Aralığı
        </option>
        <option>15y</option>
        <option>max</option>
      </select>
      <select class="select select-bordered select-primary">
        <option
          disabled
          selected
        >
          Mum
        </option>
        <option>1d</option>
        <option>İspanya</option>
      </select>
      <select class="select select-bordered select-primary">
        <option
          disabled
          selected
        >
          Fibo. Seviyesi
        </option>
        <option>618</option>
        <option>768</option>
      </select>
      <button class="btn btn-primary">Ara</button>
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
</style>
