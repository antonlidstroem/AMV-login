<template>
  <div
    class="contact-panel position-relative rounded-4 text-white p-2 border border-white"
    style="background-color: rgba(100,100,100,0.80); width: 90%; max-width: 900px; margin: 0 auto; display: flex; flex-direction: column;"
  >
    <div class="position-relative mb-3 px-5 pt-2"> 
      <h2 class="text-white text-center m-0">
        {{ selectedTopic ? selectedTopic.label : t('helpTitle') }}
      </h2>
      
      <AppIconButtonClose
        @close="ui.closeOverlays()"
        style="position: absolute; right: 0; top: 0; margin: 0 !important;"
      />
    </div>

    <div v-if="!selectedTopic" class="d-flex flex-column gap-2 flex-grow-1 overflow-auto px-4">
      <SecondaryButton
        v-for="topic in topics"
        :key="topic.id"
        :label="topic.label"
        class="w-100"
        @action="selectTopic(topic)"
      />
    </div>
    <div v-else class="flex-column flex-grow-1 overflow-auto px-4">
      <p class="text-white">{{ selectedTopic.content }}</p>
    </div>

    <div class="d-flex justify-content-center align-items-center gap-3 mt-4">
      <SecondaryButton
        v-if="selectedTopic"
        :label="t('goBack')"
        icon="bi bi-arrow-left"
        class="btn-modal" 
        @action="backToTopics"
      />
      
      <AppButtonCloseWindow />
    </div> 
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUIStore } from '../../modules/stores/ui'
import { useHelpI18n } from '../../modules/i18n/help-i18n'
import { helpTopics } from '../../modules/i18n/help-topics-config'
import type { HelpTopicDefinition } from '../../modules/i18n/help-topics-config'
import AppIconButtonClose from '../common/AppIconButtonClose.vue'
import SecondaryButton from '../common/AppButtonSecondary.vue'
import AppButtonCloseWindow from '../common/AppButtonCloseWindow.vue'

interface HelpTopic { id: string; label: string; content: string }

const { t } = useI18n()
const ui = useUIStore()
const { tHelp } = useHelpI18n()

const selectedTopicId = ref<string | null>(null)

const toHelpTopic = (def: HelpTopicDefinition): HelpTopic => ({
  id: def.id,
  label: tHelp(def.labelKey),
  content: tHelp(def.contentKey),
})

const topics = computed<HelpTopic[]>(() => helpTopics.map(toHelpTopic))

const selectedTopic = computed<HelpTopic | null>(() => {
  if (!selectedTopicId.value) return null
  const def = helpTopics.find(d => d.id === selectedTopicId.value)
  return def ? toHelpTopic(def) : null
})

const panelTitle = computed(() =>
  selectedTopic.value ? selectedTopic.value.label : t('helpTitle'),
)

const selectTopic = (topic: HelpTopic) => { selectedTopicId.value = topic.id }
const backToTopics = () => { selectedTopicId.value = null }
</script>
