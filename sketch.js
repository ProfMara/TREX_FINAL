//PASSO 1 CRIAR AS VARIÁVEIS
var trex_correndo, trex_colidido, trex;
var solo, soloImagem, soloInvisivel;
var nuvem, nuvemImagem;
var cacto, c1, c2, c3, c4, c5, c6;
var gameOverImagem, restartImagem, gameOver, restart;
var grupoCacto, grupoNuvem;
var JOGAR = 1;
var FIM = 0;
var estadoJogo = JOGAR;

var somPulo, somMorte, somCheckPoint;

var pontos = 0;
//CARREGAR ARQUIVOS DE MÍDIA
function preload() {

    //imagens
    soloImagem = loadImage("solo.png");
    nuvemImagem = loadImage("nuvem.png");

    restartImagem = loadImage("restart.png");
    gameOverImagem = loadImage("gameOver.png");

    c1 = loadImage("obstaculo1.png");
    c2 = loadImage("obstaculo2.png");
    c3 = loadImage("obstaculo3.png");
    c4 = loadImage("obstaculo4.png");
    c5 = loadImage("obstaculo5.png");
    c6 = loadImage("obstaculo6.png");

    //sons
    somPulo = loadSound("pulo.mp3");
    somMorte = loadSound("fim.mp3");
    somCheckPoint = loadSound("checkPoint.mp3");

    //animações
    trex_correndo = loadAnimation("trex1.png", "trex2.png", "trex3.png");
    trex_colidido = loadAnimation("trex_colidido.png");

}

function setup() {
    createCanvas(600, 200);
    //trex
    trex = createSprite(50, 180, 50, 50);
    trex.addAnimation("correndo", trex_correndo);
    trex.addAnimation("colidido", trex_colidido);
    trex.scale = 0.5;

    trex.setCollider("circle", 0, 0, 50);
    trex.debug = true;

    //solo
    solo = createSprite(300, 190, 600, 20);
    solo.addImage(soloImagem);
    solo.velocityX = -3;

    //solo invisível
    soloInvisivel = createSprite(300, 199, 600, 2);
    soloInvisivel.visible = false;

    //game over

    gameOver = createSprite(300, 100);
    gameOver.addImage(gameOverImagem);
    gameOver.scale = 0.5;
    gameOver.visible = false;

    //restart
    restart = createSprite(300, 130);
    restart.addImage(restartImagem);
    restart.scale = 0.5;
    restart.visible = false;

    //grupos
    grupoCacto = new Group();
    grupoNuvem = new Group();
}

function draw() {
    background("white");

    console.log(frameCount);
    text("Pontos: " + pontos, 500, 50);
    if (estadoJogo == JOGAR) {

        pontos += Math.round(getFrameRate() / 60);
        solo.velocityX = -3;
        trex.changeAnimation("correndo");

        if (solo.x < 0) {
            solo.x = solo.width / 1.99;
        }

        if (pontos % 100 == 0 && pontos > 0) {
            somCheckPoint.play();
        }

        if (keyDown("space") && trex.y > 140) {
            trex.velocityY = -13;
            somPulo.play();
        }

        gerarNuvens();
        gerarCacto();

        if (trex.isTouching(grupoCacto)) {
            estadoJogo = FIM;
            somMorte.play()
        }

    }

    if (estadoJogo == FIM) {
        trex.changeAnimation("colidido");
        solo.velocityX = 0;
        grupoCacto.setVelocityXEach(0);
        grupoNuvem.setVelocityXEach(0);

        grupoNuvem.setLifetimeEach(-1);
        grupoCacto.setLifetimeEach(-1);
        gameOver.visible = true;
        restart.visible = true;

      
    }


    trex.velocityY += 0.8;

    trex.collide(soloInvisivel);


    drawSprites();

}

function gerarNuvens() {

    if (frameCount % 60 == 0) {
        var y = Math.round(random(1, 100));
        var nuvem = createSprite(600, y, 50, 20);
        nuvem.addImage(nuvemImagem);
        nuvem.scale = 0.5;
        nuvem.velocityX = -3;
        trex.depth = nuvem.depth + 1;
        nuvem.lifetime = 225;
        grupoNuvem.add(nuvem);
    }

}


function gerarCacto() {

    if (frameCount % 100 == 0) {
        var cacto = createSprite(600, 175, 20, 40);
        var a = Math.round(random(1, 6));
        switch (a) {
            case 1:
                cacto.addImage(c1);
                break;
            case 2:
                cacto.addImage(c2);
                break;
            case 3:
                cacto.addImage(c3);
                break;
            case 4:
                cacto.addImage(c4);
                break;
            case 5:
                cacto.addImage(c5);
                break;
            case 6:
                cacto.addImage(c6);
                break;
        }
        cacto.scale = 0.5;
        cacto.velocityX = -3;
        cacto.lifetime = 225;
        grupoCacto.add(cacto);
    }

}

