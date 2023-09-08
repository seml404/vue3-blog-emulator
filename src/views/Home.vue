<template>
  <div class="content">
    <section class="hero is-info mb-5 rounded">
      <div class="hero-body">
        <p class="title">Blog emulator</p>
        <p class="subtitle">
          This is the Blog-app emulator as a Vue3 code-sandbox to practise various technologies
        </p>
      </div>
    </section>
    <div class="tiles">
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <article class="tile is-child notification">
            <div class="content">
              <p class="title">Technologies used</p>
              <p class="subtitle">Vue3 (composition API)</p>
              <p class="subtitle">TypeScript</p>
              <p class="subtitle">Pinia</p>
              <p class="subtitle">VueRouter</p>
              <p class="subtitle">Axios</p>
              <p class="subtitle">BulmaCSS</p>
              <p class="subtitle">JSON Placeholder</p>

              <div class="content">
                <!-- Content -->
              </div>
            </div>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child notification">
            <div class="content">
              <p class="title">Vue3 and general SPA features used</p>
              <p class="subtitle">Dynamic routes</p>
              <p class="subtitle">Dynamic components</p>
              <p class="subtitle">Pagination</p>
              <p class="subtitle">Modal window and spinner UI components</p>
              <p class="subtitle">Vue transition component</p>
              <div class="content">
                <!-- Content -->
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HomeView'
}
</script>

<style scoped lang="scss">
.hero {
  border-radius: $default-radius;
}
</style>
