/**
 * NORB.IO - Script de gestion du comparateur mutuelle senior
 */

document.addEventListener('DOMContentLoaded', function() {
    // Éléments du DOM
    const form = document.getElementById('mon-formulaire');
    const steps = document.querySelectorAll('.form-step');
    const headerStepNum = document.getElementById('current-step-num');
    const successBox = document.getElementById('successBox');
    const formHeader = document.getElementById('form-header');
    
    // Gestion du champ "Autre" mutuelle
    const inputMutuelle = document.getElementById('mutuelle-input');
    const divAutre = document.getElementById('champ-autre-mutuelle');
    const inputAutre = document.getElementById('autre-mutuelle-input');

    if (inputMutuelle) {
        const checkAutre = () => {
            if (inputMutuelle.value === "Autre / Ma mutuelle n'est pas dans la liste") {
                divAutre.style.display = "block";
                inputAutre.required = true;
            } else {
                divAutre.style.display = "none";
                inputAutre.required = false;
                inputAutre.value = "";
            }
        };
        inputMutuelle.addEventListener('input', checkAutre);
        inputMutuelle.addEventListener('change', checkAutre);
    }

    // Navigation entre les étapes
    window.goToStep = function(stepNumber) {
        // Validation simple avant de passer à l'étape suivante
        if (stepNumber > 1) {
            const currentStep = document.querySelector('.form-step.active');
            if (currentStep) {
                const inputs = currentStep.querySelectorAll('input[required], select[required]');
                let valid = true;
                
                inputs.forEach(input => {
                    if (!input.value) {
                        valid = false;
                        input.style.borderColor = "red";
                    } else {
                        input.style.borderColor = "";
                    }
                });
                
                if (!valid) {
                    alert("Veuillez remplir tous les champs obligatoires avant de continuer.");
                    return;
                }
            }
        }

        // Affichage de l'étape
        steps.forEach(s => s.classList.remove('active'));
        const targetStep = document.getElementById('step-' + stepNumber);
        if (targetStep) {
            targetStep.classList.add('active');
            if (headerStepNum) headerStepNum.textContent = stepNumber;
            // Scroll en haut du formulaire pour mobile
            targetStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Toggle Conjoint / Enfants
    window.toggleConjoint = function(show) {
        const group = document.getElementById('conjoint_dob_group');
        if (group) group.style.display = show ? 'block' : 'none';
    };

    window.toggleEnfants = function(show) {
        const group = document.getElementById('enfants_dob_group');
        if (group) group.style.display = show ? 'block' : 'none';
    };

    // Toggle sélection des cartes (Étape 2)
    window.toggleCard = function(element) {
        const checkbox = element.querySelector('input[type="checkbox"]');
        // Petit délai pour laisser le temps au navigateur de changer l'état du checkbox
        setTimeout(() => {
            if (checkbox.checked) {
                element.classList.add('selected');
            } else {
                element.classList.remove('selected');
            }
        }, 10);
    };

    // Consentement et bouton submit
    const consentPhone = document.getElementById('consent_phone');
    const submitBtn = document.getElementById('submitBtn');
    const consentTimestamp = document.getElementById('consent_timestamp');

    window.toggleSubmitBtn = function() {
        if (submitBtn && consentPhone) {
            submitBtn.disabled = !consentPhone.checked;
            if (consentPhone.checked && consentTimestamp) {
                consentTimestamp.value = new Date().toISOString();
            }
        }
    };

    // Envoi du formulaire via AJAX (Formspree)
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const originalBtnText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = "Transmission en cours...";

            fetch(form.action, {
                method: form.method,
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    form.style.display = 'none';
                    if (formHeader) formHeader.style.display = 'none';
                    if (successBox) successBox.style.display = 'block';
                } else {
                    throw new Error('Erreur lors de l\'envoi');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // En cas d'erreur, on affiche quand même le message de succès pour ne pas bloquer l'utilisateur 
                form.style.display = 'none';
                if (formHeader) formHeader.style.display = 'none';
                if (successBox) successBox.style.display = 'block';
            });
        });
    }
});
