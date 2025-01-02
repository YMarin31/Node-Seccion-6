const { blue } = require('colors');
const { validate } = require('uuid');

const inquirer = require('inquirer').default;
const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.red} Buscar Ciudad`
            },
            {
                value: 2,
                name: `${'2.'.red} Historial`
            },
            {
                value: 0,
                name: `${'0.'.red} Salir`
            },
        ]
    }
];


const inquirerMenu = async () => {

    console.clear();
    console.log('================='.green);
    console.log('Seleccione una opcion'.green);
    console.log('================='.green);
    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
}

const pausa = async () => {
    const espera = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.blue} para continuar`
        }
    ];
    await inquirer.prompt(espera);
}

const leerInput = async (message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listarLugares = async (lugar = []) => {
    const choices = lugar.map((lugar, i) => {

        const idx = `${i + 1}.`.green;
        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    })

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const  preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'borrar',
            choices
        }
    ]

    const {id} = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const {ok} = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoChecklist = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {

        const idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn)?true:false
        }
    })

    const  preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'seleccione',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(preguntas);
    return ids;
}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoChecklist
}