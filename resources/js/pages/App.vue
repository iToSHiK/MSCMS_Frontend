<template>
    <div>
        <Header/>
        <main class="main">
            <div class="container">
				<div class="content__donation" style="margin-top: -50px;margin-bottom: 75px;">
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
                <div class="main-flex">
                    <aside class="sidebar">
                        <div class="sidebar__navigation">
                            <!--<div class="sidebar__navigation-store">
                                <div class="sidebar__navigation-store-text">
                                    <p class="sidebar__navigation-store-title">
                                        Select a Category
                                    </p>
                                </div>
                            </div>-->
                            <div class="sidebar__navigation-block">
                                <ul class="sidebar__navigation-list">
									<li class="sidebar__navigation-link">
										<router-link
														 class="sidebar__navigation-item hvr-shadow-radial menu__item"
														 :to="{name: 'index'}">
													<svg fill="#dd2828" viewBox="0 0 64 64" class="sidebar__navigation-item-img"><path d="M 32 8 C 31.08875 8 30.178047 8.3091875 29.435547 8.9296875 L 8.8007812 26.171875 C 8.0357812 26.810875 7.7634844 27.925203 8.2714844 28.783203 C 8.9184844 29.875203 10.35025 30.088547 11.28125 29.310547 L 31.677734 12.269531 C 31.864734 12.113531 32.135266 12.113531 32.322266 12.269531 L 52.71875 29.3125 C 53.09275 29.6255 53.546047 29.777344 53.998047 29.777344 C 54.693047 29.777344 55.382672 29.416656 55.763672 28.722656 C 56.228672 27.874656 55.954891 26.803594 55.212891 26.183594 L 52 23.498047 L 52 15 C 52 13.895 51.105 13 50 13 L 48 13 C 46.895 13 46 13.895 46 15 L 46 18.484375 L 34.564453 8.9296875 C 33.821953 8.3091875 32.91125 8 32 8 z M 32 16 L 12 32.705078 L 12 47 C 12 49.761 14.239 52 17 52 L 47 52 C 49.761 52 52 49.761 52 47 L 52 32.705078 L 32 16 z M 28 32 L 36 32 C 37.105 32 38 32.895 38 34 L 38 48 L 26 48 L 26 34 C 26 32.895 26.895 32 28 32 z"></path></svg>
												<p class="sidebar__navigation-item-text">Home</p>
										</router-link>
									</li>
                                    <li class="sidebar__navigation-link" v-for="(category, index) in categories"
                                        :key="index">
                                        <router-link v-if="!category.categories.length"
                                                     class="sidebar__navigation-item hvr-shadow-radial menu__item"
                                                     :to="{name: 'category', params: {url: category.url}}">
                                                    <img
                                                        :src="'/img/cats/' + category.img"
                                                        class="sidebar__navigation-item-img"
                                                        v-if="category.img !== null"
                                                    />
                                                    <img
                                                        :src="'/img/cats/' + category.img"
                                                        class="sidebar__navigation-item-img"
                                                        v-if="category.img === null"
                                                        style="display: none"
                                                    />
                                            <p class="sidebar__navigation-item-text">{{category.name}}</p>
                                        </router-link>
                                        <div v-else @click="category.selected = !category.selected">
                                            <div class="sidebar__navigation-link">
                                                <div
                                                    class="sidebar__navigation-item hvr-shadow-radial js-sidebarDropdownButton menu__item">
                                                    <img
                                                        :src="'/img/cats/' + category.img"
                                                        class="sidebar__navigation-item-img"
                                                        v-if="category.img !== null"
                                                    />
                                                    <img
                                                        :src="'/img/cats/' + category.img"
                                                        class="sidebar__navigation-item-img"
                                                        v-if="category.img === null"
                                                        style="display: none"
                                                    />
                                                    <p class="sidebar__navigation-item-text">{{category.name}}</p>
                                                    <i class="fas fa-chevron-down sidebar__navigation-dropdown-icon "></i>
                                                </div>
                                            </div>
                                            <ul :class="[['sidebar__navigation-dropdown-list js-sidebarDropdownList'], [category.selected ? '' : 'hidden']]">
                                                <li v-for="(subCategory, index) in category.categories" :key="index">
                                                    <router-link class="sidebar__navigation-dropdown-link"
                                                                 :to="{name: 'category', params: {url: subCategory.url}}">
                                                        <div class="sidebar__navigation-dropdown-item">
                                                            {{subCategory.name}}
                                                        </div>
                                                    </router-link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="sidebar__donator">
                            <TopDonate/>
                            <LastDonate/>
                        </div>
                    </aside>
                    <div class="mobile">
                        <div class="mobile__menu">
                            <p class="mobile__menu-title">
                                {{ $t("Store menu") }}
                            </p>
                            <div class="mobile__burger js-burgerMenu">
                                <span class="burger js-burger"></span>
                            </div>
                        </div>
                        <ul class="mobile-list js-menuList hidden">
                            <div v-for="(category, index) in categories">
                                <router-link :to="{name: 'category', params: {url: category.url}}" v-if="!category.categories.length" class="mobile-link"
                                   :key="index">
                                    <li class="mobile-item">
                                        <p class="mobile-item-text">{{category.name}}</p>
                                    </li>
                                </router-link>
                                <div v-else @click="category.selected = !category.selected">
                                    <div>
                                        <div
                                            class="js-sidebarDropdownButton">
                                            <p class="sidebar__navigation-item-text" style="font-size:20px">{{category.name}}</p>
                                        </div>
                                    </div>
                                    <ul :class="[['js-sidebarDropdownList'], [category.selected ? '' : 'hidden']]">
                                        <li v-for="(subCategory, index) in category.categories" :key="index">
                                            <router-link class="sidebar__navigation-dropdown-link"
                                                         :to="{name: 'category', params: {url: subCategory.url}}">
                                                <div class="sidebar__navigation-dropdown-item">
                                                    {{subCategory.name}}
                                                </div>
                                            </router-link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </ul>
                    </div>
                    <div class="content">
						<div v-if="isIndex" class="featured-content">
                            <FeaturedPackages/>
                        </div>
                        <div class="index-content">
                            <Announcement/>
                            <router-view/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <Footer/>
    </div>
</template>


<script>
    import Header from "../components/Header/Header";
    import Footer from "../components/Footer/Footer";
    import Announcement from "../components/Announcement/Announcement";
    import TopDonate from "../components/TopDonate/TopDonate";
    import LastDonate from "../components/LastDonate/LastDonate";
    import Goal from "../components/DonationGoal/Goal";
	import FeaturedPackages from "../components/FeaturedPackages/FeaturedPackages";

    export default {
        components: {
            Goal,
            Header,
            Footer,
            Announcement,
            TopDonate,
            LastDonate,
			FeaturedPackages,
        },
        data() {
            return {
                categories: {},
                selectedCategory: null
            }
        },
        methods: {
            async getCategories() {
                const response = await this.$root.axios.post('/categories/get');

                let formattedCategories = response.data.filter((category) => {
                    category.selected = false;
                    return category;
                })

                this.categories = formattedCategories;
            },
        },
        created() {
            $('body').tooltip({
                selector: '[data-toggle="tooltip"]',
                container: '.modal-footer'
            });

            $(".toggle-tooltip").tooltip();

            this.getCategories();
        },
		computed: {
		  isIndex() {
			 return this.$route.name === 'index'
		  }
		}
    }
</script>

<style>
.menu__item {height: 65px;}
.sidebar__navigation-item-img {max-height: 65px;}
</style>
