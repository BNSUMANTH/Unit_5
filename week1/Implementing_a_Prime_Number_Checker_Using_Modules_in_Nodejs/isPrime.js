function isPrime(a){

    if(a<2){
        return `${a} is not a prime number`;
    }
    for(let i=2;i<a;i++){
        if(a%i==0){
            return `${a} is not a prime number`;
        }
    }
    return `${a} is a prime number`;
}

module.exports=isPrime;