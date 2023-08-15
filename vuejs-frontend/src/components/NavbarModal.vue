<template>
  <nav class="bg-gray-800 p-4">
    <div class="flex justify-between items-center">
      <div class="text-white text-xl font-bold">Task Manager</div>
      <div class="flex space-x-4">
        <template v-if="user">
          <div class="text-white">{{ user.name }}</div>
          <button @click="logout" class="text-white">Logout</button>
        </template>
        <template v-else>
          <button @click="showLoginModal" class="text-white">Login</button>
          <button @click="showRegisterModal" class="text-white">Register</button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['user']),
  },
  methods: {
    showLoginModal() {
      this.$emit('showLoginModal');
    },
    showRegisterModal() {
      this.$emit('showRegisterModal');
    },
    async logout() {
      try {
        // Call the logout API endpoint using Vuex action
        await this.$store.dispatch('logout');
        this.$emit('showAlert', {message: 'Logged out successfully', type: 'success'});
      } catch (error) {
        this.$emit('showAlert', {message: 'Error during logout', type: 'error'});
        console.error('Error during logout:', error);
      }
    },
  },
};
</script>
