<template>
  <section>
    <div class="container mt-8 px-3 md:px-6 py-8 mx-auto">
      <div class="sm:flex sm:items-center sm:justify-between">
        <div class="w-full">
          <h2 class="text-3xl font-bold text-center"><translate>Simple, efficient, and fully exportable.</translate></h2>
          <p class="mt-4 text-lg text-center"><translate>txt_home_header_description</translate></p>
        </div>
      </div>
      <div class="flex justify-center">
        <table id="ExampleTasks" class="mt-4 w-full max-w-full border-separate border-spacing-y-2">
          <tr
          class="relative select-none draggable"
          v-for="task in tasks"
          :id="'task_' + task.id"
          :key="'task_' + task.id"
          :data-id="task.id"
          >
            <td class="min-h-12 bg-secondary w-full rounded-xl flex items-center">
              <div class="p-1 ml-2 rounded-xl">
                <input
                type="checkbox"
                class="w-5 h-5 cursor-pointer flex"
                v-model="task.done"
                @click="toggleDoneTask(task, 'done')"
                />
              </div>
              <p
              class="w-full p-1.5 pl-2.5 pr-0 pretty-text"
              :id="'task_p_' + task.id"
              :key="'task_p_' + task.id"
              v-html="task.prettyText"></p>
              <div class="flex flex-col justify-between ml-2 self-stretch">
                <button
                v-if="!task.dirty && task.owner"
                class="mx-1 pr-2 cursor-pointer hover:scale-110 focus:scale-110"
                :title="$gettext('Delete')">
                  <i class="bi bi-trash3"></i>
                </button>
                <i v-else
                class="mx-1 pr-2 bi bi-people-fill"
                :title="$gettext('Shared with you')"></i>
                <button
                v-if="!task.dirty"
                class="mx-1 pr-2 cursor-pointer hover:scale-110 focus:scale-110"
                :title="$gettext('Edit')">
                  <i class="bi bi-pencil-fill"></i>
                </button>
              </div>
            </td>
            <span
            class="absolute bottom-0 left-0 bg-green-600 rounded-full text-xs px-0.5 -translate-x-1/4 translate-y-1/4"
            v-if="task.shared && task.owner"
            :title="$gettext('Shared')">
              <i v-if="task.shared && task.owner" class="bi bi-people-fill"></i>
            </span>
          </tr>
          <br/>
          <tr
          class="relative opacity-50 done select-none"
          v-for="task in doneTasks"
          :id="'task_' + task.id"
          :key="'task_' + task.id"
          :data-id="task.id"
          >
            <td class="min-h-12 bg-secondary w-full rounded-xl flex items-center">
              <div class="p-1 ml-2 rounded-xl">
                <input
                type="checkbox"
                class="w-5 h-5 cursor-pointer flex"
                v-model="task.done"
                @click="toggleDoneTask(task, 'undone')"
                />
              </div>
              <p
              class="w-full p-1.5 pl-2.5 pr-0 pretty-text"
              :id="'task_p_' + task.id"
              :key="'task_p_' + task.id"
              v-html="task.prettyText"></p>
            </td>
            <span
            class="absolute bottom-0 left-0 bg-green-600 rounded-full text-xs px-0.5 -translate-x-1/4 translate-y-1/4"
            v-if="task.shared && task.owner"
            :title="$gettext('Shared')">
              <i v-if="task.shared && task.owner" class="bi bi-people-fill"></i>
            </span>
          </tr>
        </table>
      </div>
      <div class="grid gap-6 mt-8 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div class="px-6 py-4 transition-colors duration-200 transform rounded-xl bg-secondary accent-color-hover">
          <p class="text-2xl font-semibold"><translate>Features</translate></p>
          <div class="mt-6 space-y-4">
            <div class="flex items-center">
              <i class="bi bi-people-fill"></i>
              <span class="mx-4"><translate>Share your project task</translate></span>
            </div>
            <div class="flex items-center">
              <i class="bi bi-arrow-down-up"></i>
              <span class="mx-4"><translate>Drag-and-drop ordering</translate></span>
            </div>
            <div class="flex items-center">
              <i class="bi bi-funnel"></i>
              <span class="mx-4"><translate>Tasks filtering</translate></span>
            </div>
            <div class="flex items-center">
              <i class="bi bi-hourglass-split"></i>
              <span class="mx-4"><translate>Projects autocomplete</translate></span>
            </div>
          </div>
        </div>
        <div class="px-6 py-4 transition-colors duration-200 transform rounded-xl bg-secondary accent-color-hover">
          <p class="text-2xl font-semibold"><translate>Operating</translate></p>
          <div class="mt-6 space-y-4">
            <div class="flex items-center">
              <i class="bi bi-arrow-clockwise"></i>
              <span class="mx-4"><translate>Weekly backups via email</translate></span>
            </div>
            <div class="flex items-center">
              <i class="bi bi-trash"></i>
              <span class="mx-4"><translate>Weekly cleaning of completed tasks</translate></span>
            </div>
          </div>
        </div>
        <div class="px-6 py-4 transition-colors duration-200 transform rounded-xl bg-secondary accent-color-hover">
          <p class="text-2xl font-semibold"><translate>Contribute</translate></p>
          <div class="mt-6 space-y-4">
            <div class="flex items-center">
              <i class="bi bi-github"></i>
              <span class="mx-4"><a href="https://github.com/tiyujopite/todotxt_app" target="_blank" class="text-green-600"><translate>Source code</translate></a></span>
            </div>
            <div class="flex items-center">
              <i class="bi bi-github"></i>
              <span class="mx-4"><a href="https://github.com/tiyujopite/todotxt_app/issues" target="_blank" class="text-green-600"><translate>Report a bug</translate></a></span>
            </div>
            <div class="flex items-center">
              <i class="bi bi-github"></i>
              <span class="mx-4"><a href="https://github.com/tiyujopite/todotxt_app/issues" target="_blank" class="text-green-600"><translate>Make a suggestion</translate></a></span>
            </div>
          </div>
        </div>
        <div class="px-6 py-4 transition-colors duration-200 transform rounded-xl bg-secondary accent-color-hover">
          <p class="text-2xl font-semibold"><translate>Links</translate></p>
          <div class="mt-6 space-y-4">
            <div class="flex items-center">
              <i class="bi bi-github"></i>
              <span class="mx-4"><a href="https://github.com/tiyujopite/todotxt_app/blob/main/CHANGELOG.md" target="_blank" class="text-green-600">CHANGELOG</a></span>
            </div>
            <div class="flex items-center">
              <i class="bi bi-link"></i>
              <span class="mx-4"><a href="/terms_and_conditions" target="_blank" class="text-green-600"><translate>tc_title_1</translate></a></span>
            </div>
            <div class="flex items-center">
              <i class="bi bi-link"></i>
              <span class="mx-4"><a href="http://todotxt.org/" target="_blank" class="text-green-600">todotxt.org</a></span>
            </div>
            <div class="flex items-center">
              <i class="bi bi-link"></i>
              <span class="mx-4"><a href="https://github.com/todotxt/todo.txt" target="_blank" class="text-green-600"><translate>Rules and format</translate></a></span>
            </div>
          </div>
        </div>
        <div class="px-6 py-4 transition-colors duration-200 transform rounded-xl bg-secondary accent-color-hover">
          <p class="text-2xl font-semibold"><translate>Our cookies</translate></p>
          <p class="mt-0"><translate>Needed to works correctly.</translate></p>
          <div class="mt-6 space-y-4">
            <div class="flex items-center">
              <i class="bi bi-lock"></i>
              <span class="mx-4"><code>authenticated</code></span>
            </div>
            <div class="flex items-center">
              <i class="bi bi-lock"></i>
              <span class="mx-4"><code>sessionid</code></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Sortable from 'sortablejs'
