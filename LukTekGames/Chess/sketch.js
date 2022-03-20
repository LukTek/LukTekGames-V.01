let white = true
let imgB = [];
let imgW = [];
let board
let icon2

let mg = true
let rb = false
let po = true
let computer = false


let wait = false
let counter = 0

let white_turn = true

let menu = true

let settings = false

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}




function preload() {

  imgB[0] = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/45px-Chess_pdt45.svg.png");
  imgB[1] = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/45px-Chess_rdt45.svg.png");
  imgB[2] = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Chess_ndt45.svg/45px-Chess_ndt45.svg.png");
  imgB[3] = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Chess_bdt45.svg/45px-Chess_bdt45.svg.png");
  imgB[4] = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chess_qdt45.svg/45px-Chess_qdt45.svg.png");
  imgB[5] = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chess_kdt45.svg/45px-Chess_kdt45.svg.png");

  imgW[0] = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/45px-Chess_plt45.svg.png");
  imgW[1] = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Chess_rlt45.svg/45px-Chess_rlt45.svg.png");
  imgW[2] = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chess_nlt45.svg/45px-Chess_nlt45.svg.png");
  imgW[3] = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chess_blt45.svg/45px-Chess_blt45.svg.png");
  imgW[4] = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Chess_qlt45.svg/45px-Chess_qlt45.svg.png");
  imgW[5] = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chess_klt45.svg/45px-Chess_klt45.svg.png");
  icon1 = loadImage("https://peopleshub.org/wp-content/uploads/2018/04/person-icon-white.png");
  board = loadImage("https://media.istockphoto.com/vectors/chessboard-top-view-wooden-texture-with-algebraic-notation-vector-vector-id696049456?k=20&m=696049456&s=612x612&w=0&h=QZcK7OXr5L8prto2HA6b_BKcmTFrrzgc6JhvFprjMvU=")
  icon2 = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/OOjs_UI_icon_robot.svg/640px-OOjs_UI_icon_robot.svg.png")
  icon3 = loadImage("https://upload.wikimedia.org/wikipedia/commons/a/af/Question_mark.png")
}










function setup() {
  let canvas = createCanvas(800, 1000);
  canvas.position((windowWidth/2)-width/2,30);

}

let data = Array(8).fill().map(()=>Array(8).fill(0))

let place = data

let check

function change_point(x, y, p){
  data[x-1][8-y] = p
}

function pieceAt(x, y){
  return data[x-1][7-y]
}

function free_square(x, y){
  sel = data[x][y]

  if (sel === 0){
    return true

  } else if (sel === sel.toLowerCase()){
    return false
  } else{
    return true
  }
}







let prev_piece
let prev_square

let highlight = [-1, -1]

let square_selected
let sel = 0

// 0: empty
// p: pawn (red)
// r: roock (yellow)
// h: knight (orange)
// b: bishop (blue)
// q: queen (green)
// k: king (pink)













for (q = 1; q<9; q++){
  change_point(q, 2, 'p')
  change_point(q, 7, 'P')
}

change_point(1, 1, 'r')
change_point(8, 1, 'r')
change_point(1, 8, 'R')
change_point(8, 8, 'R')

change_point(2, 1, 'h')
change_point(7, 1, 'h')
change_point(2, 8, 'H')
change_point(7, 8, 'H')

change_point(3, 1, 'b')
change_point(6, 1, 'b')
change_point(3, 8, 'B')
change_point(6, 8, 'B')

change_point(4, 1, 'q')
change_point(5, 1, 'k')
change_point(4, 8, 'Q')
change_point(5, 8, 'K')



let comb = []
let piece = 'p'
let legal_moves = [[]]



let piece_pos = [4, 1]

let prev

let id



