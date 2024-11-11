import * as readlineSync from 'readline-sync';
import Tree23 from "./tree-2-3";
import Student from "./student";

// 88 99 75 66 50

// Creación de la estructura de datos
const students = new Tree23();

// Función para imprimir en pantalla el menu
function mostrarMenu() {
    console.log("Menú");
    console.log("1.- Ingresar estudiante");
    console.log("2.- Buscar estudiante");
    console.log("3.- Eliminar estudiante");
    console.log("4.- Ver estudiantes");
    console.log("5.- Salir");
}

// Función para gestionar el menu
function gestionarMenu() {
    mostrarMenu();
    const option = readlineSync.question("Seleccione una opción: ")
    let average: any;
        console.clear();
        switch (option) {
            case '1':
                // Inserción en el árbol 2-3
                const name = readlineSync.question("Ingrese el nombre del estudiante: ");
                const carnet = readlineSync.question("Ingrese el carnet del estudiante: ");
                average = readlineSync.question("Ingrese el promedio del estudiante: ");
                const newStudent = new Student(name, carnet, parseInt(average));
                students.insert({ key: parseInt(average), payload: newStudent});
                gestionarMenu()
                break;
            case '2':
                // Buscar un estudiante por promedio en el árbol 2-3
                average = readlineSync.question("Ingrese el promedio del estudiante que desea buscar: ");
                const student = students.search(parseInt(average))
                if (student) {
                    console.log(`Nombre: ${student.name}, Carnet: ${student.id}, Promedio: ${student.average}`);
                } else {
                    console.log("El estudiante con ese promedio no se encuentra en la ED")
                }
                gestionarMenu()

                break;
            case '3':
                // Eliminar un estudiante del árbol 2-3
                average = readlineSync.question("Ingrese el promedio del estudiante que desea eliminar: ");
                if (!students.search(parseInt(average))) {
                    console.log("El estudiante no se encuentra en la ED");
                } else {
                    const saveDeleted = students.search(parseInt(average));
                    students.delete(parseInt(average));
                    if (!students.search(parseInt(average)) && saveDeleted) {
                        console.log(`${saveDeleted.name} - ${saveDeleted.id} se ha eliminado correctamente`)
                    } else {
                        console.log("No se ha podido realizar la eliminación");
                    }
                }
                gestionarMenu()
                break;
            
            case '4':
                // Ver a todos los estudiantes en el árbol
                const studentsList = students.preorder();
                studentsList.forEach((student, n) => {
                    console.log(`${n + 1}.- Nombre: ${student.name}, Carnet: ${student.id}, Promedio: ${student.average}`);
                });
                // students.printFullObject();
                gestionarMenu()
                break;
        
            case '5':
                // Salir del programa
                console.log("Fin del programa");
                return;
            default:
                // Opción inválida
                console.log("Opción no válida. Intente nuevamente.");
                gestionarMenu();
        }
}

gestionarMenu();    
