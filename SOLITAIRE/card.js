

function card(ID, status, x, y, visible, tabL, item){
  this.initialVisible = visible
  this.visible = visible
  this.offset = createVector(0, 0)
  
  this.tab = tabL
  
  
  
  if(this.visible){

  }
  
  this.item = item
  

  
  this.lerpP = 1
  
  this.lerpR = 0
  
  this.status = status
  
  this.ID = ID
  
  this.held = false
  


  
  this.location = createVector(0, 0)

  this.baseLocation = createVector(x, y)

  
  

  
  this.show = function(){

    imageMode(CENTER)
    if(this.held){

      image(cardsImages[this.ID], this.location.x+offset.x, this.location.y+offset.y+this.offset.y, 105*1.1, 175*1.1)
    } else{
      

      if(this.visible){
        if(!this.initialVisible){
        if(this.lerpR<1){
          this.lerpR+=0.05
          if(this.lerpR>0.5){
            image(cardsImages[this.ID], this.baseLocation.x, this.baseLocation.y, lerp(-cardSize.x, cardSize.x, this.lerpR), cardSize.y)
          } else{
            image(cardBack, this.baseLocation.x, this.baseLocation.y, lerp(-cardSize.x, cardSize.x, this.lerpR), cardSize.y)
          }
        } else{
          this.lerpR = 1
          this.initialVisible = true
        }
        
      
        } else if(this.lerpP<1){
        image(cardsImages[this.ID], lerp(this.location.x+offset.x, this.baseLocation.x, this.lerpP), lerp(this.location.y+offset.y, this.baseLocation.y, this.lerpP), cardSize.x, cardSize.y)

        
      } else{
        

        

        image(cardsImages[this.ID], this.baseLocation.x, this.baseLocation.y, lerp(-cardSize.x, cardSize.x, this.lerpR), cardSize.y)
      }
      } else if(this.lerpP<1){
                
                
                

        image(cardBack, lerp(this.location.x+offset.x, this.baseLocation.x, this.lerpP), lerp(this.location.y+offset.y, this.baseLocation.y, this.lerpP), cardSize.x, cardSize.y)
                
                
      }else{
        image(cardBack, this.baseLocation.x, this.baseLocation.y, cardSize.x, cardSize.y)
      }
      
    }
    rectMode(CENTER)
    
    noFill()
    stroke(0, 255, 0)
    strokeWeight(5)

    if(false){
    if(this.item==tab[this.tab].length-1){
      rect(this.baseLocation.x,this.baseLocation.y, cardSize.x, cardSize.y)
    } else{
      rect(this.baseLocation.x,this.baseLocation.y-cardSize.y/2+15, cardSize.x, 30)
    }
    }
    
  
  }
  this.update = function(){
    
    
  
  if(this.status == 'tab'){
  move = false
      
  if(mouseIsPressed){

    if(this.item!=tab[this.tab].length-1){
      if(press.x>this.baseLocation.x-cardSize.x/2&&press.x<this.baseLocation.x+cardSize.x/2&&press.y>this.baseLocation.y-cardSize.y/2&&press.y<this.baseLocation.y-cardSize.y/2+30&&this.lastHeld!=true){
            heldCard = true
            this.held = true
            offset.x = this.baseLocation.x-press.x
            offset.y = this.baseLocation.y-press.y
        }
  } else{
    if(press.x>this.baseLocation.x-cardSize.x/2&&press.x<this.baseLocation.x+cardSize.x/2&&press.y>this.baseLocation.y-cardSize.y/2&&press.y<this.baseLocation.y+cardSize.y/2&&this.lastHeld!=true){
            heldCard = true
            this.held = true
            offset.x = this.baseLocation.x-press.x
            offset.y = this.baseLocation.y-press.y
        }
  }
  } else{
    if(this.held){
      this.lerpP = 0
      
      

      
      
      
      for(let i = 0; i<7; i++){

        
        if(this.location.x+cardSize.x/2>290+i*187&&this.location.x-cardSize.x/2<290+i*187&&this.location.y+cardSize.y/2>663){

            if(this.tab!=i){

            this.held = false
              
            heldCard = true
              
            this.lerpP = 0

            return [i, 't']
            }
          
          
      

        }
        
      }
      

      
      for(let i = 3; i<7; i++){

        
        if(this.location.x+cardSize.x/2>290+i*187&&this.location.x-cardSize.x/2<290+i*187&&this.location.y+cardSize.y/2>360&&this.lerpP == 0){
            this.held = false
              
            heldCard = true
              
            this.lerpP = 0

            return [i, 'f']
            }
          
          
      

        
        
      }     
    
      

      
      
      
      this.lerpP = 0
      
    }
    this.held = false
    
  }


        
        

      if(this.held){
        this.location.x = mouseX/(1796*windowSize)*1796
        this.location.y = mouseY/(1080*windowSize)*1080
      }
    
    this.lastMouse = mouseIsPressed
    
    
    
    
  } else if (status == 'foundation'){

      move = false
      
  if(mouseIsPressed){

    if(press.x>this.baseLocation.x-cardSize.x/2&&press.x<this.baseLocation.x+cardSize.x/2&&press.y>this.baseLocation.y-cardSize.y/2&&press.y<this.baseLocation.y+cardSize.y/2&&this.lastHeld!=true){
            heldCard = true
            this.held = true
            offset.x = this.baseLocation.x-press.x
            offset.y = this.baseLocation.y-press.y
        }
  
  } else{


    if(this.held){
      
      
      
      for(let i = 0; i<7; i++){

        
        if(this.location.x+cardSize.x/2>290+i*187&&this.location.x-cardSize.x/2<290+i*187){



            this.held = false
              
            heldCard = true
              
            this.lerpP = 0

            return i
            
          
          
      

        }
        
      }
        
      

      
      
      
      this.lerpP = 0
      this.held = false
      
      return
    
    }
    
  }


        
        

      if(this.held){
        this.location.x = mouseX/(1796*windowSize)*1796
        this.location.y = mouseY/(1080*windowSize)*1080
      }
    
    this.lastMouse = mouseIsPressed
    
  } else if(this.status=='current'){
    
    
      if(mouseIsPressed){

    if(press.x>this.baseLocation.x-cardSize.x/2&&press.x<this.baseLocation.x+cardSize.x/2&&press.y>this.baseLocation.y-cardSize.y/2&&press.y<this.baseLocation.y+cardSize.y/2&&this.lastHeld!=true){
            heldCard = true
            this.held = true
            offset.x = this.baseLocation.x-press.x
            offset.y = this.baseLocation.y-press.y
        }
      } else{
        
        if(this.held){
          for(let i = 0; i<7; i++){

        
        if(this.location.x+cardSize.x/2>290+i*187&&this.location.x-cardSize.x/2<290+i*187){



            this.held = false
              
            heldCard = true
              
            this.lerpP = 0

            return i
            
          
          
      

        }
        
      }
          this.held = false
          this.lerpP = 0
        }
        
        
      }
    
    
      if(this.held){
        this.location.x = mouseX/(1796*windowSize)*1796
        this.location.y = mouseY/(1080*windowSize)*1080
      }    
    
    
    
  }
    

  }
}


