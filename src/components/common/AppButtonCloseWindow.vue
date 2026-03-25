<template>
  <SecondaryButton
    :label="t('closeWindow')"
    icon="bi bi-x-circle-fill"
    class="btn-modal" 
    @action="ui.closeOverlays()"
  />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useUIStore } from '../../modules/stores/ui'
import SecondaryButton from './AppButtonSecondary.vue'

const { t } = useI18n()
const ui = useUIStore()
</script>