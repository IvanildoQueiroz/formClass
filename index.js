class validationCPF{
    constructor(cpf){
        this.formulario = document.querySelector('form');
        this.event();
        Object.defineProperty(this,'CPF',{
            enumerable:true,
            get: function(){
                return cpf.replace(/\D+/g, '')
            },
            set: function(e){
                return cpf = e
            }
        })
            
    };
    event(){
        this.formulario.addEventListener('submit', (e) => {
          this.handleSubmit(e); 
        })
    }
    handleSubmit(e){
        e.preventDefault();
        this.ValidsField();
    }
    createErr(field,text){
        field.nextElementSibling.textContent = text;
        field.style.borderColor = 'red';
        field.nextElementSibling.classList.add('error');
    }
    ValidsField(){
        let valid = true;
        for (let field  of this.formulario.querySelectorAll('.valid')) {
            let label = field.previousElementSibling.innerHTML;
            if (!field.value) {
                this.createErr(field,`Informe os dados solicitados no campo ${label}`)
                valid=false;
            }
            if(field.value){
                field.style.borderColor = 'green'
                field.nextElementSibling.classList.remove('error');
                field.nextElementSibling.textContent = "";
            }
            if(field.classList.contains('userCPF')){
                p1.CPF = dataCPF.value
                this.calculateCPF()
                
            }
        }
    }
    calculateCPF(){
        const dataCPF = document.querySelector('#dataCPF');
        if(this.CPF.length < 11 ){
            setTimeout(()=>{
                dataCPF.nextElementSibling.textContent ="O CPF precisa ter exatamente 11 digitos";
                dataCPF.style.borderColor='red';
            },2000)
            }
        
        let newCPF = this.CPF.slice(0,-2)
        console.log(newCPF)
        newCPF += validationCPF.createDigit(newCPF);
        newCPF += validationCPF.createDigit(newCPF)
        validationCPF.validationData(this.CPF,newCPF)
    }
    static createDigit(e){
        const digits = Array.from(e);
        let cont = digits.length +1;
        const total= digits.reduce((ac,v)=>{
            return ac+=(v*cont--)},0)
        const digito = 11 - (total % 11);
        return digito > 9 ? '0' : String(digito);
    }
    static validationData(CPF,newCPF){
        if(CPF === newCPF){
            console.log(typeof CPF,typeof newCPF)
            console.log('CPF válido');
            dataCPF.nextElementSibling.classList.remove('error');
            dataCPF.nextElementSibling.textContent ="";
            dataCPF.style.borderColor = 'green';
        }else{
            //console.log(dataCPF.nextElementSibling)
            dataCPF.nextElementSibling.textContent = 'Informe um CPF válido !';
            dataCPF.nextElementSibling.classList.add('error');
            dataCPF.style.borderColor = 'red';
        }
    }
}
const p1 = new validationCPF()


