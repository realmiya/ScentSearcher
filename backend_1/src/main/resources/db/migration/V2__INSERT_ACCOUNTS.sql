insert into accounts (username, encoded_password, first_name, last_name, gender) values
('user1','$2a$10$BRMZmPOOaLp5ksyMZMY8rOCphXq8xZtgcsi8svVIeSQnEVMp4LY0a', 'test', 'test', 'test'),
('user2', '$2a$10$BRMZmPOOaLp5ksyMZMY8rOCphXq8xZtgcsi8svVIeSQnEVMp4LY0a', 'test', 'test', 'test');


insert into authorities (permission) values
('ROLE_USER'),
('ROLE_ADMIN');


insert into accounts_authorities(account_id, authority_id) values
(1,1),
(2,1);

