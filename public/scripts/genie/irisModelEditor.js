

function initStipple(rootSelector){    
  Stipple.init({theme: 'stipple-blue'});
  window.IrisModel = 

  new Vue({"el":rootSelector,"mixins":[watcherMixin, reviveMixin],"data":{"myRange":{min:10,max:20},"iris_data":{"columns_iris_data":[{"name":"SepalLength","required":false,"label":"SepalLength","align":"left","field":"SepalLength","sortable":true},{"name":"SepalWidth","required":false,"label":"SepalWidth","align":"left","field":"SepalWidth","sortable":true},{"name":"PetalLength","required":false,"label":"PetalLength","align":"left","field":"PetalLength","sortable":true},{"name":"PetalWidth","required":false,"label":"PetalWidth","align":"left","field":"PetalWidth","sortable":true},{"name":"Species","required":false,"label":"Species","align":"left","field":"Species","sortable":true},{"name":"Cluster","required":false,"label":"Cluster","align":"left","field":"Cluster","sortable":true}],"data_iris_data":[{"SepalLength":5.1,"PetalWidth":0.2,"SepalWidth":3.5,"PetalLength":1.4,"Species":"setosa","__id":1,"Cluster":2},{"SepalLength":4.9,"PetalWidth":0.2,"SepalWidth":3.0,"PetalLength":1.4,"Species":"setosa","__id":2,"Cluster":2},{"SepalLength":4.7,"PetalWidth":0.2,"SepalWidth":3.2,"PetalLength":1.3,"Species":"setosa","__id":3,"Cluster":2},{"SepalLength":4.6,"PetalWidth":0.2,"SepalWidth":3.1,"PetalLength":1.5,"Species":"setosa","__id":4,"Cluster":2},{"SepalLength":5.0,"PetalWidth":0.2,"SepalWidth":3.6,"PetalLength":1.4,"Species":"setosa","__id":5,"Cluster":2},{"SepalLength":5.4,"PetalWidth":0.4,"SepalWidth":3.9,"PetalLength":1.7,"Species":"setosa","__id":6,"Cluster":2},{"SepalLength":4.6,"PetalWidth":0.3,"SepalWidth":3.4,"PetalLength":1.4,"Species":"setosa","__id":7,"Cluster":2},{"SepalLength":5.0,"PetalWidth":0.2,"SepalWidth":3.4,"PetalLength":1.5,"Species":"setosa","__id":8,"Cluster":2},{"SepalLength":4.4,"PetalWidth":0.2,"SepalWidth":2.9,"PetalLength":1.4,"Species":"setosa","__id":9,"Cluster":2},{"SepalLength":4.9,"PetalWidth":0.1,"SepalWidth":3.1,"PetalLength":1.5,"Species":"setosa","__id":10,"Cluster":2},{"SepalLength":5.4,"PetalWidth":0.2,"SepalWidth":3.7,"PetalLength":1.5,"Species":"setosa","__id":11,"Cluster":2},{"SepalLength":4.8,"PetalWidth":0.2,"SepalWidth":3.4,"PetalLength":1.6,"Species":"setosa","__id":12,"Cluster":2},{"SepalLength":4.8,"PetalWidth":0.1,"SepalWidth":3.0,"PetalLength":1.4,"Species":"setosa","__id":13,"Cluster":2},{"SepalLength":4.3,"PetalWidth":0.1,"SepalWidth":3.0,"PetalLength":1.1,"Species":"setosa","__id":14,"Cluster":2},{"SepalLength":5.8,"PetalWidth":0.2,"SepalWidth":4.0,"PetalLength":1.2,"Species":"setosa","__id":15,"Cluster":2},{"SepalLength":5.7,"PetalWidth":0.4,"SepalWidth":4.4,"PetalLength":1.5,"Species":"setosa","__id":16,"Cluster":2},{"SepalLength":5.4,"PetalWidth":0.4,"SepalWidth":3.9,"PetalLength":1.3,"Species":"setosa","__id":17,"Cluster":2},{"SepalLength":5.1,"PetalWidth":0.3,"SepalWidth":3.5,"PetalLength":1.4,"Species":"setosa","__id":18,"Cluster":2},{"SepalLength":5.7,"PetalWidth":0.3,"SepalWidth":3.8,"PetalLength":1.7,"Species":"setosa","__id":19,"Cluster":2},{"SepalLength":5.1,"PetalWidth":0.3,"SepalWidth":3.8,"PetalLength":1.5,"Species":"setosa","__id":20,"Cluster":2},{"SepalLength":5.4,"PetalWidth":0.2,"SepalWidth":3.4,"PetalLength":1.7,"Species":"setosa","__id":21,"Cluster":2},{"SepalLength":5.1,"PetalWidth":0.4,"SepalWidth":3.7,"PetalLength":1.5,"Species":"setosa","__id":22,"Cluster":2},{"SepalLength":4.6,"PetalWidth":0.2,"SepalWidth":3.6,"PetalLength":1.0,"Species":"setosa","__id":23,"Cluster":2},{"SepalLength":5.1,"PetalWidth":0.5,"SepalWidth":3.3,"PetalLength":1.7,"Species":"setosa","__id":24,"Cluster":2},{"SepalLength":4.8,"PetalWidth":0.2,"SepalWidth":3.4,"PetalLength":1.9,"Species":"setosa","__id":25,"Cluster":2},{"SepalLength":5.0,"PetalWidth":0.2,"SepalWidth":3.0,"PetalLength":1.6,"Species":"setosa","__id":26,"Cluster":2},{"SepalLength":5.0,"PetalWidth":0.4,"SepalWidth":3.4,"PetalLength":1.6,"Species":"setosa","__id":27,"Cluster":2},{"SepalLength":5.2,"PetalWidth":0.2,"SepalWidth":3.5,"PetalLength":1.5,"Species":"setosa","__id":28,"Cluster":2},{"SepalLength":5.2,"PetalWidth":0.2,"SepalWidth":3.4,"PetalLength":1.4,"Species":"setosa","__id":29,"Cluster":2},{"SepalLength":4.7,"PetalWidth":0.2,"SepalWidth":3.2,"PetalLength":1.6,"Species":"setosa","__id":30,"Cluster":2},{"SepalLength":4.8,"PetalWidth":0.2,"SepalWidth":3.1,"PetalLength":1.6,"Species":"setosa","__id":31,"Cluster":2},{"SepalLength":5.4,"PetalWidth":0.4,"SepalWidth":3.4,"PetalLength":1.5,"Species":"setosa","__id":32,"Cluster":2},{"SepalLength":5.2,"PetalWidth":0.1,"SepalWidth":4.1,"PetalLength":1.5,"Species":"setosa","__id":33,"Cluster":2},{"SepalLength":5.5,"PetalWidth":0.2,"SepalWidth":4.2,"PetalLength":1.4,"Species":"setosa","__id":34,"Cluster":2},{"SepalLength":4.9,"PetalWidth":0.2,"SepalWidth":3.1,"PetalLength":1.5,"Species":"setosa","__id":35,"Cluster":2},{"SepalLength":5.0,"PetalWidth":0.2,"SepalWidth":3.2,"PetalLength":1.2,"Species":"setosa","__id":36,"Cluster":2},{"SepalLength":5.5,"PetalWidth":0.2,"SepalWidth":3.5,"PetalLength":1.3,"Species":"setosa","__id":37,"Cluster":2},{"SepalLength":4.9,"PetalWidth":0.1,"SepalWidth":3.6,"PetalLength":1.4,"Species":"setosa","__id":38,"Cluster":2},{"SepalLength":4.4,"PetalWidth":0.2,"SepalWidth":3.0,"PetalLength":1.3,"Species":"setosa","__id":39,"Cluster":2},{"SepalLength":5.1,"PetalWidth":0.2,"SepalWidth":3.4,"PetalLength":1.5,"Species":"setosa","__id":40,"Cluster":2},{"SepalLength":5.0,"PetalWidth":0.3,"SepalWidth":3.5,"PetalLength":1.3,"Species":"setosa","__id":41,"Cluster":2},{"SepalLength":4.5,"PetalWidth":0.3,"SepalWidth":2.3,"PetalLength":1.3,"Species":"setosa","__id":42,"Cluster":2},{"SepalLength":4.4,"PetalWidth":0.2,"SepalWidth":3.2,"PetalLength":1.3,"Species":"setosa","__id":43,"Cluster":2},{"SepalLength":5.0,"PetalWidth":0.6,"SepalWidth":3.5,"PetalLength":1.6,"Species":"setosa","__id":44,"Cluster":2},{"SepalLength":5.1,"PetalWidth":0.4,"SepalWidth":3.8,"PetalLength":1.9,"Species":"setosa","__id":45,"Cluster":2},{"SepalLength":4.8,"PetalWidth":0.3,"SepalWidth":3.0,"PetalLength":1.4,"Species":"setosa","__id":46,"Cluster":2},{"SepalLength":5.1,"PetalWidth":0.2,"SepalWidth":3.8,"PetalLength":1.6,"Species":"setosa","__id":47,"Cluster":2},{"SepalLength":4.6,"PetalWidth":0.2,"SepalWidth":3.2,"PetalLength":1.4,"Species":"setosa","__id":48,"Cluster":2},{"SepalLength":5.3,"PetalWidth":0.2,"SepalWidth":3.7,"PetalLength":1.5,"Species":"setosa","__id":49,"Cluster":2},{"SepalLength":5.0,"PetalWidth":0.2,"SepalWidth":3.3,"PetalLength":1.4,"Species":"setosa","__id":50,"Cluster":2},{"SepalLength":7.0,"PetalWidth":1.4,"SepalWidth":3.2,"PetalLength":4.7,"Species":"versicolor","__id":51,"Cluster":1},{"SepalLength":6.4,"PetalWidth":1.5,"SepalWidth":3.2,"PetalLength":4.5,"Species":"versicolor","__id":52,"Cluster":3},{"SepalLength":6.9,"PetalWidth":1.5,"SepalWidth":3.1,"PetalLength":4.9,"Species":"versicolor","__id":53,"Cluster":1},{"SepalLength":5.5,"PetalWidth":1.3,"SepalWidth":2.3,"PetalLength":4.0,"Species":"versicolor","__id":54,"Cluster":3},{"SepalLength":6.5,"PetalWidth":1.5,"SepalWidth":2.8,"PetalLength":4.6,"Species":"versicolor","__id":55,"Cluster":3},{"SepalLength":5.7,"PetalWidth":1.3,"SepalWidth":2.8,"PetalLength":4.5,"Species":"versicolor","__id":56,"Cluster":3},{"SepalLength":6.3,"PetalWidth":1.6,"SepalWidth":3.3,"PetalLength":4.7,"Species":"versicolor","__id":57,"Cluster":3},{"SepalLength":4.9,"PetalWidth":1.0,"SepalWidth":2.4,"PetalLength":3.3,"Species":"versicolor","__id":58,"Cluster":3},{"SepalLength":6.6,"PetalWidth":1.3,"SepalWidth":2.9,"PetalLength":4.6,"Species":"versicolor","__id":59,"Cluster":3},{"SepalLength":5.2,"PetalWidth":1.4,"SepalWidth":2.7,"PetalLength":3.9,"Species":"versicolor","__id":60,"Cluster":3},{"SepalLength":5.0,"PetalWidth":1.0,"SepalWidth":2.0,"PetalLength":3.5,"Species":"versicolor","__id":61,"Cluster":3},{"SepalLength":5.9,"PetalWidth":1.5,"SepalWidth":3.0,"PetalLength":4.2,"Species":"versicolor","__id":62,"Cluster":3},{"SepalLength":6.0,"PetalWidth":1.0,"SepalWidth":2.2,"PetalLength":4.0,"Species":"versicolor","__id":63,"Cluster":3},{"SepalLength":6.1,"PetalWidth":1.4,"SepalWidth":2.9,"PetalLength":4.7,"Species":"versicolor","__id":64,"Cluster":3},{"SepalLength":5.6,"PetalWidth":1.3,"SepalWidth":2.9,"PetalLength":3.6,"Species":"versicolor","__id":65,"Cluster":3},{"SepalLength":6.7,"PetalWidth":1.4,"SepalWidth":3.1,"PetalLength":4.4,"Species":"versicolor","__id":66,"Cluster":3},{"SepalLength":5.6,"PetalWidth":1.5,"SepalWidth":3.0,"PetalLength":4.5,"Species":"versicolor","__id":67,"Cluster":3},{"SepalLength":5.8,"PetalWidth":1.0,"SepalWidth":2.7,"PetalLength":4.1,"Species":"versicolor","__id":68,"Cluster":3},{"SepalLength":6.2,"PetalWidth":1.5,"SepalWidth":2.2,"PetalLength":4.5,"Species":"versicolor","__id":69,"Cluster":3},{"SepalLength":5.6,"PetalWidth":1.1,"SepalWidth":2.5,"PetalLength":3.9,"Species":"versicolor","__id":70,"Cluster":3},{"SepalLength":5.9,"PetalWidth":1.8,"SepalWidth":3.2,"PetalLength":4.8,"Species":"versicolor","__id":71,"Cluster":3},{"SepalLength":6.1,"PetalWidth":1.3,"SepalWidth":2.8,"PetalLength":4.0,"Species":"versicolor","__id":72,"Cluster":3},{"SepalLength":6.3,"PetalWidth":1.5,"SepalWidth":2.5,"PetalLength":4.9,"Species":"versicolor","__id":73,"Cluster":3},{"SepalLength":6.1,"PetalWidth":1.2,"SepalWidth":2.8,"PetalLength":4.7,"Species":"versicolor","__id":74,"Cluster":3},{"SepalLength":6.4,"PetalWidth":1.3,"SepalWidth":2.9,"PetalLength":4.3,"Species":"versicolor","__id":75,"Cluster":3},{"SepalLength":6.6,"PetalWidth":1.4,"SepalWidth":3.0,"PetalLength":4.4,"Species":"versicolor","__id":76,"Cluster":3},{"SepalLength":6.8,"PetalWidth":1.4,"SepalWidth":2.8,"PetalLength":4.8,"Species":"versicolor","__id":77,"Cluster":3},{"SepalLength":6.7,"PetalWidth":1.7,"SepalWidth":3.0,"PetalLength":5.0,"Species":"versicolor","__id":78,"Cluster":1},{"SepalLength":6.0,"PetalWidth":1.5,"SepalWidth":2.9,"PetalLength":4.5,"Species":"versicolor","__id":79,"Cluster":3},{"SepalLength":5.7,"PetalWidth":1.0,"SepalWidth":2.6,"PetalLength":3.5,"Species":"versicolor","__id":80,"Cluster":3},{"SepalLength":5.5,"PetalWidth":1.1,"SepalWidth":2.4,"PetalLength":3.8,"Species":"versicolor","__id":81,"Cluster":3},{"SepalLength":5.5,"PetalWidth":1.0,"SepalWidth":2.4,"PetalLength":3.7,"Species":"versicolor","__id":82,"Cluster":3},{"SepalLength":5.8,"PetalWidth":1.2,"SepalWidth":2.7,"PetalLength":3.9,"Species":"versicolor","__id":83,"Cluster":3},{"SepalLength":6.0,"PetalWidth":1.6,"SepalWidth":2.7,"PetalLength":5.1,"Species":"versicolor","__id":84,"Cluster":3},{"SepalLength":5.4,"PetalWidth":1.5,"SepalWidth":3.0,"PetalLength":4.5,"Species":"versicolor","__id":85,"Cluster":3},{"SepalLength":6.0,"PetalWidth":1.6,"SepalWidth":3.4,"PetalLength":4.5,"Species":"versicolor","__id":86,"Cluster":3},{"SepalLength":6.7,"PetalWidth":1.5,"SepalWidth":3.1,"PetalLength":4.7,"Species":"versicolor","__id":87,"Cluster":3},{"SepalLength":6.3,"PetalWidth":1.3,"SepalWidth":2.3,"PetalLength":4.4,"Species":"versicolor","__id":88,"Cluster":3},{"SepalLength":5.6,"PetalWidth":1.3,"SepalWidth":3.0,"PetalLength":4.1,"Species":"versicolor","__id":89,"Cluster":3},{"SepalLength":5.5,"PetalWidth":1.3,"SepalWidth":2.5,"PetalLength":4.0,"Species":"versicolor","__id":90,"Cluster":3},{"SepalLength":5.5,"PetalWidth":1.2,"SepalWidth":2.6,"PetalLength":4.4,"Species":"versicolor","__id":91,"Cluster":3},{"SepalLength":6.1,"PetalWidth":1.4,"SepalWidth":3.0,"PetalLength":4.6,"Species":"versicolor","__id":92,"Cluster":3},{"SepalLength":5.8,"PetalWidth":1.2,"SepalWidth":2.6,"PetalLength":4.0,"Species":"versicolor","__id":93,"Cluster":3},{"SepalLength":5.0,"PetalWidth":1.0,"SepalWidth":2.3,"PetalLength":3.3,"Species":"versicolor","__id":94,"Cluster":3},{"SepalLength":5.6,"PetalWidth":1.3,"SepalWidth":2.7,"PetalLength":4.2,"Species":"versicolor","__id":95,"Cluster":3},{"SepalLength":5.7,"PetalWidth":1.2,"SepalWidth":3.0,"PetalLength":4.2,"Species":"versicolor","__id":96,"Cluster":3},{"SepalLength":5.7,"PetalWidth":1.3,"SepalWidth":2.9,"PetalLength":4.2,"Species":"versicolor","__id":97,"Cluster":3},{"SepalLength":6.2,"PetalWidth":1.3,"SepalWidth":2.9,"PetalLength":4.3,"Species":"versicolor","__id":98,"Cluster":3},{"SepalLength":5.1,"PetalWidth":1.1,"SepalWidth":2.5,"PetalLength":3.0,"Species":"versicolor","__id":99,"Cluster":3},{"SepalLength":5.7,"PetalWidth":1.3,"SepalWidth":2.8,"PetalLength":4.1,"Species":"versicolor","__id":100,"Cluster":3},{"SepalLength":6.3,"PetalWidth":2.5,"SepalWidth":3.3,"PetalLength":6.0,"Species":"virginica","__id":101,"Cluster":1},{"SepalLength":5.8,"PetalWidth":1.9,"SepalWidth":2.7,"PetalLength":5.1,"Species":"virginica","__id":102,"Cluster":3},{"SepalLength":7.1,"PetalWidth":2.1,"SepalWidth":3.0,"PetalLength":5.9,"Species":"virginica","__id":103,"Cluster":1},{"SepalLength":6.3,"PetalWidth":1.8,"SepalWidth":2.9,"PetalLength":5.6,"Species":"virginica","__id":104,"Cluster":1},{"SepalLength":6.5,"PetalWidth":2.2,"SepalWidth":3.0,"PetalLength":5.8,"Species":"virginica","__id":105,"Cluster":1},{"SepalLength":7.6,"PetalWidth":2.1,"SepalWidth":3.0,"PetalLength":6.6,"Species":"virginica","__id":106,"Cluster":1},{"SepalLength":4.9,"PetalWidth":1.7,"SepalWidth":2.5,"PetalLength":4.5,"Species":"virginica","__id":107,"Cluster":3},{"SepalLength":7.3,"PetalWidth":1.8,"SepalWidth":2.9,"PetalLength":6.3,"Species":"virginica","__id":108,"Cluster":1},{"SepalLength":6.7,"PetalWidth":1.8,"SepalWidth":2.5,"PetalLength":5.8,"Species":"virginica","__id":109,"Cluster":1},{"SepalLength":7.2,"PetalWidth":2.5,"SepalWidth":3.6,"PetalLength":6.1,"Species":"virginica","__id":110,"Cluster":1},{"SepalLength":6.5,"PetalWidth":2.0,"SepalWidth":3.2,"PetalLength":5.1,"Species":"virginica","__id":111,"Cluster":1},{"SepalLength":6.4,"PetalWidth":1.9,"SepalWidth":2.7,"PetalLength":5.3,"Species":"virginica","__id":112,"Cluster":1},{"SepalLength":6.8,"PetalWidth":2.1,"SepalWidth":3.0,"PetalLength":5.5,"Species":"virginica","__id":113,"Cluster":1},{"SepalLength":5.7,"PetalWidth":2.0,"SepalWidth":2.5,"PetalLength":5.0,"Species":"virginica","__id":114,"Cluster":3},{"SepalLength":5.8,"PetalWidth":2.4,"SepalWidth":2.8,"PetalLength":5.1,"Species":"virginica","__id":115,"Cluster":3},{"SepalLength":6.4,"PetalWidth":2.3,"SepalWidth":3.2,"PetalLength":5.3,"Species":"virginica","__id":116,"Cluster":1},{"SepalLength":6.5,"PetalWidth":1.8,"SepalWidth":3.0,"PetalLength":5.5,"Species":"virginica","__id":117,"Cluster":1},{"SepalLength":7.7,"PetalWidth":2.2,"SepalWidth":3.8,"PetalLength":6.7,"Species":"virginica","__id":118,"Cluster":1},{"SepalLength":7.7,"PetalWidth":2.3,"SepalWidth":2.6,"PetalLength":6.9,"Species":"virginica","__id":119,"Cluster":1},{"SepalLength":6.0,"PetalWidth":1.5,"SepalWidth":2.2,"PetalLength":5.0,"Species":"virginica","__id":120,"Cluster":3},{"SepalLength":6.9,"PetalWidth":2.3,"SepalWidth":3.2,"PetalLength":5.7,"Species":"virginica","__id":121,"Cluster":1},{"SepalLength":5.6,"PetalWidth":2.0,"SepalWidth":2.8,"PetalLength":4.9,"Species":"virginica","__id":122,"Cluster":3},{"SepalLength":7.7,"PetalWidth":2.0,"SepalWidth":2.8,"PetalLength":6.7,"Species":"virginica","__id":123,"Cluster":1},{"SepalLength":6.3,"PetalWidth":1.8,"SepalWidth":2.7,"PetalLength":4.9,"Species":"virginica","__id":124,"Cluster":3},{"SepalLength":6.7,"PetalWidth":2.1,"SepalWidth":3.3,"PetalLength":5.7,"Species":"virginica","__id":125,"Cluster":1},{"SepalLength":7.2,"PetalWidth":1.8,"SepalWidth":3.2,"PetalLength":6.0,"Species":"virginica","__id":126,"Cluster":1},{"SepalLength":6.2,"PetalWidth":1.8,"SepalWidth":2.8,"PetalLength":4.8,"Species":"virginica","__id":127,"Cluster":3},{"SepalLength":6.1,"PetalWidth":1.8,"SepalWidth":3.0,"PetalLength":4.9,"Species":"virginica","__id":128,"Cluster":3},{"SepalLength":6.4,"PetalWidth":2.1,"SepalWidth":2.8,"PetalLength":5.6,"Species":"virginica","__id":129,"Cluster":1},{"SepalLength":7.2,"PetalWidth":1.6,"SepalWidth":3.0,"PetalLength":5.8,"Species":"virginica","__id":130,"Cluster":1},{"SepalLength":7.4,"PetalWidth":1.9,"SepalWidth":2.8,"PetalLength":6.1,"Species":"virginica","__id":131,"Cluster":1},{"SepalLength":7.9,"PetalWidth":2.0,"SepalWidth":3.8,"PetalLength":6.4,"Species":"virginica","__id":132,"Cluster":1},{"SepalLength":6.4,"PetalWidth":2.2,"SepalWidth":2.8,"PetalLength":5.6,"Species":"virginica","__id":133,"Cluster":1},{"SepalLength":6.3,"PetalWidth":1.5,"SepalWidth":2.8,"PetalLength":5.1,"Species":"virginica","__id":134,"Cluster":3},{"SepalLength":6.1,"PetalWidth":1.4,"SepalWidth":2.6,"PetalLength":5.6,"Species":"virginica","__id":135,"Cluster":1},{"SepalLength":7.7,"PetalWidth":2.3,"SepalWidth":3.0,"PetalLength":6.1,"Species":"virginica","__id":136,"Cluster":1},{"SepalLength":6.3,"PetalWidth":2.4,"SepalWidth":3.4,"PetalLength":5.6,"Species":"virginica","__id":137,"Cluster":1},{"SepalLength":6.4,"PetalWidth":1.8,"SepalWidth":3.1,"PetalLength":5.5,"Species":"virginica","__id":138,"Cluster":1},{"SepalLength":6.0,"PetalWidth":1.8,"SepalWidth":3.0,"PetalLength":4.8,"Species":"virginica","__id":139,"Cluster":3},{"SepalLength":6.9,"PetalWidth":2.1,"SepalWidth":3.1,"PetalLength":5.4,"Species":"virginica","__id":140,"Cluster":1},{"SepalLength":6.7,"PetalWidth":2.4,"SepalWidth":3.1,"PetalLength":5.6,"Species":"virginica","__id":141,"Cluster":1},{"SepalLength":6.9,"PetalWidth":2.3,"SepalWidth":3.1,"PetalLength":5.1,"Species":"virginica","__id":142,"Cluster":1},{"SepalLength":5.8,"PetalWidth":1.9,"SepalWidth":2.7,"PetalLength":5.1,"Species":"virginica","__id":143,"Cluster":3},{"SepalLength":6.8,"PetalWidth":2.3,"SepalWidth":3.2,"PetalLength":5.9,"Species":"virginica","__id":144,"Cluster":1},{"SepalLength":6.7,"PetalWidth":2.5,"SepalWidth":3.3,"PetalLength":5.7,"Species":"virginica","__id":145,"Cluster":1},{"SepalLength":6.7,"PetalWidth":2.3,"SepalWidth":3.0,"PetalLength":5.2,"Species":"virginica","__id":146,"Cluster":1},{"SepalLength":6.3,"PetalWidth":1.9,"SepalWidth":2.5,"PetalLength":5.0,"Species":"virginica","__id":147,"Cluster":3},{"SepalLength":6.5,"PetalWidth":2.0,"SepalWidth":3.0,"PetalLength":5.2,"Species":"virginica","__id":148,"Cluster":1},{"SepalLength":6.2,"PetalWidth":2.3,"SepalWidth":3.4,"PetalLength":5.4,"Species":"virginica","__id":149,"Cluster":1},{"SepalLength":5.9,"PetalWidth":1.8,"SepalWidth":3.0,"PetalLength":5.1,"Species":"virginica","__id":150,"Cluster":3}]},"cluster_plot_data":[],"no_of_clusters":3,"isready":false,"isprocessing":false,"layout":{"plot_bgcolor":"#fff"},"iris_plot_data":[],"isreadydelay":500,"yfeature":"","features":["SepalLength","SepalWidth","PetalLength","PetalWidth"],"xfeature":"","no_of_iterations":10,"credit_data_pagination":{"rowsPerPage":50,"page":1,"descending":false,"sortBy":"desc"}}});
  IrisModel.$watch(function(){return this.iris_data}, _.debounce(function(newVal, oldVal){
Genie.WebChannels.sendMessageTo(CHANNEL, 'watchers', {'payload': {'field':'iris_data', 'newval': newVal, 'oldval': oldVal}});
}, 300), {deep: true});


IrisModel.$watch(function(){return this.credit_data_pagination}, _.debounce(function(newVal, oldVal){
  Genie.WebChannels.sendMessageTo(CHANNEL, 'watchers', {'payload': {'field':'credit_data_pagination', 'newval': newVal, 'oldval': oldVal}});
}, 300), {deep: true});


IrisModel.$watch(function(){return this.features}, _.debounce(function(newVal, oldVal){
  Genie.WebChannels.sendMessageTo(CHANNEL, 'watchers', {'payload': {'field':'features', 'newval': newVal, 'oldval': oldVal}});
}, 300), {deep: true});


IrisModel.$watch(function(){return this.xfeature}, _.debounce(function(newVal, oldVal){
  Genie.WebChannels.sendMessageTo(CHANNEL, 'watchers', {'payload': {'field':'xfeature', 'newval': newVal, 'oldval': oldVal}});
}, 300), {deep: true});


IrisModel.$watch(function(){return this.yfeature}, _.debounce(function(newVal, oldVal){
  Genie.WebChannels.sendMessageTo(CHANNEL, 'watchers', {'payload': {'field':'yfeature', 'newval': newVal, 'oldval': oldVal}});
}, 300), {deep: true});


IrisModel.$watch(function(){return this.iris_plot_data}, _.debounce(function(newVal, oldVal){
  Genie.WebChannels.sendMessageTo(CHANNEL, 'watchers', {'payload': {'field':'iris_plot_data', 'newval': newVal, 'oldval': oldVal}});
}, 300), {deep: true});


IrisModel.$watch(function(){return this.cluster_plot_data}, _.debounce(function(newVal, oldVal){
  Genie.WebChannels.sendMessageTo(CHANNEL, 'watchers', {'payload': {'field':'cluster_plot_data', 'newval': newVal, 'oldval': oldVal}});
}, 300), {deep: true});


IrisModel.$watch(function(){return this.layout}, _.debounce(function(newVal, oldVal){
  Genie.WebChannels.sendMessageTo(CHANNEL, 'watchers', {'payload': {'field':'layout', 'newval': newVal, 'oldval': oldVal}});
}, 300), {deep: true});


IrisModel.$watch(function(){return this.no_of_clusters}, _.debounce(function(newVal, oldVal){
  Genie.WebChannels.sendMessageTo(CHANNEL, 'watchers', {'payload': {'field':'no_of_clusters', 'newval': newVal, 'oldval': oldVal}});
}, 300), {deep: true});


IrisModel.$watch(function(){return this.no_of_iterations}, _.debounce(function(newVal, oldVal){
  Genie.WebChannels.sendMessageTo(CHANNEL, 'watchers', {'payload': {'field':'no_of_iterations', 'newval': newVal, 'oldval': oldVal}});
}, 300), {deep: true});


IrisModel.$watch(function(){return this.isready}, _.debounce(function(newVal, oldVal){
  Genie.WebChannels.sendMessageTo(CHANNEL, 'watchers', {'payload': {'field':'isready', 'newval': newVal, 'oldval': oldVal}});
}, 300), {deep: true});


IrisModel.$watch(function(){return this.isreadydelay}, _.debounce(function(newVal, oldVal){
  Genie.WebChannels.sendMessageTo(CHANNEL, 'watchers', {'payload': {'field':'isreadydelay', 'newval': newVal, 'oldval': oldVal}});
}, 300), {deep: true});


IrisModel.$watch(function(){return this.isprocessing}, _.debounce(function(newVal, oldVal){
  Genie.WebChannels.sendMessageTo(CHANNEL, 'watchers', {'payload': {'field':'isprocessing', 'newval': newVal, 'oldval': oldVal}});
}, 300), {deep: true});

}

window.parse_payload = function(payload){
if (payload.key) {
  window.IrisModel.revive_payload(payload)
  window.IrisModel.updateField(payload.key, payload.value);
}
}

function app_ready() {
if (
  (canvasDocument.readyState === 'complete' || canvasDocument.readyState === 'interactive')
    && (Genie.WebChannels.socket.readyState === 1)
  ) {

  if (Genie.Settings.env == 'dev') {
    console.info('Waiting ' + IrisModel.isreadydelay + 'ms');
  }

  setTimeout(function(){
    IrisModel.isready = true;
    if (Genie.Settings.env == 'dev') {
      console.info('App ready');
    }
  }, IrisModel.isreadydelay); // let's give it a bit to process server side events

  
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

/* window.onload = function() {
if (Genie.Settings.env == 'dev') {
console.info('Loading completed');
}
app_ready();
}
*/