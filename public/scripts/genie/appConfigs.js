console.log( "viewTemplate loaded");
let appConfigs = {
    pkgDownloads: {
        vueAppName: 'DashboardModel', 
        contentScripts: [      
            "https://cdn.statically.io/gh/genieframework/stipple.jl/master/assets/js/underscore-min.js", 
            "https://cdn.statically.io/gh/genieframework/stipple.jl/master/assets/js/vue.min.js", 
            "https://cdn.statically.io/gh/genieframework/stipple.jl/master/assets/js/stipplecore.js", 
            "https://cdn.statically.io/gh/genieframework/stipple.jl/master/assets/js/vue_filters.js", 
            "https://cdn.statically.io/gh/genieframework/stipple.jl/master/assets/js/watchers.js", 
            "https://cdn.statically.io/gh/genieframework/stipple.jl/master/assets/js/keepalive.js", 
            "https://cdn.statically.io/gh/genieframework/stippleplotly.jl/master/assets/js/plotly2.min.js", 
            "https://cdn.statically.io/gh/genieframework/stippleplotly.jl/master/assets/js/resizesensor.min.js", 
            "https://cdn.statically.io/gh/genieframework/stippleplotly.jl/master/assets/js/lodash.min.js", 
            "https://cdn.statically.io/gh/genieframework/stippleplotly.jl/master/assets/js/vueresize.min.js", 
            "https://cdn.statically.io/gh/genieframework/stippleplotly.jl/master/assets/js/vueplotly.min.js", 
            "https://cdn.statically.io/gh/genieframework/stippleui.jl/master/assets/js/quasar.umd.min.js", 

            "scripts/genie/channelsPkgs.js",
            "scripts/genie/modelPkgs.js",
            "./libs/jquery.min.js",
            "scripts/contentMain.js",


        ],  
        contentStyles: [
            "http://localhost:8000/css/app.css", 
            "https://fonts.googleapis.com/css?family=Material+Icons",
            "https://cdn.statically.io/gh/genieframework/stipple.jl/master/assets/css/stipplecore.css",
            "https://cdn.statically.io/gh/genieframework/stippleui.jl/master/assets/css/quasar.min.css",
            "css/editor-components.css",
        ],
        template: `
        <div id="DashboardModel" class="container" v-if='isready'>
        
        <header class=" st-header q-pa-sm">
            <h1 class="st-header__title text-h3">Package downloads stats for Julia</h1>
        </header>
            <div class="row">
                <div class="col-12">
                        <q-select hide-bottom-space label="Search for packages" new-value-mode="add-unique"
                            :loading="isprocessing" clearable :readonly="isprocessing" max-values=6
                            hint="Type package name then ENTER to search. Repeat to add multiple packages (max 6)."
                            v-model="searchterms"
                            :rules="[val => val && val.length > 0 || 'Please select at least one package']" use-input
                            multiple counter :options="packages" filled use-chips></q-select>
                    </div>
            </div>
            <div class="row">
                    <q-expansion-item label="Filters" icon="tune" class="col-12" expand-separator style="padding: 4px;">
                        <div class="row">
                            <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding: 4px;">
                                    <q-select hide-bottom-space filled v-model="filter_regions"
                                        :rules="[val => val && val.length > 0 || 'Please select at least one region']"
                                        clearable label="Regions" display-value="all" multiple use-chips
                                        :options="regions"></q-select>
                                </div>
                            <div class="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3" style="padding: 4px;">
                                    <q-input filled label="Start date" v-model="filter_startdate" clearable>
                                            <q-icon name="event" class="cursor-pointer" style="height: 100%;">
                                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                    
                                                        <q-date navigation-max-year-month="2022/1"
                                                            v-model="filter_startdate" mask="YYYY-MM-DD"></q-date>
                                                    </q-popup-proxy>
                                            </q-icon>
                                        </q-input>
                                </div>
                            <div class="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3" style="padding: 4px;">
                                    <q-input filled label="End date" v-model="filter_enddate" clearable>
                                            <q-icon name="event" class="cursor-pointer" style="height: 100%">
                                                <q-popup-proxy cover transition-show="scale" ref="qDateProxy"
                                                    transition-hide="scale">
                                                        <q-date navigation-max-year-month="2022/1"
                                                            v-model="filter_enddate" mask="YYYY-MM-DD"></q-date>
                                                    </q-popup-proxy>
                                            </q-icon>
                                        </q-input>
                                </div>
                        </div>
                    </q-expansion-item>
                </div>
            <div class="row">
                <div class="col col-12 col-sm st-module">
                    <h6>Packages downloads over time</h6>
                    <div class="row" v-if='searchterms'>
                        <section class="col-12 col-sm-12 col-md-6 col-lg-2"
                            v-for='pkg in searchterms.map(p => p.toLowerCase())'>
                                <q-card flat style="width: 100%" class="st-module">
                                    <q-card-section>
                                        <h5>{{pkg}} {{totals[pkg]}} 
                                                <q-icon name="save_alt" alt="Downloads"></q-icon>
                                            </h5>
                                            <q-separator></q-separator>
                                        
                                        <q-card-section>
                                                <plotly
                                                    :data="[ { x:(trends[pkg] && trends[pkg][0] ? trends[pkg][0].x : []), y:(trends[pkg] && trends[pkg][0] ? trends[pkg][0].y : []), type:'scatter', name:pkg },
                          { x:(trends[pkg] && trends[pkg][1] ? trends[pkg][1].x : []), y:(trends[pkg] && trends[pkg][1] ? trends[pkg][1].y : []), type:'bar', name:'Downloads' } ]"
                                                    :layout="{ plot_bgcolor:'transparent', height:100, showlegend:false,
                                      margin: { t:0, b:0, l:0, r:0 },
                                      xaxis: { ticks:'', showline:false, showticklabels:false },
                                      yaxis: { ticks:'', showline:false, showticklabels:false }
                                    }" :config="{ displayModeBar:false }"></plotly>
                                            </q-card-section>
                                    </q-card-section>
                                </q-card>
                            </section>
                    </div>
                        <plotly :data="data" :layout="layout" :config="{ displayLogo:false, displayModeBar:false }">
                        </plotly>
                    
                </div>
            </div>
        </div>
        `
    }, 
    hiStipple: {
        vueAppName: 'Hello', 
        contentScripts: [        
            "http://localhost:8000/stipple.jl/master/assets/js/vue.js",
            "http://localhost:8000/stipple.jl/master/assets/js/underscore-min.js",
            "http://localhost:8000/stipple.jl/master/assets/js/stipplecore.js",
            "http://localhost:8000/stipple.jl/master/assets/js/vue_filters.js",
            "http://localhost:8000/stipple.jl/master/assets/js/watchers.js",
            "scripts/genie/channels.js",
            "scripts/genie/hello.js",
            "./libs/jquery.min.js",
            "scripts/contentMain.js",
        ],  
        contentStyles: [
            "https://fonts.googleapis.com/css?family=Material+Icons",
            "http://localhost:9000/stipple.jl/master/assets/css/stipplecore.css",
            "http://localhost:9000/stippleui.jl/master/assets/css/quasar.min.css",
            "http://localhost:9000/stippleui.jl/master/assets/css/bootstrap-patch.css",
        ],
        template: `
        <div id="Hello" v-if="isready">
            <p :title="name" v-text="name">
            </p>
            <h1 v-text="surname">
            </h1>
            <div id="irx8">THIS IS STATIC TEST FROM GRAPESJS
            </div>
            <h1>Hi, static text
            </h1>
            <h2 v-text="age">
            </h2>
            <img :src="photo"/>
        </div>`
    }, 
    irisClusters: {
        vueAppName: 'IrisModel', 
        contentScripts: [       
            "http://localhost:9000/stipple.jl/master/assets/js/underscore-min.js", 
            "http://localhost:9000/stipple.jl/master/assets/js/vue.js", 
            "http://localhost:9000/stipple.jl/master/assets/js/stipplecore.js", 
            "http://localhost:9000/stipple.jl/master/assets/js/vue_filters.js", 
            "http://localhost:9000/stipple.jl/master/assets/js/watchers.js", 
            "http://localhost:9000/stipple.jl/master/assets/js/keepalive.js", 
            "http://localhost:9000/stippleui.jl/master/assets/js/quasar.umd.min.js", 
            "http://localhost:9000/stippleplotly.jl/master/assets/js/plotly2.min.js", 
            "http://localhost:9000/stippleplotly.jl/master/assets/js/resizesensor.min.js", 
            "http://localhost:9000/stippleplotly.jl/master/assets/js/lodash.min.js", 
            "http://localhost:9000/stippleplotly.jl/master/assets/js/vueresize.min.js", 
            "http://localhost:9000/stippleplotly.jl/master/assets/js/vueplotly.min.js", 
            "scripts/genie/channelsIris.js",
            "scripts/genie/irisModel.js",
            "./libs/jquery.min.js",
            "scripts/contentMain.js",
        ], 
        contentStyles: [
            "https://fonts.googleapis.com/css?family=Material+Icons",
            "http://localhost:9000/stipple.jl/master/assets/css/stipplecore.css",
            "http://localhost:9000/stippleui.jl/master/assets/css/quasar.min.css",
            "css/editor-components.css",
        ],
        template: `
        <div id="IrisModel" class="container">
        <header class=" st-header q-pa-sm">
            <h1 class="st-header__title text-h3">Iris data k-means clustering</h1>
        </header>
        <div class="row">
            <div class="col col-12 col-sm st-module">
                <h6>Number of clusters</h6>
                <q-slider :min=1 v-model="no_of_clusters" label :max=20 :step=1></q-slider>
            </div>
            <div class="col col-12 col-sm st-module">
                <h6>Number of iterations</h6>
                <q-slider :min=10 v-model="no_of_iterations" label :max=200 :step=10></q-slider>
            </div>
            <div class="col col-12 col-sm st-module">
                <h6>X feature</h6>
                <q-select v-model="xfeature" :options="features"></q-select>
            </div>
            <div class="col col-12 col-sm st-module">
                <h6>Y feature</h6>
                <q-select v-model="yfeature" :options="features"></q-select>
            </div>
        </div>

        <div class="row">
            <div class="col col-12 col-sm st-module">
                <q-checkbox v-model="isready" label="Hello" />
            </div>
            <div class="col col-12 col-sm st-module">
                <q-input v-model="isready" label="Hello" />
            </div>
            <div class="col col-12 col-sm st-module">
                <q-range v-model="myRange" :min="5" :max="25" />
            </div>
        </div>

        <div class="row">
            <div class="col col-12 col-sm st-module">
                <h5>Species clusters</h5>
                <plotly :data="iris_plot_data" :layout="layout" :config="{ displayLogo:false }"></plotly>
            </div>
            <div class="col col-12 col-sm st-module">
                <h5>k-means clusters</h5>
                <plotly :data="cluster_plot_data" :layout="layout" :config="{ displayLogo:false }"></plotly>
            </div>
        </div>
        <div class="row">
            <div class="col col-12 col-sm st-module">
                <h5>Iris data</h5>
                <q-table flat style="height: 350px;" :columns="iris_data.columns_iris_data" v-model="iris_data"
                    :data="iris_data.data_iris_data" dense row-key="__id" :pagination.sync="credit_data_pagination">
                </q-table>
            </div>
        </div>
    </div>
        `
    }, 
}
const appConfiguration = appConfigs.pkgDownloads;
const vueAppName = appConfiguration.vueAppName;