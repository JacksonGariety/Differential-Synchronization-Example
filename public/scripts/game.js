// Generated by CoffeeScript 1.6.2
window.Game = (function() {
  function Game(canvasId) {
    var handleLoad, resizeCanvas,
      _this = this;

    this.stage = new createjs.Stage(canvasId);
    console.log("Started the game");
    this.world = new createjs.Container();
    this.stage.addChild(this.world);
    handleLoad = function(e) {
      var instance;

      instance = createjs.Sound.play("ragevalley");
      return instance.setVolume(0.25);
    };
    createjs.Sound.addEventListener("fileload", handleLoad);
    createjs.Sound.registerSound("music/sleaze.m4a", "ragevalley");
    this.players = [];
    this.bullets = [];
    this.enemies = [];
    this.drops = [];
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", function() {
      var bullet, enemy, _i, _j, _len, _len1, _ref, _ref1;

      Player.move();
      _ref = _this.bullets;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        bullet = _ref[_i];
        Bullet.move(bullet);
      }
      _ref1 = _this.enemies;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        enemy = _ref1[_j];
        Enemy.move(enemy);
      }
      return _this.stage.update();
    });
    resizeCanvas = function() {
      _this.stage.canvas.width = window.innerWidth;
      _this.stage.canvas.height = window.innerHeight;
      if (_this.players[0]) {
        _this.players[0].bitmap.x = window.innerWidth / 2;
        _this.players[0].bitmap.y = window.innerHeight / 2;
      }
      return _this.stage.update();
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    document.onmousemove = function(e) {
      _this.mouseX = e.clientX;
      return _this.mouseY = e.clientY;
    };
    document.oncontextmenu = function(e) {
      e.preventDefault();
      createjs.Sound.play("/audio/reload.m4a");
      if (!(_this.players[0].ammo.machinegun === 100 || !_this.players[0].cartridges.machinegun)) {
        _this.players[0].ammo.machinegun = 100;
        _this.players[0].cartridges.machinegun--;
      }
      return Hud.update("ammo");
    };
    document.onmousedown = function(e) {
      switch (e.which) {
        case 1:
          if (_this.players[0].actions.indexOf("shoot") === -1) {
            Player.shoot("start");
          }
          return _this.players[0].actions.push("shoot");
      }
    };
    document.onmouseup = function(e) {
      switch (e.which) {
        case 1:
          Player.shoot("stop");
          return _this.players[0].actions.remove("shoot");
      }
    };
    document.onkeydown = function(e) {
      switch (e.which) {
        case 87:
          if (_this.players[0].actions.indexOf("runUp") === -1) {
            return _this.players[0].actions.push("runUp");
          }
          break;
        case 83:
          if (_this.players[0].actions.indexOf("runDown") === -1) {
            return _this.players[0].actions.push("runDown");
          }
          break;
        case 65:
          if (_this.players[0].actions.indexOf("runLeft") === -1) {
            return _this.players[0].actions.push("runLeft");
          }
          break;
        case 68:
          if (_this.players[0].actions.indexOf("runRight") === -1) {
            return _this.players[0].actions.push("runRight");
          }
      }
    };
    document.onkeyup = function(e) {
      switch (e.which) {
        case 87:
          _this.players[0].actions.remove("runUp");
          return _this.players[0].bitmap.gotoAndPlay("standd");
        case 83:
          _this.players[0].actions.remove("runDown");
          return _this.players[0].bitmap.gotoAndPlay("standd");
        case 65:
          _this.players[0].actions.remove("runLeft");
          return _this.players[0].bitmap.gotoAndPlay("standd");
        case 68:
          _this.players[0].actions.remove("runRight");
          return _this.players[0].bitmap.gotoAndPlay("standd");
        case 70:
          return new Bullet(game.players[0], "grenade");
      }
    };
  }

  return Game;

})();
