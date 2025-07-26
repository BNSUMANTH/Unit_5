function factorial(a){
    let fact=1;
    for(let i=2;i<=a;i++){
        fact*=i;
    }
    return `Factorial of ${a} is:${fact}`;
}
module.exports=factorial;