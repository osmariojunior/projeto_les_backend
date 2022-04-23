module.exports =
    async (knex) =>
        ({ name }) => {
            const existence = await knex("jobs").where({
                name,
            });
            return existence && existence.length > 0
        };