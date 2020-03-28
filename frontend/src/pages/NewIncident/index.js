import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import './styles.css';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  const history = useHistory();
  const ongId = localStorage.getItem('ongID');

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    }

    if(!title){
      setMessage('Campo título obrigatório, favor informar.');
      
    }
    if(!description){
      setMessage('Campo descrição obrigatório, favor informar.')
    }
    if(!value || value === 0){
      setMessage('Campo valor inválido');
    }
    else{
      try{
        await api.post('incidents', data, {
          headers: {
            Authorization: ongId
          }
        });
        history.push('/profile');
      }catch(err){
        alert(`Erro ao cadastrar caso, ${err}`)
      }
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para a Home
          </Link>
        </section>
        <form>
          {message}
          <input placeholder="Título do caso" 
            value={title}
            onChange={e => setTitle(e.target.value)}

          />
          <textarea placeholder="Descrição" 
            required
            value={description}
            name="desc"
            onChange={e => setDescription(e.target.value)}

          />

          <input type="number"
            required 
            placeholder="Valor em Reais" 
            value={value}
            onChange={e => setValue(e.target.value)}

          />

          <button onClick={handleNewIncident} className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
