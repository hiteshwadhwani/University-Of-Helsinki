const Name = ({ person, DeletePerson }) => {
  return (
    <>
      <h3>
        {person.name} {person.number}
      </h3>
      <button onClick={() => DeletePerson(person.id)}>Delete</button>
    </>
  );
};
export default Name;
