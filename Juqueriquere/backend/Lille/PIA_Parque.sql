CREATE DATABASE Lille;

USE Lille;

DROP TABLE lojas;
CREATE TABLE lojas(
	ID_Lojas INT AUTO_INCREMENT PRIMARY KEY,
	Nome VARCHAR(255) NOT NULL,
	Proprietario VARCHAR(255) NOT NULL,
	Contato VARCHAR(255),
	Número VARCHAR(50) NOT NULL,
	Complemento VARCHAR(255)
    );
    
INSERT INTO lojas (Nome, Proprietario, Contato, Número, Complemento)
VALUES  ("Vidro da Lua", "Marta Calino", "martacalino34@gmail.com", "Loja 1", "A caminho dos banheiros"),
		("Fiozetto", "Bela Ferreto", "ferreto.bela14@gmail.com", "Loja 2", "Perto da entrada para a triha do rio"),
		("Fauna e Flora", "Catarina Lima", "catarinalima@gmail.com", "Loja 3", "A direita da entrada do parque"),
		("Armazém do Zé", "José Cardoso", "(13) 94728-0953", "Loja 4", "A esquerda da entrada do parque"),
		("Bolo da Inayara", "Mayara Santos", "(11) 97653-7539", "Loja 5", "Perto da brinquedoteca");

INSERT INTO lojas (Nome, Proprietario, Contato, Número, Complemento)
VALUES ("Brilho no Bosque", "Ana Silva", "anasilva.brilhonobosque@gmail.com", "Loja 6", "Ao lado do lago principal do parque");

SELECT *
From lojas;

DROP TABLE pousadas;
CREATE TABLE pousadas(
	ID_Pousadas INT AUTO_INCREMENT PRIMARY KEY,
	Nome VARCHAR(255) NOT NULL,
	Proprietario VARCHAR(255) NOT NULL,
	Contato VARCHAR(255),
	Endereco VARCHAR(255),
	Acessibilidade VARCHAR(255),
    Sinal VARCHAR(255),
    Descricao TEXT
    );
    
SELECT *
From pousadas;

INSERT INTO pousadas (Nome, Proprietario, Contato, Endereco, Acessibilidade, Sinal, Descricao)
VALUES 
('Pousada Ararinha', 'Cristiane Ferreira', '(12) 95776-4724', 'Av Alexandre Pires, 765, Ituba', 'Não', 'Não', '3 quartos / 1 sala / 1 cozinha com microondas, fogão e geladeira / 1 lavanderia / estacionamento'),
('Pousada Barra do Sol', 'Luziete Santana', '(12) 998990763', 'Av Pedro Almeida, 800, Ituba', 'Sim', 'Sim', '4 quartos / 1 sala / 1 cozinha com microondas, fogão e geladeira / wifi grátis disponível / 1 lavanderia / estacionamento'),
('Esplendor do Luar', 'Luana Almeida', 'lualmeida@gmail.com', 'Av Miranda Soares, 520, Ituba', 'Não', 'Sim', '4 quartos / 2 sala / 1 cozinha com microondas, fogão e geladeira / 1 lavanderia / estacionamento'),
('Pousada Abracadabra', 'Caio Ferreira Barros', 'pousadaabracadabra@gmail.com', 'Av Joelma, 100, Ituba', 'Não', 'Não', '4 quartos / 1 sala / 1 cozinha com fogão e geladeira / 1 lavanderia / estacionamento'),
('Raio de Íris', 'Helena Carvalho', 'helencarvalhoo@gmail.com', 'Av Ivete Sangalo, 479, Ituba', 'Sim', 'Sim', '5 quartos / 1 sala / 1 cozinha com microondas, fogão e geladeira / Ar condicionado / wifi grátis disponível / 1 lavanderia / estacionamento');

INSERT INTO pousadas (Nome, Proprietario, Contato, Endereco, Acessibilidade, Sinal, Descricao)
VALUES 
('Araponga', 'Felipe Santos', '(15) 97865-4321', 'Av Preta Gil, 321, Ituba', 'Sim', 'Sim', '5 quartos, sendo 3 suítes / 20 leitos / 3 banheiros com chuveiro com água quente / 1 sala de estar / 1 cozinha completa com microondas, fogão, geladeira, forno elétrico e lava-louças / lavanderia / estacionamento / jardim / churrasqueira');

DROP TABLE produtos;
CREATE TABLE produtos (
    ID_Produtos INT AUTO_INCREMENT PRIMARY KEY,
    Preco VARCHAR(255) NOT NULL,
    Tipo VARCHAR(255),
    Validade VARCHAR(255),
    ID_Loja INT,
    FOREIGN KEY (ID_Loja) REFERENCES lojas(ID_Lojas)
);

