import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    User.beforeCreate(async (user) => {
      // eslint-disable-next-line no-param-reassign
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 10);
      }
      return this;
    });
    User.beforeUpdate(async (user) => {
      // eslint-disable-next-line no-param-reassign
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 10);
      }
      return this;
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
