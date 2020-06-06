import React from 'react';
import { FiCheckCircle, FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css';

const Success = () => {
  return (
    <div id="page-success">
      <div className="content">
        <FiCheckCircle color="#2FB86E" size={100} />
        <p>Cadastro concluído!</p>

        <Link to="/create-point">
          <span>
            <FiLogIn />
          </span>
          <strong>Cadastre um ponto de coleta</strong>
        </Link>
      </div>
    </div>
  );
}

export default Success;