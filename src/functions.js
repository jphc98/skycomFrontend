import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export function show_alert(message, ico, light){
    onlight(light);
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title:message,
        icon:ico
    })
}

function onlight(light){
    if (light !== '') {
        document.getElementById(light).focus();
    }
}