<template>
    <div>
        <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div class="bg-white rounded-lg shadow-md p-6 w-6/12">
                <h2 class="text-xl font-semibold mb-4">Register</h2>
                <form @submit.prevent="register">
                <div class="mb-3">
                    <label class="block mb-1 font-medium">Name:</label>
                    <input v-model="name" type="text" class="w-full p-2 border rounded-md" />
                </div>
                <div class="mb-3">
                    <label class="block mb-1 font-medium">Email:</label>
                    <input v-model="email" type="email" class="w-full p-2 border rounded-md" />
                </div>
                <div class="mb-3">
                    <label class="block mb-1 font-medium">Password:</label>
                    <input v-model="password" type="password" class="w-full p-2 border rounded-md" />
                </div>
                <div class="flex justify-end mt-4">
                    <button type="submit" class="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900">
                        Register
                    </button>
                    <button @click="closeModal" class="ml-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">
                        Cancel
                    </button>
                </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
        };
    },
    methods: {
        async register() {
            try {
                const response = await this.$axios.post('/api/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                })
                const { token, user } = response.data;

                this.$store.dispatch('login', { token, user });
                this.$emit('showAlert', {message: 'Registered successfully', type: 'success'});
                this.closeModal();
            } catch (error) {
                const message = error.response.data.message || 'Registration error';
                this.$emit('showAlert', {message: message, type: 'error'});
                console.error('Registration error:', error);
            }
        },
        closeModal() {
            this.$emit('close');
        },
    },
};
</script>
