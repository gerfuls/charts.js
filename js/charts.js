// Generated by CoffeeScript 1.3.3
(function() {
  var $, exampleChartData, methods;

  $ = jQuery;

  exampleChartData = 0;

  methods = {
    init: function(allOptions) {
      var data;
      data = this.data('chart');
      if (!data) {
        this.data('chart', {
          url: allOptions.url,
          chartType: allOptions.chartType,
          options: allOptions.options,
          columnTitles: allOptions.columnTitles,
          target: this,
          chartData: new google.visualization.DataTable(),
          jsonData: allOptions.jsonData,
          chartDrawn: false
        });
      }
      return methods.update.apply(this, arguments);
    },
    update: function() {
      var objectData;
      objectData = this.data('chart');
      if (objectData.url === void 0) {
        return methods.parse.apply(objectData, arguments);
      } else {
        return $.getJSON(objectData.url, function(data) {
          objectData.jsonData = data;
          return methods.parse.apply(objectData, arguments);
        });
      }
    },
    parse: function() {
      if (!(this.columnTitles === void 0)) {
        this.jsonData.splice(0, 0, this.columnTitles);
      }
      this.chartData = google.visualization.arrayToDataTable(this.jsonData);
      return methods.draw.apply(this, arguments);
    },
    draw: function() {
      var allDefaults, barDefaults, lineDefaults, pieDefaults;
      allDefaults = {
        width: 500,
        height: 300,
        animation: {
          duration: 2000,
          easing: 'inAndOut'
        }
      };
      if (this.chartType === 'bar') {
        barDefaults = {
          legend: 'none',
          hAxis: {
            minValue: 0
          }
        };
        barDefaults = $.extend(allDefaults, barDefaults);
        this.options = $.extend(barDefaults, this.options);
        this.chart = new google.visualization.BarChart(this.target.get(0));
      } else if (this.chartType === 'line') {
        lineDefaults = lineDefaults = $.extend(allDefaults, lineDefaults);
        this.options = $.extend(lineDefaults, this.options);
        this.chart = new google.visualization.LineChart(this.target.get(0));
      } else if (this.chartType === 'pie') {
        pieDefaults = {};
        pieDefaults = $.extend(allDefaults, pieDefaults);
        this.options = $.extend(pieDefaults, this.options);
        this.chart = new google.visualization.PieChart(this.target.get(0));
      }
      this.chart.draw(this.chartData, this.options);
      return this.chartDrawn = true;
    }
  };

  $.fn.chart = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      return $.error('Method ' + method + ' does not exist on jQuery.chart');
    }
  };

}).call(this);
