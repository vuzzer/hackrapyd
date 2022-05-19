# 🚀 Paiement par CinetPay 👋

[![CinetPay Logo](https://imgur.com/WxqeWOL.png)](https://cinetpay.com)

> Ce SDK JavaScript vous permet d'invoquer le **guichet de paiement de CinetPay**, effectuer un paiement et attendre le statut du paiement initié à la seconde près après la fin du paiement

## 🔗 Les étapes

L'utilisation du package est la plus simple possible, il s'agit d'invoquer celui-ci avec :

- `Les paramétres d'initialisation du guichet`
- `Les données relatives au paiement`
- `Le callback d'attente du retour de paiement`
- `Le callback d'écoute d'erreur d'exécution`
- `Le callback de fermeture du guichet`

## Initialisation du guichet

Pour fonctionner, le guichet doit impérativement recevoir des données telles que :

- _**apikey**_ | L’identifiant du marchand | Chaine de caractère | `Obligatoire`
- _**site_id**_ | L'identifiant du service | Entier | `Obligatoire`
- _**type**_ | Type de device | Chaine de caractère (`WEB` - `MOBILE`) | `Facultatif`
- _**notify_url**_ | URL de notification de paiement valide | URL | `Obligatoire`
- _**return_url**_ | URL de retour | URL | `Facultatif`

## Données du paiement

Pour effectuer le paiement, certaines données devront-être sousmises pour préparer le guichet. Ainsi, on a :

- _**amount**_ | Montant du paiement `(>= 100 XOF)` | Entier | `Obligatoire`
- _**currency**_ | Devise du paiement (`XOF` - `XAF` - `CDN` - `GNF` - `USD`) | Chaîne de caractère | `Obligatoire`
- _**transaction_id**_ | L'identifiant de la transaction. Elle doit-être unique, pour chaque transaction | Chaîne de caractère | `Obligatoire`
- _**description**_ | La description de votre paiement | Chaîne de caractère | `Obligatoire`
- _**channels**_ | L’univers de paiement. Peut être : `ALL` - `MOBILE_MONEY` - `CREDIT_CARD` - `WALLET`. Par défaut : `'ALL'` Toute combinaison est applicable à en séparant par une virgule : `'MOBILE_MONEY, WALLET'` | Chaîne de caractère | Facultatif
- _**metadata**_ | | Chaîne de caractère | Facultatif
- _**customer_name**_ | Nom de l’acheteur `*` | Chaîne de caractère | Facultatif
- _**customer_surname**_ | Prénoms de l’acheteur `*` | Chaîne de caractère | Facultatif
- _**customer_email**_ | Adresse email de l’acheteur `*` | Chaîne de caractère | Facultatif
- _**customer_phone_number**_ | Numéro de téléphone de l’acheteur `*` | Chaîne de caractère
- _**customer_city**_ | Ville de l’acheteur `*` | Chaîne de caractère | Facultatif
- _**customer_country**_ | Pays de l’acheteur. Code ISO2 du pays (CI => Côte-d'Ivoire). `*` | Chaîne de caractère | Facultatif
- _**customer_state**_ | Etat de l’acheteur (Lorsque USA est utilisé comme pays) `*` | Chaîne de caractère | Facultatif
- _**customer_zip_code**_ | Code postal de l’acheteur `*` | Chaîne de caractère | Facultatif
  > **NB** : `*` Obligatoire si utilisation de l’univers bancaire (CREDIT_CARD)

## Callback de retour de paiement

Lorsque le paiement est enclenché, le package reste en attente du statut final du paiement-ci. Ainsi, à la fin du paiement le package reçoit le statut, qu'il le transmet au travers du callback qui sera définit. Le format de retour attendu est le suivant :

- _**amount**_ | Montant du paiement | Entier
- _**currency**_ | Devise du paiement | Chaîne de caractère
- _**status**_ | Statut du paiement (`ACCEPTED` ou `REFUSED)` | Chaîne de caractère
- _**payment_method**_ | Moyen du paiement | Chaîne de caractère
- _**description**_ | La description de votre paiement | Chaîne de caractère
- _**metadata**_ | Chaîne de caractère
- _**operator_id**_ | L'identifiant du paiement de l'opérateur | Chaîne de caractère
- _**payment_date**_ | La date du paiement | Chaîne de caractère

## Callback d'erreur de traitement

Lors du traitement, il peut survenir certains types d'erreurs telles que, _certains paramètres manquants_ pour le paiement. Le format de retour attendu est le suivant :

- _**message**_ | Chaîne de caractère
- _**description**_ | Chaîne de caractère

## 👩‍💻 Utilisation du package

En resumé, le package s'utilise par le biais d'un appel widget :

```javascript
CinetPay.setConfig({
  apikey: '12912847765bc0db748fdd44.40081707',
  site_id: 445160,
  notify_url: 'http://mondomaine.com/notify/',
});

CinetPay.getCheckout({
  transaction_id: Math.floor(Math.random() * 100000000).toString(),
  amount: 100,
  currency: 'XOF',
  channels: 'ALL',
  description: 'Test de paiement',
  customer_surname: 'CINETPAY',
  customer_name: 'CINETPAY ENTREPRISE',
  customer_email: 'cinetpay@cinetpay.com',
  customer_phone_number: '+2250709699688',
  customer_address: '15 BP 1080 ABIDJAN 15',
  customer_city: 'ABIDJAN',
  customer_country: 'CI',
  customer_state: '',
  customer_zip_code: '00225',
});

CinetPay.waitResponse(function (data) {
  if (data.status === 'REFUSED') {
    if (alert('Votre paiement a échoué')) {
      window.location.reload();
    }
  } else if (data.status === 'ACCEPTED') {
    if (alert('Votre paiement a été effectué avec succès')) {
      window.location.reload();
    }
  }
});

CinetPay.onError(function (data) {
  alert(data.description);
});
```

## 😄 Auteur

Agbetogor Germain ([@Germinator](https://cinetpay.com))
