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
        <div class="mt-8 rounded-xl">
          <div id="img-home">
            <picture>
              <source srcset="/home-dark.png" media="(min-width: 576px)"/>
              <img src="/home-dark-s.png" class="opacity-0"/>
            </picture>
          </div>
        </div>
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
