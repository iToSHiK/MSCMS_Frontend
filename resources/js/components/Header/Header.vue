<template>
    <header class="header">
        <div id="particles-header"></div>
        <div class="container">
            <div class="nav">
                <div class="nav__bar">
                    <div class="nav__bar-currency">
                        <p class="nav__bar-currency-text">Currency</p>
                        <div class="nav__bar-currency-change js-navCurrencyButton" @click.stop="openAndCloseCurrencyTab">
                            <p class="nav__bar-title ">{{ $root.currency.name }}</p>
                            <i :class="[activeCurrencyTab ? 'fa-chevron-up' : 'fa-chevron-down']" v-if="$root.settings.currencies.length > 1" class="fas nav__bar-icon nav__bar-icon--currency"></i>
                        </div>
                    </div>
                    <ul v-if="activeCurrencyTab" class="nav__bar-currency-dropdown-list js-navCurrencyList" v-click-outside="openAndCloseCurrencyTab">
                        <a href="#" @click="setCurrency(currency)" class="nav__bar-currency-dropdown-link" v-for="currency in $root.settings.currencies">
                            <li class="nav__bar-currency-dropdown-item">
                                {{ currency.name }}
                            </li>
                        </a>
                    </ul>
  					<div class="nav__bar-language">
  						<p class="nav__bar-language-text">Language</p>
  						<div class="nav__bar-language-change js-navLanguageButton"  @click.stop="openAndCloseLangTab">
  							<span :class="['flag-icon', 'flag-icon-'+$root.language.code]"></span><p class="nav__bar-title-language">{{ $root.language.name }}</p>
  							<i :class="[activeLangTab ? 'fa-chevron-up' : 'fa-chevron-down']" v-if="$root.settings.languages.length > 1" class="fas nav__bar-icon nav__bar-icon--currency"></i>
  						</div>
  					</div>
  					<ul v-if="activeLangTab" class="nav__bar-language-dropdown-list js-navLanguageList" v-click-outside="openAndCloseLangTab">
  						<a href="#" @click="setLang(language)" class="nav__bar-language-dropdown-link" v-for="language in $root.settings.languages">
  							<li class="nav__bar-language-dropdown-item">
  								<span :class="['flag-icon', 'flag-icon-'+language.code]"></span> {{ language.name }}
  							</li>
  						</a>
  					</ul>
                    <div class="nav__bar-cart" :class="[openCart ? 'is--open' : '']" @click="openAndCloseCart" v-if="$root.user === null">
                        <i class="fas fa-shopping-cart nav__bar-icon"></i>
                        <div class="nav__bar-cart-title">
                            <p class="nav__bar-title">{{ $t('Shopping cart') }}</p>
                            <p class="nav__bar-subtitle">{{ $t('NOT LOGGED IN') }}</p>
                        </div>
                    </div>
                    <router-link tag="div" :to="{name: 'checkout'}" style="cursor: pointer;" class="nav__bar-cart" v-if="$root.user !== null" :class="[openCart ? 'is--open' : '']"
                         @click="openAndCloseCart">
                        <i class="fas fa-shopping-cart nav__bar-icon"></i>
                        <div class="nav__bar-cart-title">
                            <p class="nav__bar-title">{{ $t('Shopping cart') }}</p>
                            <p class="nav__bar-subtitle" v-if="$root.cart.items === 0">{{ $t('CART EMPTY') }}</p>
                            <p v-else class="nav__bar-subtitle">{{ $root.cart.items }} {{ $t('item for') }} {{
                                $root.toActualCurrency($root.cart.price) }} {{ $root.currency.name }}</p>
                        </div>
                    </router-link>
                    <div class="nav__bar-logout">
                        <i v-if="$root.user !== null" class="fas fa-sign-out-alt nav__bar-icon"></i>
                        <p v-if="$root.user === null" class="nav__bar-title"><img style="margin-right: 8px;border-radius: 4px; filter: grayscale(40%);" src="/img/guest.png">{{ $t('Guest') }}</p>
                        <p v-else @click="logout" style="cursor: pointer;" class="nav__bar-title">{{ $t('Logout') }}</p>
                    </div>
                </div>
            </div>
            <div class="header__contact">
                <div class="header__contact-ip hvr-grow">
                    <a href="#" class="mstr-js--copyip">
                      <svg class="header_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com/ License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/>
                      </svg>
                    </a>
                    <div class="header__contact-text">
                        <a href="#" class="header__contact-link mstr-js--copyip">
                            <div class="header__contact-title">
                                {{ $root.settings.server.ip }}
                            </div>
                            <div class="header__contact-subtitle">
                                {{ online }} {{ $t('Players Online') }}
                            </div>
                        </a>
                    </div>
                </div>
                <div class="header__contact-logo levitate" style="margin-top: 100px;">
                  <router-link to="/index">
                      <a href="#" style="text-decoration: none;">
                        <img src="/assets/img/logo.png" alt="logo" class="sidebar__navigation-logo-img">
                      </a>
                  </router-link>
                </div>
                <div :href="$root.settings.discord_url" class="header__contact-discord hvr-grow">
                    <div class="header__contact-text">
                        <a :href="$root.settings.discord_url" class="header__contact-link">
                            <div class="header__contact-title">
                                Discord {{ $t('Server') }}
                            </div>
                            <div class="header__contact-subtitle">
                                {{ discord_online }} {{ $t('Members Online') }}
                            </div>
                        </a>
                    </div>
                    <a :href="$root.settings.discord_url">
                        <svg viewBox="0 0 245 240" class="header_icon">
                        <path d="M104.4 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1zM140.9 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1z" class="st0"></path> <path d="M189.5 20h-134C44.2 20 35 29.2 35 40.6v135.2c0 11.4 9.2 20.6 20.5 20.6h113.4l-5.3-18.5 12.8 11.9 12.1 11.2 21.5 19V40.6c0-11.4-9.2-20.6-20.5-20.6zm-38.6 130.6s-3.6-4.3-6.6-8.1c13.1-3.7 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.5-14.5 4.3-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.7-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.8c-3 3.8-6.7 8.3-6.7 8.3-22.1-.7-30.5-15.2-30.5-15.2 0-32.2 14.4-58.3 14.4-58.3 14.4-10.8 28.1-10.5 28.1-10.5l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 5.9-2.9c10.7-4.7 19.2-6 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.7-.3 28.1 10.5c0 0 14.4 26.1 14.4 58.3 0 0-8.5 14.5-30.6 15.2z" class="st0"></path>
                        </svg>
                    </a>
                </div>
            </div>
            <div class="header-logo">
                <img src="/assets/img/logo.png" alt="logo" class="header-logo-img">
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        data() {
            return {
                openCart: false,
                online: 0,
                discord_online: 0,
                activeCurrencyTab: false,
                activeLangTab: false
            }
        },
        methods: {
            logout() {
                this.$cookie.delete('token');
                this.$root.getUser();

                this.$router.push({name: 'index'});
            },
            openAndCloseCart() {
                if (this.openCart) {
                    this.openCart = false;
                } else {
                    this.openCart = true;
                }
            },
            async removeInCart(id) {
                const response = await this.$root.axios.post(`/cart/remove/${id}`);
                const data = response.data;

                if (data.success) {
                    $('#popup-modal').modal('hide');
                    await this.$root.getCart();
                    this.$root.showNotification('success', this.$t('Item remove from cart'));
                }
            },
            async getOnlineServer() {
                if (this.$root.settings.discord_id){
                    $.get(`https://discordapp.com/api/guilds/${this.$root.settings.discord_id}/widget.json`, (result) => {
                        if (result && result.presence_count) {
                            this.discord_online = result.presence_count;
                        }
                    });
                }
                $.get(`https://api.minetools.eu/ping/${this.$root.settings.server.ip}/${this.$root.settings.server.port}`, (result) => {
                    if (result.players) {
                        this.online = result.players.online;
                    }
                });
            },
            openAndCloseCurrencyTab() {
                this.activeCurrencyTab = !this.activeCurrencyTab;
            },
            openAndCloseLangTab() {
                this.activeLangTab = !this.activeLangTab;
            },
            setCurrency(currency) {
                this.$root.currency = currency;
                this.$cookie.set('currency', JSON.stringify(currency));
                this.activeCurrencyTab = false;
            },
            setLang(language) {
                this.$root.$i18n.locale = language.code;
                this.$root.language = language;
                this.$cookie.set('lang_name', language.name);
                this.$cookie.set('lang', language.code);
                this.activeLangTab = false;
            }
        },
        mounted() {
            setTimeout(() => {
                this.getOnlineServer();

                setInterval(() => {
                    this.getOnlineServer();
                }, 20000);

                $(".mstr-js--copyip").length && new ClipboardJS(".mstr-js--copyip", {text: () => this.$root.settings.server.ip}).on("success", n => swal("Server IP " + this.$t('Copied'), this.$t('We hope to see you online soon!'), "success"))
            }, 500);
        }
    }
</script>
