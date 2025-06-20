<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-yellow-100 via-white to-red-100 p-6">
    <component
      :is="steps[currentStep]"
      @next="nextStep"
      :scanData="scanData"
      @updateScanData="val => scanData = val"
      :pulang="true"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ScanQR from '../components/ScanQR.vue'
import FormAbsen from '../components/FormAbsen.vue'
import ToDoPage from '../components/ToDoPage.vue'
import GreetingCard from '../components/GreetingCard.vue'

const steps = [ScanQR, FormAbsen, ToDoPage, GreetingCard]
const currentStep = ref(0)
const scanData = ref(null)

function nextStep() {
    if (currentStep.value < steps.length - 1) {
        currentStep.value++
    }
}
</script>
