<template>
  <div class="w-full h-full">
    <Loading v-model:active="overlay"/>
    <div role="dialog" class="relative z-50" v-if="error">
      <div class="fixed inset-0 bg-primary opacity-75 transition-opacity" aria-hidden="true"></div>
      <div class="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div class="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-xl bg-secondary text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg border-2 border-red-500">
            <div class="bg-secondary px-4 pb-4 pt-3 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 class="font-semibold text-xl leading-6" id="modal-title"><translate>Error</translate></h3>
                  <p class="mt-2">{{ error }}</p>
                </div>
              </div>
            </div>
            <div class="px-4 pb-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
              type="button"
              class="inline-flex w-full justify-center rounded-xl bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
              @click="error = ''"
              >Ok</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="toolbar" class="w-full flex select-none">
      <button
      id="filters_button"
      class="py-1 px-2 mr-1 md:mr-2 ml-8 md:ml-0 rounded-xl bg-green-600 font-semibold mt-2 flex items-center"
      @click="toggleFiltersMenu"
      :title="$gettext('Filters')">
        <translate class="hidden md:block">Filters</translate><i class="bi bi-funnel-fill"></i><span v-if="projects_filter.size + contexts_filter.size + priorities_filter.size > 0">({{ projects_filter.size + contexts_filter.size + priorities_filter.size }})</span>
      </button>
      <input
      id="search_input"
      type="text"
      class="bg-secondary p-1.5 pl-2.5 rounded-xl border-0 mt-2 w-full"
      maxlength="50"
      v-model="searchValue"
      @input="filterSearch"
      @keydown.esc="clearFocus('search_input')"
      :placeholder="$gettext('Search')"
      />
      <button
      class="py-1 px-2 ml-1 md:ml-2 rounded-xl bg-green-600 font-semibold mt-2"
      :title="$gettext('Refresh')"
      @click="refresh"
      >
        <i class="bi bi-arrow-clockwise"></i>
      </button>
      <button
      id="settings_button"
      class="py-1 px-2 ml-1 md:ml-2 rounded-xl bg-green-600 font-semibold mt-2"
      :title="$gettext('Settings')"
      @click="toggleSettingsMenu">
        <i class="bi bi-three-dots"></i>
      </button>
    </div>
    <div id="filters"
    class="absolute z-10 bg-primary shadow-lg px-2 pt-2 rounded-xl border border-accent mt-4 select-none hidden">
      <div v-for="project in projects">
        <button
        class="py-1 px-2 rounded-xl border-2 border-red-600 text-red-600 font-semibold flex items-center text-center align-middle gap-2 mb-2 duration-150 hover:scale-110 focus:scale-110"
        :disabled="projects_filter.has(project)"
        :class="projects_filter.has(project) ? 'hidden' : ''"
        @click="addFilter('projects', project)"
        >{{ project }}<i class="bi bi-plus-circle-fill"></i></button>
        <button
        class="py-1 px-2 rounded-xl border-2 border-red-600 bg-red-600 font-semibold flex items-center text-center align-middle gap-2 mb-2 duration-150 hover:scale-110 focus:scale-110"
        :class="projects_filter.has(project) ? '' : 'hidden'"
        @click="deleteFilter('projects', project)"
        >{{ project }}<i class="bi bi-x-circle-fill"></i></button>
      </div>
      <div v-for="context in contexts">
        <button
        class="py-1 px-2 rounded-xl border-2 border-green-600 text-green-600 font-semibold flex items-center text-center align-middle gap-2 mb-2 duration-150 hover:scale-110 focus:scale-110"
        :disabled="contexts_filter.has(context)"
        :class="contexts_filter.has(context) ? 'hidden' : ''"
        @click="addFilter('contexts', context)"
        >{{ context }}<i class="bi bi-plus-circle-fill"></i></button>
        <button
        class="py-1 px-2 rounded-xl border-2 border-green-600 bg-green-600 fosemibold flex items-center text-center align-middle gap-2 mb-2 duration-150 hover:scale-110 focus:scale-110"
        :class="contexts_filter.has(context) ? '' : 'hidden'"
        @click="deleteFilter('contexts', context)"
        >{{ context }}<i class="bi bi-x-circle-fill"></i></button>
      </div>
      <div v-for="priority in priorities">
        <button
        class="py-1 px-2 rounded-xl border-2 border-yellow-500 text-yellow-500 font-semibold flex items-center text-center align-middle gap-2 mb-2 duration-150 hover:scale-110 focus:scale-110"
        :disabled="priorities_filter.has(priority)"
        :class="priorities_filter.has(priority) ? 'hidden' : ''"
        @click="addFilter('priorities', priority)"
        >{{ priority }}<i class="bi bi-plus-circle-fill"></i></button>
        <button
        class="py-1 px-2 rounded-xl border-2 border-yellow-500 bg-yellow-500 font-semibold flex items-center text-center align-middle gap-2 mb-2 duration-150 hover:scale-110 focus:scale-110"
        :class="priorities_filter.has(priority) ? '' : 'hidden'"
        @click="deleteFilter('priorities', priority)"
        >{{ priority }}<i class="bi bi-x-circle-fill"></i></button>
      </div>
    </div>
    <div id="settings"
    class="absolute right-0 z-10 bg-primary shadow-lg px-2 pt-2 rounded-xl border border-accent mt-4 mr-2 select-none hidden">
      <div class="flex items-center mb-2">
        <input
        id="show-done"
        type="checkbox"
        class="w-5 h-5 cursor-pointer flex ml-1"
        v-model="showDone"
        @change="changeShowDone"
        />
        <label for="show-done" class="py-1 px-2 font-semibold">
          <translate>Show done</translate>
        </label>
      </div>
      <div class="flex items-center mb-2">
        <input
        id="autocomplete-projects"
        type="checkbox"
        class="w-5 h-5 cursor-pointer flex ml-1"
        :title="$gettext('Autocomplete projects in new tasks with filtered projects.')"
        v-model="autocompleteProjects"
        @change="changeautocompleteProjects"
        />
        <label
        for="autocomplete-projects"
        :title="$gettext('Autocomplete projects in new tasks with filtered projects.')"
        class="py-1 px-2 font-semibold"
        >
          <translate>Autocomplete projects</translate>
        </label>
      </div>
    </div>
    <div class="mt-2 block">
      <table class="w-full max-w-full border-separate border-spacing-y-2">
        <tr id="task_new" class="select-none">
          <td class="min-h-12 bg-secondary w-full rounded-xl flex items-center">
            <textarea
            id="task_input_new"
            class="w-full bg-secondary p-1.5 pl-2.5 rounded-xl border-0 resize-none overflow-hidden block"
            style="height: 40px"
            maxlength="200"
            autocomplete="off"
            v-model="new_text"
            :placeholder="$gettext('Type your task here')"
            @keyup.ctrl.enter="writeTask({text: new_text, owner: true})"
            @blur="setInputTaskHeight('task_input_new')"
            @input="setInputTaskHeight('task_input_new')"
            ></textarea>
            <button
            class="rounded-xl mx-3 cursor-pointer hover:scale-110 focus:scale-110"
            :title="$gettext('Save')"
            @click="writeTask({text: new_text, owner: true})">
              <i class="bi bi-floppy-fill"></i>
            </button>
          </td>
        </tr>
      </table>
      <table id="pendingTasks" class="w-full max-w-full border-separate border-spacing-y-2">
        <tr
        class="relative select-none"
        v-for="task in pendingTasks"
        :id="'task_' + task.id"
        :key="'task_' + task.id"
        :class="matchFilters(task) ? (this.projects_filter.size !== 0 ? 'draggable': 'no-draggable') : 'hidden'"
        :data-id="task.id"
        >
          <td class="min-h-12 bg-secondary w-full rounded-xl flex items-center">
            <div class="p-1 ml-2 rounded-xl" :id="'task_done_input_' + task.id">
              <input
              type="checkbox"
              class="w-5 h-5 cursor-pointer flex"
              v-model="task.done"
              :disabled="task.dirty"
              @click="toggleDoneTask(task, 'done')"
              />
            </div>
            <textarea
            class="w-full bg-secondary p-1.5 pl-2.5 rounded-xl border-0 resize-none overflow-hidden block"
            style="height: 40px"
            maxlength="200"
            v-model="task.text"
            @input="task.dirty = true; setInputTaskHeight(`task_input_${task.id}`)"
            @blur="blurDirty(task)"
            v-if="task.editing"
            autocomplete="off"
            @keydown.esc="clearDirty(task)"
            @keyup.ctrl.enter="writeTask(task)"
            @keydown.insert.stop
            :id="'task_input_' + task.id"
            :key="'task_input_' + task.id"></textarea>
            <p
            class="w-full p-1.5 pl-2.5 pr-0 pretty-text"
            v-if="!task.editing"
            @dblclick="edit(task)"
            :id="'task_p_' + task.id"
            :key="'task_p_' + task.id"
            v-html="task.prettyText"></p>
            <div class="flex flex-col justify-between ml-2 self-stretch">
              <button
              v-if="!task.dirty && task.owner"
              class="mx-1 pr-2 cursor-pointer hover:scale-110 focus:scale-110"
              :title="$gettext('Delete')"
              @click="deleteTask(task)">
                <i v-if="!task.tryingDelete" class="bi bi-trash3"></i>
                <i v-if="task.tryingDelete" class="bi bi-trash3-fill"></i>
              </button>
              <i v-else
              v-if="!task.dirty"
              class="mx-1 pr-2 bi bi-people-fill"
              :title="$gettext('Shared with you')"></i>
              <button
              v-if="!task.dirty"
              class="mx-1 pr-2 cursor-pointer hover:scale-110 focus:scale-110"
              :title="$gettext('Edit')"
              @click="edit(task)">
                <i class="bi bi-pencil-fill"></i>
              </button>
              <button
              v-if="task.dirty"
              class="mx-1 pr-2 cursor-pointer hover:scale-110 focus:scale-110"
              :title="$gettext('Cancel')"
              @click="clearDirty(task)">
                <i class="bi bi-x-lg"></i>
              </button>
              <button
              v-if="task.dirty"
              class="mx-1 pr-2 cursor-pointer hover:scale-110 focus:scale-110"
              :title="$gettext('Save')"
              @click="writeTask(task)">
                <i class="bi bi-floppy-fill"></i>
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
      </table>
      <table id="doneTasks" class="w-full max-w-full border-separate border-spacing-y-2"
      v-if="showDone">
        <tr class="relative opacity-50 done select-none"
        v-for="task in doneTasks"
        :class="matchFilters(task) ? '' : 'hidden'"
        :id="'task_' + task.id"
        :data-id="task.id">
          <td class="min-h-12 bg-secondary w-full rounded-xl flex items-center" >
            <div class="p-1 ml-2 rounded-xl" :id="'task_done_input_' + task.id">
              <input
                type="checkbox"
                class="w-5 h-5 cursor-pointer rounded-xl flex"
                v-model="task.done"
                @click="toggleDoneTask(task, 'undone')"
              />
            </div>
            <p
            class="w-full p-1.5 pl-2.5 pretty-text"
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
  </div>
