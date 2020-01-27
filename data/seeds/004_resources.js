exports.seed = function(knex) {
  return knex("resources").insert([
    {
      project_id: 1,
      name: "Computer",
      description: "Fork and Clone Repository"
    },
    {
      project_id: 1,
      name: "Conference Table",
      description: "Install Dependencies"
    },
    {
      project_id: 1,
      name: "Microphone",
      description: "Design and Build API Endpoints"
    }
  ]);
};
