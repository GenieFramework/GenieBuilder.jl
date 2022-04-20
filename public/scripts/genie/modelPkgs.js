

function initStipple(rootSelector){    
    Stipple.init({ theme: 'stipple-blue' });
            window.DashboardModel = new Vue({ "el": rootSelector, "mixins": [watcherMixin, reviveMixin], "data": { "filter_enddate": "2022-01-27", "data": [], "packages": [], "isready": false, "trends": {}, "isprocessing": false, "searchterms": [], "layout": { "plot_bgcolor": "#fff" }, "isreadydelay": 500, "totals": {}, "filter_regions": ["all"], "filter_startdate": "2021-10-28", "regions": ["all", "au", "cn-east", "cn-northeast", "cn-southeast", "eu-central", "in", "kr", "sa", "sg", "us-east", "us-west"] } });
            DashboardModel.$watch(function () { return this.searchterms }, _.debounce(function (newVal, oldVal) {
                Genie.WebChannels.sendMessageTo(CHANNEL, 'watchers', { 'payload': { 'field': 'searchterms', 'newval': newVal, 'oldval': oldVal } });
            }, 300), { deep: true });
            DashboardModel._watchers[DashboardModel._watchers.length - 1].expression = 'function(){return this.searchterms}'

            DashboardModel.$watch(function () { return this.packages }, _.debounce(function (newVal, oldVal) {
                Genie.WebChannels.sendMessageTo(CHANNEL, 'watchers', { 'payload': { 'field': 'packages', 'newval': newVal, 'oldval': oldVal } });
            }, 300), { deep: true });
            DashboardModel._watchers[DashboardModel._watchers.length - 1].expression = 'function(){return this.packages}'

            DashboardModel.$watch(function () { return this.filter_startdate }, _.debounce(function (newVal, oldVal) {
                Genie.WebChannels.sendMessageTo(CHANNEL, 'watchers', { 'payload': { 'field': 'filter_startdate', 'newval': newVal, 'oldval': oldVal } });
            }, 300), { deep: true });
            DashboardModel._watchers[DashboardModel._watchers.length - 1].expression = 'function(){return this.filter_startdate}'

            DashboardModel.$watch(function () { return this.filter_enddate }, _.debounce(function (newVal, oldVal) {
                Genie.WebChannels.sendMessageTo(CHANNEL, 'watchers', { 'payload': { 'field': 'filter_enddate', 'newval': newVal, 'oldval': oldVal } });
            }, 300), { deep: true });
            DashboardModel._watchers[DashboardModel._watchers.length - 1].expression = 'function(){return this.filter_enddate}'

            DashboardModel.$watch(function () { return this.regions }, _.debounce(function (newVal, oldVal) {
                Genie.WebChannels.sendMessageTo(CHANNEL, 'watchers', { 'payload': { 'field': 'regions', 'newval': newVal, 'oldval': oldVal } });
            }, 300), { deep: true });
            DashboardModel._watchers[DashboardModel._watchers.length - 1].expression = 'function(){return this.regions}'

            DashboardModel.$watch(function () { return this.filter_regions }, _.debounce(function (newVal, oldVal) {
                Genie.WebChannels.sendMessageTo(CHANNEL, 'watchers', { 'payload': { 'field': 'filter_regions', 'newval': newVal, 'oldval': oldVal } });
            }, 300), { deep: true });
            DashboardModel._watchers[DashboardModel._watchers.length - 1].expression = 'function(){return this.filter_regions}'

            DashboardModel.$watch(function () { return this.data }, _.debounce(function (newVal, oldVal) {
                Genie.WebChannels.sendMessageTo(CHANNEL, 'watchers', { 'payload': { 'field': 'data', 'newval': newVal, 'oldval': oldVal } });
            }, 300), { deep: true });
            DashboardModel._watchers[DashboardModel._watchers.length - 1].expression = 'function(){return this.data}'

            DashboardModel.$watch(function () { return this.layout }, _.debounce(function (newVal, oldVal) {
                Genie.WebChannels.sendMessageTo(CHANNEL, 'watchers', { 'payload': { 'field': 'layout', 'newval': newVal, 'oldval': oldVal } });
            }, 300), { deep: true });
            DashboardModel._watchers[DashboardModel._watchers.length - 1].expression = 'function(){return this.layout}'

            DashboardModel.$watch(function () { return this.totals }, _.debounce(function (newVal, oldVal) {
                Genie.WebChannels.sendMessageTo(CHANNEL, 'watchers', { 'payload': { 'field': 'totals', 'newval': newVal, 'oldval': oldVal } });
            }, 300), { deep: true });
            DashboardModel._watchers[DashboardModel._watchers.length - 1].expression = 'function(){return this.totals}'

            DashboardModel.$watch(function () { return this.trends }, _.debounce(function (newVal, oldVal) {
                Genie.WebChannels.sendMessageTo(CHANNEL, 'watchers', { 'payload': { 'field': 'trends', 'newval': newVal, 'oldval': oldVal } });
            }, 300), { deep: true });
            DashboardModel._watchers[DashboardModel._watchers.length - 1].expression = 'function(){return this.trends}'

            DashboardModel.$watch(function () { return this.isready }, _.debounce(function (newVal, oldVal) {
                Genie.WebChannels.sendMessageTo(CHANNEL, 'watchers', { 'payload': { 'field': 'isready', 'newval': newVal, 'oldval': oldVal } });
            }, 300), { deep: true });
            DashboardModel._watchers[DashboardModel._watchers.length - 1].expression = 'function(){return this.isready}'

            DashboardModel.$watch(function () { return this.isreadydelay }, _.debounce(function (newVal, oldVal) {
                Genie.WebChannels.sendMessageTo(CHANNEL, 'watchers', { 'payload': { 'field': 'isreadydelay', 'newval': newVal, 'oldval': oldVal } });
            }, 300), { deep: true });
            DashboardModel._watchers[DashboardModel._watchers.length - 1].expression = 'function(){return this.isreadydelay}'

            DashboardModel.$watch(function () { return this.isprocessing }, _.debounce(function (newVal, oldVal) {
                Genie.WebChannels.sendMessageTo(CHANNEL, 'watchers', { 'payload': { 'field': 'isprocessing', 'newval': newVal, 'oldval': oldVal } });
            }, 300), { deep: true });
            DashboardModel._watchers[DashboardModel._watchers.length - 1].expression = 'function(){return this.isprocessing}'

}

