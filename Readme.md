# Desenvolvendo uma aplicação

### Tecnologias
- Typescript


#### Implementação
Este projeto foi desenvolvido com foco em boas práticas de arquitetura e organização de código. Ele implementa um CRUD completo (Create, Read, Update e Delete) utilizando SQLite como banco de dados em conjunto com o TypeORM, e segue o padrão de camadas Controller → Service → Repository → Entity, garantindo uma separação clara de responsabilidades.

Para reforçar a segurança, foi implementado JWT (JSON Web Token) para autenticação, protegendo rotas e permitindo apenas o acesso de usuários devidamente autenticados. Também adicionei validações para garantir a integridade dos dados antes de qualquer operação, evitando inconsistências no sistema.

A aplicação conta com middleware personalizado, que ajudam no tratamento de erros e na proteção de rotas, além de testes unitários para validar o funcionamento das funcionalidades principais, garantindo mais confiança e estabilidade no código.

O resultado é um projeto organizado, escalável e com recursos que simulam um ambiente real de produção, servindo como base para aplicações futuras.
