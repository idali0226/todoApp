module.exports = (sequelize, type) => {
  return sequelize.define('todo', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: type.STRING,
    description: type.STRING,
    status: type.STRING,
  })
}
