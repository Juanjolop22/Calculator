
const inputNum = document.getElementById('id-display'),
      buttonNum = document.querySelectorAll('.number'),
      buttonOperator = document.querySelectorAll('.operator');

const formatNumber = (num)=> {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


const clickItem = (itemInput, itemNum) =>{

   for(let i = 0; i<itemNum.length; i++){
        itemNum[i].addEventListener('click', function(){

            if (itemInput.value.length < 16 ) {
                itemInput.value += itemNum[i].textContent;
                itemNum[i].classList.add('buttonPressed')
                setTimeout(() => {
                    itemNum[i].classList.remove('buttonPressed'); 
                }, 250);

            }else if(itemInput.value.length > 15){
                alert('no puedes operar con más de 15 numeros')
            }   

            itemNum.disabled = true;
        })
    }
    console.log(itemNum)

}

clickItem(inputNum, buttonNum, buttonOperator);

const clickItemOperate = (itemInput, itemOperator) =>{
    let firstNum = null;
    let secondNum = null;
    let operator = null;

    for(let i = 0; i<itemOperator.length; i++){
        itemOperator[i].addEventListener('click', function(){
          const inputToNum = parseFloat(itemInput.value);

            if(itemOperator[i].textContent === 'c'){
            itemInput.value = '';
            firstNum = null;
            secondNum = null;
            operator = null;

            }else if(['x', '+', '-', '/' ].includes(itemOperator[i].textContent)){

                 if(firstNum === null){
                    firstNum = inputToNum;
                    operator = itemOperator[i].textContent;
                    itemInput.value += ' ' + operator + ' ';
                }

            }else if(itemOperator[i].textContent === '='){ 

                const parts = itemInput.value.split(' ');
                secondNum = parseFloat(parts[2])

                let result = 0;

                const operations = {
                    '+': (a, b) => a + b,
                    '-': (a, b) => a - b,
                    'x': (a, b) => a * b,
                    '/': (a, b) => a / b
                };

                if (operations[operator]) {
                    result = operations[operator](firstNum, secondNum);
                }

                itemInput.value = formatNumber(result);
                firstNum = null;
                operator = null;
            }
        })
    }
}
clickItemOperate(inputNum, buttonOperator);

      
