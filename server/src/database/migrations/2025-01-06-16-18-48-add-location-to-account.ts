import sequelize from 'sequelize'
import { DATABASE_MODELS } from '../../constants/model-names.js'

export async function up({ context: queryInterface }: { context: sequelize.QueryInterface }) {
  const transaction = await queryInterface.sequelize.transaction()

  try {
    await queryInterface.addColumn(
      DATABASE_MODELS.ACCOUNTS,
      'locationPretty',
      {
        type: sequelize.DataTypes.STRING(200),
        allowNull: true,
      },
      { transaction }
    )

    await queryInterface.addColumn(
      DATABASE_MODELS.ACCOUNTS,
      'locationLat',
      {
        type: sequelize.DataTypes.DOUBLE,
        allowNull: true,
      },
      { transaction }
    )

    await queryInterface.addColumn(
      DATABASE_MODELS.ACCOUNTS,
      'locationLong',
      {
        type: sequelize.DataTypes.JSON,
        allowNull: true,
      },
      { transaction }
    )
    await transaction.commit()
  } catch (error) {
    console.error(error)
    await transaction.rollback()
    throw error
  }
}

export async function down({ context: queryInterface }: { context: sequelize.QueryInterface }) {
  const transaction = await queryInterface.sequelize.transaction()

  try {
    await queryInterface.removeColumn(DATABASE_MODELS.ACCOUNTS, 'locationPretty', { transaction })
    await queryInterface.removeColumn(DATABASE_MODELS.ACCOUNTS, 'locationLat', { transaction })
    await queryInterface.removeColumn(DATABASE_MODELS.ACCOUNTS, 'locationLong', { transaction })

    await transaction.commit()
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}
