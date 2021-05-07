var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed, lastfeed;
var fedtime; 
var FEEDtime;



function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  FeedDog= createButton("Feed the Dog");
  FeedDog.position(705, 95);
  FeedDog.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  FEEDtime= hour();

  feedDog();
}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 

  //lastfeed= database.ref('feedTime');
  //lastfeed.on("value", readfeedtime);
 
  fill("white");
  textSize(20);


  text("Last Fed: " + FEEDtime ,370, 30);
  
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  

var foodStalkValue= foodObj.getFoodStock();

if(foodStalkValue <= 0){

  foodObj.updateFoodStock(foodStalkValue *0);

}
else{

foodObj.updateFoodStock(foodStalkValue -1);  
}
hour();

  }

 

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
//function readfeedtime(data){

  //fedtime= data.val();
  //lastfeed.getFedTime(fedtime);
   
    
    
   // }