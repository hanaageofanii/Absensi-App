<template>
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-xl font-semibold mb-4">To Do List Hari Ini</h2>
        <form @submit.prevent="submitToDo" class="space-y-4">
        <div>
            <label class="block font-medium mb-1">Judul</label>
            <input type="text" v-model="todo.judul" class="w-full border rounded px-3 py-2" required />
        </div>
        <div>
            <label class="block font-medium mb-1">Deskripsi</label>
            <textarea v-model="todo.deskripsi" class="w-full border rounded px-3 py-2" rows="3"></textarea>
        </div>
        <div>
            <label class="block font-medium mb-1">Status</label>
            <select v-model="todo.status" class="w-full border rounded px-3 py-2" required>
            <option value="pending">Pending</option>
            <option value="done">Done</option>
            </select>
        </div>
        <div>
            <label class="block font-medium mb-1">Target Penyelesaian (hari)</label>
            <input type="number" v-model="todo.targetHari" class="w-full border rounded px-3 py-2" min="1" required />
        </div>

        <button
            type="submit"
            :disabled="disableSubmit"
            class="w-full bg-green-600 text-white rounded py-2 mt-4 hover:bg-green-700 transition disabled:bg-gray-400"
        >
            Simpan To Do
        </button>
        <p v-if="disableSubmit" class="text-red-600 mt-2">Ceklis to do hanya bisa dilakukan setelah jam 17:00 saat pulang</p>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
    pulang: Boolean,
})

const emit = defineEmits(['next'])

const todo = ref({
    judul: '',
    deskripsi: '',
    status: 'pending',
    targetHari: 1,
})

const disableSubmit = ref(false)

function checkDisable() {
    const now = new Date()
    if (props.pulang) {
        disableSubmit.value = now.getHours() < 17
    } else {
        disableSubmit.value = false
    }
}

function submitToDo() {
    if (!todo.value.judul || !todo.value.status || !todo.value.targetHari) {
        alert('Lengkapi To Do List')
        return
    }
    emit('next')
}

onMounted(() => {
    checkDisable()
})
</script>
