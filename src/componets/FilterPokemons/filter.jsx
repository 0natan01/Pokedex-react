import "./filter.css";

export const FilterPokes = ({selectType , setSelectType}) => {
  return (
    <>
      <select name="Select type"  onChange={ e => setSelectType(e.target.value)}>
        <option value="">Pokemon</option>
        <option value="grass">Grass</option>
        <option value="water">Water</option>
        <option value="poison">Poison</option>
        <option value="flying">Flying</option>
        <option value="bug">bug</option>
        <option value="fire">Fire</option>
        <option value="normal">normal</option>
        <option value="eletric">electric</option>
        <option value="ground">ground</option>
        <option value="psychic">psychic</option>
        <option value="fairy">Fairy</option>
        <option value="ice">Ice</option>
        <option value="ghost">Ghost</option>
        <option value="dragon">Dragon</option>
        <option value="dark">Dark</option>
        <option value="fighting">Fighting</option>
        <option value="rock">Rock</option>
        <option value="steel">Steel</option>
      </select>
    </>
  );
};
