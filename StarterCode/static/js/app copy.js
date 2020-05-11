


function MakeBubbleChart(inputData){
    d3.json("http://127.0.0.1:8080/samples.json").then((data)=>{
        var samples=data.samples;
        var r=samples.filter(dictObj => dictObj.id == inputData)[0];
        var sample_values =r.sample_values;
        var otu_ids = r.otu_ids;
        var otu_labels = r.otu_labels;
        
        //for a bar chart we need to have our x and y values defined in order to construct the chart
        //for the chart as dsplayed in the instructions, our x axis will be sample_values
        //our y axis will be otu_ids
        //our hover text over the bars will be the otu_labels
        //NOTE: the directions want the top 10 otu_ids' to be displayed only
        var ids=otu_ids.sort().reverse().slice(0,10);
        var values = sample_values.sort().reverse().slice(0,10);
        var labels = otu_labels.sort().reverse().slice(0,10);
        var trace={
            x:ids,
            y:values,
            text: labels,
            mode: 'markers',
            marker: {
                size: values,
                color: ids,
                colorscale: "Earth"
            },
            type: 'bubble'
        }   
        console.log(trace);
        var layout={
            title: "Bubbles showing things",
            hovermode: "closest",
            xaxis: {title:"OUT-ID"},
            showlegend: true
        }
        
            Plotly.newPlot("bubble",trace,layout );
    })
   
}

function MakeHorizontalBarChart(inputData){
    d3.json("http://127.0.0.1:8080/samples.json").then((data)=>{
        var samples=data.samples;
        var r=samples.filter(dictObj => dictObj.id == inputData)[0];
        var sample_values =r.sample_values;
        var otu_ids = r.otu_ids;
        var otu_labels = r.otu_labels;
        
        //for a bar chart we need to have our x and y values defined in order to construct the chart
        //for the chart as dsplayed in the instructions, our x axis will be sample_values
        //our y axis will be otu_ids
        //our hover text over the bars will be the otu_labels
        //NOTE: the directions want the top 10 otu_ids' to be displayed only
        var y_axis=otu_ids.slice(0,10).reverse();
        var x_axis = sample_values.slice(0,10).reverse();
        var char_txt = otu_labels.slice(0,10).reverse();
        var chart_type="bar";
        var chart_orientation = "h"
        var layout_design={
            title: "Top 10 features that should have been plotted on reversed axes",
            margin: {l: 200, t:200}
        };
        var layout_structure=[{
            y:y_axis,
            x:x_axis,
            text:char_txt,
            type: chart_type,
            orientation: chart_orientation,
        }];
        Plotly.newPlot("bar",layout_structure,layout_design );
    })
}

function BuildFirstChart(){
    d3.json("http://127.0.0.1:8080/samples.json").then((data =>{
        var names = data.names;
        var metadata=data.metadata;
        var samples=data.samples;
        names.forEach((id)=>{
            d3.select("#datachart").append("option").text(id).property("value",id);
        });
        var s1 = names[0];
        MakeHorizontalBarChart(s1);
        MakeBubbleChart(s1);
    }));
}

function OnLoad(){
    var sel = d3.select("#selDataset");
    d3.json("http://127.0.0.1:8080/samples.json").then((data)=>{
        var names = data.names;
        names.forEach((name)=>{
            sel.append("option").property("val",name).text(name);
        });
    })
    BuildFirstChart();
}

function optionChanged(sample){
    MakeHorizontalBarChart(sample)
;}


OnLoad();
