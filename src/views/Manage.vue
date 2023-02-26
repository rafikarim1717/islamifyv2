<template>
  <section class="bg-gray-200">
    <div class="container mx-auto flex flex-col">
      <!-- Modal Delete-->
      <!-- Manage Forum-->
      <div class="my-4">
        <!-- Main Content -->
        <h2 class="text-center text-lg md:text-2xl fontbold mt-4">
          Manage Forum
        </h2>
        <div class="mt-10 px-2 lg:px-3 xl:px-4">
          <div class="grid md:grid-cols-2 gap-5 md:gap-6">
            <div class="bg-white relative flex flex-col py-2">
              <div class="p-5 font-bold border-b border-black text-center">
                <span class="text-lg md:text-xl">General Topic</span>
                <!-- Icon -->
              </div>
              <div
                class="p-2 bg-white border-t hover:bg-gray-50 cursor-pointer"
                v-for="post in generalPosts"
                :key="post.docID"
              >
                <div class="flex justify-between mb-2">
                  <div class="flex items-center">
                    <a
                      class="font-semibold text-gray-700 text-md xl:text-lg cursor-pointer"
                      >{{ post.users }}</a
                    >
                  </div>
                  <div class="inline-flex gap-2 p-1">
                    <div class="">
                      <i
                        class="fa fa-exclamation-triangle fa-lg text-gray-600 hover:text-gray-700"
                      ></i>
                      {{ post.reply.length }}
                    </div>
                    <div class="" @click="deleteModal">
                      <i
                        class="fa fa-solid fa-trash fa-lg text-red-600 hover:text-red-800"
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="mt-4 max-w-custom-min md:max-w-max">
                  <p class="text-black text-base md:text-lg xl:text-xl">
                    {{ post.content }}
                  </p>
                </div>

                <div class="fixed z-10 inset-0 overflow-y-auto" v-if="isReport">
                  <div class="flex items-center justify-center min-h-screen">
                    <div class="fixed inset-0 transition-opacity">
                      <div
                        class="absolute inset-0 bg-gray-500 opacity-75"
                      ></div>
                    </div>
                    <div
                      class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    >
                      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                          <div
                            class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
                          >
                            <svg
                              class="h-6 w-6 text-blue-600"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                          </div>
                          <div
                            class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"
                          >
                            <h3
                              class="text-lg leading-6 font-medium text-gray-900"
                            >
                              Apakah anda yakin ingin menghapus postingan ini ?
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div
                        class="bg-gray-50 flex flex-row justify-center p-4 gap-12 sm:flex-row-reverse md:text-center"
                      >
                        <button
                          @click.prevent="closeDeleteModal"
                          type="button"
                          class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                        >
                          Cancel
                        </button>

                        <button
                          @click="deletePost(post)"
                          type="button"
                          class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="fixed z-10 inset-0 overflow-y-auto" v-if="isModal">
                  <div class="flex items-center justify-center min-h-screen">
                    <div class="fixed inset-0 transition-opacity">
                      <div
                        class="absolute inset-0 bg-gray-500 opacity-75"
                      ></div>
                    </div>
                    <div
                      class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    >
                      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                          <div
                            class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
                          >
                            <svg
                              class="h-6 w-6 text-blue-600"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                          </div>
                          <div
                            class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"
                          >
                            <h3
                              class="text-lg leading-6 font-medium text-gray-900"
                            >
                              Success!
                            </h3>
                            <div class="mt-2">
                              <p class="text-sm leading-5 text-gray-500">
                                Anda telah berhasil menghapus postingan.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
                      >
                        <span
                          class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto"
                        >
                          <button
                            @click="closePopup"
                            type="button"
                            class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                          >
                            OK
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-white relative flex flex-col py-2">
              <div class="p-5 font-bold border-b border-black text-center">
                <span class="text-lg md:text-xl">Shalat Topic</span>
                <!-- Icon -->
              </div>
              <div
                class="p-2 bg-white border-t hover:bg-gray-50 cursor-pointer"
                v-for="post in shalatPosts"
                :key="post.docID"
              >
                <div class="flex justify-between mb-2">
                  <div class="flex items-center">
                    <a
                      class="font-semibold text-gray-700 text-md xl:text-lg cursor-pointer"
                      >{{ post.users }}</a
                    >
                  </div>
                  <div class="inline-flex gap-2 p-1">
                    <div class="">
                      <i
                        class="fa fa-exclamation-triangle fa-lg text-gray-600 hover:text-gray-700"
                      ></i>
                      {{ post.reply.length }}
                    </div>
                    <div class="" @click="deleteModal">
                      <i
                        class="fa fa-solid fa-trash fa-lg text-red-600 hover:text-red-800"
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="mt-4 max-w-custom-min md:max-w-max">
                  <p class="text-black text-base md:text-lg xl:text-xl">
                    {{ post.content }}
                  </p>
                </div>
                <div class="fixed z-10 inset-0 overflow-y-auto" v-if="isReport">
                  <div class="flex items-center justify-center min-h-screen">
                    <div class="fixed inset-0 transition-opacity">
                      <div
                        class="absolute inset-0 bg-gray-500 opacity-75"
                      ></div>
                    </div>
                    <div
                      class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    >
                      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                          <div
                            class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
                          >
                            <svg
                              class="h-6 w-6 text-blue-600"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                          </div>
                          <div
                            class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"
                          >
                            <h3
                              class="text-lg leading-6 font-medium text-gray-900"
                            >
                              Apakah anda yakin ingin menghapus postingan ini ?
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div
                        class="bg-gray-50 flex flex-row justify-center p-4 gap-12 sm:flex-row-reverse md:text-center"
                      >
                        <button
                          @click.prevent="closeDeleteModal"
                          type="button"
                          class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                        >
                          Cancel
                        </button>

                        <button
                          @click="deletePost(post)"
                          type="button"
                          class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="fixed z-10 inset-0 overflow-y-auto" v-if="isModal">
                  <div class="flex items-center justify-center min-h-screen">
                    <div class="fixed inset-0 transition-opacity">
                      <div
                        class="absolute inset-0 bg-gray-500 opacity-75"
                      ></div>
                    </div>
                    <div
                      class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    >
                      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                          <div
                            class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
                          >
                            <svg
                              class="h-6 w-6 text-blue-600"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                          </div>
                          <div
                            class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"
                          >
                            <h3
                              class="text-lg leading-6 font-medium text-gray-900"
                            >
                              Success!
                            </h3>
                            <div class="mt-2">
                              <p class="text-sm leading-5 text-gray-500">
                                Anda telah berhasil menghapus postingan.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
                      >
                        <span
                          class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto"
                        >
                          <button
                            @click="closePopup"
                            type="button"
                            class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                          >
                            OK
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-white relative flex flex-col py-2">
              <div class="p-5 font-bold border-b border-black text-center">
                <span class="text-lg md:text-xl">Doa Topic</span>
                <!-- Icon -->
              </div>
              <div
                class="p-2 bg-white border-t hover:bg-gray-50 cursor-pointer"
                v-for="post in doaPosts"
                :key="post.docID"
              >
                <div class="flex justify-between mb-2">
                  <div class="flex items-center">
                    <a
                      class="font-semibold text-gray-700 text-md xl:text-lg cursor-pointer"
                      >{{ post.users }}</a
                    >
                  </div>
                  <div class="inline-flex gap-2 p-1">
                    <div class="">
                      <i
                        class="fa fa-exclamation-triangle fa-lg text-gray-600 hover:text-gray-700"
                      ></i>
                      {{ post.reply.length }}
                    </div>
                    <div class="" @click="deleteModal">
                      <i
                        class="fa fa-solid fa-trash fa-lg text-red-600 hover:text-red-800"
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="mt-4 max-w-custom-min md:max-w-max">
                  <p class="text-black text-base md:text-lg xl:text-xl">
                    {{ post.content }}
                  </p>
                </div>
                <div class="fixed z-10 inset-0 overflow-y-auto" v-if="isReport">
                  <div class="flex items-center justify-center min-h-screen">
                    <div class="fixed inset-0 transition-opacity">
                      <div
                        class="absolute inset-0 bg-gray-500 opacity-75"
                      ></div>
                    </div>
                    <div
                      class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    >
                      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                          <div
                            class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
                          >
                            <svg
                              class="h-6 w-6 text-blue-600"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                          </div>
                          <div
                            class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"
                          >
                            <h3
                              class="text-lg leading-6 font-medium text-gray-900"
                            >
                              Apakah anda yakin ingin menghapus postingan ini ?
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div
                        class="bg-gray-50 flex flex-row justify-center p-4 gap-12 sm:flex-row-reverse md:text-center"
                      >
                        <button
                          @click.prevent="closeDeleteModal"
                          type="button"
                          class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                        >
                          Cancel
                        </button>

                        <button
                          @click="deletePost(post)"
                          type="button"
                          class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="fixed z-10 inset-0 overflow-y-auto" v-if="isModal">
                  <div class="flex items-center justify-center min-h-screen">
                    <div class="fixed inset-0 transition-opacity">
                      <div
                        class="absolute inset-0 bg-gray-500 opacity-75"
                      ></div>
                    </div>
                    <div
                      class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    >
                      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                          <div
                            class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
                          >
                            <svg
                              class="h-6 w-6 text-blue-600"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                          </div>
                          <div
                            class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"
                          >
                            <h3
                              class="text-lg leading-6 font-medium text-gray-900"
                            >
                              Success!
                            </h3>
                            <div class="mt-2">
                              <p class="text-sm leading-5 text-gray-500">
                                Anda telah berhasil menghapus postingan.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
                      >
                        <span
                          class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto"
                        >
                          <button
                            @click="closePopup"
                            type="button"
                            class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                          >
                            OK
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-white relative flex flex-col py-2">
              <div class="p-5 font-bold border-b border-black text-center">
                <span class="text-lg md:text-xl">Alquran Topic</span>
                <!-- Icon -->
              </div>
              <div
                class="p-2 bg-white border-t hover:bg-gray-50 cursor-pointer"
                v-for="post in alquranPosts"
                :key="post.docID"
              >
                <div class="flex justify-between mb-2">
                  <div class="flex items-center">
                    <a
                      class="font-semibold text-gray-700 text-md xl:text-lg cursor-pointer"
                      >{{ post.users }}</a
                    >
                  </div>
                  <div class="inline-flex gap-2 p-1">
                    <div class="">
                      <i
                        class="fa fa-exclamation-triangle fa-lg text-gray-600 hover:text-gray-700"
                      ></i>
                      {{ post.reply.length }}
                    </div>
                    <div class="" @click="deleteModal">
                      <i
                        class="fa fa-solid fa-trash fa-lg text-red-600 hover:text-red-800"
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="mt-4 max-w-custom-min md:max-w-max">
                  <p class="text-black text-base md:text-lg xl:text-xl">
                    {{ post.content }}
                  </p>
                </div>
                <div class="fixed z-10 inset-0 overflow-y-auto" v-if="isReport">
                  <div class="flex items-center justify-center min-h-screen">
                    <div class="fixed inset-0 transition-opacity">
                      <div
                        class="absolute inset-0 bg-gray-500 opacity-75"
                      ></div>
                    </div>
                    <div
                      class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    >
                      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                          <div
                            class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
                          >
                            <svg
                              class="h-6 w-6 text-blue-600"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                          </div>
                          <div
                            class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"
                          >
                            <h3
                              class="text-lg leading-6 font-medium text-gray-900"
                            >
                              Apakah anda yakin ingin menghapus postingan ini ?
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div
                        class="bg-gray-50 flex flex-row justify-center p-4 gap-12 sm:flex-row-reverse md:text-center"
                      >
                        <button
                          @click.prevent="closeDeleteModal"
                          type="button"
                          class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                        >
                          Cancel
                        </button>

                        <button
                          @click="deletePost(post)"
                          type="button"
                          class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="fixed z-10 inset-0 overflow-y-auto" v-if="isModal">
                  <div class="flex items-center justify-center min-h-screen">
                    <div class="fixed inset-0 transition-opacity">
                      <div
                        class="absolute inset-0 bg-gray-500 opacity-75"
                      ></div>
                    </div>
                    <div
                      class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    >
                      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                          <div
                            class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
                          >
                            <svg
                              class="h-6 w-6 text-blue-600"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                          </div>
                          <div
                            class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"
                          >
                            <h3
                              class="text-lg leading-6 font-medium text-gray-900"
                            >
                              Success!
                            </h3>
                            <div class="mt-2">
                              <p class="text-sm leading-5 text-gray-500">
                                Anda telah berhasil menghapus postingan.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
                      >
                        <span
                          class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto"
                        >
                          <button
                            @click="closePopup"
                            type="button"
                            class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                          >
                            OK
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-white relative flex flex-col py-2">
              <div class="p-5 font-bold border-b border-black text-center">
                <span class="text-lg md:text-xl">Hadist Topic</span>
                <!-- Icon -->
              </div>
              <div
                class="p-2 bg-white border-t hover:bg-gray-50 cursor-pointer"
                v-for="post in hadistPosts"
                :key="post.docID"
              >
                <div class="flex justify-between mb-2">
                  <div class="flex items-center">
                    <a
                      class="font-semibold text-gray-700 text-md xl:text-lg cursor-pointer"
                      >{{ post.users }}</a
                    >
                  </div>
                  <div class="inline-flex gap-2 p-1">
                    <div class="">
                      <i
                        class="fa fa-exclamation-triangle fa-lg text-gray-600 hover:text-gray-700"
                      ></i>
                      {{ post.reply.length }}
                    </div>
                    <div class="" @click="deleteModal">
                      <i
                        class="fa fa-solid fa-trash fa-lg text-red-600 hover:text-red-800"
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="mt-4 max-w-custom-min md:max-w-max">
                  <p class="text-black text-base md:text-lg xl:text-xl">
                    {{ post.content }}
                  </p>
                </div>
                <div class="fixed z-10 inset-0 overflow-y-auto" v-if="isReport">
                  <div class="flex items-center justify-center min-h-screen">
                    <div class="fixed inset-0 transition-opacity">
                      <div
                        class="absolute inset-0 bg-gray-500 opacity-75"
                      ></div>
                    </div>
                    <div
                      class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    >
                      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                          <div
                            class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
                          >
                            <svg
                              class="h-6 w-6 text-blue-600"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                          </div>
                          <div
                            class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"
                          >
                            <h3
                              class="text-lg leading-6 font-medium text-gray-900"
                            >
                              Apakah anda yakin ingin menghapus postingan ini ?
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div
                        class="bg-gray-50 flex flex-row justify-center p-4 gap-12 sm:flex-row-reverse md:text-center"
                      >
                        <button
                          @click.prevent="closeDeleteModal"
                          type="button"
                          class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                        >
                          Cancel
                        </button>

                        <button
                          @click="deletePost(post)"
                          type="button"
                          class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="fixed z-10 inset-0 overflow-y-auto" v-if="isModal">
                  <div class="flex items-center justify-center min-h-screen">
                    <div class="fixed inset-0 transition-opacity">
                      <div
                        class="absolute inset-0 bg-gray-500 opacity-75"
                      ></div>
                    </div>
                    <div
                      class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    >
                      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                          <div
                            class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
                          >
                            <svg
                              class="h-6 w-6 text-blue-600"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                          </div>
                          <div
                            class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"
                          >
                            <h3
                              class="text-lg leading-6 font-medium text-gray-900"
                            >
                              Success!
                            </h3>
                            <div class="mt-2">
                              <p class="text-sm leading-5 text-gray-500">
                                Anda telah berhasil menghapus postingan.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
                      >
                        <span
                          class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto"
                        >
                          <button
                            @click="closePopup"
                            type="button"
                            class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                          >
                            OK
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal Audio-->
      <div class="my-12">
        <!-- Main Content -->
        <h2 class="text-center text-lg md:text-2xl fontbold mt-4">
          Manage Audio
        </h2>

        <div class="mt-10 px-2 lg:px-3 xl:px-4">
          <div class="md:grid md:grid-cols-3 md:gap-4">
            <div class="col-span-1 mb-6 md:mb-0">
              <app-upload ref="upload" :addSong="addSong" />
            </div>
            <div class="col-span-2">
              <div class="bg-white rounded relative flex flex-col">
                <div class="px-6 pt-6 pb-5 font-bold border-b border-black">
                  <span class="text-lg">Content List</span>
                  <i
                    class="fa fa-compact-disc float-right text-blue-600 text-2xl"
                  ></i>
                </div>

                <div class="p-3 space-y-4">
                  <!-- Composition Items -->
                  <composition-item
                    v-for="(song, i) in songs"
                    :key="song.docID"
                    :song="song"
                    :updateSong="updateSong"
                    :index="i"
                    :removeSong="removeSong"
                    :updateUnsavedFlag="updateUnsavedFlag"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AppUpload from "@/components/Upload.vue";
