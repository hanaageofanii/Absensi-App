<template>
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 class="text-2xl font-semibold mb-4">
        Scan QR Absensi {{ pulang ? 'Pulang' : 'Masuk' }}
        </h2>
        <qrcode-stream @decode="onDecode" @init="onInit" class="mx-auto w-72 h-72 rounded-lg" />
        <p v-if="error" class="text-red-600 mt-4">{{ error }}</p>
        <p v-if="scanResult" class="mt-4 text-green-600 font-medium break-words">QR Code: {{ scanResult }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'

const props = defineProps({
    pulang: Boolean,
})

const emit = defineEmits(['next', 'updateScanData'])
const scanResult = ref(null)
const error = ref(null)

function onDecode(result) {
    scanResult.value = result
    emit('updateScanData', result)
    setTimeout(() => emit('next'), 700)
}

function onInit(promise) {
    promise.catch(() => {
        error.value = 'Tidak bisa mengakses kamera, izinkan akses kamera di browser kamu'
    })
}
</script>
