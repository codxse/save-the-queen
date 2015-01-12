Quintus.ActionPlatformerPlayer = function(Q) {

  Q.Sprite.extend("Player",{
    init: function(p) {
      this._super(p, {
        sheet: "player",
        jumpSpeed: -300,
        speed: 100,
        isJumping: false,
        lives: 9999,
        coins: 0
      });
      this.add("2d, platformerControls");         
      var that = this;
     
      this.on("jump", function(){
        if(!that.p.isJumping && that.p.vy < 0) {
          that.p.isJumping = true;
          Q.audio.play("jump.mp3");
        }            
      });

      this.on("hit.sprite",function(collision) {
          if(collision.obj.isA("Balok")) {
              collision.obj.destroy();
              this.p.coins++;
              var coinsLabel = Q("UI.Text",1).items[1];
              coinsLabel.p.label = 'Score x '+this.p.coins;
              Q.audio.play("coin.mp3");
              
          }
      });   

      this.on("hit.sprite",function(collision) {
          if(collision.obj.isA("Energy")) {
              collision.obj.destroy();
              //this.p.lives++;
              //var livesLabel = Q("UI.Text",1).first();
              //livesLabel.p.label = "Lives x "+this.p.lives;
              Q.audio.play("coin.mp3");
              
          }
      });     

      this.on("bump.bottom", function(){
        that.p.isJumping = false;
      });
    },
    step: function(dt) {
        if(Q.inputs["left"] && this.p.direction == "right") {
            this.p.flip = "x";
        } 
        if(Q.inputs["right"]  && this.p.direction == "left") {
            this.p.flip = false;                    
        }
        
        if(this.p.timeInvincible > 0) {
            this.p.timeInvincible = Math.max(this.p.timeInvincible - dt, 0);
        }
    },
    damage: function() {
      if(!this.p.timeInvincible) {
          this.p.lives--;
          
          //will be invincible for 1 second
          this.p.timeInvincible = 1;
          

          /*
          if(this.p.lives<0) {
              this.destroy();
              Q.stageScene("endGame",1, { label: "Game Over" }); 
          }
          else {
              //@TODO (yes, to you, who is reading now!) add an animation to show it"s been damaged
              var livesLabel = Q("UI.Text",1).first();
              livesLabel.p.label = "Lives x "+this.p.lives;
          }
          */
          
          Q.audio.play("jump.mp3");
      }      
      //Q.stageScene("level");    
    }

  });

  Q.Sprite.extend("Ratu",{
    init: function(p) {
      this._super(p, {
        sheet: "yellow-alien"
        //jumpSpeed: -300,
        //speed: 100,
        //isJumping: false,
        //lives: 2,
        //coins: 0
      });
      this._super(p, {vx: -50, defaultDirection: "left"});
      this.add("2d, aiBounce");         
      var that = this;

      this.on("hit.sprite",function(collision) {
          if(collision.obj.isA("Player")) {
              Q.stageScene("winGame",1, { label: "win" });            
          }
      });      

      /*
      this.on("bump.bottom", function(){
        that.p.isJumping = false;
      });
      */
    },
    step: function(dt) {
      //make the enemy walk to one side and the other on a platform, otherwise they fall
      var dirX = this.p.vx/Math.abs(this.p.vx);
      var ground = Q.stage().locate(this.p.x, this.p.y + this.p.h/2 + 1, Q.SPRITE_DEFAULT);
      var nextElement = Q.stage().locate(this.p.x + dirX * this.p.w/2 + dirX, this.p.y + this.p.h/2 + 1, Q.SPRITE_DEFAULT);
      var nextTile;

      if(nextElement instanceof Q.TileLayer) {
        nextTile = true;
      }

      //if we are on ground and there is a cliff
      if(!nextTile && ground) {
        if(this.p.vx > 0) {
          if(this.p.defaultDirection == "right") {
            this.p.flip = "x";
          }
          else {
            this.p.flip = false;
          }
        }
        else {
          if(this.p.defaultDirection == "left") {
            this.p.flip = "x";
          }
          else {
            this.p.flip = false;
          }
        }
        this.p.vx = -this.p.vx;
      }
    }
  });
 
};