// Layers
    var layers = [ new ol.layer.Tile(
      { source: new ol.source.OSM()
      })];
    // The map
    var map=new ol.Map
      ({  target: 'map',
        view: new ol.View
        ({  zoom: 4,
          center: [166326, 5992663]
        }),
        layers: layers
      });
    // Addfeatures to the cluster
    function addFeatures(nb)
    { var ext = map.getView().calculateExtent(map.getSize());
      var features=[];
      for (var i=0; i<nb; ++i)
      { features[i]=new ol.Feature(new ol.geom.Point([ext[0]+(ext[2]-ext[0])*Math.random(), ext[1]+(ext[3]-ext[1])*Math.random()]));
        features[i].set('id',i);
      }
      clusterSource.getSource().clear();
      clusterSource.getSource().addFeatures(features);
    }
    // Style for the clusters
    var styleCache = {};
    function getStyle (feature, resolution)
    { var size = feature.get('features').length;
      var style = styleCache[size];
      if (!style)
      { var color = size>25 ? "192,0,0" : size>8 ? "255,128,0" : "0,128,0";
        var radius = Math.max(8, Math.min(size*0.75, 20));
        var dash = 2*Math.PI*radius/6;
        var dash = [ 0, dash, dash, dash, dash, dash, dash ];
        style = styleCache[size] = new ol.style.Style(
          { image: new ol.style.Circle(
            { radius: radius,
              stroke: new ol.style.Stroke(
              { color: "rgba("+color+",0.5)",
                width: 15 ,
                lineDash: dash,
                lineCap: "butt"
              }),
              fill: new ol.style.Fill(
              { color:"rgba("+color+",1)"
              })
            }),
            text: new ol.style.Text(
            { text: size.toString(),
              fill: new ol.style.Fill(
              { color: '#fff'
              })
            })
          });
      }
      return [style];
    }
    // Cluster Source
    var clusterSource=new ol.source.Cluster({
      distance: 40,
      source: new ol.source.Vector()
    });
    // Animated cluster layer
    var clusterLayer = new ol.layer.AnimatedCluster(
    { name: 'Cluster',
      source: clusterSource,
      animationDuration: $("#animatecluster").prop('checked') ? 700:0,
      // Cluster style
      style: getStyle
    });
    map.addLayer(clusterLayer);
    // add 2000 features
    addFeatures(100);
    // Style for selection
    var img = new ol.style.Circle(
      { radius: 5,
        stroke: new ol.style.Stroke(
        { color:"rgba(0,255,255,1)",
          width:1
        }),
        fill: new ol.style.Fill(
        { color:"rgba(0,255,255,0.3)"
        })
      });
    var style1 = new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
        anchor: [0.5, 66],anchorXUnits: 'fraction',anchorYUnits: 'pixels',
        opacity: 0.85,src: 'https://img.icons8.com/flat_round/64/000000/home.png',scale: 0.3
      }));
      var style2 = new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
        anchor: [0.5, 66],anchorXUnits: 'fraction',anchorYUnits: 'pixels',
        opacity: 0.85,src: 'https://img.icons8.com/color/48/000000/summer.png',scale: 0.3
      }));
      function myStyleFunction(feature) {
        let props = feature.getProperties();
        if (props.id>50) {
          console.log(props.id);
          return new ol.style.Style({image: style1,stroke: new ol.style.Stroke({ color:"#fff", width:1 }) });
        } else {
          console.log(props.id);
          return new ol.style.Style({image: style2,stroke: new ol.style.Stroke({ color:"#fff", width:1 }) });
        }
      };
    var selectCluster = new ol.interaction.SelectCluster({
        pointRadius:15,animationDuration:1000,animation:true,maxObjects:6,
        // Feature style when it springs apart
        featureStyle: function(f,res){
          return myStyleFunction(f)
        },
        style: function(f,res){
          var cluster = f.get('features');
          if (cluster.length>1) {
            var s = getStyle(f,res);
            if ($("#convexhull").prop("checked") && ol.coordinate.convexHull){
              var coords = [];
              for (this.i=0; this.i<cluster.length; this.i++) coords.push(cluster[this.i].getGeometry().getFirstCoordinate());
              var chull = ol.coordinate.convexHull(coords);
              s.push ( new ol.style.Style({
                stroke: new ol.style.Stroke({ color: "rgba(0,0,192,0.5)", width:2 }),
                fill: new ol.style.Fill({ color: "rgba(0,0,192,0.3)" }),
                geometry: new ol.geom.Polygon([chull]),
                zIndex: 1
              }));
            }
            return s;
          }
          else {
            return [
              new ol.style.Style({
                image: new ol.style.Circle ({
                  stroke: new ol.style.Stroke({ color: "rgba(0,0,192,0.5)", width:2 }),
                  fill: new ol.style.Fill({ color: "rgba(0,0,192,0.3)" }),
                  radius:5
                })
              })
            ];
          }
        }
      });
    map.addInteraction(selectCluster);
    // On selected => get feature in cluster and show info
    selectCluster.getFeatures().on(['add'], function (e)
    { var c = e.element.get('features');
      if (c.length==1)
      { var feature = c[0];
        $(".infos").html("One feature selected...<br/>(id="+feature.get('id')+")");
      }
      else
      { $(".infos").text("Cluster ("+c.length+" features)");
      }
    })
    selectCluster.getFeatures().on(['remove'], function (e)
    { $(".infos").html("");
    })