<template>
  <div class="w-full max-w-md">
    
    <img :src="AMVLogo" class="h-14 mx-auto mb-10" />

<label class ="text-sm font-large">
          {{ t('login') }}
        </label>

    <form @submit.prevent="handleLogin" class="flex flex-col gap-4" >
      <div>
  <!-- Användarnamnfält -->
        <div class="form-group relative">
        <!-- Label ovanför fältet -->
        <label class="block mb-1 text-sm font-medium text-gray-700">{{ t('username') }}</label>

        <!-- Ikon -->
        <UserIconSolid class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

        <!-- Inputfält -->
        <input
            v-model="username"
            type="text"
            placeholder=""   
            required
            class="w-full pl-10 h-12 border border-gray-300 rounded-md bg-white text-gray-900 outline-none focus:outline-none focus:border-gray-500"
          />
        </div>


      </div>

  <!-- Lösenordfält -->
      <div class="form-group relative">
        <label class="block mb-1 text-sm font-medium text-gray-700">{{ t('password') }}</label>
        <LockClosedIconSolid class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          v-model="password"
          type="password"
          placeholder=""
          required
          class="w-full pl-10 h-12 border border-gray-300 rounded-md bg-white text-gray-900 outline-none focus:outline-none focus:border-gray-500"
        />
      </div>




      <button type="submit" class="btn-common">
        {{ t('login') }}
      </button>

      <div class="text-sm text-right">
        <span>{{ t('forgotPasswordQuestion') }}</span>
        <a href="#" @click.prevent="$emit('change-view','forgot')"
        class="text-blue-600 ml-1 hover:underline"
        >
        {{" " + t('clickHere') }}
      </a>
      </div>
    </form>

    <div class="divider text-left">
      <span>{{ t('orBankId') }}</span>
    </div>


    <div class="bankid-options">

      <div class="bankid-options">
        <button @click="$emit('change-view','mobilebankid')" class="btn-common">
          <img :src="bankIdLogo" alt="BankID" class="bankid-icon" />
          {{ t('mobileBankID') }}
        </button>

        <button @click="$emit('change-view','bankiddevice')" class="btn-common">
          <img :src="bankIdLogo" alt="BankID" class="bankid-icon" />
          {{ t('bankIDThisDevice') }}
        </button>
      </div>
    </div>

    <div class="links">
      <a
        href="https://www.bankid.com/privat/om-bankid"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ t('aboutBankID') }}
      </a>
    </div>

  </div>
</template>

<script>
import { authStore } from '../../stores/authStore'
import { useI18n } from '../../i18n/useI18n'
import bankIdLogo from '../../assets/BankID_logo_white.png'
import AMVLogo from '../../assets/logo_horizontal.svg'
import { UserIcon as UserIconSolid, LockClosedIcon as LockClosedIconSolid } from '@heroicons/vue/24/solid'


export default {
  emits: ['change-view'],
  components: { UserIconSolid, LockClosedIconSolid },  
  setup(){
    const { t } = useI18n()
    return { t, bankIdLogo, AMVLogo }
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  setup() {
    const { t } = useI18n()
    return { t, bankIdLogo, AMVLogo }
  },
  methods: {
    async handleLogin() {
      await authStore.login(this.username, this.password)
      if(authStore().isAuthenticated) {
        this.$emit('change-view','dashboard')
      }
    }
  }
}
</script>
