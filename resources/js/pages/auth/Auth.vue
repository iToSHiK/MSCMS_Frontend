<template>
    <div>
        <EnterUsername v-if="method === 'username'" />
        <EnterSteamid v-if="method === 'steamid'"/>
        <EnterInGame v-if="method === 'ingame'" />
    </div>
</template>

<script>
    import EnterSteamid from "../../components/Auth/EnterSteamid";
    import EnterUsername from "../../components/Auth/EnterUsername";
    import EnterInGame from "../../components/Auth/EnterInGame";

    export default {
        components: {
            EnterSteamid,
            EnterUsername,
            EnterInGame,
        },
        data() {
            return {
                method: ''
            }
        },
        created() {
            setTimeout(() => {
                this.method = this.$root.settings.auth;
            }, 300);
        }
    }
</script>
