<template>
    <div class="sidebar__donator-topdonor" v-if="Object.keys($root.settings.top).length !== 0">
        <div class="sidebar__donator-topdonor-block-flex">
            <div class="sidebar__donator-topdonor-block">
                <div class="sidebar__donator-topdonor-block-text">
                    <i class="fas fa-ghost sidebar__donator-topdonor-icon"></i>
                    <p class="sidebar__donator-topdonor-text">
                        {{ $t('Top Donator') }}
                    </p>
                </div>
            </div>
        </div>
        <div class="sidebar__donator-topdonor-player">
            <div class="sidebar__donator-topdonor-player-image">
                <img width="87" height="208" :src="$root.settings.top.avatar" :alt="$root.settings.top.username" class="sidebar__donator-topdonor-player-img">
            </div>
            <div class="sidebar__donator-topdonor-player-text">
                <p class="sidebar__donator-topdonor-player-title">
                    <i class="fas fa-crown" style="color: #ffb829;"></i> {{ $root.settings.top.username }}
                </p>
                <p class="sidebar__donator-topdonor-player-subtitle" v-html="$t('Donated the most <br> this month')"></p>
            </div>
        </div>
    </div>

</template>


<script>

    export default {}
</script>
