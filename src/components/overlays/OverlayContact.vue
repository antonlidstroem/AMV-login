<script lang="ts">
import { defineComponent, ref, markRaw } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePopupStore } from '../../modules/stores/popup' // Importera store
import { apiClient } from '../../modules/services/api-client'
import SecondaryButton from '../common/AppButtonSecondary.vue'
import AppIconButtonClose from '../common/AppIconButtonClose.vue'
import AppSuccess from '../common/AppSuccess.vue'

export default defineComponent({
  name: 'ContactPanel',
  components: { SecondaryButton, AppIconButtonClose },
  emits: ['close'],

  setup(_, { emit }) {
    const { t } = useI18n()
    const popup = usePopupStore() // Initiera store
    const name = ref(''), email = ref(''), message = ref('')

    const sendContact = async () => {
      popup.show({ title: t('sendingMessage'), loading: true })

      try {
        await apiClient.sendContactMessage({
          name: name.value,
          email: email.value,
          message: message.value
        })

        popup.show({
          title: t('messageSent'),
          loading: false,
          component: markRaw(AppSuccess),
          buttons: [{ 
            label: t('okClose'), 
            action: () => { 
              popup.hide()
              emit('close') 
            } 
          }]
        })
      } catch (err) {
        popup.show({
          title: t('errorTitle'),
          icon: 'bi bi-exclamation-triangle',
          buttons: [{ label: t('okClose'), action: () => popup.hide() }]
        })
      }
    }

    const close = () => emit('close')
    return { t, name, email, message, sendContact, close }
  }
})
</script>