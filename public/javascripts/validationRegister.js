const $ = id => document.getElementById(id);

window.onload = function() {

    $('name').addEventListener('focus', function(e){
        $('msgError-name').innerHTML = null
        this.classList.remove('is-invalid')
        this.classList.remove('is-valid')
    })

    $('name').addEventListener('blur', function(e){

        switch (true) {
            case !this.value.trim():
                $('msgError-name').innerHTML = "El nombre es obligatorio"
                this.classList.add('is-invalid')
                break;
            case this.value.trim().length < 2:
                $('msgError-name').innerHTML = "Mínimo dos letras";
                this.classList.add('is-invalid')
                break
            case !/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(this.value.trim()):
                $('msgError-name').innerHTML = "Solo se permiten letras";
                this.classList.add('is-invalid')
                break
            default:
                $('msgError-name').innerHTML = null;
                this.classList.add('is-valid')
                this.classList.remove('is-invalid')
                break;
        }
    });


    $('surname').addEventListener('focus', function(e){
        $('msgError-surname').innerHTML = null
        this.classList.remove('is-invalid');
        this.classList.remove('is-valid')
    })

    $('surname').addEventListener('blur', function(e){

        switch (true) {
            case !this.value.trim():
                $('msgError-surname').innerHTML = "El apellido es obligatorio"
                this.classList.add('is-invalid')
                break;
            case this.value.trim().length < 2:
                $('msgError-surname').innerHTML = "Mínimo dos letras";
                this.classList.add('is-invalid')
                break
            case !/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(this.value.trim()):
                $('msgError-surname').innerHTML = "Solo se permiten letras";
                this.classList.add('is-invalid')
                break
            default:
                $('msgError-surname').innerHTML = null;
                this.classList.add('is-valid')
                this.classList.remove('is-invalid')
                break;
        }
    });


    $('email').addEventListener('focus', function(e){
        $('msgError-email').innerHTML = null
        this.classList.remove('is-invalid');
        this.classList.remove('is-valid')
    })

    $('email').addEventListener('blur', function(e){

        switch (true) {
            case !this.value.trim():
                $('msgError-email').innerHTML = "El email es obligatorio"
                this.classList.add('is-invalid')
                break;
            case !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.value.trim()):
                $('msgError-email').innerHTML = "El formato es inválido";
                this.classList.add('is-invalid')
                break
            default:
                $('msgError-email').innerHTML = null;
                this.classList.add('is-valid')
                this.classList.remove('is-invalid')
                break;
        }
    });

    $('email').addEventListener('change', async function(e){

        try {

            const response = await fetch(`/apis/check-email?email=${this.value.trim()}`)
            const result = await response.json()

            if(result.data) {
                $('msgError-email').innerHTML = "El email ya se encuentra registrado"
                this.classList.add('is-invalid')
            }
            
            
        } catch (error) {
            console.error(error);
        }
    })

    $('password').addEventListener('focus', function(e){
        $('msgError-password').innerHTML = null
        this.classList.remove('is-invalid');
        this.classList.remove('is-valid')
    })

    $('password').addEventListener('blur', function(e){

        switch (true) {
            case !this.value.trim():
                $('msgError-password').innerHTML = "La contraseña es obligatoria"
                this.classList.add('is-invalid')
                break;
            case !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,12}$/.test(this.value.trim()):
                $('msgError-password').innerHTML = "La contraseña debe tener entre 6 y 12 caracteres, minúscula, mayúscula, número y caracter especial";
                this.classList.add('is-invalid')
                break
            default:
                $('msgError-password').innerHTML = null;
                this.classList.add('is-valid')
                this.classList.remove('is-invalid')
                break;
        }
    });

    $('viewPassword').addEventListener('click', function(e) {
        
        $('msgError-password').innerHTML = null
        $('password').classList.remove('is-invalid');
        $('password').classList.remove('is-valid');

        $('password').type = $('password').type === "text" ? "password" : "text"

        this.classList.toggle("fa");
        this.classList.toggle("fa-eye");

        this.classList.toggle("fa-solid");
        this.classList.toggle("fa-eye-slash");

    });


    $('password').addEventListener('focus', function(e){
        $('msgError-password').innerHTML = null
        this.classList.remove('is-invalid');
        this.classList.remove('is-valid')
    })

    $('password2').addEventListener('blur', function(e){

        switch (true) {
            case !this.value.trim():
                $('msgError-password2').innerHTML = "Debes confirmar tu contraseña"
                this.classList.add('is-invalid')
                break;
            case this.value.trim() !== $('password').value.trim():
                $('msgError-password2').innerHTML = "Las contraseñas no coinciden";
                this.classList.add('is-invalid')
                break
            default:
                $('msgError-password2').innerHTML = null;
                this.classList.add('is-valid')
                this.classList.remove('is-invalid')
                break;
        }
    });

    $('formRegister').addEventListener('submit', function(event) {
        event.preventDefault();

        const elementsForm = this.elements;
        let error = false;

        for (let i = 0; i < elementsForm.length - 1; i++) {
            
            if(!elementsForm[i].value.trim() || elementsForm[i].classList.contains('is-invalid')){
                error = true;
                elementsForm[i].classList.add('is-invalid');
                $('msgError-empty').innerHTML = "El formulario tiene errors"
            }

        }

        !error && this.submit()
    })



}