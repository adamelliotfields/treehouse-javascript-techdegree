module.exports = function (sequelize, DataTypes) {
  const Loan = sequelize.define('Loan', {
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    patron_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    loaned_on: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: {
          msg: 'Enter a loan date...'
        }
      }
    },
    return_by: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: {
          msg: 'Enter a return date'
        }
      }
    },
    returned_on: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: {
          msg: 'Enter a returned date...'
        }
      }
    }
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
        Loan.belongsTo(models.Patron, {foreignKey: 'patron_id'});
        Loan.belongsTo(models.Book, {foreignKey: 'book_id'});
      }
    },
    timestamps: false
  });
  return Loan;
};
