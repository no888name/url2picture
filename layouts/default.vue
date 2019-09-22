<template>
    <v-app id="inspire">

        <v-app-bar app light>
            <v-toolbar-title>Url2Picture</v-toolbar-title>
        </v-app-bar>

        <v-content>
            <v-container class="fill-height">
                <nuxt />
            </v-container>

        </v-content>
        <v-footer
                app
                color="#a3adad"
        >
            <span class="white--text">&copy; 2019</span>
        </v-footer>
    </v-app>
</template>

<script>
    export default {
        props: {
            source: String,
        },

        data: () => ({
            drawer: null,
        }),
    }
</script>