// Fonction pour changer d'étape dans le comparateur
function nextStep(stepNumber) {
  // Masque toutes les étapes du formulaire
  document.querySelectorAll('.step').forEach(function(step) {
    step.classList.remove('active');
  });
  
  // Affiche uniquement l'étape demandée
  var targetStep = document.querySelector('.step-' + stepNumber);
  if (targetStep) {
    targetStep.classList.add('active');
  }
}

// Gestion de l'envoi du formulaire
document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('seniorForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault(); // Empêche le rechargement de la page
      alert('Merci ! Votre demande a été enregistrée. Un conseiller Norb.io va vous contacter très rapidement.');
      // Vous pourrez ajouter ici le lien vers votre outil d'envoi d'emails ou votre CRM
    });
  }
});
