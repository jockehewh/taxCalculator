describe('testing testing 123', function(){
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
            this.allCap(result).then((a) => {
                console.log(a)
                totalTax.innerText = a;
            });
            //this.calculator(result).then(final => {console.log(final)})
            
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
                }
                if(result > 500000000){
                    remains = result - 500000000;
                    capFour = (30/100) * remains;
                    nextCount = 500000000;
                    if(capFour !== undefined){totalTax+=capFour}else{totalTax=totalTax}
                }else{
                    nextCount = result;
                }
                if( nextCount <= 500000000 && nextCount > 250000000){
                    remains = result-250000000
                    capThree = (25/100) * remains;
                    nextCount = 250000000;
                    if(capThree !== undefined){totalTax+=capThree}else{totalTax=totalTax}
                }else{
                    nextCount = result;
                }
                if(nextCount <= 250000000 && nextCount > 50000000){
                    remains = result-50000000
                    capTwo = (15/100) * remains
                    nextCount = 50000000
                    if(capTwo !== undefined){totalTax+=capTwo}else{totalTax=totalTax}
                }else{
                    nextCount = result;
                }
                if(nextCount <= 50000000){
                    capOne = (5/100)* nextCount;
                    if(capOne !== undefined){totalTax+=capOne}else{totalTax=totalTax}
                }
                console.log(totalTax)
                describe("total tax tester", function(){
                    it('have to test for total tax', function(){
                        if(result === 50000000){
                            expect(totalTax).toBe(2500000)
                        }
                        if(result === 250000000){
                            expect(totalTax).toBe(32500000)
                        }
                        if(result === 750000000){
                            expect(totalTax).toBe(307500000)
                        }
                    })
                })
                resolve(totalTax);
            }, (err) =>{
                describe("error tester is live", function(){
                    it("logs my error", function(){
                        if(result < 0){
                            expect(err).toBe("Your income cannot be inferior to Zero")
                        }
                    })
                })
                console.log(err);
                
            })
        }
    }
 var watcher = new taxCalc;
 watcher.allCap(50000000)
 watcher.allCap(250000000)
 watcher.allCap(750000000)
 watcher.allCap(-250000000)
})