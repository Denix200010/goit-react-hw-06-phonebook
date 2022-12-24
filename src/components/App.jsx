import { nanoid } from 'nanoid';

import style from './app.module.css';

import { PhonebookList } from "./PhonebookList/PhonebookList";
import { ContactsForm } from "./ContactsForm/ContactsForm";
import { FilterInput } from "./FilterForm/FilterInput";
import { useSelector, useDispatch } from "react-redux";
import { getContacts, getFilter } from "redux/selectors";
import { addContact, changeFilter, removeContact } from 'redux/contactsSlice';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const onFormSubmit = (e) => {
    e.preventDefault();
    let alreadyContact = null;
    const form = e.currentTarget;
    const name = form.elements.name.value;
    contacts.forEach(contact => {
      if (contact.name.toLowerCase() === name.toLowerCase()) {
        alreadyContact = true;
      }
    })
    if (alreadyContact) {
      return alert(`${name} is already in contacts`);
    }
    const number = form.elements.number.value;
    const id = nanoid();
    const newContact = {
      id: id,
      name: name,
      number: number,
    }
    console.log(newContact);
    dispatch(addContact(newContact));
  }
  const onFilterInput = (e) => {
    dispatch(changeFilter(e.currentTarget.value))
  }
  const getSearchContact = () => {
    if (filter === '') return contacts;
    const normalizedSearchContacts = filter.toLowerCase();
    if (contacts.length > 0) {
      return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedSearchContacts));
    }
    return contacts;
  }
  const onDeleteContact = (id) => {
      dispatch(removeContact(contacts.filter(contact=> contact.id !== id)));
  }
  const actuallyContacts = getSearchContact();
  return <div className={style.container}>
    <h1>Phonebook</h1>
    <ContactsForm
      onSubmitFunction={onFormSubmit} />

    <FilterInput
      onFilterInput={onFilterInput} />
    <h2>Contacts</h2>
    {contacts.length > 0 && <PhonebookList
      contact={actuallyContacts}
      onDeleteContact={onDeleteContact} />}
  </div>
};