INSERT INTO produtos (Preco, Tipo, Validade, ID_Loja)
VALUES 
    ("15.00", "Vaso de Plantas", NULL, 1),
    ("25.00", "Vestido Rosa", NULL, 2),
    ("10.00", "Sabonete Artesanal", NULL, 3),
    ("5.00", "Bolacha Caseira", "2024-06-30", 4),
    ("20.00", "Pão de Queijo", "2024-05-10", 5),
    ("50.00", "Colar de Pedra Lua", NULL, 1),
    ("30.00", "Saia Laranja", NULL, 2),
    ("8.00", "Shampoo Natural", NULL, 3),
    ("6.00", "Brownie Caseiro", "2024-06-15", 4),
    ("18.00", "Pão de Mel", "2024-05-20", 5);


DROP TABLE acomodacoes;
CREATE TABLE acomodacoes (
    ID_Acomodacoes INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL,
    Descricao TEXT,
    Capacidade INT,
    Preco VARCHAR(255) NOT NULL,
    ID_Pousada INT,
    FOREIGN KEY (ID_Pousada) REFERENCES pousadas(ID_Pousadas)
);

INSERT INTO acomodacoes (Nome, Descricao, Capacidade, Preco, ID_Pousada)
VALUES 
    ('Quarto Luxo', 'Quarto com cama de casal, chuveiro, banheira de hidromassagem, TV de tela plana, frigobar e ar condicionado.', 2, '150.00', 1),
    ('Quarto Sol', 'Quarto com cama de casal, chuveiro, TV de tela plana, frigobar e ventilador de teto.', 2, '100.00', 1),
    ('Quarto Lua', 'Quarto com duas camas de solteiro, chuveiro, TV de tela plana, frigobar e ar condicionado.', 2, '100.00', 1),
    ('Quarto Charme', 'Quarto com cama de casal, chuveiro, TV de tela plana, frigobar e ventilador de teto.', 2, '120.00', 2),
    ('Quarto Aconchego', 'Quarto com cama de casal, chuveiro, TV de tela plana, frigobar e ar condicionado.', 2, '130.00', 2),
    ('Quarto Estrela', 'Quarto com cama de casal, chuveiro, TV de tela plana, frigobar e ventilador de teto.', 2, '90.00', 3),
    ('Quarto Lua Cheia', 'Quarto com duas camas de solteiro, chuveiro, TV de tela plana, frigobar e ar condicionado.', 2, '100.00', 3),
    ('Quarto Encanto', 'Quarto com cama de casal, chuveiro, TV de tela plana, frigobar e ventilador de teto.', 2, '110.00', 4),
    ('Quarto Jardim', 'Quarto com duas camas de solteiro, chuveiro, TV de tela plana, frigobar e ar condicionado.', 2, '120.00', 4),
    ('Quarto Magia', 'Quarto com cama de casal, chuveiro, TV de tela plana, frigobar e ventilador de teto.', 2, '100.00', 5),
    ('Quarto Arco-Íris', 'Quarto com duas camas de solteiro, chuveiro, TV de tela plana, frigobar e ar condicionado.', 2, '110.00', 5),
    ('Suíte Master', 'Suíte com cama king-size, banheira de hidromassagem, chuveiro, TV de tela plana, frigobar e ar condicionado.', 2, '200.00', 1),
    ('Suíte Lua de Mel', 'Suíte com cama king-size, banheira de hidromassagem, chuveiro, TV de tela plana, frigobar e ar condicionado.', 2, '250.00', 2),
    ('Suíte Estrela Cadente', 'Suíte com cama king-size, banheira de hidromassagem, chuveiro, TV de tela plana, frigobar e ar condicionado.', 2, '220.00', 3),
    ('Suíte Encantada', 'Suíte com cama king-size, banheira de hidromassagem, chuveiro, TV de tela plana, frigobar e ar condicionado.', 2, '230.00', 4),
    ('Suíte Sonho Azul', 'Suíte com cama king-size, banheira de hidromassagem, chuveiro, TV de tela plana, frigobar e ar condicionado.', 2, '240.00', 5),
    ('Quarto Família', 'Quarto com uma cama de casal, duas camas de solteiro, chuveiro, TV de tela plana, frigobar e ar condicionado.', 4, '180.00', 1),
    ('Quarto Conforto', 'Quarto com uma cama de casal, duas camas de solteiro, chuveiro, TV de tela plana, frigobar e ar condicionado.', 4, '160.00', 2),
    ('Suíte Família Real', 'Suíte com uma cama de casal, duas camas de solteiro, banheira de hidromassagem, chuveiro, TV de tela plana, frigobar e ar condicionado.', 4, '300.00', 3),
    ('Suíte Jardim Secreto', 'Suíte com uma cama de casal, duas camas de solteiro, banheira de hidromassagem, chuveiro, TV de tela plana, frigobar e ar condicionado.', 4, '280.00', 4),
    ('Suíte Estrela Cadente', 'Suíte com uma cama de casal, duas camas de solteiro, banheira de hidromassagem, chuveiro, TV de tela plana, frigobar e ar condicionado.', 4, '320.00', 5);