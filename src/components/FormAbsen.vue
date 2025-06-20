<template>
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-xl font-semibold mb-4">{{ pulang ? 'Form Absen Pulang' : 'Form Absen Masuk' }}</h2>
        <form @submit.prevent="submitForm" class="space-y-4">
        <div>
            <label class="block font-medium mb-1">Nama</label>
            <input type="text" v-model="form.nama" class="w-full border rounded px-3 py-2" required />
        </div>
        <div>
            <label class="block font-medium mb-1">Tanggal</label>
            <input type="date" v-model="form.tanggal" class="w-full border rounded px-3 py-2" required />
        </div>
        <div>
            <label class="block font-medium mb-1">Kehadiran</label>
            <select v-model="form.kehadiran" class="w-full border rounded px-3 py-2" required>
            <option value="">Pilih</option>
            <option value="hadir">Hadir</option>
            <option value="sakit">Sakit</option>
            <option value="izin">Izin</option>
            <option value="terlambat">Terlambat</option>
            </select>
        </div>
        <div>
            <label class="block font-medium mb-1">Lokasi (GPS)</label>
            <input type="text" v-model="form.gps" readonly class="w-full border rounded px-3 py-2 bg-gray-100" />
        </div>
        <div>
            <label class="block font-medium mb-1">Foto Absen</label>
            <input type="file" @change="onFileChange" accept="image/*" required />
            <img v-if="preview" :src="preview" alt="Preview" class="mt-2 max-h-48 rounded" />
        </div>

        <div v-if="overtime" class="text-red-600 font-bold">
            {{ pulang ? 'Overtime Pulang' : 'Terlambat Masuk' }}
        </div>
        <div v-else class="text-green-600 font-bold">
            {{ pulang ? 'On Time Pulang' : 'On Time Masuk' }}
        </div>

        <button
            type="submit"
            class="w-full bg-blue-600 text-white rounded py-2 mt-4 hover:bg-blue-700 transition"
        >
            Simpan dan Lanjut
        </button>
        </form>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
    scanData: String,
    pulang: Boolean,
})

const emit = defineEmits(['next'])

const form = ref({
    nama: '',
    tanggal: new Date().toISOString().substr(0, 10),
    kehadiran: '',
    gps: '',
    foto: null,
})

const preview = ref(null)
const overtime = ref(false)

function onFileChange(e) {
    const file = e.target.files[0]
    if (file) {
        form.value.foto = file
        preview.value = URL.createObjectURL(file)
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
        (pos) => {
            form.value.gps = `${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)}`
        },
        () => {
            form.value.gps = 'GPS tidak aktif'
        }
        )
    } else {
        form.value.gps = 'Browser tidak support GPS'
    }
}

function checkOvertime() {
    const now = new Date()
    if (props.pulang) {
        overtime.value = now.getHours() >= 17
    } else {
        overtime.value = now.getHours() >= 9
    }
}

function submitForm() {
    if (!form.value.nama || !form.value.kehadiran || !form.value.foto) {
        alert('Lengkapi form terlebih dahulu')
        return
    }
    emit('next')
}

onMounted(() => {
    getLocation()
    checkOvertime()
})
</script>
