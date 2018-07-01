console.log("You Sunk My BattleShip!!!")

//object for holding playerfleet info

class Fleet {
  constructor(){
  // store ships in an array
    this.ships = [];
    //hold length left of ship
    this.shipsLength = [5, 4, 3, 3, 2];
    //store ship location
    // this.shipLocation = shipLocation;
    //store hits
    // this.hit =  hit;
    //stor missed
    // this.miss = miss;
    //Game board
    // this.gameBoard = new Board();
  }
//mathod to place ships
  startGame(){

  }
  // method for slecting grid items
  click(){

  }
    // method to locate ships when clicking for placement
  findShip(){

  }
  //method to place ships in begining
  placeShip (){

  }
  //method to execute attack
  shoot(){

  }
  //method to mark hits and misses on the board
  hitOrMiss(){

  }
  // method to store remaining length after turn
  storeLength(){

  }
  //method to update game board after turn
  updateBoard(){

  }
  //method to switch turns
  changeTurn(){

  }
  //method for sinking ships
  sinkShip() {

  }
}

// const player = new Fleet(ships, shipsLength, shipLocation)

// const cpu = new Fleet(ships, shipsLength, shipLocation)


// make the graph out of divs in html

// maybe make a loop also for clicking on grid

// right rules that dont allow putting ships length 
// out of strait line

// rule that changes turn each shot

// rule that hits or misses

//rule that sinks ship

//need to figure out how to make computers turn random
//while placing ships in an ordered line still 






const fleet = new Fleet();




class Board {

  constructor(){
    this.board = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  }

  placeShip(length) {

      let usedSpaces = [];
      /*
        well always lay ship from top down and from left to right
        subtracting the length from the starting vertices should ensure
        that we can only start laying it
      */
      const randomStartingPoint = (length) => Math.floor(Math.random() * (10 - length));
      const randomOtherPoint = Math.floor(Math.random() * 10);
      const orientation = Math.random() >= 0.5;

      const xAxis = orientation ? randomStartingPoint(length) : randomOtherPoint;
      const yAxis = !orientation ? randomStartingPoint(length) : randomOtherPoint;



      if(orientation === true) {
          let shipUsedSpaces = [];
          for(let i = 0; i < length; i++){
              let x = xAxis + i;
              let y = yAxis;
              let squareName = `row-${x+1}-column-${y+1}`;
              // usedSpaces.push(squareName);
              shipUsedSpaces.push(squareName);
          }
          for(let i in shipUsedSpaces){
              if(usedSpaces.indexOf(i) > -1){
                  this.placeShip(length);
              } else {
                  shipUsedSpaces.forEach((e) => {
                      usedSpaces.push(e);
                      let splitName = e.split('-');
                      let rowNum = splitName[1] - 1;
                      let columnNum = splitName[3] -1;

                      this.board[rowNum][columnNum] = 1;
                  })
              }
          }
      } else {
          let shipUsedSpaces = [];
              for(let i = 0; i < length; i++){
                  let x = xAxis;
                  let y = yAxis + i;
                  let squareName = `row-${x+1}-column-${y+1}`;
                  // usedSpaces.push(squareName);
                  shipUsedSpaces.push(squareName);
              }

              for(let i in shipUsedSpaces){
                  if(usedSpaces.indexOf(i) > -1){
                      this.placeShip(length);
                  } else {
                      shipUsedSpaces.forEach((e) => {
                          usedSpaces.push(e);
                          let splitName = e.split('-');
                          let rowNum = splitName[1] - 1;
                          let columnNum = splitName[3] -1;

                          this.board[rowNum][columnNum] = 1;
                      })
                  }
              }
          }
          console.log('used spaces', usedSpaces);
      }

  renderBoard() {
      const boardWidth = this.board[0].length;
      const rows = $(".row");

      for(let i = 0; i < rows.length; i++) {
          let column = rows[i];
          let rowContents = this.board[i - 1];

          if(i === 0){
              column.insertAdjacentHTML('beforeend', '<div class="square top">#</div>');
          } else {
              column.insertAdjacentHTML('beforeend', `<div class="square top">${String.fromCharCode(i + 64)}</div>`);
          }

          for(let j = 0; j < boardWidth; j++){
              if(i === 0){
                  column.insertAdjacentHTML('beforeend', `<div class="square top">${j + 1}</div>`);
              } else {
                  if(rowContents[j] === 1){
                      column.insertAdjacentHTML('beforeend', `<div class="square top" style="background: deepskyblue"></div>`);
                  } else {
                      column.insertAdjacentHTML('beforeend', `<div class="square top"></div>`);

                  }
              }
          }

      }

  }


}

const board = new Board();
const ships = new Fleet();
const fleetShipSize = ships.shipsLength;

fleetShipSize.forEach((e) => {
    board.placeShip(e);
});


board.renderBoard();