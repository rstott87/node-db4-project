
exports.up = async function (knex) {
  await knex.schema 
    .createTable('recipes', table => {
        table.increments('recipe_id')
        table.string('recipe_name', 200).notNullable().unique()
    })
    .createTable('ingredients', table => {
        table.increments('ingredient_id')
        table.string('ingredient_name', 200).notNullable().unique()
        table.string('ingredient_unit', 50)
    })
    .createTable('steps', table => {
        table.increments('ingredient_id')
        table.string('ingredient_name', 200).notNullable().unique()
        table.integer('step_number').notNullable()
        table.integer('recipe_id') 
            .unsigned()
            .notNullable()
            .references('recipe_id')
            .inTable('recipes')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT')
        
    })
    .createTable('step_ingredients', table => {
        table.increments('step_ingredients_id')
        table.float('quantity').notNullable()
        table.integer('step_id')   //note foreign key
            .unsigned()
            .notNullable()
            .references('step_id')   // shows that it refs step id in steps
            .inTable('steps')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT')
        table.integer('ingredient_id')
            .unsigned()
            .notNullable()
            .references('ingredient_id')  // shows taht it refs ingredient id in ingredients
            .inTable('ingredients')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema
  .dropTableIfExists('step_ingredients')
  .dropTableIfExists('steps')
  .dropTableIfExists('ingredients')
  .dropTableIfExists('recipes')
};

//note  use command npx knex migrate:make initial-migration
