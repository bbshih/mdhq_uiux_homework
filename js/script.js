// d3.csv("homework_dataset.csv", function(data) {
//     // the columns you'd like to display
//     var columns = ["Date", "Referrer Category", "Referrers", "Clickthroughs"];

//     var table = d3.select("#container").append("table"),
//         thead = table.append("thead"),
//         tbody = table.append("tbody");

//     table.attr("class", "yui3-table yui3-table-bordered");

//     // append the header row
//     thead.append("tr")
//         .selectAll("th")
//         .data(columns)
//         .enter()
//         .append("th")
//             .text(function(column) { return column; })
//             .attr("class", "sort");

//     // create a row for each object in the data
//     var rows = tbody.selectAll("tr")
//         .data(data)
//         .enter()
//         .append("tr");

//     // create a cell in each row for each column
//     var cells = rows.selectAll("td")
//         .data(function(row) {
//             return columns.map(function(column) {
//                 return {column: column, value: row[column]};
//             });
//         })
//         .enter()
//         .append("td")
//             .text(function(d) { return d.value; });
// });
