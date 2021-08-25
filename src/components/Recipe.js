import styles from "./recipe.module.css";

const Recipe = ({ title, calories, imageSource, ingredients }) => {
  return (
    <div className={styles.recipe}>
      <h1>{title}</h1>
      <ol>
        {ingredients.map((ingredient) => {
          return <li>{ingredient.text}</li>;
        })}
      </ol>
      <p>{calories}</p>
      <img className={styles.image} src={imageSource} alt="" />
    </div>
  );
};

export default Recipe;
