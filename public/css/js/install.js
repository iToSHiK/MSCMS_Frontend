const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const card = document.querySelectorAll('.card');
// const active = document.querySelector('.active') 
let i=0;
//next.style.display = 'none';

for(let i = 1; i < card.length; i++){
    card[i].style.display = 'none';
}

/*active.onclick = function(){
    active.style.display = 'none';
    next.style.display = 'block';
    card[i].style.display = 'none';
    i++;
    card[i].style.display = 'block';
}*/

prev.onclick = function(){
    card[i].style.display = 'none';
    i--;
    if(i < 0){
        i++
    }
    card[i].style.display = 'block';
}

next.onclick = function(){
    card[i].style.display = 'none';
    i++;
    if(i >= card.length){
        i--;
    }
    card[i].style.display = 'block';
}