function ava_moves (x, y){


  switch(data[x][y]){
    case 'p':


      if(y > 0 && data[x][y-1] === 0){
        legal_moves.push([x+1, 8-y])
        if(y === 6 && data[x][y-2] === 0){
          legal_moves.push([x+1, 9-y])
        }
      }

      if(y > 0 && x!=7 && data[x+1][y-1] != 0){
        if(data[x+1][y-1] === data[x+1][y-1].toUpperCase()){

          legal_moves.push([x+2, 8-y])
        }
      }
      if(y > 0 && x != 0 && data[x-1][y-1] != 0){
        if(data[x-1][y-1] === data[x-1][y-1].toUpperCase()){

          legal_moves.push([x, 8-y])
        }
      }
      break





      case 'r':

        for (v = y-1; -1<v; v--){

          if (data[x][v] != 0){
            if(data[x][v] != data[x][v].toLowerCase()){
              legal_moves.push([x+1, 7-v])
            }
            break
          } else{
            legal_moves.push([x+1, 7-v])


          }

        }


        for (v = y+1; v<8; v++){

          if (data[x][v] !=0){
            if(data[x][v] != data[x][v].toLowerCase()){
              legal_moves.push([x+1, 7-v])
            }
            break
          } else{
            legal_moves.push([x+1, 7-v])
          }

        }


        for (h = x+1; h<8; h++){

          if (data[h][y] !=0){
            if(data[h][y] != data[h][y].toLowerCase()){
              legal_moves.push([h+1, 7-y])
            }
            break
          } else{
            legal_moves.push([h+1, 7-y])
          }

        }


        for (h = x-1; -1<h; h--){

          if (data[h][y] !=0){
            if(data[h][y] != data[h][y].toLowerCase()){
              legal_moves.push([h+1, 7-y])
            }
            break
          } else{
            legal_moves.push([h+1, 7-y])
          }

        }
        break

      case 'h':



        prev = [x+2, 9-y]


        if(prev[0] < 9 && prev[1]<8){

          if (pieceAt(prev[0], prev[1]) != 0){

            if (pieceAt(prev[0], prev[1]) === pieceAt(prev[0], prev[1]).toUpperCase()){
              legal_moves.push([prev[0], prev[1]])
            }
          } else{
            legal_moves.push([prev[0], prev[1]])
          }

        }









        prev = [x, 9-y]


        if(prev[0] > 0 && prev[1]<8){

          if (pieceAt(prev[0], prev[1]) != 0){

            if (pieceAt(prev[0], prev[1]) === pieceAt(prev[0], prev[1]).toUpperCase()){
              legal_moves.push([prev[0], prev[1]])
            }
          } else{
            legal_moves.push([prev[0], prev[1]])
          }

        }









        prev = [x+3, 8-y]


        if(prev[0] < 9 && prev[1]<8){

          if (pieceAt(prev[0], prev[1]) != 0){

            if (pieceAt(prev[0], prev[1]) === pieceAt(prev[0], prev[1]).toUpperCase()){
              legal_moves.push([prev[0], prev[1]])
            }
          } else{
            legal_moves.push([prev[0], prev[1]])
          }

        }









        prev = [x-1, 8-y]


        if(prev[0] > 0 && prev[1]< 8){

          if (pieceAt(prev[0], prev[1]) != 0){

            if (pieceAt(prev[0], prev[1]) === pieceAt(prev[0], prev[1]).toUpperCase()){
              legal_moves.push([prev[0], prev[1]])
            }
          } else{
            legal_moves.push([prev[0], prev[1]])
          }

        }





        prev = [x-1, 6-y]


        if(prev[0] > 0 && prev[1]> -1){

          if (pieceAt(prev[0], prev[1]) != 0){

            if (pieceAt(prev[0], prev[1]) === pieceAt(prev[0], prev[1]).toUpperCase()){
              legal_moves.push([prev[0], prev[1]])
            }
          } else{
            legal_moves.push([prev[0], prev[1]])
          }

        }











        prev = [x, 5-y]


        if(prev[0] > 0 && prev[1]> -1){

          if (pieceAt(prev[0], prev[1]) != 0){

            if (pieceAt(prev[0], prev[1]) === pieceAt(prev[0], prev[1]).toUpperCase()){
              legal_moves.push([prev[0], prev[1]])
            }
          } else{
            legal_moves.push([prev[0], prev[1]])
          }

        }





        prev = [x+2, 5-y]


        if(prev[0] < 9 && prev[1]> -1){

          if (pieceAt(prev[0], prev[1]) != 0){

            if (pieceAt(prev[0], prev[1]) === pieceAt(prev[0], prev[1]).toUpperCase()){
              legal_moves.push([prev[0], prev[1]])
            }
          } else{
            legal_moves.push([prev[0], prev[1]])
          }

        }



        prev = [x+3, 6-y]


        if(prev[0] < 9 && prev[1]> -1){

          if (pieceAt(prev[0], prev[1]) != 0){

            if (pieceAt(prev[0], prev[1]) === pieceAt(prev[0], prev[1]).toUpperCase()){
              legal_moves.push([prev[0], prev[1]])
            }
          } else{
            legal_moves.push([prev[0], prev[1]])
          }

        }


        break














      case 'b':

        for (v = y-1; -1<v; v--){
          if(y-v+x > 7){
            break
          }
          if (data[y-v+x][v]!= 0){

            if(data[y-v+x][v] != data[y-v+x][v].toLowerCase()){
              legal_moves.push([y-v+x+1, 7-v])
            }
            break
          } else{
            legal_moves.push([y-v+x+1, 7-v])


          }

        }






        for (v = y+1; v<8; v++){
          if(y-v+x < 0){
            break
          }

          if (data[y-v+x][v]!= 0){

            if(data[y-v+x][v] != data[y-v+x][v].toLowerCase()){
              legal_moves.push([y-v+x+1, 7-v])
            }
            break
          } else{
            legal_moves.push([y-v+x+1, 7-v])


          }

        }





        for (v = y+1; v<8; v++){


          if(v-y+x > 7){
            break
          }

          if (data[v-y+x][v]!= 0){

            if(data[v-y+x][v] != data[v-y+x][v].toLowerCase()){
              legal_moves.push([v-y+x+1, 7-v])
            }
            break
          } else{
            legal_moves.push([v-y+x+1, 7-v])


          }

        }

        for (v = y-1; -1<v; v--){
          if(v-y+x < 0){
            break
          }
          if (data[v-y+x][v]!= 0){

            if(data[v-y+x][v] != data[v-y+x][v].toLowerCase()){
              legal_moves.push([v-y+x+1, 7-v])
            }
            break
          } else{
            legal_moves.push([v-y+x+1, 7-v])


          }

        }
        break



      case 'q':
        for (v = y-1; -1<v; v--){
          if(y-v+x > 7){
            break
          }
          if (data[y-v+x][v]!= 0){

            if(data[y-v+x][v] != data[y-v+x][v].toLowerCase()){
              legal_moves.push([y-v+x+1, 7-v])
            }
            break
          } else{
            legal_moves.push([y-v+x+1, 7-v])


          }

        }






        for (v = y+1; v<8; v++){
          if(y-v+x < 0){
            break
          }

          if (data[y-v+x][v]!= 0){

            if(data[y-v+x][v] != data[y-v+x][v].toLowerCase()){
              legal_moves.push([y-v+x+1, 7-v])
            }
            break
          } else{
            legal_moves.push([y-v+x+1, 7-v])


          }

        }





        for (v = y+1; v<8; v++){


          if(v-y+x > 7){
            break
          }

          if (data[v-y+x][v]!= 0){

            if(data[v-y+x][v] != data[v-y+x][v].toLowerCase()){
              legal_moves.push([v-y+x+1, 7-v])
            }
            break
          } else{
            legal_moves.push([v-y+x+1, 7-v])


          }

        }

        for (v = y-1; -1<v; v--){
          if(v-y+x < 0){
            break
          }
          if (data[v-y+x][v]!= 0){

            if(data[v-y+x][v] != data[v-y+x][v].toLowerCase()){
              legal_moves.push([v-y+x+1, 7-v])
            }
            break
          } else{
            legal_moves.push([v-y+x+1, 7-v])


          }

        }
        for (v = y-1; -1<v; v--){

          if (data[x][v] != 0){
            if(data[x][v] != data[x][v].toLowerCase()){
              legal_moves.push([x+1, 7-v])
            }
            break
          } else{
            legal_moves.push([x+1, 7-v])


          }

        }


        for (v = y+1; v<8; v++){

          if (data[x][v] !=0){
            if(data[x][v] != data[x][v].toLowerCase()){
              legal_moves.push([x+1, 7-v])
            }
            break
          } else{
            legal_moves.push([x+1, 7-v])
          }

        }


        for (h = x+1; h<8; h++){

          if (data[h][y] !=0){
            if(data[h][y] != data[h][y].toLowerCase()){
              legal_moves.push([h+1, 7-y])
            }
            break
          } else{
            legal_moves.push([h+1, 7-y])
          }

        }


        for (h = x-1; -1<h; h--){

          if (data[h][y] !=0){
            if(data[h][y] != data[h][y].toLowerCase()){
              legal_moves.push([h+1, 7-y])
            }
            break
          } else{
            legal_moves.push([h+1, 7-y])
          }

        }
        break

      case 'k':




      if(y > 0){
        if(data[x][y-1] === 0){
          legal_moves.push([x+1, 8-y])
        } else if (data[x][y-1] === data[x][y-1].toUpperCase()){
            legal_moves.push([x+1, 8-y])
        }

      }


      if(y < 7){
        if(data[x][y+1] === 0){
          legal_moves.push([x+1, 6-y])
        } else if (data[x][y+1] === data[x][y+1].toUpperCase()){
            legal_moves.push([x+1, 6-y])
        }

      }

      if(x > 0){
        if(data[x-1][y] === 0){
          legal_moves.push([x, 7-y])
        } else if (data[x-1][y] === data[x-1][y].toUpperCase()){
            legal_moves.push([x, 7-y])
        }

      }

      if(x < 7){
        if(data[x+1][y] === 0){
          legal_moves.push([x+2, 7-y])
        } else if (data[x+1][y] === data[x+1][y].toUpperCase()){
            legal_moves.push([x+2, 7-y])
        }

      }













  }



}






