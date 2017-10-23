var ColumnChart = function(title, data, categories) {
  debugger;
  var container = document.getElementById("#column-chart");

  var chart = new Highcharts.Chart(container, {
    chart: {
      type: "column",
      // renderTo: container
    },

    title: {
      text: title
    },

    series: [data],
      xAxis: {
        categories: categories
      },
  });
}