window.parse_payload = function (payload) {
    if (payload.key) {
        window.DashboardModel.revive_payload(payload)
        window.DashboardModel.updateField(payload.key, payload.value);
    }
}

function app_ready() {
    if (
        (document.readyState === 'complete' || document.readyState === 'interactive')
        && (Genie.WebChannels.socket.readyState === 1)
    ) {

        if (Genie.Settings.env == 'dev') {
            console.info('Waiting ' + DashboardModel.isreadydelay + 'ms');
        }

        setTimeout(function () {
            DashboardModel.isready = true;
            if (Genie.Settings.env == 'dev') {
                console.info('App ready');
            }
        }, DashboardModel.isreadydelay); // let's give it a bit to process server side events


        try {
            if (Genie.Settings.webchannels_keepalive_frequency > 0) {
                setInterval(keepalive, Genie.Settings.webchannels_keepalive_frequency);
            }
        } catch (e) {
            if (Genie.Settings.env == 'dev') {
                console.error('Error setting WebSocket keepalive interval: ' + e);
            }
        }


    } else {
        if (Genie.Settings.env == 'dev') {
            console.info('App starting');
        }
        setTimeout(app_ready, Genie.Settings.webchannels_timeout);
    }
};

/* 

initStipple( "#IrisModel" );
window.onload = function() {
if (Genie.Settings.env == 'dev') {
  console.info('Loading completed');
}
app_ready();
}
*/