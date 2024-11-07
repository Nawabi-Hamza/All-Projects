//============================================================================================================//
/** 2667. Create Hello World Function
 * Create a function return Hello Worlds it take paramerters 
 */
//============================================================================================================//
const helloWorld = ()=> (...args)=> "Hello World"
const f = helloWorld()
console.log(f())

//============================================================================================================//
/** 2620. Counter
 * create a function take a number in parameter every time it called it increment
 */
//============================================================================================================//
// function parent(){
//     console.log("Parent")
//     return function child(){
//         console.log("child")
//     }
// }
// const w = parent()
// w()
// w()
// w()
// const Counter = (n) => () => n++
// const m = Counter(4)
// console.log(m())
// console.log(m())
// console.log(m())

//============================================================================================================//
/** 2704. To Be Or Not To Be
 * create a expect and toBe to check value are same or not
 */
//============================================================================================================//
// const expect = (value)=>(
//     {
//         toBe:function(val){
//             if(value===val) return true
//             return "Not Equal"
//         },
//         notToBe:function(val){
//             if(value!==val) return true
//             throw "Equal"
//         }
//     }
// )
// console.log(expect(3).toBe(39))

//============================================================================================================//
/** 2665. Counter II
 * create a function to take param as number then create three nested function to increment decrement and reset 
 * at the end return increment decrement and reset as object
 */
//============================================================================================================//
// function CounterII(number){
//     let countState = number;
//     const increment = ()=> ++number
//     const decrement = ()=> --number
//     const reset = ()=> number = countState

//     return { 
//         increment,
//         decrement,
//         reset
//     }
// }
// const count = CounterII(4)
// console.log(count.increment())
// console.log(count.decrement())
// console.log(count.increment())
// console.log(count.reset())
// console.log(count.increment())

//============================================================================================================//
/** 2635. Apply Transform Over Each Element in Array
 * create an array take two parameter first parameter be an array then second parameter should be a function pass by user
 * the second parameter function it take one paramter
 * 
*/
//============================================================================================================//
// function transform(arr,func){
//     arr.map( (i,idx) => console.log(i,func(i,idx)))
// }
// transform([1,2,3],function plusone(n,i) { return n+1; })
 // arr[0] * arr[0] + arr[0] = 2 / 5 / 10
//============================================================================================================//
/** 2634. Filter Elements from Array
 * filter array  take array then filter it and then the filter should be the user argument
 */
//============================================================================================================//
// function filterArr(arr,func){
//     return arr.filter((a)=> func(a))
//     // return arrFilter
// }
// console.log(filterArr([0,10,20,30],function(n){
//     return n > 0
// }))

//============================================================================================================//
/** 2629. Function Composition
 * give an array as argument in function and all array element are function 
 * then we have a variable x it take integer number then it send at last function of array element
 * then the last function element return new value then it pass as arguement at (last element of array - 1 )
 * then the result pass the (last element of array - 2)
 */
//============================================================================================================//
// const arrFunc ="[fun1,func2,func3 ,....]"

function compose(arrFunc){
    return function(x){
        for(let fn of arrFunc.reverse()){
            x = fn(x)
        }
        return x
    }
}
const funArr = [x => x + 1, x => x * x, x => 2 * x]
const com = compose(funArr)
console.log(com(3))
