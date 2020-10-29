const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
var isJumping = false;
let position=0;
var placar =document.createElement('div');
placar.className = 'placar';
score = 0;
placar.innerHTML ='Score: '+ score;
document.body .appendChild(placar);

function handleKeyup(event){
    if(event.keyCode==32){
        if(!isJumping){
            jump();
        }
    }
}
function jump(){
    isJumping=true;
    let upInterval = setInterval(()=>{
        if (position>=150){
            clearInterval(upInterval); 
            let downInterval = setInterval(() => {
                if (position<=0){
                    clearInterval(downInterval);
                    isJumping=false;
                }else{

                    position-= 20;
                    dino.style.bottom = position+'px';
                }
            }, 20);
        }else{

            position+=20;
            dino.style.bottom = position+'px';
        }
    },20);
}

function createCactus(){
    const cactus=document.createElement('div');
    let cactusPosition= 1000;
    let randomTime = Math.floor(Math.random()*6000);
    cactus.classList.add('cactus');
    cactus.style.left=1000+'px';
   
    background.appendChild(cactus);
    
    let leftInterval = setInterval(()=>{

        if(cactusPosition<-60){
            score+=1; 
            placar.innerHTML ='Score: '+ score;
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }else if (cactusPosition>0 && cactusPosition<60 && position<60){
         
            clearInterval(leftInterval);
            document.body.innerHTML='<h1 class ="gameOver"> Fim de Jogo!</h1>';
        }else{
            cactusPosition-=10;
            cactus.style.left=cactusPosition+'px';
        }
        
    },20);
      
    setTimeout(createCactus, randomTime);
}
createCactus();
document.addEventListener('keyup', handleKeyup);