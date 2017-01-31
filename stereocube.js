// Add stereo components
// based on https://github.com/oscarmarinmiro/aframe-stereo-component/blob/master/index.js
// and https://github.com/wallabyway/aframe-stereocube

  AFRAME.registerComponent('stereocam', {
    schema: {
      eye: { type: 'string', default: "left"}
    },

    init: function(){
      this.layer_changed = false;
    },

    tick: function(time){
      var originalData = this.data;
      if(!this.layer_changed){
        var childrenTypes = [];
        this.el.object3D.children.forEach( function(item, index, array) {
          childrenTypes[index] = item.type;
        });
        var rootIndex = childrenTypes.indexOf("PerspectiveCamera");
        var rootCam = this.el.object3D.children[rootIndex];
        rootCam.layers.enable(originalData.eye === 'left' ? 1:2);
      }
    }
  });


// Add sky (stereo cubemap support)

  AFRAME.registerComponent('skycube', {

    schema: {
      folder: { type: "string" },
      eye: { type: 'string', default: "left"}
    },

    update: function() {
      var loader = new THREE.CubeTextureLoader();
      if(this.data.eye === 'left'){
      var urls = [ "L-0.jpg","L-1.jpg","L-2.jpg","L-3.jpg","L-4.jpg","L-5.jpg"];
      }
      else
      {
      var urls = [ "R-0.jpg","R-1.jpg","R-2.jpg","R-3.jpg","R-4.jpg","R-5.jpg"];
      }
      var materialArray = [];
      for (var i = 0; i < 6; i++) {
        materialArray.push( new THREE.MeshBasicMaterial({
          map: (new THREE.TextureLoader).load( this.data.folder+"/" + urls[i] ),
          depthWrite: false
        }));
      }
      var material = new THREE.MeshFaceMaterial(materialArray);
      var skyboxGeometry = new THREE.BoxGeometry(1000,1000,1000);
//      skyboxGeometry.applyMatrix( new THREE.Matrix4().makeScale( 1, 1, -1 ) );
      var mesh = new THREE.Mesh(skyboxGeometry,material);
      mesh.layers.set( this.data.eye === 'left' ? 1:2 );
      this.el.setObject3D('mesh', mesh);
      this.materials = material;
    }
  });
