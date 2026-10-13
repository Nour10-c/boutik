# BOUTIK

## Choix de modélisation

- 7 Tables, 7 relations
- Stock dans la table product, on aurait pu avoir une table stock pour gérer des cas plus complexes mais nous n'en avons pas besoin ici.
- Les status sont des ENUM pour limiter les choix
- Les prix et stock ne peuvent pas être négatifs avec un check dans le sql directement