function check_for_check (){
  legal_moves = [[]]
  for(x = 0; x<8; x++){
    for(y = 0; y<8; y++){
      if(data[x][y] != 0){
        if(data[x][y] === data[x][y].toLowerCase()){

          ava_moves(x, y)
        }

      }
    }
  }
  for(p = 0; p<8; p++){
    if(data[p].indexOf('K') != -1){
      console.log(data[p][data[p].indexOf('K')])
      console.log(p, data[p].indexOf('K'))
      break
    }

  }

  for(z=0;z<legal_moves.length;z++){

    if (legal_moves[z][0]-1 === p && 7-legal_moves[z][1] === data[p].indexOf('K')){
      console.log("CHECK")
      return true
      break
    }
  }
  return false


}





function flip_board(){
  let total = [[]]
  for (x = 7; x>-1; x--){
    comb = []
    for(y = 7; y>-1; y--){
      if(data[x][y] === 0){
        comb.push(data[x][y])
      } else if (data[x][y] === data[x][y].toUpperCase()){
        comb.push(data[x][y].toLowerCase())
      } else{
        comb.push(data[x][y].toUpperCase())
      }

    }
    total.push(comb)
  }
total.shift()
return total
}
















function draw() {

  if(menu){


    if(settings){
    background(80)
    fill(50)
    noStroke()
    rect(150, 100, 500, 800, 40)
    fill(40)
    rect(180, 120, 440, 100, 40)

    fill(235, 235, 211)
    textSize(60)
    textStyle(BOLD)
    textAlign(CENTER)

    text('SETTINGS', width/2, 190)



    textSize(20)
    textAlign(LEFT)

    text("MOVE GUIDE'S ENABLED", 200+30, 300)
    text("REALISTIC BOARD", 200+30, 350)
    text("POINTS", 200+30, 400)

    fill(40)
    textAlign(CENTER)

    if(mouseX>260 && mouseX<540 && mouseY>600 && mouseY<670){
      rect(300-10, 600-5, 200+20, 70+10, 40)
      textSize(38)
    } else{
      rect(300, 600, 200, 70, 40)
      textSize(35)
    }

    fill(235, 235, 211)
    text('BACK', width/2, 650)









    if(mg){
      fill(125, 146, 92)
    } else{
      fill(40)
    }
    square(480+30, 280, 30, 5)

    if(rb){
      fill(125, 146, 92)
    } else{
      fill(40)
    }
    square(480+30, 330, 30, 5)



    if(po){
      fill(125, 146, 92)
    } else{
      fill(40)
    }
    square(480+30, 380, 30, 5)







  }else if (computer) {
      background(80)

      fill(50)
      noStroke()
      rect(150, 100, 500, 800, 40)
      fill(40)
      rect(180, 120, 440, 100, 40)

      fill(235, 235, 211)
      textSize(60)
      textStyle(BOLD)
      textAlign(CENTER)
      text('CHESS MENU', width/2, 190)
      textSize(35)


      fill(40)
      rect(width/2-60, 240, 120, 120, 20)
      image(icon1, width/2-60, 240, 120, 120)

      if(mouseX>200 && mouseX<300 && mouseY>380 && mouseY<480){
        rect(200-10, 380-10, 100+20, 100+20, 20)
        image(imgB[5], 200-10, 380-10, 100+20, 100+20)
      } else{
        rect(200, 380, 100, 100, 20)
        image(imgB[5], 200, 380, 100, 100)
      }

      if(mouseX>350 && mouseX<450 && mouseY>380 && mouseY<480){
        rect(350-10, 380-10, 100+20, 100+20, 20)
        image(imgW[5], 350-10, 380-10, 100+20, 100+20)
      } else{
        rect(350, 380, 100, 100, 20)
        image(imgW[5], 350, 380, 100, 100)
      }





  } else{
    background(80)
    fill(50)
    noStroke()
    rect(150, 100, 500, 800, 40)
    fill(40)
    rect(180, 120, 440, 100, 40)
    rect(220, 280, 360, 70, 40)




    if(mouseX>260 && mouseX<540 && mouseY>600 && mouseY<670){
      rect(260-10, 600-5, 280+20, 70+10, 40)
      textSize(38)
    } else{
      rect(260, 600, 280, 70, 40)
      textSize(35)
    }

    fill(235, 235, 211)
    text('SETTINGS', width/2, 650)





    fill(235, 235, 211)
    textSize(60)
    textStyle(BOLD)
    textAlign(CENTER)
    text('CHESS MENU', width/2, 190)
    textSize(35)



    text('PLAY AGAINST', width/2, 330)

    fill(40)
    if(mouseX>200 && mouseX<300 && mouseY>380 && mouseY<480){
      rect(200-10, 380-10, 100+20, 100+20, 20)
      image(icon1, 200-10, 380-10, 100+20, 100+20)
    } else{
      rect(200, 380, 100, 100, 20)
      image(icon1, 200, 380, 100, 100)
    }




    rect(350, 380, 100, 100, 20)
    rect(500, 380, 100, 100, 20)





    textAlign(CENTER)

    fill(235, 235, 211)
    textSize(20)

    text('FRIEND', 250, 520)




    text('COMPUTER', 400, 520)




    text('RANDOM', 550, 520)

    textSize(70)

    text('❌', 400, 455)

    text('❌', 550, 455)








  }


  } else{

  if (wait){
    if(counter<100){
      counter++
    } else{
      data = flip_board()
      counter = 0
      if(white_turn){
        white_turn = false
      } else{
        white_turn = true
      }

      wait = false


    }
  }


  background(80);

  fill(40)

  square(50, 150, 700, 20)

  fill(255)


  if(!rb){
  for (y=0; y<8; y++){
      for (x=0; x<8; x++){
        if (white){
          fill(235, 235, 211)
          white = false
        } else{
          fill(125, 146, 92)
          white = true
        }


        square(x*80+80, y*80+80+100, 80)


      }
    if(white){
      white = false
    } else{
      white = true
    }



    }
  } else{
    image(board, 80-20, 180-20, 640+40, 640+40)
  }

  fill(255, 0, 0)

  for (y=0; y<8; y++){
      for (x=0; x<8; x++){
         if (data[x][y] != 0){

          switch (data[x][y].toLowerCase()) {
              case 0:
                fill(0)
                break;
              case 'p':
                id = [0]
                break;
              case 'r':
                id = [1]
                break;
              case 'h':
                id = [2]
                break;
              case 'b':
                id = [3]
                break;
              case 'q':
                id = [4]
                break;
              case 'k':
                id = [5]
                break;
              default:
                fill(0)
                //
            }

           if(data[x][y].toLowerCase() === data[x][y]){
             if(white_turn){
               image(imgW[id], x*80+85, y*80+85+100, 70, 70);
             } else{
               image(imgB[id], x*80+85, y*80+85+100, 70, 70);
             }
           } else{
             if(white_turn){
               image(imgB[id], x*80+85, y*80+85+100, 70, 70);
             } else{
               image(imgW[id], x*80+85, y*80+85+100, 70, 70);
             }
           }

         }
    }

  }
  if(mg){
  for (i = 1; i<legal_moves.length; i++){
    if (data[legal_moves[i][0]-1][7-legal_moves[i][1]] === 0){
      noStroke()
      circle(legal_moves[i][0]*80+40, (8-legal_moves[i][1])*80+40+100, 25);

    } else{
      noFill()
      stroke(255, 0, 0);
      strokeWeight(10);
      circle(legal_moves[i][0]*80+40, (8-legal_moves[i][1])*80+40+100, 80);
      stroke(0)
      strokeWeight(1);
      fill(255, 0, 0)

    }

  }
  }

  if (highlight [0]> -1 && highlight [1]> -1){
    stroke(255, 0, 255);
    strokeWeight(10);
    noFill()
    square(highlight[0]*80+80, highlight[1]*80+80+100, 80)
    stroke(0);
    strokeWeight(1);

  }

  if(!rb){
  let letter = 'abcdefgh'

  fill(0)
  noStroke()

  textSize(22);


  strokeWeight(3)
  textAlign(CENTER);

  for(i = 0; i<8; i++){

    if(i%2 === 1){
      fill(235, 235, 211)

    } else{
      fill(125, 146, 92)
    }

    text(8-i, 90, 140+i*80+63);
  }


  for(i = 0; i<8; i++){
    if(i%2 === 1){

      fill(125, 146, 92)
    } else{

      fill(235, 235, 211)
    }

    text(letter[i], 150+i*80, 770+45);

  }


}
textStyle(BOLD)
noStroke()
fill(50)
textSize(30)
textAlign(CENTER)


rect(0, 0, width, 100, 60)
fill(235, 235, 211)

if(white_turn){
  text("White's Move", width/2, 60)
} else{
  text("Black's Move", width/2, 60)
}
}


}










