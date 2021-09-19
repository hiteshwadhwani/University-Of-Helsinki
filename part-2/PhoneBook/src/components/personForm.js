const AddPeopleInput = ({ name, newValue, handleNewValue }) => {
  return (
    <div>
      {name}: <input value={newValue} onChange={handleNewValue} />
    </div>
  );
};
const PersonForm = ({
  addPersons,
  newName,
  newNumber,
  handleNewName,
  handleNewNumber,
}) => {
  return (
    <>
      <form onSubmit={addPersons}>
        <AddPeopleInput
          name="name"
          newValue={newName}
          handleNewValue={handleNewName}
        />
        <AddPeopleInput
          name="Number"
          newValue={newNumber}
          handleNewValue={handleNewNumber}
        />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
