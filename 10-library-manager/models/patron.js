module.exports = function (sequelize, DataTypes) {
  const Patron = sequelize.define('Patron', {
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Enter a first name...'
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Enter a last name...'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Enter an address...'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Enter an email address...'
        },
        isEmail: {
          msg: 'Enter a valid email address...'
        }
      }
    },
    library_id: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Enter a library ID...'
        }
      }
    },
    zip_code: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Enter a zip code...'
        }
      }
    }
  }, {
    classMethods: {
      associate: function (models) {
        Patron.hasMany(models.Loan, {foreignKey: 'patron_id'});
      }
    },
    timestamps: false
  });
  return Patron;
};
