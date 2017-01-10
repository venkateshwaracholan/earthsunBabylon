// Get the canvas element from our HTML above
  var canvas = document.getElementById("renderCanvas");
  //var canvas = $("#renderCanvas").get(0);
  // Load the BABYLON 3D engine
  var engine = new BABYLON.Engine(canvas, true);

    // This begins the creation of a function that we will 'call' just after it's built
var createScene = function () {
    var scene = new BABYLON.Scene(engine);

    // Light
    var spot1 = new BABYLON.PointLight("spot2", new BABYLON.Vector3(0, 10, 10), scene);
    spot1.diffuse = new BABYLON.Color3(1, 1, 1);
    spot1.specular = new BABYLON.Color3(0, 0, 0);


    var spot2 = new BABYLON.PointLight("spot2", new BABYLON.Vector3(0, 10, 10), scene);
    spot2.diffuse = new BABYLON.Color3(1, 1, 1);
    spot2.specular = new BABYLON.Color3(0, 0, 0);

    // Camera

    var camera2 = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    //camera.setTarget(BABYLON.Vector3.Zero());
    //camera.lowerBetaLimit = 0.1;
    //camera.upperBetaLimit = (Math.PI / 2) * 0.9;
    //camera.lowerRadiusLimit = 30;
    //camera.upperRadiusLimit = 150;
    //camera.attachControl(canvas, true);

    // Ground
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture('https://upload.wikimedia.org/wikipedia/commons/8/8f/Whole_world_-_land_and_oceans_12000.jpg', scene);

    // groundMaterial.bumpTexture = new BABYLON.Texture('http://localhost:8000/a/AA.jpg', scene);

    //var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "a/world2.png", 200, 100, 250, 0, 2, scene, false);
    //ground
    //ground.material = groundMaterial;

    var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 20, scene);

    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;
    //sphere.scaling.x = -1;
    sphere.rotation.x = Math.PI;
    sphere.material = groundMaterial;

    //var camera2 = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 15, -45), scene);
    
    camera2.attachControl(canvas, true);

    //Sphere to see the light's position
    var sun = BABYLON.Mesh.CreateSphere("sun", 10, 4, scene);
    sun.material = new BABYLON.StandardMaterial("sun", scene);
    sun.material.emissiveColor = new BABYLON.Color3(1, 1, 0);
    sun.position.z = -25;

    var sun2 = BABYLON.Mesh.CreateSphere("sun2", 10, 4, scene);
    sun2.material = new BABYLON.StandardMaterial("sun2", scene);
    sun2.material.emissiveColor = new BABYLON.Color3(1, 1, 0);
    spot2.position.y = 0;
    spot1.position.y = 0;
    var r = 25;
    var theta = 0;


    camera2.position.z = -50;
    //camera2.rotation.y = (Math.PI*3)/36;
    camera2.target = sun2;
    // Skybox
    //var skybox = BABYLON.Mesh.CreateBox("skyBox", 800.0, scene);
    //var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    //skyboxMaterial.backFaceCulling = false;
    //skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("a/skybox", scene);
    //skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    //skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    //skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    //skyboxMaterial.disableLighting = true;
    //skybox.material = skyboxMaterial;

    //Sun animation
    /*scene.registerBeforeRender(function () {
        sun.position = spot.position;
        spot.position.x -= 0.5;
        if (spot.position.x < -90)
            spot.position.x = 100;
    });*/



    

    scene.registerBeforeRender(function () {
        sun2.position = spot2.position;
        spot2.position.x = r* Math.sin(theta);
        spot2.position.z = r* Math.cos(theta);

        sun.position = spot1.position;
        spot1.position.x = r* Math.sin(theta + Math.PI);
        spot1.position.z = r* Math.cos(theta + Math.PI);
        //camera2.position = spot2.position;
        //camera2.rotation.y = (theta + Math.PI);
        theta=theta+0.01;

        if (theta >= 360)
        {
           theta=0;
        }
    });

    return scene;
}

  var scene = createScene();

  engine.runRenderLoop(function () {
    scene.render();
    //console.log(engine.getFps());
  });

  window.addEventListener("resize", function () {
    engine.resize();
  });






