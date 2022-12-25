import style from './app.module.css';

import { PhonebookList } from "./PhonebookList/PhonebookList";
import { ContactsForm } from "./ContactsForm/ContactsForm";
import { FilterInput } from "./FilterForm/FilterInput";
import { useSelector } from "react-redux";
import { getContacts } from "redux/selectors";

export const App = () => {
  const contacts = useSelector(getContacts); 
  
  return <div className={style.container}>
    <h1>Phonebook</h1>
    <ContactsForm />

    <FilterInput/>
    <h2>Contacts</h2>
    {contacts.length > 0 && <PhonebookList/>}
  </div>
};