import { songsCollection, postsCollection } from "@/includes/firebase";
import CompositionItem from "@/components/CompositionItem.vue";
import { getDocs, doc, deleteDoc } from "firebase/firestore";

export default {
  name: "Manage",
  components: {
    AppUpload,
    CompositionItem,
  },
  data() {
    return {
      songs: [],
      generalPosts: [],
      shalatPosts: [],
      doaPosts: [],
      alquranPosts: [],
      hadistPosts: [],
      unsavedFlag: false,
      isModal: false,
      isReport: false,
    };
  },
  async created() {
    this.getAllPost();
    const querySnapshot = await getDocs(songsCollection);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      this.addSong(doc);
      console.log(doc.id, " => ", doc.data());
    });
  },
  methods: {
    async getAllPost() {
      const querySnapshot = await getDocs(postsCollection);
      querySnapshot.forEach((doc) => {
        const post = { docID: doc.id, ...doc.data() };
        if (post.categories?.includes("general")) {
          this.generalPosts.push(post); // push to generalPosts array
        }
        if (post.categories?.includes("shalat")) {
          this.shalatPosts.push(post); // push to shalatPosts array
        }
        if (post.categories?.includes("alquran")) {
          this.alquranPosts.push(post); // push to alquranPosts array
        }
        if (post.categories?.includes("doa")) {
          this.doaPosts.push(post); // push to doaPosts array
        }
        if (post.categories?.includes("hadist")) {
          this.hadistPosts.push(post); // push to hadistPosts array
        }
      });
      console.log(this.generalPosts);
    },
    updateSong(i, values) {
      this.songs[i].modified_name = values.modified_name;
      this.songs[i].categories = values.categories;
      this.songs[i].artist = values.display_name;
    },
    removeSong(i) {
      this.songs.splice(i, 1);
    },
    async deletePost(post) {
      const postRef = doc(postsCollection, post.docID);
      await deleteDoc(postRef);
      // Remove post from corresponding category array
      switch (post.category) {
        case "general":
          this.generalPosts = this.generalPosts.filter(
            (p) => p.docID !== post.docID
          );
          break;
        case "shalat":
          this.shalatPosts = this.shalatPosts.filter(
            (p) => p.docID !== post.docID
          );
          break;
        case "alquran":
          this.alquranPosts = this.alquranPosts.filter(
            (p) => p.docID !== post.docID
          );
          break;
        case "doa":
          this.doaPosts = this.doaPosts.filter((p) => p.docID !== post.docID);
          break;
        case "hadist":
          this.hadistPosts = this.hadistPosts.filter(
            (p) => p.docID !== post.docID
          );
          break;
        default:
          break;
      }
      this.isReport = false;
      this.isModal = true;
      // window.location.reload();
    },
    addSong(document) {
      const song = {
        ...document.data(),
        docID: document.id,
      };

      this.songs.push(song);
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value;
    },
    deleteModal() {
      this.isReport = true;
    },
    closeDeleteModal() {
      this.isReport = false;
    },
    closePopup() {
      this.showPopup = !this.showPopup;
      window.location.reload();
    },
  },
  beforeRouteLeave(to, from, next) {
    if (!this.unsavedFlag) {
      next();
    } else {
      // eslint-disable-next-line no-alert, no-restricted-globals
      const leave = confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      );
      next(leave);
    }
  },
};
</script>

<style scoped>
.max-w-custom {
  max-width: 13rem;
}
</style>
