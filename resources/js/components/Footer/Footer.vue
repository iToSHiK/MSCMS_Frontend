<template>
    <footer class="footer">
        <div class="footer-flex">
            <div class="footer__about">
                <div class="footer__about-text">
                    <p class="footer__about-title">
                        {{ $t('About Us') }}
                    </p>
                    <div class="footer-line"></div>
                    <p class="footer__about-subtitle">
                        {{ $root.settings.website_name }} {{ $t('is a Minecraft: Java Edition network that provides players with captivating and unique gameplay. This is the only official store for the network.') }}
                    </p>
                </div>
            </div>
            <div class="footer__inc">
                <img style="width: 165px;" src="/assets/img/logo.png" alt="footer-logo" class="footer__inc-img">
                <p class="footer__inc-years">
                    2023 ©
                </p>
                <div class="footer__inc-text">
                    <div class="footer__inc-title-gradient">
                        <h2 class="footer__inc-title">
                            {{ $root.settings.website_name }}
                        </h2>
                    </div>
                    <p class="footer__inc-rights">
                        {{ $t('All Rights Reserved') }}.
                    </p>
                    <p class="footer__inc-subtitle">
                        {{ $t('We are not affiliated with Mojang AB. Powered by') }} <a style="color: #dd2828;font-weight: 600;"href="https://minestorecms.com/">MineStore CMS</a>
                    </p>
                </div>
                <div class="footer__inc-icons">
                    <a :href="$root.settings.socials.facebook" style="color: #fff">
                        <i class="fab fa-facebook footer__inc-icon"></i>
                    </a>
                    <a :href="$root.settings.socials.instagram" style="color: #fff">
                        <i class="fab fa-instagram footer__inc-icon"></i>
                    </a>
                    <a :href="$root.settings.socials.discord" style="color: #fff">
                        <i class="fab fa-discord footer__inc-icon"></i>
                    </a>
                    <a :href="$root.settings.socials.twitter" style="color: #fff">
                        <i class="fab fa-twitter footer__inc-icon"></i>
                    </a>
                </div>
            </div>
            <div class="footer__links">
                <div class="footer__links-text">
                    <p class="footer__links-title">
                        {{ $t('Useful Links') }}
                    </p>
                    <div class="footer-line"></div>
                    <ul class="footer__links-list" v-for="foot in $root.settings.footer">
                        <a :href="foot.url">
                            <li class="footer__links-item">{{ foot.name }}</li>
                        </a>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {}
</script>
