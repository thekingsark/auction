import sequelize, { DataTypes } from 'sequelize'
import { DATABASE_MODELS } from '../../constants/model-names.js'

export async function up({ context: queryInterface }: { context: sequelize.QueryInterface }) {
  const transaction = await queryInterface.sequelize.transaction()

  try {
    await queryInterface.addColumn(
      DATABASE_MODELS.AUCTIONS,
      'lastPriceCurrencyId',
      {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: DATABASE_MODELS.CURRENCIES,
          key: 'id',
        },
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
    await queryInterface.removeColumn(DATABASE_MODELS.AUCTIONS, 'lastPriceCurrencyId', {
      transaction,
    })
    await transaction.commit()
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}