function mouseClicked(){
  console.log("CLICK")

  if(menu){
    console.log("MENU")

    if(settings){

      if(mouseX>500+30-15 && mouseX<500+30+15 && mouseY>300-15 && mouseY<300+15){
        if(mg){
          mg = false
        } else{
          mg = true
        }
      }

      if(mouseX>500+30-15 && mouseX<500+30+15 && mouseY>350-15 && mouseY<350+15){
        if(rb){
          rb = false
        } else{
          rb = true
        }
      }


      if(mouseX>500+30-15 && mouseX<500+30+15 && mouseY>400-15 && mouseY<400+15){
        if(po){
          po = false
        } else{
          po = true
        }
      }
      if(mouseX>260 && mouseX<540 && mouseY>600 && mouseY<670){
        settings = false
      }

    } else{



      if(mouseX>260 && mouseX<540 && mouseY>600 && mouseY<670){
        settings = true

      }
      rect(200, 380, 100, 100, 20)

      if(mouseX>200 && mouseX<200+100 && mouseY>380-100 && mouseY<380+100){
        menu = false

      }
    }




  } else{

  if(!wait){




  fill(0, 0, 255)
  if(round((mouseY-220)/80)<8 && round((mouseY-220)/80) > -1 && round((mouseX-120)/80)<8 && round((mouseX-120)/80)>-1){
    highlight = [round((mouseX-120)/80), round((mouseY-220)/80)]
  }

  prev_piece = square_selected

  square_selected = data[highlight[0]] [highlight[1]]




  if (square_selected != 0 && square_selected === square_selected.toLowerCase()){
    legal_moves = [[]]
    ava_moves(highlight[0], highlight[1])

  } else if (prev_piece != 0 && square_selected != square_selected.toLowerCase){

    for (z = 0; z<legal_moves.length; z++){


      if (highlight[0]+1 === legal_moves[z][0] && 7-highlight[1] === legal_moves[z][1]){
        legal_moves = [[]]

        console.log("Check if check")
          for(p = 0; p<8; p++){
            if(data[p].indexOf('K') != -1){
              break
            }

          }

        ava_moves(p, 7-data[p].indexOf('K'))
        king_moves = legal_moves
        legal_moves = [[]]





        data[prev_square[0]][prev_square[1]] = 0
        data[highlight[0]][highlight[1]] = prev_piece




        data = flip_board()

        if(check_for_check()){
          check = true
          let backup = legal_moves


          let moves_left = king_moves.length-1




          for(z=0; z<backup.length; z++){
          for(q=0; q<king_moves.length; q++){
            if(king_moves[q][0] === backup[z][0] && king_moves[q][1] === backup[z][1]){
              moves_left--
            }
          }


          }

          if(moves_left === 0){
            console.log("CHECKMATE")
          }









        } else{
          check = false
        }

        data = flip_board()

        if (check === true){
          data[prev_square[0]][prev_square[1]] = prev_piece
          data[highlight[0]][highlight[1]] = 0


        } else{
          wait = true


        }

        break


      }


    }
    legal_moves = [[]]

  } else{
    legal_moves = [[]]
  }
  prev_square = highlight


  }
  }

}
