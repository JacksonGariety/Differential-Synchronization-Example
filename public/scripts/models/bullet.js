// Generated by CoffeeScript 1.6.2
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

window.Bullet = (function(_super) {
  __extends(Bullet, _super);

  function Bullet(player, type) {
    var _this = this;

    this.player = player || game.players[0];
    this.type = type || "machinegun";
    this.px = -game.world.x + game.players[0].bitmap.x;
    this.py = -game.world.y + game.players[0].bitmap.y;
    this.mx = -game.world.x + game.mouseX;
    this.my = -game.world.y + game.mouseY;
    this.destroy = function() {
      game.world.removeChild(_this.shape);
      return game.bullets.remove(_this);
    };
    this.direction = Math.atan2(this.mx - this.px, this.my - this.py);
    switch (this.type) {
      case "machinegun":
        this.player.ammo.machinegun--;
        Hud.update("ammo");
        this.accuracy = .066;
        this.direction += Math.random() * (this.accuracy * 2) - this.accuracy;
        this.shootInstance = createjs.Sound.play("audio/smg.m4a", "none", 0, 0, 0);
        this.shape = new createjs.Shape();
        this.shape.rotation = -(this.direction * (180 / Math.PI) + 90);
        this.shape.alpha = .75;
        this.shape.graphics.beginFill("#FFFF00").drawRect(0, 0, 125, 2);
        this.shape.regx = 100;
        this.shape.regy = 1;
        break;
      case "grenade":
        this.shape = new createjs.Shape();
        this.shape.graphics.beginFill("#000").drawCircle(0, 0, 10, 2);
        this.shape.regx = 100;
        this.shape.regy = 1;
    }
    this.shape.x = -game.world.x + game.players[0].bitmap.x;
    this.shape.y = -game.world.y + game.players[0].bitmap.y;
    game.world.addChild(this.shape);
    game.bullets.push(this);
  }

  Bullet.move = function(bullet) {
    var enemy, explode, _i, _len, _ref;

    if (bullet) {
      switch (bullet.type) {
        case "machinegun":
          if (!(!bullet || bullet.shape.x > (window.innerWidth - game.world.x) || bullet.shape.x < -game.world.x || bullet.shape.y > (window.innerHeight - game.world.y) || bullet.shape.y < -game.world.y)) {
            _ref = game.enemies;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              enemy = _ref[_i];
              if (enemy && collision.checkRectCollision(bullet.shape, enemy.bitmap, 0, true)) {
                enemy.hurt(bullet);
                bullet.destroy();
              }
            }
            bullet.shape.x += Math.sin(bullet.direction) * 100;
            return bullet.shape.y += Math.cos(bullet.direction) * 100;
          } else if (bullet) {
            game.world.removeChild(bullet.shape);
            return game.bullets.remove(bullet);
          }
          break;
        case "grenade":
          if (!(!bullet || bullet.exploded)) {
            bullet.shape.x += Math.sin(bullet.direction) * 5;
            bullet.shape.y += Math.cos(bullet.direction) * 5;
          }
          explode = function(bullet) {
            var _j, _len1, _ref1;

            bullet.exploded = true;
            bullet.shape.graphics.drawCircle(0, 0, 200, 2);
            _ref1 = game.enemies;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              enemy = _ref1[_j];
              if (enemy && collision.checkRectCollision(enemy.bitmap, bullet.shape, 0, true)) {
                enemy.kill(bullet);
              }
            }
            return setTimeout(function() {
              return bullet.destroy();
            }, 1000);
          };
          if (bullet.direction >= 1.5) {
            if (bullet.shape.x >= bullet.mx || bullet.shape.y <= bullet.my) {
              return explode(bullet);
            }
          } else if (bullet.direction >= 0) {
            if (bullet.shape.x >= bullet.mx || bullet.shape.y >= bullet.my) {
              return explode(bullet);
            }
          } else if (bullet.direction >= -1.5) {
            if (bullet.shape.x <= bullet.mx || bullet.shape.y >= bullet.my) {
              return explode(bullet);
            }
          } else if (bullet.direction >= -3) {
            if (bullet.shape.x <= bullet.mx || bullet.shape.y <= bullet.my) {
              return explode(bullet);
            }
          }
      }
    }
  };

  return Bullet;

})(Player);