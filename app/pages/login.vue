<script setup lang="ts">
import { uselogin } from '../api/auth'

const router = useRouter()
const useInfo = reactive({
  email: '',
  password: '',
  rememberPassword: '',
  remember: false,
})
const isSignup = ref(false)
const validationMessage = ref('')
const validateEmail = (email: string): string => {
  if (!email) return '请输入邮箱'
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return '请输入有效的邮箱地址'
  return ''
}
const validatePassword = (password: string): string => {
  if (!password) return '请输入密码'
  if (password.length < 6) return '密码长度不能少于6位'
  return ''
}
const validateConfirmPassword = (): string => {
  if (useInfo.password !== useInfo.rememberPassword) {
    return '两次输入的密码不一致'
  }
  return ''
}
const validateForm = (): string => {
  return validateEmail(useInfo.email)
    || validatePassword(useInfo.password)
    || (isSignup.value ? validatePassword(useInfo.rememberPassword) : '')
    || (isSignup.value ? validateConfirmPassword() : '')
}
const login = async () => {
  try {
    const { data } = await uselogin(useInfo)
    if (data.value?.status === 'success') {
      router.push('/home')
    }
  }
  catch (e) {
    console.log(e)
  }
}
// const register = async () => {
//   try {
//     const { data } = await useFetch('http://localhost:3001/login/register', {
//       method: 'POST',
//       body: JSON.stringify({ ...useInfo }),
//     })
//     console.log(data)
//   }
//   catch (e) {
//     console.log(e)
//   }
// }
const handleSubmit = async () => {
  const validationResult = validateForm()
  if (validationResult) {
    validationMessage.value = validationResult
    return
  }
  validationMessage.value = ''
  if (isSignup.value) {
    // register()
    console.log('register')
  }
  else {
    login()
    console.log('login')
  }
}
const forgotPassword = () => {
  console.log('forgot password')
}
const clearUser = (): void => {
  useInfo.email = ''
  useInfo.password = ''
  useInfo.rememberPassword = ''
  useInfo.remember = false
}
const toggleSignup = async () => {
  clearUser()
  isSignup.value = !isSignup.value
}
</script>

<template>
  <div class="w-screen h-screen flex justify-center items-center flex-col gap-10 bg-[url('~/assets/images/bg.png')]">
    <div class="w-96 h-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 class="text-2xl font-bold mb-8 text-center">
        {{ isSignup ? '注册' : '登陆' }}
      </h1>
      <form @submit.prevent="handleSubmit">
        <div class="flex items-center gap-2 mb-4 h-12 border border-gray-300 rounded-md">
          <Icon
            name="material-symbols:account-circle-full"
            style="color: black"
            class="~ w-4 h-4 m-3"
          />
          <input
            v-model="useInfo.email"
            type="text"
            class="input"
            placeholder="邮箱"
          >
        </div>
        <div class="flex items-center gap-2 mb-4 h-12 border border-gray-300 rounded-md">
          <Icon
            name="uil:lock"
            style="color: black"
            class="~ w-4 h-4 m-3"
          />
          <input
            v-model="useInfo.password"
            type="password"
            class="input"
            placeholder="密码"
          >
        </div>
        <div
          v-if="isSignup"
          class="flex items-center gap-2 mb-4 h-12 border border-gray-300 rounded-md"
        >
          <Icon
            name="uil:lock"
            style="color: black"
            class="~ w-4 h-4 m-3"
          />
          <input
            v-model="useInfo.rememberPassword"
            type="password"
            class="input"
            placeholder="确定密码"
          >
        </div>

        <div
          v-if="validationMessage"
          class="text-red-500 mb-4 text-sm"
        >
          {{ validationMessage }}
        </div>
        <div
          v-if="!isSignup"
          class="flex justify-between items-center mb-4 gap-1"
        >
          <input
            id="remember"
            v-model="useInfo.remember"
            type="checkbox"
          >
          <label
            class="text-sm text-[#4B5563]"
            for="remember"
          >记住我</label>
          <a
            href=""
            class="ml-auto text-[#16BC88] text-sm"
            @click.prevent="forgotPassword"
          >忘记密码?</a>
        </div>
        <button
          type="submit"
          class="w-full p-2 bg-[#16BC88] text-white rounded-md"
        >
          {{ isSignup ? '注册' : '登陆' }}
        </button>
      </form>
    </div>
    <div>
      {{ isSignup ? '已有账号？' : '没有账号？' }}
      <a
        href=""
        class="text-[#16BC88]"
        @click.prevent="toggleSignup"
      >{{ isSignup ? '登陆' : '注册' }}</a>
    </div>
  </div>
</template>

<style></style>
