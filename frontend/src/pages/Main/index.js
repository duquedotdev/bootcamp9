import React from 'react';

import { FaGithubAlt, FaPlusCircle } from 'react-icons/fa';
import { Container, Form, SubmitButton } from './styles';

function Main() {
  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Repositórios
      </h1>
      <Form onSubmit={() => {}}>
        <input type="text" placeholder="Adicionar repositório" />
        <SubmitButton>
          <FaPlusCircle />
        </SubmitButton>
      </Form>
    </Container>
  );
}

export default Main;