import { getPrettyText } from '../tools.js'

export default {
  data() {
    return {
      tasks: [
        {
          id: 1,
          text: `(A) Example @context due:${new Date().toISOString().split('T')[0]}`,
          owner: true,
          shared: false,
          done: false,
        },
        {
          id: 2,
          text: '(B) Example shared with you +project',
          owner: false,
          shared: true,
          done: false,
        },
        {
          id: 3,
          text: '(C) Example shared with someone +other_project @other_context',
          owner: true,
          shared: true,
          done: false,
        },
        {
          id: 4,
          text: 'Multiline\n  - Foo\n  - Bar',
          owner: true,
          shared: false,
          done: false,
        },
      ],
      doneTasks: [
        {
          id: 5,
          text: 'Example completed task +project @context',
          owner: true,
          shared: false,
          done: true,
        },
      ],
    }
  },
  methods: {
    async toggleDoneTask(task, action) {
      if (action === 'done') {
        task.done = true
        this.doneTasks.push(task)
        this.tasks = this.tasks.filter(t => t.id !== task.id)
      } else {
        task.done = false
        this.tasks.unshift(task)
        this.doneTasks = this.doneTasks.filter(t => t.id !== task.id)
      }
    },
  },
  created () {
    this.tasks.forEach(task => {
      task.prettyText = getPrettyText(task.text)
    })
    this.doneTasks.forEach(task => {
      task.prettyText = getPrettyText(task.text)
    })
  },
  mounted() {
    Sortable.create(
      document.getElementById('ExampleTasks'), {
        swapThreshold: 0.75,
        animation: 150,
        delay: 150,
        draggable: '.draggable',
      })
  }
}
</script>
