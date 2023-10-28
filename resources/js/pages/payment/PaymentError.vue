<template>
    <div>
    <div id="page-title" class="gray">
        <div class="container">
            <h1 style="color: #ff0000;">OOOPPSS!</h1>
            <p>Something went wrong or our servers are offline!</p>
        </div>
    </div>
    <div id="content" class="username">
        <div class="container">
            <div class="container">
                <div class="box">
                    <h1 class="ms-h1 orange" style="color: #ff5f5f; border-bottom: 6px solid #ff0000;">You're the best, but something happened 🥺</h1>
                </div>
                <p style="margin: 0 0 10px; color: #7d7d7d;"><b>Please, contact us at Discord or any other way!</b> Probably our servers are offline or something happened with your payment.</p>
                <p style="margin: 0 0 10px; color: #7d7d7d;"><b>Please contact us with your username and attached proof of purchase.</b> Maybe your payment marked as "pending". Also make sure that you have submitted your correct Minecraft username. If this is not the case, please mention this.</p>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                page: {
                    url: '',
                    name: '',
                    content: ''
                }
            }
        },
        methods: {

        },
        async mounted() {
        }
    }
</script>