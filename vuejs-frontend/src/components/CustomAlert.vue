<template>
    <div v-if="show" class="fixed top-5 inset-x-0 flex items-center justify-center z-50 mt-10">
        <div :class="alertClasses" class="p-4 rounded-md shadow-md border">
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <div :class="messageClasses">
                        <p>{{ message }}</p>
                    </div>
                </div>
                <button @click="closeAlert" class="text-gray-400 hover:text-gray-600 pl-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 -2 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        show: Boolean,
        message: String,
        type: String,
    },
    computed: {
        alertClasses() {
            const baseClasses = 'bg-white p-4 rounded-md shadow-md border';
            const typeClasses = this.type === 'success' ? 'border-green-500' : 'border-red-500';

            return `${baseClasses} ${typeClasses}`;
        },
        messageClasses() {
            return this.type === 'success' ? 'text-green-600' : 'text-red-600';
        },
    },
    methods: {
        closeAlert() {
            this.$emit('close');
        },
    },
    watch: {
        show(newVal) {
            if (newVal) {
                setTimeout(() => {
                this.$emit('close');
                }, 3000);
            }
        },
    },
};
</script>
