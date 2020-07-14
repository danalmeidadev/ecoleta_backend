import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("item").del()
        .then(() => {
            // Inserts seed entries
            return knex("item").insert([
                {title: 'Lâmpadas', image: 'lampadas.svg'},
                {title: 'Pilhas e Baterias', image: 'baterias.svg'},
                {title: 'Papéis e Papelão e Baterias', image: 'papeis-papelao.svg'},
                {title: 'Resíduos Eletrônicos', image: 'eletronicos.svg'},
                {title: 'Resíduos Orgânicos', image: 'organicos.svg'},
                {title: 'Óleo de Cozinha', image: 'oleo.svg'}, 
            ]);
        });
};