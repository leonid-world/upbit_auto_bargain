<template>
  <q-page class="flex flex-center">
    <h1>📘 조회</h1>
    <button @click="getAccountInfo">계좌 조회</button>

    <div v-if="loading">로딩 중...</div>
    <ul v-if="accounts.length > 0">
      <li v-for="(account, index) in accounts" :key="index">
        <strong>통화:</strong> {{ account.currency }}<br />
        <strong>잔액:</strong> {{ account.balance }}<br />
        <strong>잠김:</strong> {{ account.locked }}<br />
        <strong>평균 매수 가격:</strong> {{ account.avg_buy_price }}<br />
        <hr />
      </li>
    </ul>

    <div v-if="error" class="error">❌ {{ error }}</div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAccounts, generateJwtToken } from "src/api/api";

const accounts = ref([]);
const loading = ref(false);
const error = ref("");
const getAccountInfo = async () => {
  console.log("계좌 가져오기!");
  loading.value = true;
  error.value = "";

  try {
    console.log("before getAccounts");
    // generateJwtToken();
    const data = await getAccounts();
    console.log("after getAccounts");
    console.log("data : ", data);
    // accounts.value = data;
  } catch (err) {
    error.value = "계좌 조회 중 에러가 발생했습니다.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
