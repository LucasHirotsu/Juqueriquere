create database parque;

use parque;

CREATE TABLE trilhas(
  idTrilhas INT NOT NULL AUTO_INCREMENT,
  local MEDIUMTEXT NOT NULL,
  extensao VARCHAR (600) NOT NULL,
  altitude VARCHAR(45) NOT NULL,
  duracao VARCHAR(45) NOT NULL,
  dificuldade VARCHAR(45) NOT NULL,
  monitoria VARCHAR(45) NOT NULL,
  caracteristicas MEDIUMTEXT NOT NULL,
  descricao MEDIUMTEXT NOT NULL,
  agendamento MEDIUMTEXT NOT NULL,
  horario VARCHAR(45) NOT NULL,
  imagem varchar(45) not null,
  PRIMARY KEY (`idTrilhas`))
ENGINE = InnoDB;