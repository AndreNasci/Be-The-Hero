import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  // navegação através de uma função javascript
  const history = useHistory();

  async function handleRegister(e) {
    // previne o comportamento padrão da página
    // de recarregar por inteiro
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };
    
    try {
      // axion ja envia em formato json por padrão
      const response = await api.post('ongs', data);

      // crase usada para inserir variável dentro do texto
      alert(`Seu ID de acesso: ${response.data.id}`)

      // envia para a rota raiz
      history.push('/');
    } catch (err) {
      alert('Erro no cadastro, tente novamente.');
    }
  }

  return(
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e 
            ajude pessoas a encontrarem os casos da 
            sua ONG.
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041"/>
            Não tenho cadastro
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input 
            placeholder="Nome da ONG"
            value={name}
            /* 
              e.target.value representa o valor do input 
              que está sendo colocado dentro de 'name'
              arrow function: função no formato reduzido
              ('e' é o parâmetro da função)
            */
            onChange={e => setName(e.target.value)}
          />

          <input 
            type="email" 
            placeholder="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input 
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input 
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}  
            />

            {/* 
            Primeira chave: código HTML dentro do JS
            Segunda chave: objeto
            */}

            <input 
              placeholder="UF" 
              style={{width: 80}} 
              value={uf}
              onChange={e => setUf(e.target.value)}
             />
          </div>

          <button className="button" type="submit">Cadastrar</button>

        </form>
      </div>
    </div>
  );
}