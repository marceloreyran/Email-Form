document.addEventListener('DOMContentLoaded', function() {


    const email = {
        email:'',
        copia: '',
        asunto: '',
        mensaje:''
        
    }
    //Seleccionar elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputCopia = document.querySelector('#copia');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]')
    const btnReset = document.querySelector('#formulario button[type="reset"]')
    const spinner = document.querySelector('#spinner');

    //Asignar eventos
    inputEmail.addEventListener('input' , validar); 
    inputCopia.addEventListener('input' , validarCopia); 
    inputAsunto.addEventListener('input' , validar);
    inputMensaje.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e){
        e.preventDefault();
        resetFormulario();

        //reiniciar el objeto
        email.email= '';
        email.copia= '';
        email.asunto= '';
        email.mensaje= '';

        formulario.reset();
        comprobarEmail();

        console.log('Enviando....');

    })


    function enviarEmail(e){
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            resetFormulario();

            //Crear una alerta-----
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje enviando correctamente';
            
            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
        }, 3000 );
    }
  

    function validar (e){
       if(e.target.value.trim()  === ''){
        mostarAlerta(`El Campo ${e.target.id} es obligatorio`, e.target.parentElement);
        email[e.target.name] = '';
        comprobarEmail();
      
        return;
        } 

        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostarAlerta('El email no es válido', e.target.parentElement)
            email[e.target.name] = '';
            comprobarEmail();
            
            return;
        }

        limpiarAlerta(e.target.parentElement);
        
        //Comprobar email 
        comprobarEmail();
        

        //Asignar los valores 
        email[e.target.name] = e.target.value.trim().toLowerCase();
    
    }

     function mostarAlerta(mensaje, referencia){
         
       limpiarAlerta(referencia);


          //Generar una alerta en Html
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600','text-white','p-2', 'text-center')
        
        // Inyectar el error al formulario 
        referencia.appendChild(error);
    }
        //comprueba si ya existe una alerta  
    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.bg-red-600');
    if(alerta) {
        alerta.remove();
    }
    
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
        const resultado = regex.test(email);
        return resultado;

    }


    function validarCopia(e) {
        if(e.target.value !== "" && !validarEmail(e.target.value)){
            mostarAlerta('Debes ingresar un email valido', e.target.parentElement);
            return;
        }

        email[e.target.name] = e.target.value.trim().toLowerCase();
        limpiarAlerta(e.target.parentElement);
        comprobarobjEmail();
    }
    
    function comprobarEmail(){
       if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return
        } 
           btnSubmit.classList.remove('opacity-50');
           btnSubmit.disabled = false;
       
    }

    function resetFormulario (){
        // reinciar el objeto 
        email.email= '';
        email.copia= '';
        email.asunto= '';
        email.mensaje= '';

        formulario.reset();
        comprobarEmail();
    }

    } );
