<script setup lang="ts">
const router = useRouter()
const list = ref([
  {
    name: '仪表盘',
    path: 'home-dashboard',
    page: '/home/dashboard',

  },
  {
    name: '任务列表',
    path: 'home-taskList',
    page: '/home/taskList',
  },
  {
    name: '番茄时钟',
    path: 'home-tomatoClock',
    page: '/home/tomatoClock',
  },
  {
    name: '统计分析',
    path: 'home-statiStics',
    page: '/home/statiStics',
  },
])
</script>

<template>
  <ul class="flex gap-4">
    <li
      v-for="(item, index) in list"
      :key="index"
      class="cursor-pointer"
      :class="router.currentRoute.value.name === item.path
        ? 'text-[#000000]'
        : 'text-[#6B7280]'
      "
      @click="router.push(item.page)"
    >
      {{
        item.name
      }}
    </li>
  </ul>
</template>
