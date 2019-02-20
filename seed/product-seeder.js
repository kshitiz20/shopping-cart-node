var mongoose= require('mongoose');
var {Product}= require('../model/product');


mongoose.connect('mongodb://localhost:27017/shopping');
var products= [new Product({
    imagePath:"https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Call_of_Duty_4_Modern_Warfare.jpg/220px-Call_of_Duty_4_Modern_Warfare.jpg",
    title:"COD: Modern Warfare",
    description:"Awesome Game!!!!!!!!!!!!!",
    price:12
}), new Product({
    imagePath:"https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Call_of_Duty_4_Modern_Warfare.jpg/220px-Call_of_Duty_4_Modern_Warfare.jpg",
    title:"COD: Modern Warfare",
    description:"Awesome Game!!!!!!!!!!!!!",
    price:12
}), new Product({
    imagePath:"https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Call_of_Duty_4_Modern_Warfare.jpg/220px-Call_of_Duty_4_Modern_Warfare.jpg",
    title:"COD: Modern Warfare",
    description:"Awesome Game!!!!!!!!!!!!!",
    price:12
}), new Product({
    imagePath:"https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Call_of_Duty_4_Modern_Warfare.jpg/220px-Call_of_Duty_4_Modern_Warfare.jpg",
    title:"COD: Modern Warfare",
    description:"Awesome Game!!!!!!!!!!!!!",
    price:12
})]

var done=0;

for(var i=0;i<products.length;i++){
    done++;
    products[i].save((err, result)=>{
        if(done===products.length){
            exit();
        }
    })
   
}

function exit(){
mongoose.disconnect();
}