window.addEventListener("load",function() {
  var Q = window.Q = Quintus({development: true})
    .include("Scenes, Sprites, 2D, Input, Touch, UI, TMX, Audio") // Touch engine untuk tablet
    .include("ActionPlatformerPlayer, ActionPlatformerEnemy")
    .setup({
      width: 320,   //to fit devices with a screne resolution of 1280 x 720
      height: 180,
      //width: 960,
      //height: 640,
      development: true, 
      scaleToFit: true
      //scaleToFit: false
    }).controls().touch();

    Q.enableSound();
    Q.setImageSmoothing(false); // gambar di scale

    Q.scene("level",function(stage) { // what will be shown
      var player;
      var levelLayer; 

      Q.stageTMX("level1.tmx",stage); 
      player = Q("Player").first();
              
      stage.add("viewport").follow(player,{x: true, y: true});
    
    });

    Q.scene("endGame",function(stage) {
        alert("game over");
        window.location = "";
    });

    Q.scene("winGame",function(stage) {
        alert("You Won");
        window.location = "";
    });

    Q.scene("gameStats", function(stage) {
        var statsContainer = stage.insert(new Q.UI.Container({
            fill: "gray",
            x: 320/2,
            y: 180,
            border: 1,
            shadow: 3,
            shadowColor: "rgba(0,0,0,0.5)",
            w: 320,
            h: 40
            })
        );
            
        var lives = stage.insert(new Q.UI.Text({ 
                label: "Lives x 1",
                color: "white",
                x: -125,
                y: -17
            }),statsContainer);
        
        var coins = stage.insert(new Q.UI.Text({ 
                label: "Score x 0",
                color: "white",
                x: -50,
                y: -17
            }),statsContainer);

        var timer = stage.insert(new Q.UI.Text({ 
                label: "00:00:00",
                color: "white",
                x: 125,
                y: -17
            }),statsContainer);
            
         
    });

    //load assets
    Q.loadTMX("level1.tmx, sprites.json, sprites.png, kill-enemy.mp3, jump.mp3, coin.mp3", function() {       
      Q.compileSheets("sprites.png","sprites.json");     
      Q.stageScene("level");
      Q.stageScene("gameStats",1);
    });
    
});
        
        
        
        
        
        