const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Review",
  columns: {
    id: {
      primary: true,
      unique: true,
      type: "varchar"
    },
    type: {
      type: 'varchar'
    },
    description: {
      type: 'text'
    },
    date: {
      type: 'date'
    },
    user: {
      type: 'varchar'
    }
  },
});
