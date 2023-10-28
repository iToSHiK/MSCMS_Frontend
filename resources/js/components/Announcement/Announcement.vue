<template>
						<div class="content__warning" v-if="advert.content.length > 0">
							<div class="content__warning-exclamation">
								<i class="fas fa-exclamation content__warning-exclamation-icon"></i>
							</div>
							<div class="content__warning-text">
								<p class="content__warning-title">
									{{ advert.title }}
								</p>
								<p v-html="advert.content" class="content__warning-subtitle">
									{{ $t('Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.') }}
								</p>
							</div>
							<a :href="advert.button_url" class="content__warning-btn">{{ advert.button_name }}</a>
						</div>
</template>

<script>
    export default {
        data() {
            return {
                advert: {
                    title: '',
                    content: '',
                    button_name: '',
                    button_url: ''
                }
            }
        },
        async mounted() {
            const response = await this.$root.axios.post('/announcement/get');

            this.advert = response.data;
        }
    }
</script>
