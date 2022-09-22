export default {
  header: 'Vérification du statut du passeport',
  description:
    'Utilisez ce service avec votre ESRF pour vérifier le statut de votre demande de passeport.',
  esrf: {
    label: 'Numéro de dossier',
    error: {
      required: 'Le numéro de dossier est obligatoire',
      length: 'Le numéro de dossier doit comporter 8 caractères',
    },
  },
  givenName: {
    label: 'Prénom',
    error: {
      required: 'Le prénom est obligatoire',
    },
  },
  surname: {
    label: 'Nom de famille',
    error: {
      required: 'Le nom de famille est obligatoire',
    },
  },
  birthDate: {
    label: 'Date de naissance',
    error: {
      required: 'La date de naissance est obligatoire',
    },
  },
  checkStatus: "Vérifier l'état",
  unableToFindStatus:
    'Nous ne sommes pas en mesure de déterminer le statut de votre demande pour le moment en utilisant ce service.',
  statusIs: 'Le dernier statut de votre candidature selon nos dossiers est :',
}
