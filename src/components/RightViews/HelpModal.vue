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
    <IconCloseButton @close="close" />

    <!-- Rubrik centrerad -->
    <h2 class="text-white text-center mt-4 mb-4 py-2">
      {{ panelTitle }}
    </h2>

    <!-- Lista med hjälpämnen -->
    <div 
      v-if="!selectedTopic" 
      class="d-flex flex-column gap-2 flex-grow-1 overflow-auto px-4">
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
    <div v-else class="flex-column flex-grow-1 overflow-auto px-4">
      <p class="text-white">{{ selectedTopic.content }}</p>

     
    </div>

    <!-- Stäng fönsterknapp längst ner -->
    <div class="btn-wrapper mt-3">

    </div>

    <!-- Knapprad längst ner -->
<div class="d-flex justify-content-center align-items-center gap-3 mt-4">

  <!-- Tillbaka (visas bara i detaljvy) -->

  <button 
    v-if="selectedTopic"
    type="button"
    class="btn btn-secondary-custom d-flex align-items-center justify-content-center px-4 btn-modal"
   
    @click="backToTopics">
    <i class="bi bi-arrow-left me-2 text-white"></i>
    {{ t('goBack') }}
  </button>

  <!-- Stäng fönster -->
    <div class="text-center mt-auto ">
      <CloseButton @close="$emit('close')" />
    </div>

</div>






  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useI18n } from '../../i18n/useI18n'
import { useHelpI18n } from '../../i18n/help-i18n'
import { helpTopics } from '../../i18n/helpTopics'
import type { HelpTopicDefinition } from '../../i18n/helpTopics'
import CloseButton from '../common/CloseButton.vue'
import IconCloseButton from '../common/IconCloseButton.vue'

interface HelpTopic {
  id: string
  label: string
  content: string
}

export default defineComponent({
  name: 'HelpPanel',
  components: { CloseButton, IconCloseButton },
  emits: ['close'],
  setup(_, { emit }) {
    const { t } = useI18n()
    const { tHelp } = useHelpI18n()

    const selectedTopicId = ref<string | null>(null)

 
    const topics = computed<HelpTopic[]>(() =>
      helpTopics.map((topic: HelpTopicDefinition) => ({
        id: topic.id,
        label: tHelp(topic.labelKey),
        content: tHelp(topic.contentKey)
      }))
    )

 
    const selectedTopic = computed<HelpTopic | null>(() => {
      if (!selectedTopicId.value) return null

      const topicDef = helpTopics.find(t => t.id === selectedTopicId.value)
      if (!topicDef) return null

      return {
        id: topicDef.id,
        label: tHelp(topicDef.labelKey),
        content: tHelp(topicDef.contentKey)
      }
    })

    const panelTitle = computed(() =>
      selectedTopic.value ? selectedTopic.value.label : t('helpTitle')
    )

    const selectTopic = (topic: HelpTopic): void => {
      selectedTopicId.value = topic.id
    }

    const backToTopics = (): void => {
      selectedTopicId.value = null
    }

    const close = (): void => {
      emit('close')
    }

    return {
      t,
      topics,
      selectedTopic,
      selectedTopicId,
      panelTitle,
      close,
      selectTopic,
      backToTopics
    }
  }
})
</script>