</template>
<script>
import 'vue-loading-overlay/dist/css/index.css'
import Loading from 'vue-loading-overlay'
import Sortable from 'sortablejs'
import { Http } from '../http.js'

const PRIORITY_REGEX = /\((A|B|C)\)/g
const CONTEXT_REGEX = /\@\w+/g
const PROJECT_REGEX = /\+\w+/g
const DUE_REGEX = /due:(\d{4}-\d{2}-\d{2})/

export default {
  inject: [],
  components: {
    Loading,
  },
  data() {
    return {
      pendingTasks: [],
      doneTasks: [],
      showDone: false,
      autocompleteProjects: false,
      searchValue: '',
      projects: new Set(),
      contexts: new Set(),
      priorities: new Set(),
      projects_filter: new Set(),
      contexts_filter: new Set(),
      priorities_filter: new Set(),
      sortable: null,
      sortableOriginalOrder: null,
      overlay: false,
      new_text: '',
      error: '',
    }
  },
  methods: {
    fillViewAttributes(tasks) {
      tasks.forEach(task => {
        task.originalText = task.text
        task.prettyText = this.getPrettyText(task.text)
        task.dueDate = task.text.match(DUE_REGEX)?.[1] || ''
        task.contexts = new Set(task.text.match(CONTEXT_REGEX) || [])
        task.projects = new Set(task.text.match(PROJECT_REGEX) || [])
        task.priorities = new Set(task.text.match(PRIORITY_REGEX) || [])
        task.dirty = false
        task.editing = false
        task.tryingDelete = false
      })
      return tasks
    },
    async loadData() {
      this.overlay = true
      try {
        let response = await Http('GET', '/api/tasks')
        if (response.status === 401 || response.status === 403) {
          await Http('POST', '/api/logout')
          this.$emit('checkAuthCookie')
          this.overlay = false
          this.$router.push({name: 'login'})
        } else if (response.status !== 200) {
          throw new Error('Error loading tasks')
        }
        let data = await response.json()
        this.pendingTasks = this.fillViewAttributes(data.pending || [])
        this.doneTasks = this.fillViewAttributes(data.done || [])
      } catch (error) {
        console.error(error)
        this.error = this.$gettext('An error occurred')
      }
      this.overlay = false
    },
    fillFilters() {
      this.pendingTasks.forEach(task => {
        task.contexts.forEach(context => this.contexts.add(context))
        task.projects.forEach(project => this.projects.add(project))
        task.priorities.forEach(priority => this.priorities.add(priority))
      })
      this.doneTasks.forEach(task => {
        task.contexts.forEach(context => this.contexts.add(context))
        task.projects.forEach(project => this.projects.add(project))
        task.priorities.forEach(priority => this.priorities.add(priority))
      })
      this.contexts = new Set([...this.contexts.values()].sort())
      this.projects = new Set([...this.projects.values()].sort())
      this.priorities = new Set([...this.priorities.values()].sort())
    },
    matchFilters(task) {
      return Boolean(
        (this.projects_filter.size !== 0 ? new Set(task.projects).intersection(this.projects_filter).size >=1 : true)
        && (this.contexts_filter.size !== 0 ? new Set(task.contexts).intersection(this.contexts_filter).size >= 1 : true)
        && (this.priorities_filter.size !== 0 ? new Set(task.priorities).intersection(this.priorities_filter).size >= 1 : true)
      )
    },
    async toggleDoneTask(task, action) {
      this.overlay = true
      if (action === 'done') {
        try {
          let response = await Http('POST', '/api/task', {'id': task.id, 'action': 'done', '_timestamp': task._timestamp})
          if (response.ok) {
            let data = await response.json()
            task._timestamp = data._timestamp
            this.doneTasks.push(task)
            this.pendingTasks = this.pendingTasks.filter(t => t.id !== task.id)
          } else if (response.status === 400) {
            let data = await response.json()
            this.error = this.$gettext(data.message)
            this.overlay = false
            task.done = false
            return
          } else {
            task.done = false
            throw new Error()
          }
        } catch (error) {
          this.error = this.$gettext('An error occurred')
        }
      } else {
        try {
          let response = await Http('POST', '/api/task', {'id': task.id, 'action': 'undone', '_timestamp': task._timestamp})
          if (response.ok) {
            let data = await response.json()
            task._timestamp = data._timestamp
            this.pendingTasks.unshift(task)
            this.doneTasks = this.doneTasks.filter(t => t.id !== task.id)
          } else if (response.status === 400) {
            let data = await response.json()
            this.error = this.$gettext(data.message)
            this.overlay = false
            task.done = true
            return
          } else {
            task.done = true
            throw new Error()
          }
        } catch (error) {
          this.error = this.$gettext('An error occurred')
        }
      }
      this.overlay = false
    },
    tryAutocompleteProjects(text) {
      if (this.projects_filter.size > 0) {
        for (let project of this.projects_filter) {
          if (!text.includes(project)) text += ` ${project}`
        }
      }
      return text
    },
    async writeTask(task) {
      if (task.text === task.originalText || task.text === '') return
      this.overlay = true
      try {
        if (!task.id && this.autocompleteProjects) {
          task.text = this.tryAutocompleteProjects(task.text)
        }
        let requestData = {
          'id': task.id,
          'action': 'write',
          'text': task.text,
          '_timestamp': task._timestamp
        }
        let response = await Http('POST', '/api/task', requestData)

        if (response.status === 400) {
          let data = await response.json()
          this.error = this.$gettext(data.message)
          this.overlay = false
          return
        } else if (!response.ok) {
          this.error = this.$gettext('An error occurred')
          this.overlay = false
          return
        } else {
          let data = await response.json()
          if (!task.id) {
            task.id = data.id
            this.new_text = ''
            this.setInputTaskHeight('task_input_new', 40)
            this.pendingTasks.unshift(task)
          }
          task._timestamp = data._timestamp
          task.shared = data.shared
        }

        task.dirty = false
        task.originalText = task.text
        task.prettyText = this.getPrettyText(task.text)
        task.editing = false
        task = this.fillViewAttributes([task])[0]
        this.fillFilters()
      } catch (error) {
        console.error(error)
      }
      this.overlay = false
    },
    async deleteTask(task) {
      if (!task.tryingDelete) {
        task.tryingDelete = true
        window.setTimeout(function () { task.tryingDelete = false }, 1000)
        return
      }
      if (!task.id) return
      this.overlay = true
      try {
        let response = await Http('POST', '/api/task', {'id': task.id, 'action': 'delete', '_timestamp': task._timestamp})
        if (response.ok) {
          this.pendingTasks = this.pendingTasks.filter(t => t.id !== task.id)
          this.fillFilters()
        } else {
          throw new Error()
        }
      } catch (error) {
        this.error = this.$gettext('An error occurred')
        console.error(error)
      }
      this.overlay = false
    },
    setInputTaskHeight(id, size) {
      const textarea = document.getElementById(id)
      if (size) {
        textarea.style.height = `${size}px`
      } else {
        textarea.style.height = `${textarea.scrollHeight > 40 ? textarea.scrollHeight : 40}px`
      }
    },
    edit(task) {
      task.editing = true
      const setInputTaskHeight = this.setInputTaskHeight
      const taskElementId = `task_input_${task.id}`
      window.setTimeout(function () {
        let input = document.getElementById(taskElementId)
        input.focus()
        // set cursor before first character of + or @ or due
        const regexes = [PROJECT_REGEX, CONTEXT_REGEX, DUE_REGEX];
        let minIndex = task.text.length
        for (let regex of regexes) {
          let match = task.text.match(regex)
          if (match) {
            let index = task.text.indexOf(match[0])
            if (index > 0 && task.text.slice(index - 1, index) === ' ') index -= 1
            if (index < minIndex) minIndex = index
          }
        }
        input.setSelectionRange(minIndex, minIndex)
        setInputTaskHeight(taskElementId)
      }, 0)
    },
    clearDirty(task) {
      task.text = task.originalText
      task.dirty = false
      task.editing = false
    },
    blurDirty(task) {
      if (task.text === task.originalText && task.id !== 0) {
        task.dirty = false
        task.editing = false
      }
    },
    getPrettyText(text) {
      return text
        .replace(PRIORITY_REGEX, `<span class="font-bold text-yellow-500">$&</span>`)
        .replace(CONTEXT_REGEX, `<span class="font-bold text-green-500">$&</span>`)
        .replace(PROJECT_REGEX, `<span class="font-bold text-red-500">$&</span>`)
        .replace(DUE_REGEX, `<span class="font-bold text-blue-500">$&</span>`)
        .replace(/\n/g, '<br>')
    },
    setFocus(id) {
      window.setTimeout(function () { document.getElementById(id).focus() }, 0)
    },
    clearFocus(id) {
      window.setTimeout(function () { document.getElementById(id).blur() }, 0)
    },
    changeShowDone() {
      if (this.showDone)
        localStorage.setItem('show-done', this.showDone)
      else
        localStorage.removeItem('show-done')
    },
    changeautocompleteProjects() {
      if (this.autocompleteProjects)
        localStorage.setItem('autocomplete-projects', this.autocompleteProjects)
      else
        localStorage.removeItem('autocomplete-projects')
    },
    async saveOrder() {
      this.overlay = true
      try {
        let ids = this.sortable.toArray()
        let response = await Http('POST', '/api/task', {'action': 'save-order', 'ids': ids})
        if (!response.ok) throw new Error()
        this.sortableOriginalOrder = this.sortable.toArray()
      } catch (error) {
        console.error(error)
        this.restoreOrder()
      }
      this.overlay = false
    },
    toggleFiltersMenu() {
      document.getElementById('filters').classList.toggle('hidden')
    },
    toggleSettingsMenu() {
      document.getElementById('settings').classList.toggle('hidden')
    },
    filterSearch() {
      // add class if match
      this.pendingTasks.forEach(task => {
        let element = document.getElementById('task_done_input_' + task.id)
        if (this.searchValue && this.searchValue.length > 3 && task.text.toLowerCase().includes(this.searchValue.toLowerCase())) {
          element.classList.add('bg-green-600')
          element.classList.remove('bg-secondary')
        } else {
          element.classList.remove('bg-green-600')
          element.classList.add('bg-secondary')
        }
      })
    },
    restoreOrder() {
      this.sortable.sort(this.sortableOriginalOrder)
    },
    enableShortcuts() {
      document.addEventListener('keydown', this.tryExecuteShortcuts)
      window.addEventListener('mouseup', this.tryExecuteMouseShortcuts)
    },
    disableShortcuts() {
      document.removeEventListener('keydown', this.tryExecuteShortcuts)
      window.removeEventListener('mouseup', this.tryExecuteMouseShortcuts)
    },
    tryExecuteShortcuts(event) {
      if (event.ctrlKey && event.code === 'KeyS') {
        event.preventDefault()
      } else if (event.ctrlKey && event.code === 'KeyF') {
        event.preventDefault()
        this.setFocus('search_input')
      } else if (event.code === 'Insert') {
        this.setFocus('task_input_new')
      } else if (event.code === 'Escape') {
        document.getElementById('filters').classList.add('hidden')
        document.getElementById('settings').classList.add('hidden')
      }
    },
    tryExecuteMouseShortcuts(event) {
      for (let name of ['filters', 'settings']) {
        let target = document.getElementById(name)
        let target_button = document.getElementById(`${name}_button`)
        if (event.target != target
            && event.target != target_button
            && event.target.parentNode != target_button
            && event.target.parentNode.parentNode != target_button
            && event.target.parentNode != target
            && event.target.parentNode.parentNode != target) {
          target.classList.add('hidden')
        }
      }
    },
    addFilter(filter, value) {
      // only one project filter at a time
      if (filter === 'projects') { this[`${filter}_filter`].clear() }
      this[`${filter}_filter`].add(value)
      localStorage.setItem(`${filter}-filter`, Array.from(this[`${filter}_filter`]))
    },
    deleteFilter(filter, value) {
      this[`${filter}_filter`].delete(value)
      localStorage.setItem(`${filter}-filter`, Array.from(this[`${filter}_filter`]))
    },
    loadStoredFilters() {
      let projects = localStorage.getItem('projects-filter')
      let contexts = localStorage.getItem('contexts-filter')
      let priorities = localStorage.getItem('priorities-filter')
      if (projects) {
        for (let project of projects.split(',')) {
          if (this.projects.has(project)) this.projects_filter.add(project)
        }
      }
      if (contexts) {
        for (let context of contexts.split(',')) {
          if (this.contexts.has(context)) this.contexts_filter.add(context)
        }
      }
      if (priorities) {
        for (let priority of priorities.split(',')) {
          if (this.priorities.has(priority)) this.priorities_filter.add(priority)
        }
      }
    },
    refresh() {
      this.loadData()
      this.fillFilters()
      this.loadStoredFilters()
    }
  },
  watch: {
  },
  computed: {
  },
  async created() {
    await this.loadData()
    this.fillFilters()
    this.loadStoredFilters()
    this.showDone = localStorage.getItem('show-done') === 'true'
    this.autocompleteProjects = localStorage.getItem('autocomplete-projects') === 'true'
    let sortable = Sortable.create(
      document.getElementById('pendingTasks'), {
        onEnd: this.saveOrder,
        swapThreshold: 0.75,
        animation: 150,
        delay: 150,
        draggable: '.draggable',
      })
    this.sortableOriginalOrder = sortable.toArray()
    this.sortable = sortable
  },
  mounted () {
    this.enableShortcuts()
  },
  beforeUnmount() {
    this.disableShortcuts()
  }
}
</script>
<style scoped>
</style>
