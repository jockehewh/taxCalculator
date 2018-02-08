/*
0 > 50 000 000 tax = 5%
50 000 000 tax > 250 000 000 = 15%
250 000 000 > 500 000 000 = 25%
500 000 000 + = 30%
*/
//window.capControl = {}

class taxCalc {
    prevent(){
       document.taxCalculator.addEventListener('submit', (e)=>{
           e.preventDefault();
       })
    }

    watch(){
        document.querySelector('#income').addEventListener('change',()=>{
        console.log('changeed')
        let result = document.querySelector('#income').value;
        let totalTax = document.querySelector('#totalTax');
        let calculation = 0;
        this.allCap(result).then((a) => {
            totalTax.innerText = a;
        });
    })
}
    async calculator(result){
        let stepOne = await this.allCap(result);
        return stepOne;
    }
    allCap(result){
        let capOne, capTwo, capThree, capFour, nextCount;
        let totalTax = 0;
        let remains;

        return new Promise((resolve, reject) => {
            if(result<0){
                reject('Your income cannot be inferior to Zero')
                let finalTax = document.querySelector('#totalTax');
                finalTax.innerText = 'Your income cannot be inferior to Zero'
            }
            if(result > 500000000){
                remains = result - 500000000;
                capFour = (30/100) * remains;
                nextCount = 500000000;
                console.log(nextCount)
                if(capFour !== undefined){totalTax+=capFour}else{totalTax=totalTax}
            }else{
                nextCount = result;
            }
            if( nextCount <= 500000000 && nextCount > 250000000){
                remains = result-250000000
                capThree = (25/100) * remains;
                nextCount = 250000000;
                console.log(nextCount)
                if(capThree !== undefined){totalTax+=capThree}else{totalTax=totalTax}
            }else{
                nextCount = result;
            }
            if(nextCount <= 250000000 && nextCount > 50000000){
                remains = result-50000000
                capTwo = (15/100) * remains
                nextCount = 50000000
                console.log(nextCount)
                if(capTwo !== undefined){totalTax+=capTwo}else{totalTax=totalTax}
            }else{
                nextCount = result;
            }
            if(nextCount <= 50000000){
                capOne = (5/100)* nextCount;
                console.log(nextCount)
                if(capOne !== undefined){totalTax+=capOne}else{totalTax=totalTax}
            }
            console.log(totalTax)
            resolve(totalTax);
        }, (err) =>{
            console.log(err);
        })
    }
}

window.onload = function(){
    let watcher = new taxCalc;
    watcher.prevent();
    watcher.watch();
}
