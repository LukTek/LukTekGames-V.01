let ID

let move

let flip = false

let lerpF = 1

let mouse = false

let initial = []

let tab = [[], [], [], [], [], [], []]

let foundation = [[], [], [], []]

let stock = []






let mouseDown = false

function setup() {
  windowSize = windowWidth/1796
  press = createVector(0, 0)
  offset = createVector(0, 0)
  cardSize = createVector(105, 175)
  
for(let i = 0; i<52; i++){
  initial.push(i)
}
  
  
shuffle(initial, true)

let count = 0



  
for(let i = 0; i<7; i++){
  for(let q = 0; q<i+1; q++){
    tab[i].push(new card(initial[count], 'tab', 290+i*187, 663+q*30, q==i, i, q))

    count++
  }
}
  
for(let i = 28; i<52; i++){
  stock.push(initial[i])
}


  
  console.log(stock[stock.length-1])
  
  last = 0
  
  currentIndex = stock.length-1
  
  current = [new card(stock[currentIndex], 'current', 480, 360, true)]

  

  createCanvas(1796*windowSize, 1080*windowSize);

  heldCard = 0
  

}



function draw() {
  windowSize = windowWidth/1796
  background(220);
  imageMode(CORNER)
  scale(windowSize)
  image(backgroundImage, 0, 0)
  imageMode(CENTER)
  


  



  
moveAr = []
  
  
foundMove = []
  
  


for(let i = 0; i<7; i++){
  for(let q = tab[i].length-1; q>=0; q--){
    

    
    if(tab[i][q].lerpP<1){
      tab[i][q].lerpP+=0.1
    } else{
      tab[i][q].lerpP = 1
    }

    
    if(tab[i][q]){
      if(tab[i][q].held){
      for(let a = q+1; a<tab[i].length; a++){
        tab[i][a].held = true
        tab[i][a].lerp = 0
        tab[i][a].location.x = mouseX/(1796*windowSize)*1796
        tab[i][a].location.y = mouseY/(1080*windowSize)*1080+(a-q)*30

      }
    }
    }
    

    if(tab[i][q].visible){
      move = false
      
      move = tab[i][q].update()
      
      if(move){

        if(move[1] == 'f'){
          

          
          foundMove.push([i, q, move[0]])

          
  
        } else{
          move = move[0]
        }
      }
      
      if(heldCard==true){
        heldCard = [i, q]

      }
      
      

      if(tab[i][q].lerpP==0){
      if(move>=0){

        moveAr.push([heldCard, move, tab[heldCard[0]][heldCard[1]].location.y])
        
      }
      }
        
      
    }
    
    



  }
  
}


if(moveAr.length>0){
  if(tab[moveAr[0][1]].length>0){
  
  first = tab[heldCard[0]][heldCard[1]].ID%13+1
  
  sec = tab[moveAr[0][1]][tab[moveAr[0][1]].length-1].ID%13+1
    
  console.log(tab[heldCard[0]][heldCard[1]].ID, tab[moveAr[0][1]][tab[moveAr[0][1]].length-1].ID)

  
  if(first!=sec-1||tab[heldCard[0]][heldCard[1]].ID>26&&tab[moveAr[0][1]][tab[moveAr[0][1]].length-1].ID>26||tab[heldCard[0]][heldCard[1]].ID<=26&&tab[moveAr[0][1]][tab[moveAr[0][1]].length-1].ID<=26){
        for(let k = 0; k<7; k++){
      for(let l = 0; l<tab[k].length; l++){    

        moveAr = []

        tab[k][l].held = false
      }
    }
  }

}
}
  
  
for(let f = moveAr.length-1; f>=0; f--){
  if(moveAr[f][2] <663-175/2){
    
    
    
    if(moveAr.length>1){
      console.log(true)
    
    for(let k = 0; k<7; k++){
      for(let l = 0; l<tab[k].length; l++){    

        moveAr = []

        tab[k][l].held = false
      }
    }
    
    
    break
    
    } else{
      
      
      
      
      
      
      
      
    }
  }

  
  
}

      
for(let f = moveAr.length-1; f>=0; f--){


  
  leng = tab[moveAr[f][0][0]].length-1
  



tab[moveAr[f][1]].push(new card(tab[moveAr[f][0][0]][tab[moveAr[f][0][0]].length-f-1].ID, 'tab', 290+moveAr[f][1]*187, 663+(tab[moveAr[f][1]].length)*30, true, moveAr[f][1], tab[moveAr[f][1]].length))
  
tab[moveAr[f][1]][tab[moveAr[f][1]].length-1].location.x = tab[moveAr[f][0][0]][tab[moveAr[f][0][0]].length-f-1].location.x
  
tab[moveAr[f][1]][tab[moveAr[f][1]].length-1].location.y = tab[moveAr[f][0][0]][tab[moveAr[f][0][0]].length-f-1].location.y
  
tab[moveAr[f][1]][tab[moveAr[f][1]].length-1].lerpP = 0
  
  


  
}
  
  
for(let x = 0; x<moveAr.length; x++){
  tab[moveAr[x][0][0]].pop()
  
}
  
  
if(moveAr.length>0){
  if(tab[moveAr[0][0][0]].length>0){
  tab[moveAr[0][0][0]][tab[moveAr[0][0][0]].length-1].visible = true
}
}
  
  
  
  
  
  
  
  




  
  
if(foundMove.length==1){

  

    if((tab[foundMove[0][0]][tab[foundMove[0][0]].length-1].ID) == (foundation[foundMove[0][2]-3].length+13*(foundMove[0][2]-3))){

    foundation[foundMove[0][2]-3].push(new card(tab[foundMove[0][0]][tab[foundMove[0][0]].length-1].ID, 'foundation', 290+foundMove[0][2]*187, 360, true, 0))

    foundation[foundMove[0][2]-3][foundation[foundMove[0][2]-3].length-1].location.x = tab[foundMove[0][0]][tab[foundMove[0][0]].length-1].location.x
    foundation[foundMove[0][2]-3][foundation[foundMove[0][2]-3].length-1].location.y = tab[foundMove[0][0]][tab[foundMove[0][0]].length-1].location.y

    foundation[foundMove[0][2]-3][foundation[foundMove[0][2]-3].length-1].lerpP = 0


    tab[foundMove[0][0]].pop()
    
    if(tab[foundMove[0][0]].length>0){
    tab[foundMove[0][0]][tab[foundMove[0][0]].length-1].visible = true
    }

  
}
  
} else{
  for(let b = 0; b<foundMove.length; b++){
    tab[foundMove[b][0]][foundMove[b][1]].held = false
  }
}
  
  
  
  
  



  
  
for(let i = 0; i<7; i++){
  for(let q = 0; q<tab[i].length; q++){
    tab[i][q].show()
  }
}
  
  
for(let i = 0; i<4; i++){
  for(let q = 0; q<foundation[i].length; q++){
    
    if(foundation[i][q].lerpP<1){
      foundation[i][q].lerpP+=0.1
    } else{
      foundation[i][q].lerpP = 1
    }
    
    
    foundation[i][q].show()
    
    
    if(foundation[i].length-1 == q){
      move = foundation[i][q].update()
      if(move>=0&&foundation[i][q].location.y+cardSize.y/2>663){
        
        
        first = foundation[i][q].ID
        
        if(tab[move].length>0){
        sec = tab[move][tab[move].length-1].ID
        } else{
          sec = 13
        }
        

        
        if(first%13+1 == sec%13){
      tab[move].push(new card(foundation[i][q].ID, 'tab', 290+move*187, 663+tab[move].length*30, true, move, tab[move].length))
        
        tab[move][tab[move].length-1].location.x = foundation[i][foundation[i].length-1].location.x
        tab[move][tab[move].length-1].location.y = foundation[i][foundation[i].length-1].location.y
        tab[move][tab[move].length-1].lerpP = 0

        foundation[i].pop()
        }
    }
    }


  }
  
}
  
counter = 0


if(heldCard.length>1){
  

  for( r = heldCard[1]; r<tab[heldCard[0]].length; r++){
  
  tab[heldCard[0]][r].show()
  
    

  }
  
  

  

  





}
  if(currentIndex!=0){
  image(cardBack, 290, 360, cardSize.x, cardSize.y)
  }
  
  if(current.length>1){
  current[current.length-2].show()
  }
  

    if(current.length>0){
    current[current.length-1].show()
    }

  
  
  
  
  
  
  
    if(current[current.length-1]){
      
      
  
    if(current[current.length-1].lerpP<1){
      current[current.length-1].lerpP+=0.1
    } else{
      current[current.length-1].lerpP = 1
    }
  


  
  
  
  move = current[current.length-1].update()
  
  
  if(move>=0){
    
    tab[move].push(new card(current[current.length-1].ID, 'tab', 290+move*187, 663+(tab[move].length)*30, true, move, tab[move].length))
    
    tab[move][tab[move].length-1].lerpP = 0
    tab[move][tab[move].length-1].location.x = current[current.length-1].location.x
    tab[move][tab[move].length-1].location.y = current[current.length-1].location.y
    
    
    current.pop()

    
    
  }
  
  
      
    }
  
  
    if(flip){
    if(lerpF>0.5){
    image(cardsImages[stock[currentIndex]], lerp(290, 480, lerpF), 360, lerp(cardSize.x, -cardSize.x, lerpF), cardSize.y)
    } else{
      image(cardBack, lerp(290, 480, lerpF), 360, lerp(cardSize.x, -cardSize.x, lerpF), cardSize.y)
      
      
    }
    if(lerpF<1){
    lerpF+=0.05
    } else{
      lerpF = 1
      current.push(new card(stock[currentIndex], 'current', 480, 360, true))
      
      flip = false
    }
  }

  
  

  

}

function mousePressed(){

  press.x = (mouseX/(1796*windowSize))*1796
  press.y = (mouseY/(1080*windowSize))*1080
  
  
  if(press.x > 290-cardSize.x/2&&press.x < 290+cardSize.x/2 && press.y > 360-cardSize.y/2&&press.y < 360+cardSize.y/2&&!flip){
    
    if(currentIndex!=0){

    
    currentIndex--
    
 

    flip = true
    lerpF = 0
      
    } else{
      stock = []
console.log(current)
      for(let i = 0; i<current.length; i++){
        stock.push(current[i].ID)
      }
      current = []
      currentIndex = stock.length-1

      console.log(stock)  
    }

  }
  

  

}


