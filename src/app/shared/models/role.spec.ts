import { Role } from './role';

describe('Role', () => {
  it('should create an instance', () => {
    expect(new Role('ROLE_USUARIO', 'usuário padrão do sistema')).toBeTruthy();
  });
});
