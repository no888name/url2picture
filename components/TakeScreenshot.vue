<template>
    <div>
        <v-row class="mb-12 no-gutters" align="center">
            <v-col sm="2"></v-col>
            <v-col class="text-center" sm="6">

                <v-text-field v-model="url" :value="url"
                              label="Your website to be captured"
                              value=""
                              hint="For example, https://mycrm.de"
                ></v-text-field>
            </v-col>
            <v-col sm="2">
                <v-btn text
                       class="ma-2"
                       :loading="loading"
                       :disabled="loading"
                       @click="fetchSomething"
                >
                    Take Screen Shot
                </v-btn>

            </v-col>
            <v-col sm="2"></v-col>
        </v-row>
        <v-row class="mb-12 no-gutters" align="center">
            <v-col sm="2"></v-col>
            <v-col sm="8">
                <v-img :src="getImageSrc" aspect-ratio="1.7" contain></v-img>
            </v-col>
        </v-row>
    </div>
</template>

<style>

</style>


<script>

    export default {

        asyncData() {
            return {
                name: process.static ? 'static' : (process.server ? 'server' : 'client'),
                loader: null,
                loading: false,
            }
        },
        data() {
            return {
                loader: null,
                loading: false,
                url: '',
                imgSrc: 'no.png',
            }
        },
        methods: {
            async fetchSomething() {
                this.loading = true;
                console.log("url",this.url);
                await this.$axios.post('/api/picture', {
                    url: this.url
                })
                    .then(responce => {
                        console.log(responce);
                        this.loading = false;
                        this.imgSrc = responce.data.imgName;
                    })
                    .catch(errors => {
                        console.log(errors);
                        this.loading = false;
                        this.imgSrc = 'no.png';
                    });
            }
        },
        computed: {
            // a computed getter
            getImageSrc: function () {
                // `this` points to the vm instance
                return `/images/${this.imgSrc}`;
            }
        }

    }

</script>