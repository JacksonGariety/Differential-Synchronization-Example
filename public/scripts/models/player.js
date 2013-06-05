// Generated by CoffeeScript 1.6.2
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

window.Player = (function(_super) {
  __extends(Player, _super);

  function Player(name, isPuppet) {
    this.name = name || "Anon";
    this.level = 1;
    this.ammo = {
      machinegun: 100,
      pistol: 30,
      shotgun: 10,
      cannon: 1,
      grenade: 2
    };
    this.cartridges = {
      machinegun: 5,
      pistol: 0,
      shotgun: 0,
      cannon: 0,
      grenade: 0
    };
    console.log("" + this.name + " has joined the struggle");
    this.isPuppet = isPuppet || false;
    this.spritesheet = new createjs.SpriteSheet({
      images: ["images/player.png"],
      frames: [[0, 128, 128, 128, 0, 64, 64], [128, 128, 128, 128, 0, 64, 64], [256, 128, 128, 128, 0, 64, 64], [384, 128, 128, 128, 0, 64, 64], [0, 640, 128, 128, 0, 64, 64], [128, 640, 128, 128, 0, 64, 64], [0, 1024, 128, 128, 0, 64, 64], [128, 1024, 128, 128, 0, 64, 64], [0, 512, 128, 128, 0, 64, 64], [128, 512, 128, 128, 0, 64, 64], [256, 512, 128, 128, 0, 64, 64], [384, 512, 128, 128, 0, 64, 64], [0, 896, 128, 128, 0, 64, 64], [128, 896, 128, 128, 0, 64, 64], [256, 896, 128, 128, 0, 64, 64], [384, 896, 128, 128, 0, 64, 64]],
      animations: {
        standd: {
          frames: [6, 7],
          frequency: 20
        },
        standu: {
          frames: [4, 5],
          frequency: 20
        },
        runu: {
          frames: [8, 9, 10, 11],
          frequency: 6
        },
        rund: {
          frames: [12, 13, 14, 15],
          frequency: 6
        },
        runr: {
          frames: [0, 1, 2, 3],
          frequency: 6
        }
      }
    });
    createjs.SpriteSheetUtils.addFlippedFrames(this.spritesheet, true);
    this.bitmap = new createjs.BitmapAnimation(this.spritesheet);
    if (isPuppet) {
      this.bitmap.x = window.innerWidth / 2;
      this.bitmap.y = window.innerHeight / 2;
    } else {
      this.bitmap.x = window.innerWidth / 2 + (Math.random() * (300 * 2) - 300);
      this.bitmap.y = window.innerHeight / 2 + (Math.random() * (300 * 2) - 300);
    }
    this.bitmap.gotoAndPlay("standd");
    this.actions = [];
    if (isPuppet) {
      game.stage.addChild(this.bitmap);
    } else {
      game.world.addChild(this.bitmap);
    }
    game.players.push(this);
  }

  Player.shoot = function(command, type) {
    if (command === "start") {
      if (game.players[0].ammo.machinegun) {
        return game.players[0].bulletInterval = setInterval(function() {
          var bullet;

          if (game.players[0].ammo.machinegun) {
            return bullet = new Bullet(game.players[0], "machinegun");
          } else {
            clearInterval(game.players[0].bulletInterval);
            return createjs.Sound.play("audio/dry.m4a");
          }
        }, 100);
      } else {
        return createjs.Sound.play("audio/dry.m4a");
      }
    } else if (command === "stop") {
      return clearInterval(game.players[0].bulletInterval);
    }
  };

  Player.move = function() {
    var drop, _i, _len, _ref, _results;

    if (game.players[0].actions.indexOf("runUp") !== -1) {
      if (game.players[0].bitmap.currentAnimation === "standd") {
        game.players[0].bitmap.gotoAndPlay("runu");
      }
      if ((game.world.y + 7) > 0) {
        game.players[0].bitmap.y -= 7;
      } else if (game.players[0].bitmap.y !== window.innerHeight / 2) {
        game.players[0].bitmap.y -= 7;
      } else {
        game.world.y += 7;
      }
    }
    if (game.players[0].actions.indexOf("runDown") !== -1) {
      if (game.players[0].bitmap.currentAnimation === "standd") {
        game.players[0].bitmap.gotoAndPlay("rund");
      }
      if ((game.world.y - 7) < (-40000 + window.innerWidth)) {
        game.players[0].bitmap.y += 7;
      } else if (game.players[0].bitmap.y !== window.innerHeight / 2) {
        game.players[0].bitmap.y += 7;
      } else {
        game.world.y -= 7;
      }
    }
    if (game.players[0].actions.indexOf("runLeft") !== -1) {
      if (game.players[0].bitmap.currentAnimation === "standd") {
        game.players[0].bitmap.gotoAndPlay("runr_h");
      }
      if ((game.world.x + 7) > 0) {
        game.players[0].bitmap.x -= 7;
      } else if (game.players[0].bitmap.x !== window.innerWidth / 2) {
        game.players[0].bitmap.x -= 7;
      } else {
        game.world.x += 7;
      }
    }
    if (game.players[0].actions.indexOf("runRight") !== -1) {
      if (game.players[0].bitmap.currentAnimation === "standd") {
        game.players[0].bitmap.gotoAndPlay("runr");
      }
      if ((game.world.x - 7) < (-40000 + window.innerWidth)) {
        game.players[0].bitmap.x += 7;
      } else if (game.players[0].bitmap.x !== window.innerWidth / 2) {
        game.players[0].bitmap.x += 7;
      } else {
        game.world.x -= 7;
      }
    }
    _ref = game.drops;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      drop = _ref[_i];
      if (collision.checkRectCollision(game.players[0].bitmap, drop.shape, 0, true)) {
        _results.push(Drop.pickup(game.players[0], drop));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  return Player;

})(Game);
