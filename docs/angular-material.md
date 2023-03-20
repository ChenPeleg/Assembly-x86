# Defining material

## The Material design way

In every theme there are two colors (and a third optional warn color). Each color is needed to be taken from an existing palette.

There are 25 palettes: 

1. red-palette
2. pink-palette
3. purple-palette
4. deep-purple-palette
5. indigo-palette
6. blue-palette
7. light-blue-palette
8. cyan-palette
9. teal-palette
10. green-palette
11. light-green-palette
12. lime-palette
13. yellow-palette
14. amber-palette
15. orange-palette
16. deep-orange-palette
17. brown-palette
18. grey-palette
19. gray-palette
20. blue-grey-palette
21. blue-gray-palette
22. light-theme-background-palette
23. dark-theme-background-palette
24. light-theme-foreground-palette
25. dark-theme-foreground-palette

## Defining a color from a palette

`
$my-primary: mat.define-palette(mat.$amber-palette, 300);
$my-accent: mat.define-palette(mat.$amber-palette, A200, A100, A400);
$my-warn: mat.define-palette(mat.$red-palette);`
 
