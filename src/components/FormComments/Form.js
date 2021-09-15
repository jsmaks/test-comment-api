import React, { useState, useCallback } from 'react';

import './Form.css';
export default function Form({ addComment }) {
  const [userData, setUserData] = useState({
    name: '',
    text: '',
  });
  const handleChange = useCallback(e => {
    const {
      currentTarget: { name, value },
    } = e;
    setUserData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      addComment(userData);
      setUserData({ name: '', text: '' });
    },
    [addComment, userData],
  );

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="form__label">
        Имя
        <input
          className="form__label-input"
          type="text"
          maxLength="20"
          placeholder="Введите своё имя"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          value={userData.name}
          onChange={handleChange}
        />
      </label>
      <label className="form__label">
        Введите комментрий
        <textarea
          className="form__label-comments"
          type="text"
          name="text"
          // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          placeholder="Напишите текст"
          value={userData.text}
          onChange={handleChange}
        />
      </label>
      <button className="btn button-send" type="submit">
        Отправить
      </button>
    </form>
  );
}
