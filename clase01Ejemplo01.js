const objetos = [
    {
        manzanas : 3,
        peras: 2,
        carne: 1, 
        jugos: 5, 
        dulces: 2
    },
    {
        manzanas : 1,
        sandias: 1,
        huevos: 6, 
        jugos: 1, 
        panes: 4
    }
]
const articulosJuntos = [...Object.keys(objetos[0]), ...Object.keys(objetos[1])]
const articulosArr = [...new Set(articulosJuntos)]
console.log("Nombre de artículos: ", articulosArr);

const cantidadesJuntos = [...Object.values(objetos[0]), ...Object.values(objetos[1])]
const totalProductos = cantidadesJuntos.reduce((i,acc) => i + acc)
console.log("Cantidad total: ", totalProductos);
