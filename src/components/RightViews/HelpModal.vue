<template>
  <div
    class="contact-panel position-relative rounded-4 text-white p-4 border border-white"
    style="background-color: rgba(100, 100, 100, 0.80);
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
    <h2 class="text-white mb-4 text-center">
      {{ panelTitle }}
    </h2>

    <!-- Lista med hjälpämnen -->
    <div 
      v-if="!selectedTopic" 
      class="d-flex flex-column gap-2 flex-grow-1 overflow-auto">
      <button 
        v-for="(topic, index) in topics" 
        :key="topic.id"
        class="btn btn-secondary-custom w-100"
        @click="selectTopic(topic)"
      >
        {{ topic.label }}
      </button>
    </div>

    <!-- Detaljvy när ett ämne är valt -->
    <div v-else class="flex-column flex-grow-1 overflow-auto">
      <p class="text-white">{{ selectedTopic.content }}</p>

      <button class="btn-secondary-custom" @click="backToTopics">
        {{ t('back') }}
      </button>
    </div>

    <!-- Stäng fönsterknapp längst ner -->
    <div class="btn-wrapper mt-3">
      <button type="button" class="btn-secondary-custom" @click="close">
          <i class="bi bi-x-circle-fill text-white fs-5"></i>
          {{ t('closeWindow') }}
      </button>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useI18n } from '../../i18n/useI18n'
import { useHelpI18n } from '../../i18n/help-i18n'
import { helpTopics } from '../../i18n/helpTopics'
import type { HelpTopicDefinition } from '../../i18n/helpTopics'

interface HelpTopic {
  id: string
  label: string
  content: string
}

export default defineComponent({
  name: 'HelpPanel',
  emits: ['close'],
  setup(_, { emit }) {
    const { t } = useI18n()
    const { tHelp } = useHelpI18n()

    const selectedTopic = ref<HelpTopic | null>(null)

    const topics = computed<HelpTopic[]>(() =>
      helpTopics.map((topic: HelpTopicDefinition) => ({
        id: topic.id,
        label: tHelp(topic.labelKey),
        content: tHelp(topic.contentKey)
      }))
    )

    const panelTitle = computed(() =>
      selectedTopic.value ? selectedTopic.value.label : t('helpTitle')
    )

    const selectTopic = (topic: HelpTopic): void => {
      selectedTopic.value = topic
    }

    const backToTopics = (): void => {
      selectedTopic.value = null
    }

    const close = (): void => {
      emit('close')
    }

    return {
      t,
      topics,
      selectedTopic,
      panelTitle,
      close,
      selectTopic,
      backToTopics
    }
  }
})
</script>