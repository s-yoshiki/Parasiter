    enchant();
    main();

function main(){
var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 900;
var PLAYER_WIDTH = 15;
var PLAYER_HEIGHT = 15;
var PLAYER_JUMP = -5;
var PLAYER_GRAVITY = 0.3;
var SPEED = 4;
var ANSWER = 0;//GAMEOVER判定
var POINT = 0;
var GAMEOVER = 0;
var timer_point = 0;
var gameOver_img ="http://jsrun.it/assets/d/q/z/3/dqz36.png";
var loading_img = "http://jsrun.it/assets/r/G/Q/i/rGQi3.png";
var Parasiter_img="http://jsrun.it/assets/h/l/h/L/hlhLS.png";
var tap_to_start_img="http://jsrun.it/assets/p/a/R/U/paRUi.png";
var finger_img ="http://jsrun.it/assets/8/m/c/k/8mckJ.png";
var rainbow_img ="http://jsrun.it/assets/8/s/3/K/8s3KS.png";

var new_record_img = "http://jsrun.it/assets/V/N/g/I/VNgIH.png";

var audio = new Audio("http://jsrun.it/assets/u/A/D/t/uADtK.mp3");
function audioPlayer(){
    audio.load();
    audio.play();
    audio.answer=false;
}
audio.answer = true;
//localStorage.removeItem("parasiter_score");
var scoreX = 0;
var score = localStorage.getItem("parasiter_score");

if(score === null){
    score = 0;
    localStorage.setItem("parasiter_score",0);
}


var randomfloat = function(min,max) {
	return (Math.random() * (max-min)) + min;
};
var global_color = "white";
window.onload = function () {
    var game = new Game(SCREEN_WIDTH,SCREEN_HEIGHT);
    game.preload(gameOver_img,loading_img,Parasiter_img,tap_to_start_img,finger_img,rainbow_img,new_record_img);
    var loading = new Sprite(100,100);
    game.loadingScene.addChild(loading);
    game.loadingScene.backgroundColor = "black";
    game.fps = 32;
    game.tick = 0;
    
    game.onload = function() {
        global_color = true;
        var scene = game.rootScene;
        scene.backgroundColor = "black";
        score = localStorage.getItem("parasiter_score");
        var Parasiter = new Sprite(300*2.5,100*2.5);
        Parasiter.image = game.assets[Parasiter_img];
        Parasiter.scale(1.3);
        Parasiter.moveTo(135,300);
        scene.addChild(Parasiter);
        
        var tap_to_start = new Sprite(300,100);
        tap_to_start.image = game.assets[tap_to_start_img];
        tap_to_start.scale(1);
        tap_to_start.moveTo(230,500);
        scene.addChild(tap_to_start);
        scene.ontouchstart = function() {
            game.pushScene(game.Scene1());
        };
        var finger = new Sprite(100,100);
        finger.image = game.assets[finger_img];
        finger.moveTo(100,500);
        finger.addEventListener(Event.ENTER_FRAME,function(){
            finger.y +=0.4;
            if(finger.y >=510){
                finger.y =500;
            }
        });
        scene.addChild(finger);
        
        var label = new Label();
        label.text = "●";
        label.color ="white";
        label.font = "25px monospace";
        label.moveTo(250, 75);
        scene.addChild(label);
        
        var score_label = new Label();
        score_label.text = "BEST SCORE   "+score+"mm";
        score_label.color = "white";
        score_label.font="40px 'Lucida Grande', Meiryo, sans-serif";
        score_label.width =600;
        score_label.moveTo(72,108);
        scene.addChild(score_label);
        
        
        
        var rainbow = new Sprite(300,100);
        rainbow.image = game.assets[rainbow_img];
        rainbow.scale(0.5);
        rainbow.moveTo(380,650);
        rainbow.addEventListener(Event.TOUCH_START,function(){
            global_color = false;
        
        });
        if(score>=1000){
            scene.addChild(rainbow);
        }
        /*var best = new Sprite(300,100);
        best.image = game.assets[best_img];
        best.moveTo(-70,700);
        scene.addChild(best);*/
    
    };
    
    game.Scene1 = function(){
        var scene = new Scene();
        
        scene.backgroundColor = "black";
      
                
        
        var surface = new Surface(10, 10);
        surface.context.fillStyle ="black";
        surface.context.fillRect(0, 0, 10, 10);
        var topPlayer = new Player();
        topPlayer.moveTo(250, 75);
        topPlayer.image = surface;
        scene.addChild(topPlayer);
        
        var new_record = new Sprite(300,100);
        new_record.image=game.assets[new_record_img];
        new_record.moveTo(170,200);
        
                                     
        var gameOver = new Sprite(600,200);
        gameOver.image = game.assets[gameOver_img];
        gameOver.scale(1);
        gameOver.moveTo(50,350);
        gameOver.tick = 0;
        gameOver.addEventListener(Event.TOUCH_START,function(){
            window.location.reload();
        });
        topPlayer.addEventListener(Event.ENTER_FRAME,function(){
            if(this.tick>3){
                scene.removeChild(this);
            }
            if(topPlayer.y>=880){
                scene.addChild(gameOver);
                scene.addChild(makeMessage(" "));
                
                if(audio.anwer ===true){
                    audioPlayer();
                }
                
                
                if(score*10<=scoreX*10){
                    scene.addChild(new_record);
                    score = scoreX;
                    localStorage.removeItem("parasiter_score");
                    localStorage.setItem("parasiter_score",score);
                }
                localStorage.setItem("parasiter_score",score);
                
                scene.ontouchstart = function() {
                    window.location.reload();
                    //game.pushScene(game.rootScene());
                    SPEED = 4;
                    ANSWER = 0;
                    //timer_point = 0;
                    audio.answer = 0;
                    game.tick = 0;
                };
            }
        });
        function addEnemy(color){
            var randX = randfloat(50,50);
            var randY = randfloat(20,440);
            var enemy = new Sprite(randX,randY);
            var fundSuf = new Surface(randX,randY);
            fundSuf.context.fillStyle = color;
            fundSuf.context.fillRect(0, 0, randX,randY);
            enemy.image = fundSuf;
            enemy.moveTo(700,0);
            scene.addChild(enemy);
            enemy.tick = 0;
            enemy.addEventListener(Event.ENTER_FRAME,function(){
                if(scoreX>=1000){
                    this.x -=SPEED*1.25;
                }else{
                    this.x -=SPEED*1;
                }
                this.tick ++;
                if((this.x < -50)||(this.tick > 500)){
                    
                    scene.removeChild(this);
                }
                if(topPlayer.intersect(this)){
                    if(ANSWER===0){
                        
                        ANSWER = 1;
                    }
                    scene.removeChild(this);
                    SPEED=0;
                }
            }); 
        }
        function addEnemy2(color){
            var randX = randfloat(50,50);
            var randY = randfloat(100,440);
            var enemy = new Sprite(randX,randY);
            var fundSuf = new Surface(randX,randY);
            fundSuf.context.fillStyle = color;
            fundSuf.context.fillRect(0, 0, randX,randY);
            enemy.image = fundSuf;
            enemy.moveTo(700,900-randY);
            scene.addChild(enemy);
            enemy.tick = 0;
            enemy.addEventListener(Event.ENTER_FRAME,function(){
                if(this.tick>=1500){
                    this.tick -=SPEED-1;
                }else{
                    this.x -=SPEED*1;
                }
                this.tick ++;
                if((this.x < -50)||(this.tick > 500)){
                    scene.removeChild(this);
                }
                if(topPlayer.intersect(this)){
                    
                        ANSWER = 1;
                    
                    
                    scene.removeChild(this);
                    SPEED = 0;
                }
            });
        }
        
        function timer1(text){
            var label = new Label();
            label.font = "40px 'Lucida Grande', Meiryo, sans-serif";
            
            if(SPEED===0){
                label.color="red";
            }
            label.x    = 500;
            label.y    = 30;
            label.text = text;//"●";
            label.backgroundColor ="rgba(0,0,0,0.5)" ;
            scene.addChild(label);
            label.tick = 0;
            label.addEventListener(Event.ENTER_FRAME,function(){
                this.x -=SPEED;
                timer_point+=SPEED;
                this.tick++;
                if((this.tick > 0)){
                    scene.removeChild(this);
                }
            });
        }
        function timer2(text){
            var label = new Label();
            label.font = "40px 'Lucida Grande', Meiryo, sans-serif";
            
            if(SPEED===0){
                label.color="black";
            }else{
                label.color = "white";
            }
            label.x    = 502;
            label.y    = 27;
            label.text = text;//"●";
            
            scene.addChild(label);
            label.tick = 0;
            label.addEventListener(Event.ENTER_FRAME,function(){
                this.x -=SPEED;
                timer_point+=SPEED;
                this.tick++;
                if((this.tick > 0)){
                    scene.removeChild(this);
                }
            });
        }
        function player(x,y,color,text){
            var label = new Label();
            label.font = "25px monospace";
            label.color= color;
            label.x    = x;
            label.y    = y;
            label.text = text;//"●";
            scene.addChild(label);
            label.tick = 0;
            label.addEventListener(Event.ENTER_FRAME,function(){
                this.x -=SPEED;
                this.tick++;
                if((this.tick > 30)||(this.x <= -50)){
                    scene.removeChild(this);
                }
            });
        }
        scene.ontouchstart = function() {
            topPlayer.isTouch = true;
        };
        scene.ontouchend = function() {
            topPlayer.isTouch = false;
        };
        scene.onenterframe = function() {
        };
        
        scene.addEventListener(Event.ENTER_FRAME,function(){
            
            var r,g,b,color,x,y,text1,text2;
            r = rand(256);
            b = rand(256);
            g = rand(256);
            if(global_color ===false){
                color = "rgb(" + r + "," + g + "," + b + ")";
            }else{
                color = "white";
            }
            text1 = "●";
            scoreX = (timer_point/game.fps).toFixed(0);
            text2 = scoreX+"mm";
            if(ANSWER ===1){

            }
            
            
            if((game.tick % 10) === 0){
               
                addEnemy(color);
                addEnemy2(color);
            }
            if ((game.tick % 1) === 0){
                
                x = 250;
                y = topPlayer.y;
                player(x,y,color,text1);
                timer2(text2);
                timer1(text2);
                
            }
            if ((game.tick % 100) === 0){
                SPEED +=0.1;
            }
            game.tick++;
        });
        
        
        return scene;
    };
    game.start();
    
};

function rand(num){
    return Math.floor(Math.random() * num);
}
function randfloat(min,max){
    return Math.floor(Math.random()*(max-min))+min;    
}  


var Player = Class.create(Sprite, {
    initialize: function() {
        Sprite.call(this,PLAYER_WIDTH,PLAYER_HEIGHT);
        this.vy = 0;
        this.isTouch = false;
        if(ANSWER === 1){
                this.vy += 0.5;
            }
    },
    onenterframe : function() {
        if(ANSWER === 1){
                this.vy += 0.3;
            }
        if(this.isTouch === true){
            this.vy -=0.6;
            if(ANSWER === 1){
                this.vy += 0.3;
            }
        }else{
            this.vy += 0.4;
        }
        this.y  += this.vy;
        
        if(this.y>=840){
            
            ANSWER = 1;
            SPEED = 0;
        }
    
           
        
            
        
        if(this.y<=0){
            this.y += 0;
            this.y  = 0;
            this.vy = 0;
        }
    }

});

function makeMessage(text) {
    var label = new Label(text);
    label.font  = "860px monospace";
    label.color = "rgb(255,255,255)";
    label.backgroundColor = "rgba(0,0,0,0.015)";
    label.y     = 0;
    label.x     = 0;
    label.width = 640;
    label.height = 1000;
    label.tick = 0;
    return label;
} 
}
        
        
