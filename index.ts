interface Beer {
  name: string;
  alcohol: number;
}

const data: Beer[] = [
  {
    name: 'Endinger',
    alcohol: 7.5,
  },
  {
    name: 'Delirium',
    alcohol: 8.3,
  },
  {
    name: 'Corona',
    alcohol: 4,
  },
];

//Fn de Orden superior Reciben otras funciones de primer orden como parametros
//Regla: no se modifica elementos externos.
//Comportamiento callback
function getInfo(beers: Beer[], fn: (b: string[]) => void) {
  const beersInfo = beers.map(
    (e) => `Cerveza: ${e.name} con alcohol ${e.alcohol}`
  );

  fn(beersInfo);
}

function show(beers: string[]) {
  beers.forEach((item) => console.log(item));
}

function showToUpperCase(beers: string[]) {
  beers.forEach((item) => console.log(item.toLocaleUpperCase()));
}

function showordered(beers: string[]) {
  beers.sort().forEach((item, index) => {
    console.log(`${index + 1} ${item}`);
  });
}

getInfo(data, show);
getInfo(data, showToUpperCase);
getInfo(data, showordered);

//Funcion pura, no tiene efectos colaterales y siempre devuelve el mismo resulta cuando resive los mismo parametros

//Esto no es una funcion pura, ya que siempre devuelve resultados distintos
const some = (a: number) => Math.random() + a;
console.log(some(1));
console.log(some(1));
console.log(some(1));

//Esto es una fn pura ya que con los mismo parametros devuelve siempre el mismo valor
const sum = (a: number, b: number) => a + b;
console.log(sum(1, 2));
console.log(sum(1, 2));
console.log(sum(1, 2));

//Transparencia referencial, deberia de poder reemplzar una implementacion de una funcionalidad por otra que hagalo mismo, y el sistema no deberia de verse afectado en ningun punto
//Mutable
const numbers: number[] = [4, 5, 6, 7];
function sort(list: number[]) {
  return list.sort();
}
console.log(sort(numbers));
console.log(numbers);

//No romple la transparencia referencial
const numbers2: readonly number[] = [99, 77, 44];
function sort2(list: readonly number[]) {
  return [...list].sort();
}
console.log(sort2(numbers2));
console.log(numbers2);

//closure,  retorna una funcion
function counter(n: number = 1) {
  let number = n;
  return () => {
    console.log('Hola' + number++);
  };
}

//myClousure, funcion de primer orden que actua como una variable, mantiene su estado
const myClousure = counter();
const myClousure2 = counter(50);
myClousure();
myClousure();
myClousure();

myClousure2();
myClousure2();
myClousure();

//Curryficacion, 
const getTotal = (amount: number, tax: number)=>{
  return amount + (amount * tax);
}

function getTotalCurry(impuesto: number){
  let tax: number =impuesto;
  return (amount: number)=> amount + (amount * tax)
}
//Lo mismo q la de arriba
const gettotalCurry2 = (tax: number) => (amount: number) => amount + (amount * tax)

console.log(getTotal(100, 0.16))
console.log(getTotal(200, 0.16)) //.....
console.log("-----------------")
const calc = getTotalCurry(0.16)
//Aca ya no tendira que pasarle el % cada vez q lo llamo
console.log(calc(100))
console.log(calc(200)) 
console.log("-----------------")
//aca lo podemos usar directamente ya que ya esta listo para usarse
console.log(gettotalCurry2(0.16)(100))