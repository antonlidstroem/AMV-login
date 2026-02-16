<template>
  <div class="contact-panel position-relative rounded-4 text-white p-4 border border-white"
       style="background-color: rgba(33, 33, 33, 0.70);
              width: 90%;
              max-width: 900px;
              height: 85%;
              max-height: 90vh;
              margin: auto;
              display: flex;
              flex-direction: column;">

    <!-- Stäng-knapp -->
    <button 
      class="btn btn-transparent btn-sm rounded-circle position-absolute top-0 end-0 m-3 d-flex align-items-center justify-content-center p-0"
      @click="close"
    >
      <i class="bi bi-x-circle text-white fs-4"></i>
    </button>

    <!-- Rubrik centrerad -->
    <h2 class="text-white mb-4 text-center">{{ t('helpTitle') }}</h2>

    <!-- Lista med hjälpämnen -->
    <div v-if="!selectedTopic" class="help-buttons flex-grow-1 overflow-auto">
      <button 
        v-for="(topic, index) in topics" 
        :key="index"
        class="btn-secondary-custom w-100"
        @click="selectTopic(topic)"
      >
        {{ topic.label }}
      </button>
    </div>

    <!-- Detaljvy när ett ämne är valt -->
    <div v-else class="flex-column flex-grow-1 overflow-auto">
      <div class="rounded-3 p-3 mb-4 flex-shrink-0 border border-white"
           style="background-color: rgba(20,20,20,0.55);">
        <h3 class="text-white">{{ selectedTopic.label }}</h3>
        <p class="text-white">{{ selectedTopic.content }}</p>
      </div>

      <button class="btn-secondary-custom" @click="backToTopics">
        {{ t('back') }}
      </button>
    </div>

    <!-- Stäng fönsterknapp längst ner -->
    <button type="button" class="btn-secondary-custom" @click="close">
        <i class="bi bi-x-circle-fill text-white fs-5"></i>
        {{ t('closeWindow') }}
      </button>

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
      { label: 'Hjälpsektion 1', content: 'Platshållartext.' },
      { label: 'Hjälpsektion 2', content: 'Platshållartext.' }
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
