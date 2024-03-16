document.addEventListener('DOMContentLoaded',async  function() {
    const form = document.querySelector('#person_form');
    
    console.log('====================================');
    console.log('Form: ', form);
    console.log('====================================');

    form.onsubmit = function(event) {
        // Prevent form submission until validation is complete
        event.preventDefault();

        // Basic validation checks
        const nom = document.getElementById('nom').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const nni = document.getElementById('nni').value.trim();
        const salary = document.getElementById('salary').value.trim();
        const department = document.getElementById('department').value.trim();
        const nbPres = document.getElementById('nbPres').value.trim();
        const nbAbs = document.getElementById('nbAbs').value.trim();
        
        // Email regex for basic validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Check if any field is empty
        if (!nom || !email || !phone || !nni || !salary || !department || !nbPres || !nbAbs) {
            alert('Please fill out all fields.');
            return;
        }

       



        
        // Validate phone number format: 8 digits and starts with 2, 3 or 4; using regex
        const phoneRegex = /^[234]\d{7}$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid phone number.');
            return;
        }

        // Validate NNI format: 10 digits; using regex
        const nniRegex = /^\d{10}$/;
        if (!nniRegex.test(nni)) {
            alert('Please enter a valid NNI.');
            return;
        }
        const digitRegex = /^\d+$/;

        // Validate salary format: only numbers; using regex
        if (!digitRegex.test(salary)) {
            alert('Please enter a valid salary.');
            return;
        }


        // Validate department format: only letters; using regex
        const departmentRegex = /^[a-zA-Z]+$/;
        if (!departmentRegex.test(department)) {
            alert('Please enter a valid department.');
            return;
        }


        // Validate nbPres format: only numbers; using regex
        if (!digitRegex.test(nbPres)) {
            alert('Please enter a valid number of presentations.');
            return;
        }

        // Validate nbAbs format: only numbers; using regex
        if (!digitRegex.test(nbAbs)) {
            alert('Please enter a valid number of absences.');
            return;
        }
        
        
        // Validate email format
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // If all validations pass, submit the form
        form.submit();
    };
});
