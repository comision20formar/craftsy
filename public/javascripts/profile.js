const $ = id => document.getElementById(id);
const baseURL = "https://apis.datos.gob.ar/georef/api"

window.onload = async function(e){

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

    $('birthday').addEventListener('blur', function(e){
        const birthday = moment(this.value);
        const minDate = moment().subtract(100,'years');
        const currentDate = moment();

        switch (true) {

            case birthday.isBefore(minDate):
                $('msgError-birthday').innerHTML = "Eppaa.. tan viejo/a sos?? Paráaa...";
                this.classList.add('is-invalid')
                break
            case birthday.isAfter(currentDate):
                $('msgError-birthday').innerHTML = "Andaa... terminator??";
                this.classList.add('is-invalid')
                break
            default:
                $('msgError-birthday').innerHTML = null;
                this.classList.add('is-valid')
                this.classList.remove('is-invalid')
                break;
        }
    });


    try {

        const response = await fetch(`${baseURL}/provincias`);
        const result = await response.json();

        result.provincias.sort((a,b) => a.nombre > b.nombre ? 1 : a.nombre < b.nombre ? - 1 : 0).forEach(({nombre}) => {
            $('province').innerHTML += `<option value="${nombre}">${nombre}</option>`
        });
      
        
    } catch (error) {
        console.error(error);
    }

    $('province').addEventListener('change', async function(e){
        $('city').disabled = true

        try {
            const response = await fetch(`${baseURL}/localidades?provincia=${this.value}&max=1000`);
            const result = await response.json();

            if(result){
                $('city').disabled = false

                $('city').innerHTML = `<option value="">Seleccione...</option>`

                result.localidades.sort((a, b) => a.nombre.localeCompare(b.nombre)).forEach(({nombre}) => {
                    $('city').innerHTML += `<option value="${nombre}">${nombre}</option>`
                })
            }
            
        } catch (error) {
            console.error(error);

        }
    });

}