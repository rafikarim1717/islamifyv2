<template>
  <li
    class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-200 example snapshot"
  >
    <div>
        {{ song.modified_name }}
      <span class="text-gray-500 text-sm">
        {{ song.display_name }}
      </span>
    </div>

    <div class="text-gray-600 text-lg">
        <span class="comments text-blue-600">
          <i class="fa fa-solid fa-eye text-gray-600"></i>
          {{ 0 }}
        </span>
    </div>
  </li>
</template>

<script>
export default {
  name: "SongItem",
  props: ["song"],
};
</script>
