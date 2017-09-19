module.exports = function (sequelize, DataTypes) {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Enter a title...'
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Enter an author...'
        }
      }
    },
    genre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Enter a genre...'
        }
      }
    },
    first_published: {
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate: function (models) {
        Book.hasMany(models.Loan, {foreignKey: 'book_id'});
      }
    },
    timestamps: false
  });

  return Book;
};
