<template>
    <div class="content__donation">
        <div class="content-container content-flex">
            <div class="content__donation-goal">
                <div class="content__donation-text" v-if="$root.settings.goal > 0">
                    <p class="content__donation-goal-title">
                        {{ $t('Donation Goal') }}
                        <i class="fas fa-chart-line content__donation-icon"></i>
                    </p>
                    <p class="content__donation-goal-subtitle">
                        {{ $root.toActualCurrency($root.settings.goal_sum) }}/{{ $root.toActualCurrency($root.settings.goal) }} {{ $root.currency.name }}
                    </p>
                    <div class="progress">
                        <div class="progress-value">{{ (100 * $root.settings.goal_sum / $root.settings.goal).toFixed(0)
                            }}%
                        </div>
                        <div class="progress-bar">
                            <div class="progress-bar-content"
                                 :style="'width: ' + (100 * $root.settings.goal_sum / $root.settings.goal).toFixed(0) + '%;'">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="$root.user === null" class="content__donation-player">
                <p class="content__donation-player-text">
                    {{ $t('Guest') }}
                </p>
                <div class="content__donation-player-image">
                    <img src="/img/128.png" alt="player" class="content__donation-player-img">
                </div>
            </div>
            <div v-else class="content__donation-player" @click="$router.push({name: 'profile'})">
              <div class="content__donation-player-block" style="display: block;">
                <p class="content__donation-player-text">
                    {{ $root.user.username }}
                </p>
                <p class="content__donation-player-subtext" v-if="$root.settings.is_virtual_currency">
                    <i class="fas fa-coins"></i>
                    {{ $root.user.virtual_currency }} {{ $root.settings.virtual_currency }}
                </p>
              </div>
              <div class="content__donation-player-image">
                  <img :src="$root.user.avatar" :alt="$root.user.username" class="content__donation-player-img">
              </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Goal"
    }
</script>
