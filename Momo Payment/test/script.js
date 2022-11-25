
// var myVar;

// function myFunction() {
//     myVar = setTimeout(function () { alert("Hello") }, 3000);
// }

// function myStopFunction() {
//     clearTimeout(myVar);
// }

// // myFunction()
// var num = 1
// var temp

// function doSetTimeOut(num)
// {
//     setTimeout(function () {
//         console.log(num)
//         // num++
        
//     },1000)
// }
// var a = function TimeOut() {



//     // if(num == 5)
//     // {
//     //     console.log(num)
//     //     clearTimeout(temp)


//     // }
    
//     while (1) {
//         // console.log(num)
//         // setTimeout(function () {
//         //     console.log(num)
//         //     num++
            
//         // },1000)
//         doSetTimeOut(num)
//         num++
//         if(num == 5)
//         {
//             break
//         }
//     }
//     // temp = setTimeout(a, 1000)

// }




// a()

// console.log('hahah')
var myTimeout
var num = 0
var a = function()
{
    myTimeout = setTimeout(a, 1000);
    myGreeting('hahaha')
    
    num++
    console.log(num)
    if(num==5)
    {
        clearTimeout(myTimeout)
    }
   
    
}
a()

function myGreeting(arg) {
  console.log("Welcome back " + arg)
}

// clearTimeout(myTimeout)


// var i = 1;                  //  set your counter to 1

// function myLoop() {         //  create a loop function
//   setTimeout(function() {   //  call a 3s setTimeout when the loop is called
//     console.log('hello');   //  your code here
//     i++;                    //  increment the counter
//     if (i < 10) {           //  if the counter < 10, call the loop function
//       myLoop();             //  ..  again which will trigger another 
//     }                       //  ..  setTimeout()
//   }, 1000)
// }

// myLoop();