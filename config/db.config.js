import Sequelize, { DataTypes, Model, Deferrable } from 'sequelize';
import { CONFIG } from "./config.js"
const { HOST, DB_HOST, DB_PASSWORD, DB_NAME } = CONFIG

const sequelize = new Sequelize(DB_NAME, DB_HOST, DB_PASSWORD, {
    dialect: 'mysql',
    host: HOST,
    define: {
        allowNull: false,
        timestamps: false,
    }
});


const Recipe = sequelize.define('recipe', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    title: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    picture: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    published: DataTypes.TINYINT(1),
})

const RecipeAssociation = sequelize.define('recipes-recipe', {
    mainRecipe_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
            model: Recipe,
            key: 'id',
            deferrable: Deferrable.NOT,
        },
    },
    secondaryRecipe_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
            model: Recipe,
            key: 'id',
            deferrable: Deferrable.NOT,
        },
    },
    note: DataTypes.STRING,
    step: DataTypes.TINYINT(2),
},
{
    timestamps: true,
})

const Tag = sequelize.define('tag', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING(150),
    color: DataTypes.CHAR(6),
})

const TagAssociation = sequelize.define('recipes-tag', {
    tag_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
            model: Tag,
            key: 'id',
            deferrable: Deferrable.NOT,
        },

    },
    recipe_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
            model: Recipe,
            key: 'id',
            deferrable: Deferrable.NOT,
        },
    },
},
{
    timestamps: true,
})

const Utensil = sequelize.define('utensil', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING(150),
})

const UtensilAssociation = sequelize.define('recipes-utensil', {
    utensil_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
            model: Utensil,
            key: 'id',
            deferrable: Deferrable.NOT,
        },
    },
    recipe_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
            model: Recipe,
            key: 'id',
            deferrable: Deferrable.NOT,
        },
    },
},
{
    timestamps: true,
})

const Ingredient = sequelize.define('ingredient', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING(150),
})

const IngredientList = sequelize.define('recipes-ingredient', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    recipe_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
            model: Recipe,
            key: 'id',
            deferrable: Deferrable.NOT,
        },
    },
    // secondaryRecipe_id: {
    //     type: DataTypes.INTEGER.UNSIGNED,
    //     primaryKey: true,
    //     references: {
    //         model: Recipe,
    //         key: 'id',
    //         deferrable: Deferrable.NOT,
    //     },
    // },
    ingredient_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
            model: Ingredient,
            key: 'id',
            deferrable: Deferrable.NOT,
        },
    },
    qty: DataTypes.FLOAT,
    unit: DataTypes.ENUM('', 'g', 'mg', 'l', 'cl', 'ml'),
    prepNotes: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},
{
    timestamps: true,
})

try {
    sequelize.authenticate();
    console.log('Connecté à la base de données MySQL!');
} catch (error) {
    console.error('Impossible de se connecter, erreur suivante :', error);
}

await sequelize.sync({ force: true });
console.log("All models were synchronized successfully.");