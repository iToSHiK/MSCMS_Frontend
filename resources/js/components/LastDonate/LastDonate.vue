<template>
    <div class="sidebar__donator-lastdonor">
        <div class="sidebar__donator-topdonor-block-flex">
            <div class="sidebar__donator-topdonor-block sidebar__donator-topdonor-block--last">
                <div class="sidebar__donator-topdonor-block-text--last">
                    <p class="sidebar__donator-topdonor-text">
                        Recent Purchases
                    </p>
                    <i class="fas fa-hat-wizard sidebar__donator-topdonor-icon"></i>
                </div>
            </div>
        </div>
        <div class="sidebar__donator-lastdonor-players-block">
            <div class="sidebar__donator-lastdonor-players">
                <div class="sidebar__donator-lastdonor-player" v-for="payment in $root.settings.lastPayments1">
                    <div class="tooltip_popup">{{ payment.username }}</div>
                    <a :href="'/profile/'+payment.username"><img :src="'https://mc-heads.net/avatar/' + payment.username + '/28'" :alt="payment.username" class="content__payments-player-img"></a>
                </div>
            </div>

            <div class="sidebar__donator-lastdonor-line"></div>

            <div class="sidebar__donator-lastdonor-players">
                <div class="sidebar__donator-lastdonor-player" v-for="payment in $root.settings.lastPayments2">
                    <div class="tooltip_popup">{{ payment.username }}</div>
                    <a :href="'/profile/'+payment.username"><img :src="'https://mc-heads.net/avatar/' + payment.username + '/28'" :alt="payment.username" class="content__payments-player-img"></a>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {}
</script>
