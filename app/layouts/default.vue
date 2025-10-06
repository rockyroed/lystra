<template>
  <section class="flex flex-col min-h-screen">
    <div>
      <Header />
      <slot />
    </div>
    <div class="p-5">
      <Table />
    </div>
  </section>
</template>
