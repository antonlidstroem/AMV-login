<template>
  <div class="help-panel">
    <!-- Stäng-cirkel -->
    <button class="close-circle" @click="close">×</button>

    <!-- Lista med hjälpknappar -->
    <div v-if="!selectedTopic" class="help-buttons">
      <button v-for="(topic, index) in topics" 
              :key="index"
              @click="selectTopic(topic)">
        {{ topic.label }}
      </button>
    </div>

    <!-- Visar innehåll när ett ämne är valt -->
    <div v-else class="help-content">
      <h2>{{ selectedTopic.label }}</h2>
      <p>{{ selectedTopic.content }}</p>

      <button class="btn-close" @click="backToTopics">{{ t('back') }}</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useI18n } from '../../i18n/useI18n'

export default {
  emits: ['close'],
  setup(_, { emit }) {
    const { t } = useI18n()
    const selectedTopic = ref(null)

    const topics = [
      { label: 'Jag har glömt mitt lösenord', content: 'Platshållartext för lösenord.' },
      { label: 'Jag har inte tillgång till min e-post', content: 'Platshållartext för e-post.' },
      { label: 'Jag har stött på ett fel i systemet', content: 'Platshållartext för fel.' },
      { label: 'Hjälpsektion', content: 'Platshållartext.' },
      { label: 'Hjälpsektion', content: 'Platshållartext.' },
      { label: 'Hjälpsektion', content: 'Platshållartext.' },
      { label: 'Hjälpsektion', content: 'Platshållartext.' },
      { label: 'Hjälpsektion', content: 'Platshållartext.' },
      { label: 'Hjälpsektion', content: 'Platshållartext.' }
    ]

    function close() {
      emit('close')
    }

    function selectTopic(topic) {
      selectedTopic.value = topic
    }

    function backToTopics() {
      selectedTopic.value = null
    }

    return {
      t,
      selectedTopic,
      topics,
      close,
      selectTopic,
      backToTopics
    }
  }
}
</script>
