<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  name: 'About',
  metaInfo: {
    title: 'about', // set a title
    meta: [
      {
        name: 'ABOUT',
        content: 'ABOUT CONTENT',
      },
    ],
    link: [
      {
        rel: 'asstes',
        href: 'https://assets-cdn.github.com/',
      },
    ],
  },
}
</script>
