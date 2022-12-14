# Post-It

Post-It est une application mobile permettant de créer des brouillons de posts pour community manager que des responsables peuvent évaluer (pour savoir si le community manager peut ou non poster ce brouillon). Cette application a été codée via React Native et utilise une API externe en utilisant Graphql et Neo4J.

## Installation

Après avoir téléchargé le dépot :

```sh
cd post-it
```

```sh
npm install
```

## Installation de l'api

Après avoir installé neo4j et copié le contenu du dossier 'server' :

```sh
npm install
```

```sh
npm start
```

## Lancement de l'application

Dans le dossier post-it et APRES avoir lancé l'api :

```sh
npm start
```

Si vous utilisez expo go pour lancer l'application sur un smartphone (recommandé) il faut remplacer
la troisième ligne de /post-it/API/postItAPI.js par l'adresse ip affichée dans votre terminal (http://192.168.0.32:4000 par exemple). Verifiez aussi que votre smartphone et que la machine d'execution du code soient sur le même réseau.

## Authors

- [Arthur Bocage](https://github.com/Turlututur)
- [Alexandre Pignard](https://github.com/Myrani)
