console.log('[DevSoutinho] Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//Chão
const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    desenha(){
        ctx.drawImage(
            sprites, 
            chao.spriteX, chao.spriteY, 
            chao.largura, chao.altura, 
            chao.x, chao.y, 
            chao.largura, chao.altura,
        );

        ctx.drawImage(
            sprites, 
            chao.spriteX, chao.spriteY, 
            chao.largura, chao.altura, 
            chao.x + chao.largura, chao.y, 
            chao.largura, chao.altura,
        );
    }
};

//PLano de fundo
const fundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha(){
        ctx.fillStyle = '#70c5ce';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(
            sprites, 
            fundo.spriteX, fundo.spriteY, 
            fundo.largura, fundo.altura, 
            fundo.x, fundo.y, 
            fundo.largura, fundo.altura,
        );
        ctx.drawImage(
            sprites, 
            fundo.spriteX, fundo.spriteY, 
            fundo.largura, fundo.altura, 
            fundo.x + fundo.largura, fundo.y, 
            fundo.largura, fundo.altura,
        );
    }
    
};

//passaro
const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,

    gravidade: 0.25,
    velocidade: 0,
    atualiza(){
        flappyBird.velocidade = flappyBird.velocidade + this.gravidade
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },

    desenha(){
        ctx.drawImage(
            sprites, 
            flappyBird.spriteX, flappyBird.spriteY, 
            flappyBird.largura, flappyBird.altura, 
            flappyBird.x, flappyBird.y, 
            flappyBird.largura, flappyBird.altura,
        );
    }
}

const getRead = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenha(){
        ctx.drawImage(
            sprites, 
            getRead.spriteX, getRead.spriteY, 
            getRead.largura, getRead.altura, 
            getRead.x, getRead.y, 
            getRead.largura, getRead.altura,
        );
    }
}

//
// [Telas]
//
let activiTela = {};
function mudaTela(newTela){
    activiTela = newTela;
}

const Telas = {
    inicio:{
       desenha(){
        fundo.desenha();
        chao.desenha();
        flappyBird.desenha();
        getRead.desenha();
       },
       click(){
            mudaTela(Telas.game);
       },
       atualiza(){

       }
    }
};

Telas.game = {
    desenha(){   
        fundo.desenha();
        chao.desenha();
        flappyBird.desenha();
    },
    atualiza(){
        flappyBird.atualiza();
    }
};

function loop(){ 
   activiTela.desenha();
   activiTela.atualiza();

    requestAnimationFrame(loop);
}


window.addEventListener('click', function(){
    if(activiTela.click){
        activiTela.click(); 
    }
});

mudaTela(Telas.inicio);
loop();
