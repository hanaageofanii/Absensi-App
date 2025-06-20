<template>
    <div class="bg-white p-10 rounded-lg shadow-lg text-center w-full max-w-md">
        <h1 class="text-3xl font-bold mb-4">
        {{ pulang ? 'Terima kasih sudah bekerja hari ini!' : 'Semangat bekerja!' }}
        </h1>
        <p class="text-lg text-gray-700">
        {{ pulang ? 'Selamat pulang dan istirahat dengan baik.' : 'Semoga hari ini produktif dan menyenangkan.' }}
        </p>
    </div>
</template>

<script setup>
const props = defineProps({
    pulang: Boolean,
})
</script>
